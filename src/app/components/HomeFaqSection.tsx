import { useEffect, useRef } from "react";
import { standardCoursePricing } from "../../imports/shared/standardCoursePricing";
import { FREE_COURSES_LINK } from "../courseNavigation";
import { LEGAL_LINKS } from "../legalLinks";
import styles from "./HomeFaqSection.module.css";

const basicPrice = new Intl.NumberFormat("ru-RU").format(standardCoursePricing.basic.price);

const questions = [
  {
    question: "Можно ли научиться программировать с нуля?",
    answer: <>Да. Начните с базовых понятий и простых задач, затем переходите к учебным проектам. Если пока выбираете между разработкой и аналитикой, попробуйте <a href={FREE_COURSES_LINK.href}>бесплатные курсы для начинающих</a> или обсудите свою цель с преподавателем на бесплатном пробном занятии.</>,
  },
  {
    question: "Как проходят онлайн-занятия с преподавателем?",
    answer: "Занятия проходят один на один с преподавателем по видеосвязи и длятся от 45 до 60 минут. Между встречами вы самостоятельно изучаете материалы на платформе, выполняете домашние задания от преподавателя и решаете задачи на платформе, чтобы закрепить материал. На занятии преподаватель разбирает ваши решения, отвечает на вопросы и объясняет сложные темы простым языком. Вне занятий любые вопросы по обучению можно задать напрямую преподавателю в личном чате.",
  },
  {
    question: "Можно ли попробовать обучение бесплатно?",
    answer: <>Да. На бесплатном индивидуальном занятии до 45 минут вы обсудите цель с преподавателем, разберёте простую задачу и попробуете написать первую программу. Если хотите начать самостоятельно, в <a href={FREE_COURSES_LINK.href}>каталоге бесплатных курсов</a> есть Python, SQL, аналитика данных и Data Science.</>,
  },
  {
    question: "Сколько длится обучение и можно ли совмещать его с работой?",
    answer: <>Большинство программ для взрослых рассчитаны примерно на 10–12 месяцев. Время на самостоятельную практику зависит от направления и вашего опыта. График индивидуальных занятий можно обсудить на пробной встрече. Срок и программу смотрите в <a href="#courses">каталоге курсов</a>.</>,
  },
  {
    question: "Сколько стоят курсы программирования и как их оплатить?",
    answer: <>Стоимость курсов программирования начинается от {basicPrice} рублей в месяц. В стоимость входят индивидуальные занятия, поддержка преподавателя в личном чате и доступ к учебной платформе. Между занятиями вы смотрите видеоуроки, читаете конспекты и выполняете практические задания, чтобы закрепить материал. Обучение оплачивается помесячно. Можно выбрать абонемент на 4, 8 или 12 индивидуальных занятий. Следующий месяц оплачиваете, если решите продолжить. <a href="/tariffs">Сравнить тарифы и условия оплаты</a>.</>,
  },
  {
    question: "Будут ли на курсе проекты для портфолио?",
    answer: <>Да, проекты входят в программы для взрослых. Например, на <a href="/python-course">курсе Python</a> вы будете создавать веб-приложения и ботов, а на <a href="/frontend-developer-course">курсе фронтенда</a> — веб-интерфейсы. Примеры работ и темы проектов есть на страницах курсов.</>,
  },
  {
    question: "Помогает ли школа со стажировкой и подготовкой к собеседованиям?",
    answer: <>На тарифах «Расширенный» и «Персональный» можно претендовать на стажировку после выполнения условий программы. Решение принимает компания-партнёр. В «Персональный» также входят подготовка резюме с HR-специалистом и два пробных технических собеседования. <a href="/tariffs">Посмотреть, что входит в тарифы</a>.</>,
  },
  {
    question: "Какой диплом выдают после обучения?",
    answer: <>Вид документа зависит от программы. Диплом о профессиональной переподготовке выдают после освоения программы ДПО и успешной итоговой аттестации. Для поступления нужно иметь или получать среднее профессиональное или высшее образование. Если вы ещё учитесь, диплом о переподготовке выдадут одновременно с основным дипломом. <a href={LEGAL_LINKS.offer}>Условия выдачи документов</a>.</>,
  },
  {
    question: "Есть ли курсы программирования для детей?",
    answer: <>Да, в <a href="/children">детской школе ИННОПРОГ</a> учатся ребята от 9 до 17 лет. Есть программы по Python, веб-разработке и созданию игр, а также подготовка к олимпиадам и экзаменам по информатике. Возраст и стартовый уровень указаны на странице каждого курса.</>,
  },
];

export function HomeFaqSection({ compact = false }: { compact?: boolean }) {
  const layout = compact ? "mobile" : "desktop";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.hash !== "#faq") return;

    // The responsive home canvas can mount after the browser resolves the hash.
    const frame = window.requestAnimationFrame(() => {
      if (window.location.hash === "#faq") sectionRef.current?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      aria-labelledby="home-faq-title"
      className={compact ? `${styles.section} ${styles.compact}` : styles.section}
      id="faq"
      ref={sectionRef}
    >
      <h2 className={styles.title} id="home-faq-title">
        <span>Часто задаваемые</span>{" "}
        <span className={styles.titleAccent}>вопросы</span>
      </h2>
      <div className="site-course-faq-list">
        {questions.map(({ question, answer }) => (
          <details className="site-course-faq-item" key={question}>
            <summary className={`site-course-faq-trigger site-course-faq-trigger--${layout} ${styles.trigger}`}>
              <span className={`site-course-faq-question site-course-faq-question--${layout}`}>{question}</span>
              <span aria-hidden="true" className="site-course-faq-arrow">
                <svg className="block size-full" fill="none" viewBox="0 0 29.4591 29.4564">
                  <path d="M0 14.7318H28M13.125 28.7281L28 14.7318L13.125 0.728109" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </summary>
            <div className={`site-course-faq-answer site-course-faq-answer--${layout} ${styles.answer}`}>
              <p>{answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
