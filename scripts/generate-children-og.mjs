import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import ts from "typescript";
const root = process.cwd();
async function loadTypedData(file) {
  const source = await fs.readFile(path.join(root, file), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import("data:text/javascript;base64," + Buffer.from(outputText).toString("base64"));
}
const { childrenCourses } = await loadTypedData("src/app/children/courses/course-data.ts");
const { storySlugs, storySeo } = await loadTypedData("src/app/children/stories/story-data.ts");
const source = JSON.parse(await fs.readFile(path.join(root, "src/app/children/school/source-data.json"), "utf8"));
const cards = [
  { file: "children-school-v1.png", title: "Программирование для детей", badge: "9–17 лет · Онлайн с преподавателем", image: source.assets["hero-mobile"] },
  ...childrenCourses.map(course => ({ file: `children-${course.slug}-v1.png`, title: course.title, badge: `${course.age} · Индивидуальные занятия`, image: source.assets[course.asset], icon: true })),
  ...storySlugs.map((slug, index) => ({ file: `children-story-${slug}-v1.png`, title: storySeo[index].title, badge: "История ученика · ИННОПРОГ", image: source.reviews[index].image })),
];
const escape = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function lines(text) {
  const result = [];
  for (const word of text.split(" ")) {
    if (!result.length || result.at(-1).length + word.length > 24) result.push(word);
    else result[result.length - 1] += " " + word;
  }
  return result;
}
await fs.mkdir(path.join(root, "public/og"), { recursive: true });
const logoSvg = (await fs.readFile(path.join(root, "public/logo_white_and_black.svg"), "utf8")).replaceAll('fill="white"', 'fill="#9c78ff"');
const logo = await sharp(Buffer.from(logoSvg)).resize(250).png().toBuffer();
for (const card of cards) {
  const title = lines(card.title);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f8f5ff"/><rect x="806" width="394" height="630" fill="#9c78ff"/><text x="60" y="190" font-family="Arial, sans-serif" font-size="22" font-weight="600" fill="#8051cf">${escape(card.badge)}</text>${title.map((line,i)=>`<text x="60" y="${278+i*66}" font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="#201c2d">${escape(line)}</text>`).join("")}<text x="60" y="575" font-family="Arial, sans-serif" font-size="23" fill="#76658f">innoprog.ru · школа программирования</text></svg>`;
  const art = await sharp(path.join(root, "public", card.image)).resize(card.icon ? 300 : 340, card.icon ? 350 : 380, { fit: card.icon ? "contain" : "cover", background: "#9c78ff" }).png().toBuffer();
  await sharp(Buffer.from(svg)).composite([{input:logo,left:60,top:50},{input:art,left:card.icon?850:833,top:card.icon?145:126}]).png().toFile(path.join(root,"public/og",card.file));
}
console.log(`Generated ${cards.length} child-page social previews (1200x630).`);
