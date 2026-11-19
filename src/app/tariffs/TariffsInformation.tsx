import type { ReactNode } from "react";
import { LEGAL_LINKS } from "../legalLinks";
import styles from "./tariffs-information.module.css";

const EMAIL = "education@innoprog.ru";
const FNS_DEDUCTION_GUIDE = "https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/nalog_vichet/soc_nv/soc_nv_ob/";

const paymentSteps = [
  { title: "Выбираете тариф", text: "После бесплатного занятия решаете, сколько вам нужно в месяц: 4, 8 или 12 занятий" },
  { title: "Оплачиваете онлайн", text: "Оплачиваете выбранный абонемент на месяц вперёд" },
  { title: "Получаете чек", text: "Электронный чек придёт на почту, которую вы укажете при оплате" },
  { title: "Начинаете учиться", text: "После оплаты откроем доступ к личному кабинету на платформе" },
];

const questions: { question: string; answer: ReactNode }[] = [
  {
    question: "Платить за весь курс нужно сразу?",
    answer: "Вы оплачиваете один месяц вперёд. Можно выбрать абонемент на 4, 8 или 12 занятий. Следующий месяц покупать необязательно",
  },
  {
    question: "Вернёте деньги, если я передумаю?",
    answer: <>
      Отказаться от договора можно в любое время. Направьте заявление на <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      {" "}Рассчитаем сумму возврата с учётом занятий, доступа к платформе и подтверждённых расходов по <a href={LEGAL_LINKS.offer}>оферте</a>.
      {" "}Вернём остаток не позднее 10 календарных дней с момента получения заявления
    </>,
  },
  {
    question: "Можно перенести или отменить занятие?",
    answer: "Предупредите нас не позднее чем за 3 часа до начала, и занятие останется в абонементе",
  },
  {
    question: "А если занятие сорвётся по вине школы?",
    answer: "Если преподаватель заболеет или случится технический сбой на стороне школы, продлим срок абонемента или перенесём занятие",
  },
  {
    question: "Не подошёл преподаватель. Как быть?",
    answer: "Напишите нам и объясните причину. Если причина обоснованная, подберём замену и проведём бесплатное ознакомительное занятие с новым преподавателем",
  },
  {
    question: "Получится взять паузу в учёбе?",
    answer: "Абонемент можно заморозить один раз за срок его действия, не больше чем на половину этого срока",
  },
  {
    question: "Где проверить сведения о школе перед оплатой?",
    answer: <>
      ООО «ИННОПРОГ» работает с декабря 2022 года. Школа зарегистрирована в Иннополисе на ул. Университетской, д. 5.
      {" "}У школы есть <a href={LEGAL_LINKS.license}>бессрочная образовательная лицензия</a>, а платформу INNOPROG внесли в реестр российского ПО.
      {" "}Реквизиты и документы собраны в разделе <a href={LEGAL_LINKS.educationDisclosure}>«Сведения об образовательной организации»</a>
    </>,
  },
  {
    question: "Обучение может оплатить компания?",
    answer: "Да. Для организаций предусмотрена оплата по счёту безналичным переводом",
  },
];

export function TariffsInformation({ isMobile }: { isMobile: boolean }) {
  const layout = isMobile ? "mobile" : "desktop";

  return (
    <div className={`${styles.information} ${isMobile ? styles.mobile : ""}`}>
      <section className={styles.payment} aria-labelledby="tariff-payment">
        <h2 className={styles.heading} id="tariff-payment"><span>Оплата</span> и доступ</h2>
        <ol className={styles.steps}>
          {paymentSteps.map(({ title, text }, index) => (
            <li className={styles.step} key={title}>
              <span className={styles.stepNumber} aria-hidden="true">({index + 1})</span>
              <div className={styles.stepBody}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.paymentMethods}>Физлица платят онлайн. Юрлица оплачивают по счёту безналичным переводом</p>
      </section>

      <section className={styles.tax} aria-labelledby="tariff-tax">
        <div className={styles.taxInstructions}>
          <h2 className={styles.boxHeading} id="tariff-tax">Налоговый вычет за обучение</h2>
          <ol>
            <li>Отправьте заявление и чеки об оплате на <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Школа подготовит справку об оплате образовательных услуг</li>
            <li>Подайте документы через личный кабинет на сайте ФНС или оформите вычет через работодателя</li>
            <li>Если ФНС подтвердит вычет, получите возврат налога или вычет через работодателя. <a href={FNS_DEDUCTION_GUIDE}>Порядок оформления на сайте ФНС</a></li>
          </ol>
        </div>
        <div className={styles.taxExample}>
          <h3>Пример расчёта</h3>
          <p>12 месяцев × 7 990 ₽ = 95 880 ₽</p>
          <p className={styles.taxTotal}>Около 12 464 руб. при ставке 13%</p>
          <p className={styles.taxNote}>Пример для тарифа «Базовый», если всю сумму оплачивают за один календарный год и она входит в доступный лимит вычета. Возврат зависит от суммы уплаченного НДФЛ</p>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="tariff-faq">
        <h2 className={styles.heading} id="tariff-faq">Вопросы <span>об оплате и занятиях</span></h2>
        <div className="site-course-faq-list">
          {questions.map(({ question, answer }) => (
            <details className={`site-course-faq-item ${styles.faqItem}`} key={question}>
              <summary className={`site-course-faq-trigger site-course-faq-trigger--${layout} ${styles.faqTrigger}`}>
                <span className={`site-course-faq-question site-course-faq-question--${layout}`}>{question}</span>
                <span aria-hidden="true" className={`site-course-faq-arrow ${styles.faqArrow}`}>
                  <svg className="block size-full" fill="none" viewBox="0 0 29.4591 29.4564">
                    <path d="M0 14.7318H28M13.125 28.7281L28 14.7318L13.125 0.728109" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </summary>
              <div className={`site-course-faq-answer site-course-faq-answer--${layout} ${styles.faqAnswer}`}>
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
