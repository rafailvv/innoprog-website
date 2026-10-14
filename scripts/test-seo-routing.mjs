import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { setTimeout as delay } from "node:timers/promises";
import { JSDOM } from "jsdom";

const origin = "https://innoprog.ru";
const argument = process.argv.find((value) => value.startsWith("--base-url="));
let baseUrl = argument?.slice("--base-url=".length).replace(/\/$/, "");
let server;
let closed;
let output = "";

const request = (route, options = {}) => fetch(`${baseUrl}${route}`, {
  redirect: "manual", signal: AbortSignal.timeout(15_000), ...options,
});
const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

// Node fetch may replace a supplied Host header with the URL host. Exercise
// host-based redirects with the HTTP client that actually sends that header.
function requestWithHost(route, host) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${baseUrl}${route}`);
    const send = url.protocol === "https:" ? httpsRequest : httpRequest;
    const req = send(url, { headers: { host }, timeout: 15_000 }, (response) => {
      response.resume();
      response.on("end", () => resolve({ status: response.statusCode, location: response.headers.location }));
      response.on("error", reject);
    });
    req.on("timeout", () => req.destroy(new Error("Host redirect request timed out")));
    req.on("error", reject);
    req.end();
  });
}

function readDocument(html) {
  const window = new JSDOM(html).window;
  const document = window.document;
  const structuredData = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((script) => JSON.parse(script.textContent));
  for (const script of document.querySelectorAll("script, style, noscript")) script.remove();
  return { window, document, structuredData, bodyText: normalizeText(document.body.textContent) };
}

try {
  if (!baseUrl) {
    const socket = createServer();
    socket.listen(0, "127.0.0.1");
    await once(socket, "listening");
    const { port } = socket.address();
    await new Promise((resolve) => socket.close(resolve));
    baseUrl = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
      env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"],
    });
    closed = once(server, "close");
    for (const stream of [server.stdout, server.stderr]) {
      stream.on("data", (chunk) => { output += chunk.toString(); });
    }
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      assert.equal(server.exitCode, null, "Production server exited before becoming ready");
      try {
        const response = await request("/healthz");
        await response.text();
        ready = response.ok;
      } catch { /* The production listener is still starting. */ }
      if (ready) break;
      await delay(100);
    }
    assert.ok(ready, "Production server did not become ready");
  }

  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
  for (const story of ["kirill", "anastasia", "mikhail"]) {
    assert.ok(urls.includes(`${origin}/reviews/${story}`), `Story missing from sitemap: ${story}`);
  }
  const titles = new Set();
  for (const url of urls) {
    assert.equal(new URL(url).origin, origin);
    const route = new URL(url).pathname;
    const response = await request(route);
    const html = await response.text();
    assert.equal(response.status, 200, `${route}: sitemap must contain final, successful pages`);
    assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex/i, route);
    const { window, document, structuredData, bodyText } = readDocument(html);
    try {
      const canonical = document.querySelectorAll('link[rel="canonical"]');
      assert.equal(canonical.length, 1, `${route}: exactly one canonical`);
      assert.equal(canonical[0].href, url, `${route}: self canonical`);
      assert.ok(document.title.trim(), `${route}: missing title`);
      assert.ok(!titles.has(document.title), `${route}: duplicate title`);
      titles.add(document.title);
      assert.ok(document.querySelector('meta[name="description"]')?.content, `${route}: missing description`);
      for (const meta of document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]')) {
        assert.doesNotMatch(meta.content, /noindex/i, route);
      }
      assert.ok(document.querySelector("h1"), `${route}: missing heading in server HTML`);
      assert.equal(structuredData.filter((item) => item["@type"] === "EducationalOrganization").length, 1, `${route}: school entity`);
      assert.equal(structuredData.filter((item) => item["@type"] === "WebSite").length, 1, `${route}: website entity`);
      for (const image of document.querySelectorAll("img")) {
        assert.ok(image.hasAttribute("alt"), `${route}: image has no alt attribute`);
      }
      if (route === "/" || route.endsWith("-course")) {
        assert.ok(document.querySelector('a[href="/tariffs"]'), `${route}: tariffs must be linked in server HTML`);
      }
      if (route.endsWith("-course")) {
        const course = structuredData.find((item) => item["@type"] === "Course");
        assert.equal(course?.url, url, route);
        assert.equal(course.provider.name, "ИННОПРОГ", route);
        assert.ok(course.hasCourseInstance?.courseMode === "online", route);
        assert.ok(!Object.hasOwn(course, "courseMode"), `${route}: courseMode belongs to CourseInstance`);
        const faq = structuredData.find((item) => item["@type"] === "FAQPage");
        assert.ok(faq?.mainEntity.length, `${route}: missing FAQ data`);
        for (const question of faq.mainEntity) {
          assert.ok(bodyText.includes(normalizeText(question.name)), `${route}: invisible FAQ question`);
          for (const paragraph of question.acceptedAnswer.text.split("\n\n")) {
            assert.ok(bodyText.includes(normalizeText(paragraph)), `${route}: invisible FAQ answer`);
          }
        }
      }
      if (route.startsWith("/reviews/")) {
        const review = structuredData.find((item) => item["@type"] === "Review");
        assert.ok(review?.author.name, `${route}: missing review author`);
        assert.ok(bodyText.includes(normalizeText(review.reviewBody)), `${route}: review excerpt must appear in visible text`);
        assert.ok(!review.reviewRating && !review.aggregateRating, `${route}: no invented ratings`);
      }
    } finally { window.close(); }
  }

  for (const route of ["/", "/python-course?utm_source=seo-test&ref=example", "/reviews/kirill"]) {
    const response = await requestWithHost(route, "www.innoprog.ru");
    assert.equal(response.status, 308, `www redirect: ${route}`);
    assert.equal(new URL(response.location).href, new URL(`${origin}${route}`).href, `www path and query: ${route}`);
  }
  for (const route of ["/reviews?direction=python", "/reviews?direction=python&review=andrey"]) {
    const response = await request(route);
    await response.text();
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("x-robots-tag") || "", /noindex, follow/i, route);
  }
  for (const route of ["/not-found", "/seo-test-missing-page", "/reviews/seo-test-missing-story"]) {
    const response = await request(route);
    const html = await response.text();
    assert.equal(response.status, 404, route);
    assert.match(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i, route);
  }
  for (const route of ["/application", "/application/success"]) {
    const response = await request(route);
    const html = await response.text();
    assert.match(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i, route);
  }
  console.log(`SEO HTTP checks passed: ${urls.length} sitemap pages, JSON-LD/visible FAQ, story indexing, www/query redirects, filtered reviews and 404s.`);
} finally {
  if (server) {
    server.kill("SIGTERM");
    const timer = setTimeout(() => server.kill("SIGKILL"), 5000);
    await closed;
    clearTimeout(timer);
  }
}
assert.doesNotMatch(output, /NoFallbackError|unhandledRejection|uncaughtException|Error:/i);
