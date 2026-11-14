import { Gift } from "lucide-react";
import { PYTHON_START_COURSE } from "../../app/freeCourse";
import styles from "./PythonStartPromo.module.css";

export function PythonStartPromo() {
  const { title, href, action } = PYTHON_START_COURSE;

  return (
    <section aria-labelledby="python-start-promo-title" className={styles.promo}>
      <div className={styles.copy}>
        <p className={styles.label}>Бесплатный курс для новичков</p>
        <h2 id="python-start-promo-title">{title}</h2>
        <p className={styles.description}>
          Напишите и запустите свою первую программу на Python. Затем научитесь принимать
          данные, работать с числами и строками и решать задачи с условиями и циклами
        </p>
      </div>
      <div className={styles.bonus}>
        <img className={styles.bonusArtwork} alt="" decoding="async" loading="lazy" src="/free-courses-banner-pearl.webp" />
        <div className={styles.guide}>
          <p className={styles.bonusLabel}><Gift aria-hidden="true" /> Бонус к курсу</p>
          <h3>Нейросети для Python-разработчиков</h3>
          <p className={styles.guideDescription}>Готовые запросы к ИИ для поиска ошибок и проверки кода</p>
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
