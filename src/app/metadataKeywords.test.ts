import { describe, expect, it } from "vitest";
import * as courses from "./courseKeywords";
import { createPageMetadata, DEFAULT_KEYWORDS, HOME_PAGE_KEYWORDS } from "./seo";

describe("concise page metadata", () => {
  it.each(Object.entries(courses))("keeps %s focused and short", (_name, keywords) => {
    expect(keywords.length).toBeGreaterThanOrEqual(5);
    expect(keywords.length).toBeLessThanOrEqual(10);
    const metadata = createPageMetadata({ title: "Курс", keywords });
    const published = metadata.keywords as string[];
    expect(published.length).toBeLessThanOrEqual(12);
    expect(new Set(published.map((item) => item.toLocaleLowerCase("ru-RU"))).size).toBe(published.length);
    expect(published.join(",").length).toBeLessThan(400);
  });

  it("keeps home and fallback metadata concise", () => {
    expect(DEFAULT_KEYWORDS.length).toBeLessThanOrEqual(10);
    const keywords = createPageMetadata({ title: "Главная", keywords: HOME_PAGE_KEYWORDS }).keywords as string[];
    expect(keywords.length).toBeLessThanOrEqual(12);
    expect(keywords.join(",").length).toBeLessThan(400);
  });

  it("deduplicates branded keywords without changing canonical or indexing", () => {
    const metadata = createPageMetadata({ title: "Python", path: "/python-course", keywords: ["иннопрог", "INNOPROG", "Python", "python"] });
    expect(metadata.keywords).toEqual(["ИННОПРОГ", "INNOPROG", "Python"]);
    expect(metadata.alternates?.canonical).toBe("https://innoprog.ru/python-course");
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });
});
