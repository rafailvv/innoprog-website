import Link from "next/link";
import type { BlogArticle } from "./types";
import { articleDate, readingMinutes } from "./data";
import styles from "./blog.module.css";

export function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <article id={`card-${article.slug}`} className={styles.card} aria-labelledby={`card-title-${article.slug}`}>
      <Link className={styles.cardImageLink} href={`/blog/${article.slug}`} tabIndex={-1} aria-hidden="true">
        <img src={article.hero.src} alt="" width={article.hero.width} height={article.hero.height} loading="lazy" decoding="async" />
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}><span className={styles.tag}>{article.category}</span><span>~{readingMinutes(article)} мин</span></div>
        <h3 id={`card-title-${article.slug}`}><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <div className={styles.cardBottom}><time dateTime={article.publishedAt}>{articleDate(article.publishedAt)}</time><Link className={styles.cardArrow} href={`/blog/${article.slug}`} aria-label={`Читать статью: ${article.title}`}><span aria-hidden="true">↗</span></Link></div>
      </div>
    </article>
  );
}
