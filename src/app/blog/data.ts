import { pythonArticle } from "./articles/python";
import { dataScienceArticle } from "./articles/data-science";
import { productAnalyticsArticle } from "./articles/product-analytics";
import type { BlogArticle } from "./types";

export const BLOG_ARTICLES: readonly BlogArticle[] = [pythonArticle, dataScienceArticle, productAnalyticsArticle];
export const BLOG_TITLE = "Программирование и работа с данными";
export const BLOG_DESCRIPTION = "Практические статьи ИННОПРОГ о Python, Data Science и продуктовой аналитике: планы обучения, примеры кода, метрики и проекты.";

export function findArticle(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function readingMinutes(article: BlogArticle) {
  const text = [
    ...article.introduction,
    ...article.sections.flatMap((section) => section.blocks.map((block) => {
      if (block.type === "paragraph" || block.type === "note") return block.text;
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "table") return block.rows.flat().join(" ");
      return block.code;
    })),
    ...article.faq.map((entry) => entry.answer),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 180));
}

export function articleDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Moscow" }).format(new Date(`${date}T12:00:00+03:00`));
}
