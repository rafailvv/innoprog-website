import type { Metadata } from "next";
import { absoluteUrl, createPageMetadata, SITE_NAME, SITE_URL } from "../seo";
import type { BlogArticle } from "./types";

export function articleMetadata(article: BlogArticle): Metadata {
  const path = `/blog/${article.slug}`;
  const metadata = createPageMetadata({ title: article.seoTitle, description: article.description, path, absoluteTitle: true,
    ogImage: article.hero.src.replace(/\.webp$/, "-og.webp"), ogImageAlt: article.hero.alt, ogImageSize: { width: 1200, height: 630 } });
  return { ...metadata, authors: [{ name: `Редакция ${SITE_NAME}`, url: absoluteUrl("/about") }], openGraph: {
    ...metadata.openGraph, type: "article", publishedTime: article.publishedAt, authors: [absoluteUrl("/about")], section: article.category,
  } };
}

export function articleJsonLd(article: BlogArticle) {
  const url = absoluteUrl(`/blog/${article.slug}`);
  return {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${url}#article`, url,
    headline: article.title, description: article.description, inLanguage: "ru-RU", datePublished: article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    image: { "@type": "ImageObject", url: absoluteUrl(article.hero.src), width: article.hero.width, height: article.hero.height },
    author: { "@type": "Organization", name: `Редакция ${SITE_NAME}`, url: absoluteUrl("/about") },
    publisher: { "@id": `${SITE_URL}/#organization` }, articleSection: article.category,
    isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "Блог ИННОПРОГ", url: absoluteUrl("/blog") },
    citation: article.sources.map((source) => source.url), isAccessibleForFree: true,
  };
}
