import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const base = process.argv.find(x => x.startsWith('--base-url='))?.split('=')[1] || 'http://127.0.0.1:3210';
const origin = 'https://innoprog.ru';
const courses = ['python', 'web-development', 'informatics-exams', 'olympiad-programming', 'neural-networks', 'game-development'];
const stories = ['amir', 'eldar', 'almaz'];
const paths = ['/children', ...courses.map(s => `/children/courses/${s}`), ...stories.map(s => `/children/stories/${s}`)];
const text = s => s.replace(/\s+/g, ' ').trim();
const get = path => fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
const titles = new Set(), descriptions = new Set(), images = new Set(), links = new Set();
for (const path of paths) {
  const response = await get(path);
  assert.equal(response.status, 200, path);
  const dom = new JSDOM(await response.text());
  const d = dom.window.document;
  assert.equal(d.querySelectorAll('h1').length, 1, `${path}: single h1`);
  assert.equal(d.querySelectorAll('link[rel="canonical"]').length, 1, path);
  assert.equal(d.querySelector('link[rel="canonical"]').href, origin + path, path);
  const description = d.querySelector('meta[name="description"]')?.content;
  assert.ok(description?.length >= 90, `${path}: detailed description`);
  assert.ok(!titles.has(d.title) && !descriptions.has(description), `${path}: unique metadata`);
  titles.add(d.title); descriptions.add(description);
  assert.doesNotMatch(d.querySelector('meta[name="robots"]')?.content || '', /noindex/i, path);
  assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i, path);
  const image = d.querySelector('meta[property="og:image"]')?.content;
  assert.ok(image && !images.has(image), `${path}: own social preview`);
  images.add(image);
  assert.equal(d.querySelector('meta[name="twitter:image"]')?.content, image, path);
  const imageResponse = await get(new URL(image).pathname);
  assert.equal(imageResponse.status, 200, image);
  const metadata = await sharp(Buffer.from(await imageResponse.arrayBuffer())).metadata();
  assert.equal(metadata.width, 1200); assert.equal(metadata.height, 630);
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent));
  const find = type => schemas.find(s => s['@type'] === type);
  assert.ok(find('BreadcrumbList'), `${path}: breadcrumbs schema`);
  assert.ok(find('WebPage') || find('FAQPage') || find('Article'), `${path}: page schema`);
  if (path.includes('/courses/')) {
    assert.ok(find('Course') && find('FAQPage'), `${path}: course and FAQ schema`);
    const modules = [...d.querySelectorAll('#program .site-course-program-module')];
    assert.equal(modules.length, ({ python: 20, 'web-development': 11, 'informatics-exams': 12, 'olympiad-programming': 12, 'neural-networks': 12, 'game-development': 14 }[path.split('/').pop()]), `${path}: complete program`);
    for (const module of modules) {
      const toggle = module.querySelector('button[aria-expanded]');
      const panel = module.querySelector('[role="region"]');
      assert.equal(toggle?.getAttribute('aria-expanded'), 'false', `${path}: initially collapsed`);
      assert.equal(panel?.getAttribute('aria-hidden'), 'true', `${path}: collapsed panel accessible state`);
      assert.equal(toggle?.getAttribute('aria-controls'), panel?.id, `${path}: connected control`);
      assert.ok(panel.querySelectorAll('li').length >= 8, `${path}: detailed topics and practice in server HTML`);
      assert.match(panel.textContent, /Практика/);
      assert.match(panel.textContent, /Результат модуля/);
    }
    for (const question of find('FAQPage').mainEntity) {
      assert.ok(text(d.body.textContent).includes(text(question.name)), `${path}: visible FAQ question`);
      assert.ok(text(d.body.textContent).includes(text(question.acceptedAnswer.text)), `${path}: visible FAQ answer`);
    }
  }
  if (path.includes('/stories/')) {
    assert.equal(text(find('Article').headline), text(d.querySelector('h1').textContent), `${path}: article matches heading`);
    assert.ok(d.querySelectorAll('main img').length >= ({ amir: 5, eldar: 4, almaz: 6 }[path.split('/').pop()]), `${path}: story gallery`);
  }
  for (const a of d.querySelectorAll('a[href]')) {
    const url = new URL(a.href, origin);
    if (url.origin === origin && (url.pathname === '/children' || url.pathname.startsWith('/children/'))) links.add(url.pathname);
  }
  for (const img of d.querySelectorAll('img')) assert.ok(img.hasAttribute('alt'), `${path}: image alt`);
  assert.doesNotMatch(d.body.textContent, /Локальный просмотр|доступ на домене сайта|2 занятия в подарок|Расскажите немного о ребёнке|Обязательные поля/i, path);
  dom.window.close();
}
for (const link of links) assert.ok(paths.includes(link), `Unknown child link: ${link}`);
const legacy = await get('/children/school');
assert.equal(legacy.status, 308, 'Legacy school route must permanently redirect');
assert.equal(new URL(legacy.headers.get('location'), base).pathname, '/children');
const sitemap = await (await get('/sitemap.xml')).text();
assert.ok(!sitemap.includes(`<loc>${origin}/children/school</loc>`), 'Only canonical child index belongs in sitemap');
for (const path of paths) assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`), `${path}: sitemap`);
for (const path of ['/children/courses/does-not-exist', '/children/stories/does-not-exist']) {
  const response = await get(path);
  assert.equal(response.status, 404, path);
  assert.match(await response.text(), /noindex/, path);
}
console.log(`Children SEO passed: ${paths.length} pages, ${images.size} unique 1200x630 social previews, schemas, crawl links, sitemap and 404s.`);
