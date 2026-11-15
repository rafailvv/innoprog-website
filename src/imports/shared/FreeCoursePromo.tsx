import { Gift } from "lucide-react";
import { ANALYTICS_START_COURSE, DATA_SCIENCE_START_BONUS_TITLE, DATA_SCIENCE_START_COURSE, PYTHON_START_COURSE } from "../../app/freeCourse";
import styles from "./FreeCoursePromo.module.css";

const pearlArtwork = { src: "/free-courses-banner-pearl.webp", width: 780, height: 822 };

const promos = {
  "python-start": {
    course: PYTHON_START_COURSE,
    description: "Напишите и запустите свою первую программу на Python. Затем научитесь принимать данные, работать с числами и строками и решать задачи с условиями и циклами",
    bonusTitle: "Нейросети для Python-разработчиков",
    bonusDescription: "Готовые запросы к ИИ для поиска ошибок и проверки кода",
    artwork: pearlArtwork,
  },
  "analytics-start": {
    course: ANALYTICS_START_COURSE,
    description: "Откройте выгрузку заказов, проверьте данные и сравните каналы по числу оплат и выручке. Постройте первый график в редакторе курса.",
    bonusTitle: "Нейросети для аналитиков данных",
    bonusDescription: "Примеры запросов к ИИ для проверки выгрузок, расчётов и выводов",
    artwork: pearlArtwork,
  },
  "data-science-start": {
    course: DATA_SCIENCE_START_COURSE,
    description: "Начните с простых расчётов на Python. Затем обучите две модели предсказывать время доставки по истории заказов и сравните их точность.",
    bonusTitle: DATA_SCIENCE_START_BONUS_TITLE,
    bonusDescription: "Практический гайд по применению нейросетей в работе ML-инженера",
    artwork: DATA_SCIENCE_START_COURSE.artwork,
  },
};

export function FreeCoursePromo({ slug }: { slug: keyof typeof promos }) {
  const { course, description, bonusTitle, bonusDescription, artwork } = promos[slug];
  const titleId = `${slug}-promo-title`;

  return (
    <section aria-labelledby={titleId} className={styles.promo}>
      <div className={styles.copy}>
        <p className={styles.label}>Бесплатный курс для новичков</p>
        <h2 id={titleId}>{course.title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.bonus}>
        <img {...artwork} className={styles.bonusArtwork} alt="" decoding="async" loading="lazy" />
        <div className={styles.guide}>
          <p className={styles.bonusLabel}><Gift aria-hidden="true" /> Бонус к курсу</p>
          <h3>{bonusTitle}</h3>
          <p className={styles.guideDescription}>{bonusDescription}</p>
        </div>
      </div>
      <div className={styles.cta}>
        <a className={styles.action} href={course.href}>
          {course.action}
        </a>
      </div>
    </section>
  );
}
