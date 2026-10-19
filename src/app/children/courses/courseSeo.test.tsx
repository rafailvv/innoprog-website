import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Page, { generateMetadata } from "./[slug]/page";
import { childrenCourses, childrenCoursePath } from "./course-data";
import { getChildrenCourseFaq } from "./course-faq";

describe("children course search content", () => {
  it.each(childrenCourses)("renders factual unique FAQ and synchronized JSON-LD for $slug", async course => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(await Page({ params: Promise.resolve({ slug: course.slug }) })), "text/html");
    const data = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(node => JSON.parse(node.textContent!));
    const faq = data.find(node => node["@type"] === "FAQPage");
    const details = Array.from(document.querySelectorAll("details"));
    const items = getChildrenCourseFaq(course);
    expect(details).toHaveLength(4);
    expect(faq.mainEntity).toHaveLength(4);
    details.forEach((detail, index) => {
      expect(detail.hasAttribute("open")).toBe(false);
      expect(detail.querySelector("p")!.textContent).toBe(faq.mainEntity[index].acceptedAnswer.text);
      expect(faq.mainEntity[index].name).toBe(items[index].question);
    });
    expect(document.querySelector('details a[href="/blog/kak-vybrat-programmirovanie-rebenku"]')).not.toBeNull();
    const link = items[0].link!;
    expect(document.querySelector(`details a[href="${link.href}"]`)!.textContent).toBe(link.label);
    expect(childrenCourses.some(other => childrenCoursePath(other.slug) === link.href)).toBe(true);
    expect(link.href).not.toBe(childrenCoursePath(course.slug));
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    expect(document.querySelector("h1")!.textContent).toBe(course.title);
    expect(document.querySelector('a[href="#application"]')).not.toBeNull();
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: course.slug }) });
    expect(metadata.alternates?.canonical).toContain(childrenCoursePath(course.slug));
    expect(metadata.title).toBe(course.seoTitle);
  });
  it("keeps unique programme-specific preparation and format answers", () => {
    for (const index of [0, 1, 3]) {
      expect(new Set(childrenCourses.map(course => getChildrenCourseFaq(course)[index].answer[0])).size).toBe(6);
    }
    expect(getChildrenCourseFaq(childrenCourses.find(c => c.slug === "informatics-exams")!)[1].answer[0]).toContain("экзамен");
    expect(getChildrenCourseFaq(childrenCourses.find(c => c.slug === "game-development")!)[1].answer[0]).toContain("Unreal Engine");
    expect(getChildrenCourseFaq(childrenCourses.find(c => c.slug === "neural-networks")!)[1].answer[0]).toContain("ограничения модели");
  });
});
