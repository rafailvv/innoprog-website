import type { ReactNode } from "react";
import { COURSE_TARIFF_DIPLOMA_FEATURES, CourseTariffCheck } from "./CourseTariffDiplomaFeatures";
import { standardCoursePricing } from "./standardCoursePricing";
import styles from "./CourseTariffCards.module.css";

const plans = [
  { name: "Базовый", pricing: standardCoursePricing.basic, lessons: "4 индивидуальных занятия", featured: false, internship: false, careerSupport: false },
  { name: "Расширенный", pricing: standardCoursePricing.extended, lessons: "8 индивидуальных занятий", featured: true, internship: true, careerSupport: false },
  { name: "Персональный", pricing: standardCoursePricing.personal, lessons: "12 индивидуальных занятий", featured: false, internship: true, careerSupport: true },
] as const;

const standardFeatures = [
  "Доступ к учебной платформе ИННОПРОГ",
  "Проектная практика по программе",
  "Домашние задания и проверка кода преподавателем",
  "Ежедневная поддержка куратора в чате",
  "Записи ваших индивидуальных занятий с преподавателем навсегда",
];

function TariffFeature({ included = true, fullLineHeight = false, children }: {
  included?: boolean;
  fullLineHeight?: boolean;
  children: ReactNode;
}) {
  return (
    <li className={included ? styles.feature : `${styles.feature} ${styles.excluded}`}>
      <span className={styles.icon} aria-hidden="true">
        {included ? <CourseTariffCheck /> : <span>−</span>}
      </span>
      <span className={fullLineHeight ? styles.fullLineHeight : styles.trim}>
        {!included && <span className="sr-only">Не входит в тариф. </span>}
        {children}
      </span>
    </li>
  );
}

export function CourseTariffCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? `${styles.cards} ${styles.compact}` : styles.cards} data-course-tariff-cards>
      {plans.map((plan) => (
        <article className={plan.featured ? `${styles.card} ${styles.featured}` : styles.card} key={plan.name} data-tariff-card>
          <h2 className={`${styles.heading} ${styles.trim}`}>{plan.name}</h2>
          <div className={styles.prices}>
            <div className={styles.original}>
              <p className={styles.trim}>{plan.pricing.originalPriceLabel}</p>
              <span className={styles.discount}>
                <span className={styles.trim}>-{plan.pricing.discount}%</span>
              </span>
            </div>
            <p className={`${styles.monthly} ${styles.trim}`} data-tariff-monthly>{plan.pricing.priceLabel}</p>
          </div>
          <ul className={styles.features}>
            <TariffFeature>
              <strong>{plan.lessons}{compact && <br />} в месяц</strong>
            </TariffFeature>
            {standardFeatures.map((feature) => (
              <TariffFeature key={feature}>{feature}</TariffFeature>
            ))}
            {COURSE_TARIFF_DIPLOMA_FEATURES.map((feature) => (
              <TariffFeature key={feature} fullLineHeight>{feature}</TariffFeature>
            ))}
            <TariffFeature included={plan.internship}>Стажировка после обучения</TariffFeature>
            <TariffFeature included={plan.careerSupport}>2 тестовых технических собеседования</TariffFeature>
            <TariffFeature included={plan.careerSupport}>Подготовка резюме<br /> с HR-специалистом</TariffFeature>
          </ul>
          <button type="button" className={styles.cta} data-application-open aria-haspopup="dialog">
            <span className={styles.trim}>{compact ? "начать обучение" : "записаться"}</span>
          </button>
        </article>
      ))}
    </div>
  );
}
