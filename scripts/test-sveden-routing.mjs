import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

// Without --base-url, exercise the real standalone production build and its
// logs. The same HTTP checks run inside the deployment candidate before switch.
const argument = process.argv.find((value) => value.startsWith("--base-url="));
let baseUrl = argument?.slice("--base-url=".length).replace(/\/$/, "");
let server;
let serverClosed;
let output = "";

async function request(route, options = {}) {
  return fetch(`${baseUrl}${route}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
    ...options,
  });
}

try {
  if (!baseUrl) {
    const socket = createServer();
    socket.listen(0, "127.0.0.1");
    await once(socket, "listening");
    const { port } = socket.address();
    await new Promise((resolve, reject) => socket.close((error) => error ? reject(error) : resolve()));
    baseUrl = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, [path.resolve(".next/standalone/server.js")], {
      env: { ...process.env, NODE_ENV: "production", HOSTNAME: "127.0.0.1", PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
    });
    serverClosed = once(server, "close");
    for (const stream of [server.stdout, server.stderr]) {
      stream.on("data", (chunk) => { output += chunk.toString(); });
    }
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (server.exitCode !== null) throw new Error(`Standalone server exited: ${output}`);
      try {
        const response = await request("/healthz");
        await response.text();
        ready = response.status === 200;
      } catch { /* Wait for the production listener. */ }
      if (ready) break;
      await delay(100);
    }
    assert.ok(ready, `Standalone server did not become ready: ${output}`);
  }

  for (const route of ["/", "/sveden/common", "/sveden/education"]) {
    const response = await request(route);
    const html = await response.text();
    assert.equal(response.status, 200, route);
    assert.match(html, /<h1[ >]/, `${route}: missing page content`);
    assert.doesNotMatch(html, /(?:href|src|action)="(?:[^"?#]*\/)?(?:null|undefined)(?:[/?#][^"]*)?"/i);
  }
  const redirect = await request("/sveden");
  await redirect.text();
  assert.equal(redirect.status, 308);
  assert.equal(new URL(redirect.headers.get("location"), baseUrl).pathname, "/sveden/common");

  for (const userAgent of ["Mozilla/5.0", "meta-externalagent/1.1"]) {
    // Repeat to cover both cold fallback handling and cached 404 responses.
    for (let repeat = 0; repeat < 2; repeat++) {
      for (const route of ["/sveden/null", "/sveden/undefined", "/sveden/not-a-section", "/sveden/%6eull"]) {
        const response = await request(route, { headers: { "User-Agent": userAgent } });
        const html = await response.text();
        assert.equal(response.status, 404, `${route} (${userAgent}, pass ${repeat})`);
        assert.match(html, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i, `${route}: missing noindex`);
        assert.doesNotMatch(html, /Internal: NoFallbackError/);
      }
    }
  }
} finally {
  if (server) {
    server.kill("SIGTERM");
    const forceKill = setTimeout(() => server.kill("SIGKILL"), 5_000);
    await serverClosed;
    clearTimeout(forceKill);
  }
}

// Inspect drained stdout AND stderr: a successful 404 alone missed the bug.
assert.doesNotMatch(output, /NoFallbackError|Error:|unhandledRejection|uncaughtException/i);
console.log(`Sveden production routing verified: valid sections, invalid-section 404/noindex${server ? ", clean server logs" : ""}`);
