import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BLOG_ARTICLES, articleCountLabel, readingMinutes } from "./data";
import { articleFaqJsonLd, articleJsonLd, articleMetadata } from "./metadata";
import { ArticleBody } from "./ArticleBody";
import sitemap from "../sitemap";

describe("published blog contracts", () => {
  it("exposes six distinct articles and 47 canonical sitemap URLs", () => {
    expect(BLOG_ARTICLES).toHaveLength(6);
    for (const field of ["slug", "seoTitle", "description"] as const) {
      expect(new Set(BLOG_ARTICLES.map(article => article[field])).size).toBe(6);
    }
    const routes = sitemap();
    expect(routes).toHaveLength(47);
    expect(new Set(routes.map(route => route.url)).size).toBe(47);
    for (const article of BLOG_ARTICLES) {
      expect(routes.find(route => route.url.endsWith(`/blog/${article.slug}`))?.lastModified).toEqual(new Date(`${article.updatedAt ?? article.publishedAt}T00:00:00.000Z`));
    }
  });
  it.each(BLOG_ARTICLES)("keeps dates, FAQ and OG consistent for $slug", article => {
    const schema = articleJsonLd(article);
    expect(schema.datePublished).toBe(article.publishedAt);
    expect(schema.dateModified).toBe(article.updatedAt ?? article.publishedAt);
    const metadata = articleMetadata(article);
    expect(metadata.openGraph).toMatchObject({publishedTime: article.publishedAt, modifiedTime: schema.dateModified});
    const faq = articleFaqJsonLd(article);
    expect(faq.mainEntity.map(item => [item.name, item.acceptedAnswer.text])).toEqual(article.faq.map(item => [item.question, item.answer]));
    expect(readingMinutes(article)).toBeGreaterThan(1);
    expect(new Set(article.sections.map(section => section.id)).size).toBe(article.sections.length);
    if (article.publishedAt === "2026-10-19") {
      expect(article.sections.length).toBeGreaterThanOrEqual(5);
      expect(article.sections.length).toBeLessThanOrEqual(7);
      expect(article.sections.some(section => section.blocks.some(block => block.type === "table"))).toBe(true);
      expect(article.faq.length).toBeGreaterThanOrEqual(3);
      expect(article.faq.length).toBeLessThanOrEqual(4);
      expect(article.ogImage).toBeTruthy();
    } else {
      expect(article.publishedAt).toBe("2026-10-16");
      expect(article.updatedAt).toBe("2026-10-19");
    }
  });
  it("renders contextual links as crawlable anchors", () => {
    const html = renderToStaticMarkup(<ArticleBody block={{type:"links",items:[{text:"Сравнить направления",href:"/blog/python-ili-frontend"}]}} />);
    expect(html).toContain('href="/blog/python-ili-frontend"');
    expect(html).toContain("Сравнить направления");
  });
  it.each([[1,"1 статья"],[3,"3 статьи"],[6,"6 статей"],[11,"11 статей"],[21,"21 статья"]])("declines article count %s", (count, label) => {
    expect(articleCountLabel(Number(count))).toBe(label);
  });
});
