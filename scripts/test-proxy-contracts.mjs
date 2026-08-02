import fs from "node:fs";
import assert from "node:assert/strict";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

const app = read("src/app/App.tsx");
const route = read("src/app/api/application/request/route.ts");
const publicRoute = read("src/app/application/request/route.ts");
const standaloneApplication = read("src/app/application/LeadApplicationPage.tsx");
const importRoot = new URL("../src/imports/", import.meta.url);
const generatedFormFiles = fs
  .readdirSync(importRoot, { recursive: true })
  .filter((file) => String(file).endsWith(".tsx"))
  .map((file) => `src/imports/${file}`)
  .filter((file) => read(file).includes("data-consent-toggle"));

assert.match(
  app,
  /const APPLICATION_REQUEST_URL = "\/application\/request";/,
  "website forms must post to same-origin /application/request",
);
assert.match(
  app,
  /(?:import \{ checkCaptchaError, CheckCaptchaType \} from|await import\()"@vkid\/captcha"\)?;/,
  "website forms must use the official VK ID Captcha SDK",
);
assert.match(
  app,
  /captchaWidget\.show\(\{[\s\S]*view: "popup"/,
  "website forms must render VK ID Captcha as a popup challenge",
);
assert.match(
  app,
  /success_token: successToken \|\| ""/,
  "website forms must repeat the request with the VK captcha success token",
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
  route,
  /error_code: 14,[\s\S]*redirect_uri: captchaRedirect/,
  "application request API route must normalize upstream VK captcha challenges",
);
assert.match(
  route,
  /\{ success_token: String\(body\.success_token\)\.trim\(\) \}/,
  "application request API route must forward the VK captcha success token",
);
assert.match(
  publicRoute,
  /export \{ OPTIONS, POST \} from "\.\.\/\.\.\/api\/application\/request\/route";/,
  "public /application/request route must reuse the protected API route implementation",
);
assert.match(
  route,
  /personal_data_consent: body\.personal_data_consent === true/,
  "application request API must accept only an explicit personal-data consent flag",
);
assert.match(
  route,
  /!payload\.personal_data_consent/,
  "application request API must reject submissions without personal-data consent",
);
assert.match(
  app,
  /personal_data_consent: true,[\s\S]*advertising_consent: isAdvertisingConsentChecked/,
  "interactive forms must send separate personal-data and advertising consent flags",
);
assert.match(
  standaloneApplication,
  /href="\/consent"[\s\S]*href="\/advertising-consent"[\s\S]*href="\/privacy"/,
  "standalone application must separate consent, advertising and policy links",
);
assert.doesNotMatch(
  standaloneApplication,
  /Нажимая на кнопку, вы даете/,
  "standalone application must not infer consent from submitting the form",
);
assert.equal(generatedFormFiles.length, 20, "all generated desktop and mobile forms must be checked");
for (const file of generatedFormFiles) {
  const source = read(file);
  assert.match(source, /data-consent-toggle/, `${file} must expose personal-data consent`);
  assert.match(source, /href="\/consent"/, `${file} must link the separate consent document`);
  assert.match(source, /data-advertising-consent-toggle/, `${file} must expose optional advertising consent`);
  assert.match(source, /href="\/advertising-consent"/, `${file} must link advertising consent`);
  assert.match(source, /href="\/privacy"/, `${file} must link the operator policy`);
  assert.doesNotMatch(source, /Нажимая на кнопку, вы даете/, `${file} must require an explicit choice`);
}

console.log("innoprog-website proxy contracts ok");
