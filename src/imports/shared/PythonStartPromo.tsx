import { Gift } from "lucide-react";
import { ANALYTICS_START_COURSE, PYTHON_START_COURSE } from "../../app/freeCourse";
import styles from "./PythonStartPromo.module.css";

export function PythonStartPromo({ analytics = false }: { analytics?: boolean } = {}) {
  const { title, href, action } = analytics ? ANALYTICS_START_COURSE : PYTHON_START_COURSE;
  const titleId = analytics ? "analytics-start-promo-title" : "python-start-promo-title";

  return (
    <section aria-labelledby={titleId} className={styles.promo}>
      <div className={styles.copy}>
        <p className={styles.label}>Бесплатный курс для новичков</p>
        <h2 id={titleId}>{title}</h2>
        <p className={styles.description}>
          {analytics
            ? "Откройте выгрузку заказов, проверьте данные и сравните каналы по числу оплат и выручке. Постройте первый график в редакторе курса."
            : "Напишите и запустите свою первую программу на Python. Затем научитесь принимать данные, работать с числами и строками и решать задачи с условиями и циклами"}
        </p>
      </div>
      <div className={styles.bonus}>
        <img className={styles.bonusArtwork} alt="" decoding="async" loading="lazy" src="/free-courses-banner-pearl.webp" />
        <div className={styles.guide}>
          <p className={styles.bonusLabel}><Gift aria-hidden="true" /> Бонус к курсу</p>
          <h3>{analytics ? "Нейросети для аналитиков данных" : "Нейросети для Python-разработчиков"}</h3>
          <p className={styles.guideDescription}>{analytics
            ? "Примеры запросов к ИИ для проверки выгрузок, расчётов и выводов"
            : "Готовые запросы к ИИ для поиска ошибок и проверки кода"}</p>
        </div>
      </div>
      <div className={styles.cta}>
        <a className={styles.action} href={href}>
          {action}
        </a>
      </div>
    </section>
  );
}
