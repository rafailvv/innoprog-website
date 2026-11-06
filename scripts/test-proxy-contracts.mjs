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
  .filter((file) => /import \{ (?:InlineLeadForm|HomeLeadSection) \}/.test(read(file)));

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
  /href="\/consent"[\s\S]*href="\/advertising-consent"[\s\S]*<\/button>[\s\S]*<CaptchaNotice \/>/,
  "standalone application must separate consent, advertising and captcha notices",
);
assert.doesNotMatch(
  standaloneApplication,
  /Нажимая на кнопку, вы даете/,
  "standalone application must not infer consent from submitting the form",
);
assert.equal(generatedFormFiles.length, 20, "all generated desktop and mobile forms must be checked");
for (const file of generatedFormFiles) {
  assert.match(read(file), /<(?:InlineLeadForm course|HomeLeadSection) \/>/, `${file} must use the shared inline form`);
}
const inlineForm = read("src/app/components/InlineLeadForm.tsx");
assert.match(inlineForm, /data-consent-toggle/, "shared form must expose personal consent");
assert.match(inlineForm, /data-advertising-consent-toggle/, "shared form must expose optional advertising consent");
assert.match(inlineForm, /href="\/consent"/, "shared form must link personal consent");
assert.match(inlineForm, /href="\/advertising-consent"/, "shared form must link advertising consent");
assert.match(inlineForm, /<CallbackTimeReveal phone=\{phone\}>/, "callback choice must follow a filled phone");
assert.match(inlineForm, /<\/button>\s*<CaptchaNotice \/>/, "captcha notice must follow submit");

assert.match(read("src/app/components/CaptchaNotice.tsx"), /Форма защищена Yandex SmartCaptcha/, "shared captcha notice must keep its vendor attribution");

console.log("innoprog-website proxy contracts ok");
