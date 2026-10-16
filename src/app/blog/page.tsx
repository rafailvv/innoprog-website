import Link from "next/link";
import { JsonLd, absoluteUrl, breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "../seo";
import { BLOG_ARTICLES, BLOG_DESCRIPTION, BLOG_TITLE } from "./data";
import { BlogShell } from "./BlogShell";
import { ArticleCard } from "./ArticleCard";
import styles from "./blog.module.css";

export const metadata = createPageMetadata({ title: "Блог о Python, Data Science и аналитике", description: BLOG_DESCRIPTION, path: "/blog",
  ogImage: "/blog/images/python-developer-og.webp", ogImageAlt: "Практика Python-разработки в блоге ИННОПРОГ" });

export default function BlogPage() {
  return <BlogShell>
    <JsonLd data={webPageJsonLd({ path: "/blog", name: BLOG_TITLE, description: BLOG_DESCRIPTION, pageType: "CollectionPage", primaryEntityId: `${absoluteUrl("/blog")}#blog`, significantLinks: BLOG_ARTICLES.map((article) => `/blog/${article.slug}`) })} />
    <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Блог", path: "/blog" }])} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", "@id": `${absoluteUrl("/blog")}#blog`, name: "Блог ИННОПРОГ", url: absoluteUrl("/blog"), inLanguage: "ru-RU",
      blogPost: BLOG_ARTICLES.map((article) => ({ "@type": "BlogPosting", "@id": `${absoluteUrl(`/blog/${article.slug}`)}#article`, headline: article.title, url: absoluteUrl(`/blog/${article.slug}`) })) }} />
    <header className={styles.indexIntro}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true">/</span><span aria-current="page">Блог</span></nav>
      <span className={styles.eyebrow}>Блог ИННОПРОГ</span>
      <h1>{BLOG_TITLE}</h1>
      <p>Как учиться, собирать проекты и проверять результат. Разбираем задачи с кодом, данными и понятными примерами.</p>
      <div className={styles.topics} aria-label="Темы материалов">{BLOG_ARTICLES.map((article) => <a key={article.slug} href={`#card-${article.slug}`}>{article.category}<span aria-hidden="true">↘</span></a>)}</div>
    </header>
    <section className={styles.articlesSection} aria-labelledby="blog-articles-title">
      <div className={styles.sectionHeading}><h2 id="blog-articles-title">Начните с этих материалов</h2><span>3 статьи</span></div>
      <div className={styles.cards}>{BLOG_ARTICLES.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
    </section>
    <aside className={styles.indexCta}><div><span className={styles.eyebrow}>От чтения — к практике</span><h2>Выберите направление обучения</h2><p>Расскажите об опыте и целях — поможем выбрать направление и программу обучения.</p></div><Link className={styles.primaryLink} href="/application">Подобрать курс <span aria-hidden="true">↗</span></Link></aside>
  </BlogShell>;
}
