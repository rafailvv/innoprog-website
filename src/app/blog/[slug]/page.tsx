import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd, absoluteUrl, breadcrumbJsonLd, webPageJsonLd } from "../../seo";
import { BLOG_ARTICLES, articleDate, findArticle, readingMinutes } from "../data";
import { articleFaqJsonLd, articleJsonLd, articleMetadata } from "../metadata";
import { BlogShell } from "../BlogShell";
import { ArticleBody } from "../ArticleBody";
import { ArticleCard } from "../ArticleCard";
import styles from "../blog.module.css";

// Unknown slugs must reach notFound(); Next 15's static-only fallback logs NoFallbackError.
export const dynamicParams = true;
export function generateStaticParams() { return BLOG_ARTICLES.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  return articleMetadata(article);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const path = `/blog/${article.slug}`;
  const related = BLOG_ARTICLES.filter((entry) => entry.slug !== article.slug);
  return <BlogShell>
    <JsonLd data={articleJsonLd(article)} />
    <JsonLd data={articleFaqJsonLd(article)} />
    <JsonLd data={webPageJsonLd({ path, name: article.title, description: article.description, primaryEntityId: `${absoluteUrl(path)}#article`, significantLinks: ["/blog", article.course.href, ...related.map((entry) => `/blog/${entry.slug}`)] })} />
    <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Блог", path: "/blog" }, { name: article.title, path }])} />
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true">/</span><Link href="/blog">Блог</Link><span aria-hidden="true">/</span><span aria-current="page">{article.category}</span></nav>
    <article aria-labelledby="article-title">
      <header className={styles.articleHeader}>
        <span className={styles.tag}>{article.category}</span>
        <h1 id="article-title">{article.title}</h1>
        <p className={styles.articleExcerpt}>{article.excerpt}</p>
        <div className={styles.byline}><span>Редакция ИННОПРОГ</span><span aria-hidden="true">·</span><time dateTime={article.publishedAt}>{articleDate(article.publishedAt)}</time><span aria-hidden="true">·</span><span>~{readingMinutes(article)} мин чтения</span></div>
      </header>
      <figure className={styles.articleHero}><img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} fetchPriority="high" decoding="async" /></figure>
      <div className={styles.articleLayout}>
        <aside className={styles.toc} aria-labelledby="article-toc-title"><div className={styles.tocInner}><h2 id="article-toc-title">В этой статье</h2><ol>{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></div></aside>
        <div className={styles.prose}>
          <div className={styles.lead}>{article.introduction.map((text) => <p key={text}>{text}</p>)}</div>
          {article.sections.map((section) => <section className={styles.articleSection} id={section.id} key={section.id}><h2>{section.title}</h2>{section.blocks.map((block, index) => <ArticleBody block={block} key={index} />)}</section>)}
          <section className={styles.faq} aria-labelledby="article-faq"><h2 id="article-faq">Частые вопросы</h2>{article.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
          <section className={styles.sources} aria-labelledby="article-sources"><h2 id="article-sources">Источники и документация</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.title}<span aria-hidden="true"> ↗</span></a></li>)}</ul></section>
          <aside className={styles.courseCta} id="article-course"><p>{article.course.description}</p><Link className={styles.primaryLink} href={article.course.href}>{article.course.label}<span aria-hidden="true">↗</span></Link></aside>
        </div>
      </div>
    </article>
    <section className={styles.related} aria-labelledby="article-related"><div className={styles.sectionHeading}><h2 id="article-related">Читайте также</h2><Link href="/blog">Все статьи ↗</Link></div><div className={styles.relatedCards}>{related.map((entry) => <ArticleCard key={entry.slug} article={entry} />)}</div></section>
  </BlogShell>;
}
