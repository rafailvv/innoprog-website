import type { ReactNode } from "react";
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

const diplomaFeatures = [
  "Диплом ИТ-школы ИННОПРОГ о прохождении курса",
  "Диплом о профессиональной переподготовке",
] as const;

function CourseTariffCheck() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 26 26">
      <path
        clipRule="evenodd"
        d="M13 26C5.8201 26 0 20.1799 0 13C0 5.8201 5.8201 0 13 0C20.1799 0 26 5.8201 26 13C26 20.1799 20.1799 26 13 26ZM11.4699 15.782L7.8754 12.1849L6.5 13.5603L10.5547 17.6176C10.7985 17.8613 11.1291 17.9982 11.4738 17.9982C11.8185 17.9982 12.1491 17.8613 12.3929 17.6176L20.1305 9.8826L18.7499 8.502L11.4699 15.782Z"
        fill="#9C78FF"
        fillRule="evenodd"
      />
    </svg>
  );
}

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
            {diplomaFeatures.map((feature) => (
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
