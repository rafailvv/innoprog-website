import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { faqPageJsonLd } from "../../app/seo";
import { courseFaqItems } from "../courseFaqData";
import { CourseFaqAnswer } from "./CourseFaqAnswer";

const coursePaths = [
  "/python-course", "/data-science-course", "/frontend-developer-course",
  "/data-analyst-course", "/cpp-developer-course", "/mobile-developer-course",
  "/unreal-engine-course", "/java-developer-course", "/ml-engineer-course",
];

describe("published course FAQ conditions", () => {
  it("renders tariff restrictions and a crawlable comparison link on the server", () => {
    const item = courseFaqItems.find(({ question }) => question.startsWith("Помогаете ли"))!;
    const html = renderToStaticMarkup(<CourseFaqAnswer item={item} isOpen />);
    const container = document.createElement("div");
    container.innerHTML = html;
    const paragraphs = [...container.querySelectorAll("p")].map((p) => p.textContent!);

    expect(paragraphs.find((p) => p.includes("стажировки"))).toContain("«Расширенный» и «Персональный»");
    expect(paragraphs.find((p) => p.includes("HR-специалистом"))).toContain("В тарифе «Персональный»");
    expect(paragraphs.find((p) => p.includes("два тестовых"))).toContain("В тарифе «Персональный»");
    expect(container.querySelector('a[href="/tariffs"]')?.getAttribute("href")).toBe("/tariffs");
    expect(container.textContent).not.toContain("поиску работу");
    expect(container.textContent).not.toContain("бесплатно подключаем HR");
  });

  it("keeps comparison links out of keyboard navigation while an answer is collapsed", () => {
    const item = courseFaqItems.find(({ tariffsLink }) => tariffsLink)!;
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<CourseFaqAnswer item={item} isOpen={false} />);
    expect(container.querySelector("a")?.tabIndex).toBe(-1);
    container.innerHTML = renderToStaticMarkup(<CourseFaqAnswer item={item} isOpen />);
    expect(container.querySelector("a")?.tabIndex).toBe(0);
  });

  it("keeps public-offer links crawlable and out of collapsed keyboard navigation", () => {
    const item = courseFaqItems.find(({ question }) => question === "Как проходит обучение в INNOPROG?")!;
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<CourseFaqAnswer item={item} isOpen={false} />);
    const offerLink = container.querySelector('a[href="/oferta"]');
    expect(offerLink).not.toBeNull();
    expect((offerLink as HTMLAnchorElement).tabIndex).toBe(-1);
    container.innerHTML = renderToStaticMarkup(<CourseFaqAnswer item={item} isOpen />);
    expect((container.querySelector('a[href="/oferta"]') as HTMLAnchorElement).tabIndex).toBe(0);
  });

  it.each(coursePaths)("keeps the rendered answers and FAQ JSON-LD consistent for %s", (path) => {
    const schema = faqPageJsonLd(courseFaqItems, path);
    expect(schema.url).toBe(`https://innoprog.ru${path}`);
    schema.mainEntity.forEach((question, index) => {
      const container = document.createElement("div");
      container.innerHTML = renderToStaticMarkup(<CourseFaqAnswer item={courseFaqItems[index]} isOpen />);
      const answerText = [...container.querySelectorAll("p")]
        .filter((p) => !p.querySelector("a"))
        .map((p) => p.textContent)
        .join("\n\n");
      expect(question.name).toBe(courseFaqItems[index].question);
      expect(question.acceptedAnswer.text.startsWith(answerText)).toBe(true);
    });
  });

  it("explains session count without inventing a fixed total or adding links to unrelated answers", () => {
    const duration = courseFaqItems.find(({ question }) => question.startsWith("Сколько времени"))!;
    const html = renderToStaticMarkup(<CourseFaqAnswer item={duration} isOpen />);
    expect(html).toContain("Количество индивидуальных занятий зависит от тарифа и срока обучения");
    expect(html).toContain('href="/tariffs"');
    const first = renderToStaticMarkup(<CourseFaqAnswer item={courseFaqItems[0]} isOpen />);
    expect(first).not.toContain("<a");
  });
});
