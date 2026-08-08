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
  /YandexSmartCaptcha/,
  "website forms must use the Yandex SmartCaptcha component",
);
assert.match(
  app,
  /smartCaptchaRef\.current\?\.requestToken\(\)/,
  "website forms must request a Yandex SmartCaptcha token before submission",
);
assert.match(
  app,
  /captcha_token: captchaToken/,
  "website forms must send the Yandex SmartCaptcha token",
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
  /https:\/\/smartcaptcha\.cloud\.yandex\.ru\/validate/,
  "application request API route must validate Yandex SmartCaptcha server-side",
);
assert.match(
  route,
  /process\.env\.SMARTCAPTCHA_SERVER_KEY/,
  "application request API route must load the SmartCaptcha secret only from server environment",
);
assert.match(
  route,
  /String\(body\.captcha_token \|\| ""\)\.trim\(\)/,
  "application request API route must require the Yandex SmartCaptcha token",
);
assert.doesNotMatch(
  `${app}\n${standaloneApplication}\n${route}`,
  /@vkid\/captcha|checkCaptchaError|success_token/,
  "VK CAPTCHA integration must be removed",
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
