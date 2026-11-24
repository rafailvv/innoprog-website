import styles from "./BlogTrialBanner.module.css";

export function BlogTrialBanner({
  variant = "article",
  headingId = "blog-trial-banner",
  className,
}: {
  variant?: "article" | "index";
  headingId?: string;
  className?: string;
}) {
  const containerClassName = [
    styles.banner,
    variant === "index" ? styles.indexVariant : styles.articleVariant,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={containerClassName} aria-labelledby={headingId}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Бесплатное занятие · до 45 минут</span>
        <h2 className={styles.title} id={headingId}>Начните с бесплатного занятия</h2>
        <p className={styles.description}>
          Обсудите цель с преподавателем, разберёте простую задачу и напишете первую программу
        </p>
      </div>
      <a className={styles.cta} href="/application?type=trial">
        <span>записаться на занятие</span>
        <span className={styles.arrow} aria-hidden="true">
          <svg viewBox="0 0 29.4591 29.4564" fill="none" focusable="false">
            <path
              d="M0 14.7318H28M13.125 28.7281L28 14.7318L13.125 0.728109"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
      </a>
    </aside>
  );
}
