import { MynauiTelegram, TablerPhoneCall } from "../../imports/shared/ContactIcons";
import styles from "./HomeCommercialBlocks.module.css";

export function HomeCoursesLink({ compact = false }: { compact?: boolean }) {
  return <a className={`${styles.coursesLink}${compact ? ` ${styles.mobileCoursesLink}` : ""}`} href="#courses">выбрать курс</a>;
}

const priceTerms = [
  "Без кредитов и рассрочек",
  "Можно вернуть до 13% налоговым вычетом",
  "Отказаться можно в любой момент",
];

export function HomePricePanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${styles.price}${compact ? ` ${styles.mobilePrice}` : ""}`} aria-label="Стоимость обучения">
      <div className={styles.priceDetails}>
        <h3>7 990 ₽ в месяц</h3>
        <p>Тариф «Базовый»: 4 индивидуальных занятия в месяц и 10 проектов в портфолио</p>
        <a className={styles.tariffsLink} data-main-nav="tariffs" href="/tariffs">сравнить тарифы</a>
      </div>
      <ul className={styles.terms}>
        {priceTerms.map((term) => (
          <li key={term}><span aria-hidden="true">✓</span>{term}</li>
        ))}
      </ul>
    </section>
  );
}

const applicationSteps = [
  "Свяжемся с вами в удобное для вас время и ответим на вопросы об обучении",
  "Договоримся, в какой день и во сколько провести бесплатное занятие",
  "Проведём занятие до 45 минут. После него вы решите, учиться ли дальше",
  "После оплаты абонемента откроем доступ к личному кабинету на платформе",
];

export function HomeApplicationDetails() {
  return (
    <section className={styles.application} aria-labelledby="home-application-next">
      <div className={styles.applicationTitle}>
        <h3 id="home-application-next">От заявки до учёбы</h3>
        <p>До занятия ничего не платите и ни к чему не обязаны</p>
      </div>
      <ol className={styles.applicationSteps}>
        {applicationSteps.map((step, index) => (
          <li key={step}>
            <span aria-hidden="true">({index + 1})</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
      <div className={styles.direct}>
        <p>Напишите или позвоните сами</p>
        <a href="https://t.me/innoprog_admin">
          <div className={styles.contactIcon} aria-hidden="true"><MynauiTelegram /></div>
          <span><strong>написать в Telegram</strong><small>@innoprog_admin</small></span>
        </a>
        <a href="tel:+79586067980">
          <div className={styles.contactIcon} aria-hidden="true"><TablerPhoneCall /></div>
          <span><strong>+7 (958) 606-79-80</strong><small>будни с 09:00 до 21:00 по Москве</small></span>
        </a>
      </div>
    </section>
  );
}
