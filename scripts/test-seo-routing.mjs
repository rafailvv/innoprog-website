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

  // Stable public images must be reusable, but validate freshness on every
  // visit. HTML, service routes and missing paths retain their no-store policy.
  for (const [route, mime] of [
    ["/children/school/hero-mobile.webp", "image/webp"],
    ["/children/school/review-1-gallery-1.jpg", "image/jpeg"],
    ["/children/school/laptop.svg", "image/svg+xml"],
    ["/skill-icons/python.svg", "image/svg+xml"],
  ]) {
    const asset = await request(route);
    assert.equal(asset.status, 200, route);
    assert.ok((asset.headers.get("content-type") || "").startsWith(mime), route);
    assert.equal(asset.headers.get("cache-control"), "public, max-age=0, must-revalidate", route);
    const etag = asset.headers.get("etag");
    assert.ok(etag, `${route}: validator required`);
    await asset.arrayBuffer();
    // Undici otherwise adds Cache-Control: no-cache for conditional fetches,
    // which deliberately forces a full response instead of HTTP revalidation.
    const unchanged = await request(route, { cache: "no-cache", headers: { "if-none-match": etag } });
    assert.equal(unchanged.status, 304, `${route}: reuse cached body`);
    assert.equal((await unchanged.arrayBuffer()).byteLength, 0, route);
  }
  for (const route of ["/children", "/children/courses/python", "/python-course", "/healthz"]) {
    const response = await request(route);
    assert.match(response.headers.get("cache-control") || "", /no-store/, route);
    await response.text();
  }

  for (const route of ["/children/school/nonexistent.webp", "/skill-icons/nonexistent.svg"]) {
    const response = await request(route);
    assert.equal(response.status, 404, route);
    assert.match(response.headers.get("cache-control") || "", /no-store/, route);
    await response.text();
  }

  const faviconResponse = await request("/favicon.ico");
  assert.equal(faviconResponse.status, 200, "Small browser icon must be served without redirect");
  assert.match(faviconResponse.headers.get("content-type") ?? "", /image\/(?:x-icon|vnd\.microsoft\.icon)/);
  assert.ok((await faviconResponse.arrayBuffer()).byteLength < 20_000, "Browser icon must remain below 20KB");
  for (const iconPath of ["/favicon.ico", "/app-icon-192.png"]) {
    const iconResponse = await request(iconPath);
    assert.equal(iconResponse.status, 200);
    assert.match(iconResponse.headers.get("cache-control") ?? "", /must-revalidate/);
    assert.doesNotMatch(iconResponse.headers.get("cache-control") ?? "", /no-store/);
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
      assert.equal(document.querySelectorAll("h1").length, 1, `${route}: exactly one heading`);
      const ids = [...document.querySelectorAll("[id]")].map(node => node.id);
      assert.equal(new Set(ids).size, ids.length, `${route}: duplicate DOM IDs`);
      for (const id of ids) assert.doesNotMatch(id, /[\t\n\f\r ]/, `${route}: whitespace in ID`);
      for (const control of document.querySelectorAll("[aria-controls], [aria-labelledby]")) {
        for (const attr of ["aria-controls", "aria-labelledby"]) {
          for (const id of (control.getAttribute(attr) || "").split(/\s+/).filter(Boolean)) {
            assert.ok(document.getElementById(id), `${route}: missing ${attr} target ${id}`);
          }
        }
      }
      if (route === "/" || route.endsWith("-course")) {
        const keywords = document.querySelector('meta[name="keywords"]')?.content.split(",").map(x => x.trim().toLowerCase()) || [];
        assert.ok(keywords.length <= 12, `${route}: excessive keywords`);
        assert.equal(new Set(keywords).size, keywords.length, `${route}: duplicate keywords`);
      }
      if (!route.startsWith("/children") && !route.startsWith("/sveden/")) {
        for (const path of ["/children", "/children/courses/python", "/children/courses/web-development", "/children/courses/informatics-exams", "/children/courses/olympiad-programming", "/children/courses/neural-networks", "/children/courses/game-development"]) {
          assert.ok(document.querySelector(`a[href="${path}"]`), `${route}: missing server children link ${path}`);
        }
        const menu = document.querySelector('nav[aria-label="Мобильное меню"]');
        assert.ok(menu?.hidden, `${route}: menu initially hidden`);
      }
      const heading = document.querySelector("h1").textContent;
      assert.doesNotMatch(heading, /Выгодныеусловия|мы\?наша|История [^:]+:[^\s]/, `${route}: joined heading words`);
      assert.equal(structuredData.filter((item) => item["@type"] === "EducationalOrganization").length, 1, `${route}: school entity`);
      assert.equal(structuredData.filter((item) => item["@type"] === "WebSite").length, 1, `${route}: website entity`);
      if (route === "/blog" || route.startsWith("/blog/")) {
        const main = document.querySelector("main");
        assert.ok(main, `${route}: missing server-rendered main content`);
        if (route === "/blog") {
          const blog = structuredData.find((item) => item["@type"] === "Blog");
          assert.equal(blog?.blogPost.length, 6, "Blog must expose all six articles");
          for (const post of blog.blogPost) {
            const postPath = new URL(post.url).pathname;
            assert.ok(document.querySelector(`main a[href="${postPath}"]`), `Missing visible article link: ${postPath}`);
          }
        } else {
          const article = structuredData.find((item) => item["@type"] === "BlogPosting");
          assert.ok(article, `${route}: missing BlogPosting`);
          assert.equal(article.headline, heading, `${route}: schema headline must match H1`);
          assert.equal(article.url, url, `${route}: schema URL must be canonical`);
          assert.equal(article.mainEntityOfPage["@id"], `${url}#webpage`);
          const published = main.querySelector("article time");
          assert.equal(article.datePublished, published?.getAttribute("datetime"), `${route}: date must match visible publication`);
          assert.ok(main.textContent.includes(article.author.name), `${route}: author must be visible`);
          const practical = ["/blog/python-razrabotchik-s-nulya", "/blog/data-science-s-nulya", "/blog/produktovaya-analitika-metriki-ab-testy"].includes(route);
          assert.ok(main.querySelector("article").textContent.trim().split(/\s+/).length > (practical ? 1000 : 500), `${route}: article body must be published as HTML`);
          if (practical) assert.ok(main.querySelector("pre code"), `${route}: expected practical code example`);
          const faq = structuredData.find((item) => item["@type"] === "FAQPage");
          const answers = [...main.querySelectorAll("#article-faq ~ details")];
          assert.equal(faq?.mainEntity.length, answers.length);
          answers.forEach((detail, i) => {
            assert.equal(detail.querySelector("summary").textContent, faq.mainEntity[i].name);
            assert.equal(detail.querySelector("p").textContent, faq.mainEntity[i].acceptedAnswer.text);
          });
          assert.equal(article.dateModified, document.querySelector('meta[property="article:modified_time"]')?.content);
          for (const link of main.querySelectorAll('a[href^="#"]')) assert.ok(document.getElementById(link.getAttribute("href").slice(1)), `${route}: broken contents anchor`);
          const imagePath = new URL(article.image.url).pathname;
          const image = main.querySelector(`img[src="${imagePath}"]`);
          assert.ok(image?.getAttribute("alt"), `${route}: primary image needs descriptive alt`);
          assert.equal(document.querySelector('meta[property="og:type"]')?.content, "article");
          for (const assetPath of [imagePath, new URL(document.querySelector('meta[property="og:image"]').content).pathname]) {
            const asset = await request(assetPath);
            assert.equal(asset.status, 200, assetPath);
            assert.match(asset.headers.get("content-type") || "", /^image\/(webp|png)/);
            assert.doesNotMatch(asset.headers.get("x-robots-tag") || "", /noindex/);
            assert.equal(asset.headers.get("cache-control"), assetPath.startsWith("/og/") ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate");
            const bytes = Buffer.from(await asset.arrayBuffer());
            if (assetPath.endsWith(".webp")) {
              assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
              assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
            } else assert.equal(bytes.toString("hex", 0, 8), "89504e470d0a1a0a");
            assert.ok(bytes.length <= (assetPath === "/og/children-school-v1.png" ? 270 : 150) * 1024, `${assetPath}: image budget`);
          }
        }
      }
      const checkListSchema = (node) => {
        if (!node || typeof node !== "object") return;
        if (node["@type"] === "ItemList") {
          assert.ok(!Object.hasOwn(node, "inLanguage") && !Object.hasOwn(node, "publisher"), `${route}: ItemList is not a CreativeWork`);
        }
        if (node["@type"] === "OfferCatalog") {
          assert.ok(!Object.hasOwn(node, "provider"), `${route}: seller belongs to the offers, not OfferCatalog`);
        }
        for (const child of Object.values(node)) checkListSchema(child);
      };
      structuredData.forEach(checkListSchema);
      for (const image of document.querySelectorAll("img")) {
        assert.ok(image.hasAttribute("alt"), `${route}: image has no alt attribute`);
      }
      if (route === "/" || route.endsWith("-course")) {
        assert.ok(document.querySelector('a[href="/tariffs"]'), `${route}: tariffs must be linked in server HTML`);
      }
      if (route.endsWith("-course") || route.startsWith("/children/courses/")) {
        const course = structuredData.find((item) => item["@type"] === "Course");
        assert.equal(course?.url, url, route);
        assert.equal(course.provider.name, "ИННОПРОГ", route);
        assert.ok(course.hasCourseInstance?.courseMode === "online", route);
        assert.ok(!Object.hasOwn(course, "courseMode"), `${route}: courseMode belongs to CourseInstance`);
        assert.ok(!Object.hasOwn(course, "totalTime"), `${route}: totalTime is a HowTo property`);
        if (route.endsWith("-course")) {
          const direction = ({ "/python-course": "python", "/data-science-course": "data-science", "/data-analyst-course": "data-science", "/frontend-developer-course": "frontend", "/cpp-developer-course": "cpp", "/java-developer-course": "java", "/unreal-engine-course": "unreal", "/mobile-developer-course": "mobile", "/ml-engineer-course": "ml" })[route];
          const cards = [...document.querySelectorAll('.site-course-reviews-carousel a.site-course-review-card--dynamic')];
          assert.equal(cards.length, 4, `${route}: four reviews must be rendered without JavaScript`);
          for (const card of cards) {
            assert.equal(new URL(card.getAttribute("href"), origin).searchParams.get("direction"), direction, `${route}: wrong review direction in initial HTML`);
            assert.ok(card.querySelector('.site-course-direction-review-card__body')?.textContent.length > 50, `${route}: missing review text`);
          }
          if (!["data-science", "data-analyst"].some((name) => route === `/${name}-course`)) {
            assert.equal(course.review?.length, 4, `${route}: published course reviews schema`);
            for (const review of course.review) {
              assert.ok(bodyText.includes(normalizeText(review.author.name)), `${route}: review author must be visible`);
              assert.ok(bodyText.includes(normalizeText(review.reviewBody)), `${route}: review must match server-visible content`);
              assert.ok(!review.reviewRating, `${route}: no additional rating claims`);
            }
          }
          assert.match(course.hasCourseInstance.courseWorkload, /^(800|960) академических часов$/, `${route}: approved academic workload`);
          for (const person of course.hasCourseInstance.instructor || []) {
            assert.equal(person["@type"], "Person", `${route}: instructor must be a person`);
            assert.ok(bodyText.includes(normalizeText(person.name)), `${route}: instructor must be published on this page`);
            assert.ok(bodyText.includes(normalizeText(person.jobTitle)), `${route}: instructor role must be published`);
          }
          assert.ok(document.querySelectorAll('img[loading="lazy"]').length >= 18, `${route}: defer images in initial HTML`);
          assert.ok(document.querySelector('img[loading="eager"][fetchpriority="high"]'), `${route}: preserve hero image priority`);
        }
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

  const discovery = await request("/llms.txt");
  assert.equal(discovery.status, 200);
  const discoveryText = await discovery.text();
  for (const url of urls.filter((url) => new URL(url).pathname.startsWith("/children"))) {
    assert.ok(discoveryText.includes(url), `Missing children page in llms.txt: ${url}`);
  }

  for (const route of ["/", "/python-course?utm_source=seo-test&ref=example", "/reviews/kirill", "/children/courses/python?utm_source=seo-test", "/children/stories/amir"]) {
    const response = await requestWithHost(route, "www.innoprog.ru");
    assert.equal(response.status, 308, `www redirect: ${route}`);
    assert.equal(new URL(response.location).href, new URL(`${origin}${route}`).href, `www path and query: ${route}`);
  }
  for (const route of ["/main", "/main?utm_source=seo-test&utm_campaign=legacy"]) {
    const response = await request(route);
    await response.text();
    assert.equal(response.status, 308, `legacy redirect: ${route}`);
    assert.equal(new URL(response.headers.get("location"), baseUrl).pathname, "/");
    assert.equal(new URL(response.headers.get("location"), baseUrl).search, new URL(route, baseUrl).search);
  }
  for (const route of ["/reviews?direction=python", "/reviews?direction=python&review=andrey"]) {
    const response = await request(route);
    const { document } = readDocument(await response.text());
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("x-robots-tag") || "", /noindex, follow/i, route);
    assert.match(document.querySelector('meta[name="robots"]')?.content || "", /noindex, follow/i, route);
    assert.match(document.querySelector('meta[name="googlebot"]')?.content || "", /noindex, follow/i, route);
    assert.equal(document.querySelector('link[rel="canonical"]')?.href, `${origin}/reviews`, route);
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
  for (const route of ["/blog/unknown-article", "/blog/python-razrabotchik-s-nulya/missing"]) {
    const response = await request(route);
    assert.equal(response.status, 404, route);
    assert.match(await response.text(), /noindex/i, route);
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
