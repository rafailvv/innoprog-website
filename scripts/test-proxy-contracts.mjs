import fs from "node:fs";
import assert from "node:assert/strict";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

const app = read("src/app/App.tsx");
const route = read("src/app/api/application/request/route.ts");
const publicRoute = read("src/app/application/request/route.ts");

assert.match(
  app,
  /const APPLICATION_REQUEST_URL = "\/application\/request";/,
  "website forms must post to same-origin /application/request",
);
assert.match(
  route,
  /process\.env\.APPLICATION_REQUEST_PROXY_URL \|\| "https:\/\/bot\.innoprog\.ru\/application\/request";/,
  "application request API route must proxy to bot.innoprog.ru bot_api endpoint",
);
assert.match(
  route,
  /fetch\(BOT_APPLICATION_URL,\s*\{/s,
  "application request API route must forward requests server-side",
);
assert.match(
  route,
  /headers\.Authorization = `Bearer \$\{normalizedToken\}`;/,
  "application request API route should attach a configured bot_api service token server-side",
);
assert.match(
  publicRoute,
  /export \{ OPTIONS, POST \} from "\.\.\/\.\.\/api\/application\/request\/route";/,
  "public /application/request route must reuse the protected API route implementation",
);

console.log("innoprog-website proxy contracts ok");
