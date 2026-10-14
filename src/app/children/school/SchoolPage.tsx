"use client";
import ChildrenMobileMenu from "../ChildrenMobileMenu";
import { childrenCourseNavigation } from "../courses/course-paths";

import { useRef, useState, useSyncExternalStore, type MouseEvent, type CSSProperties } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { SiteHeader } from "../../components/ResponsiveSiteHeader";
import { SiteFooter } from "../../components/ResponsiveSiteFooter";
import data from "./source-data.json";
import styles from "./school.module.css";
import LeadForm from "./LeadForm";
import { childrenTeachers as teachers } from "./teacher-data";
import { childrenCoursePaths } from "../courses/course-paths";

const a = data.assets;
const courses = [
  {
    id: "python",
    title: "Программирование на Python",
    age: "9 до 17",
    bullets: [
      "Научим писать код и создавать приложения",
      "Покажем, как применять Python на практике",
      "Создадим полезные мини-проекты",
    ],
  },
  {
    id: "web",
    title: "Создание сайтов с нуля",
    age: "9 до 17",
    bullets: [
      "Научим создавать сайты",
      "Покажем, как добавлять анимации",
      "Создадим 3 сайта для портфолио",
    ],
  },
  {
    id: "exam",
    title: "Информатика ОГЭ/ЕГЭ",
    age: "9 до 17",
    bullets: [
      "Разберём темы, на которых теряются баллы",
      "Закроем пробелы и подтянем слабые знания",
      "Выведем результат на нужный балл",
    ],
  },
  {
    id: "olympiad",
    title: "Олимпиадное программирование",
    age: "12 до 17",
    bullets: [
      "Подготовимся к ВсОШ, перечневым олимпиадам",
      "Разберём задачи любой сложности",
      "Поможем пройти путь от отбора до финала",
    ],
  },
  {
    id: "ai",
    title: "Разработка нейросетей",
    age: "14 до 17",
    bullets: [
      "Познакомим с разработкой нейросетей",
      "Покажем, как тренировать модели",
      "Создадим собственные ИИ-проекты",
    ],
  },
  {
    id: "games",
    title: "Игры своими руками",
    age: "10 до 17",
    bullets: [
      "Научим создавать игры с нуля",
      "Разберём основы геймдизайна",
      "Сделаем первые игровые проекты на Unreal Engine",
    ],
  },
] as const;
const steps = [
  [
    "Индивидуальные занятия",
    "Индивидуальные занятия с преподавателями помогут ребёнку справиться с любыми задачами и получить ценные знания",
  ],
  [
    "Пошаговое обучение",
    "Ваш ребёнок изучит все необходимые навыки начиная от основ программирования и заканчивая разработкой сложных ИТ-проектов",
  ],
  [
    "Регулярные домашние задания",
    "Ваш ребёнок будет выполнять домашние задания на удобной образовательной платформе. Это сделает обучение более глубоким",
  ],
  [
    "Онлайн-формат занятий",
    "Не нужно тратить время на дорогу. Занятия проходят онлайн с преподавателем, ваш ребёнок может учиться прямо из дома",
  ],
  [
    "Учитесь, когда удобно",
    "Ребёнок может заниматься в любое удобное для него время, а преподаватель подстроится под его расписание",
  ],
  [
    "Отслеживание успеваемости",
    "Собираем обратную связь от преподавателей об успеваемости ребёнка и регулярно делимся результатами с родителями",
  ],
];

function subscribeViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
function viewport() {
  return window.innerWidth;
}
function serverViewport() {
  return 1440;
}

export default function SchoolPage() {
  const width = useSyncExternalStore(
    subscribeViewport,
    viewport,
    serverViewport,
  );
  const isMobile = width < 768;
  const scale = width / (isMobile ? 390 : 1440);
  const [menuOpen, setMenuOpen] = useState(false);
  const [application, setApplication] = useState<string | null>(null);
  const applicationDialog = useRef<HTMLDivElement>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const handleHeader = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-mobile-menu-toggle]")) setMenuOpen(true);
    const link = target.closest<HTMLAnchorElement>("a");
    if (link?.getAttribute("href") === "/application") {
      event.preventDefault();
      setApplication("Подобрать курс для ребёнка");
    }
    if (link?.dataset.mainNav === "children") {
      event.preventDefault();
      document
        .getElementById("professions")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={styles.page} style={{ "--children-desktop-scale": Math.max(1, scale) } as CSSProperties}>
      <div className={styles.header}>
        <SiteHeader
          childrenHref="/children"
          childrenLinks={childrenCourseNavigation}
          renderBoth
          isMobile={isMobile}
          mobileMenuOpen={menuOpen}
          scale={scale}
          onClickCapture={handleHeader}
        />
      </div>
      <main id="school-main">
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroInner}`}>
            <img src={a.laptop} alt="" className={styles.laptop} />
            <img src={a["code-cubes"]} alt="" className={styles.cubes} />
            <div className={styles.heroText}>
              <span className={styles.age}>для детей от 9 до 17 лет</span>
              <h1>
                Подготовим вашего ребёнка к будущей{" "}
                <strong>ИТ-профессии</strong>
              </h1>
            </div>
            <picture className={styles.heroPicture}>
              <source media="(max-width: 767px)" srcSet={a["hero-mobile"]} />
              <img
                src={a.hero}
                alt="Ученик ИННОПРОГ занимается программированием за ноутбуком"
                width={450}
                height={650}
                fetchPriority="high"
              />
            </picture>
            <ul className={styles.heroBenefits}>
              {[
                "Индивидуальные занятия с преподавателем",
                "Объясняем сложные вещи простым языком",
                "Подстроимся под расписание ребёнка",
              ].map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <button
              className={`${styles.button} ${styles.heroCta}`}
              onClick={() => setApplication("Запись на бесплатное занятие")}
            >
              Записаться на бесплатное занятие
            </button>
          </div>
        </section>
        <section className={styles.future}>
          <div className={styles.container}>
            <div className={styles.futureDesktop}>
              <h2>Будьте спокойны за будущее вашего ребёнка</h2>
              <div className={styles.futureGrid}>
                {[
                  [
                    "Поступление в ВУЗ",
                    "Подготовим к поступлению в ВУЗ по ИТ-направлению",
                    a["future-1"],
                  ],
                  [
                    "ИТ-специальность",
                    "Вырастим из вашего ребёнка будущего ИТ-специалиста",
                    a["future-3"],
                  ],
                  [
                    "Участие в олимпиадах",
                    "Прокачаем навыки для участия в олимпиадах по информатике",
                    a["future-2"],
                  ],
                ].map(([title, text, image]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <img loading="lazy" src={image} alt="" />
                  </article>
                ))}
              </div>
            </div>
            <h2 className={styles.guarantee}>
              Гарантируем результат или вернём деньги
            </h2>
            <p className={styles.guaranteeText}>
              Мы уверены в наших преподавателях и учебной программе, поэтому
              гарантируем, что ваш ребёнок достигнет высоких результатов
            </p>
          </div>
        </section>
        <div className={styles.waveArea}>
          <section
            className={`${styles.container} ${styles.section}`}
            id="professions"
          >
            <h2>Наши курсы</h2>
            <p className={styles.intro}>
              Ваш ребёнок изучит необходимые навыки для{" "}
              <strong>будущей ИТ-профессии</strong>
            </p>
            <div className={styles.courseGrid}>
              {courses.map((course) => (
                <article
                  className={styles.course}
                  key={course.id}
                  id={course.id}
                >
                  <span className={styles.age}>
                    для детей от {course.age} лет
                  </span>
                  <h3>
                    {course.id === "python" ? (
                      <>
                        Программиро-
                        <br />
                        вание на Python
                      </>
                    ) : course.id === "web" ? (
                      <>
                        Создание
                        <br />
                        сайтов с нуля
                      </>
                    ) : course.id === "exam" ? (
                      <>
                        Информатика
                        <br />
                        ОГЭ/ЕГЭ
                      </>
                    ) : (
                      course.title
                    )}
                  </h3>
                  <img
                    src={a[course.id]}
                    alt=""
                    loading="lazy"
                    width={190}
                    height={210}
                  />
                  <ul>
                    {course.bullets.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                  <Link
                    className={styles.button}
                    href={childrenCoursePaths[course.id]}
                  >
                    Подробнее
                    <span className={styles.srOnly}>
                      {" "}
                      о курсе «{course.title}»
                    </span>
                  </Link>
                </article>
              ))}
            </div>
            <p className={styles.realSkills}>
              Мы не обучаем Scratch, Roblox и Minecraft, так как наш курс
              сосредоточен на обучении детей{" "}
              <strong>реальным ИТ-навыкам</strong>
            </p>
          </section>
        </div>
        <section className={styles.certificate} id="certificate">
          <div className={styles.container}>
            <div>
              <h2>
                После обучения ваш ребёнок получит <mark>сертификат</mark> об
                успешном окончании ИТ-курса
              </h2>
              <a href="/license">№ Л035-01272-16/01064358</a>
            </div>
            <img
              loading="lazy"
              src={a.certificate}
              alt="Образец сертификата ИННОПРОГ об окончании ИТ-курса"
              width={470}
              height={400}
            />
          </div>
        </section>
        <div className={styles.waveArea}>
          <section
            className={`${styles.container} ${styles.section}`}
            id="training"
          >
            <h2>Как проходит обучение</h2>
            <div className={styles.steps}>
              {steps.map(([title, text], i) => (
                <article
                  key={title}
                  className={`${styles.step} ${i === 0 ? styles.mainStep : ""}`}
                >
                  <span className={styles.stepNumber}>{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {i === 0 ? (
                    <img
                      src={a.lesson}
                      alt="Индивидуальный онлайн-урок с преподавателем"
                      loading="lazy"
                      width={530}
                      height={350}
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </section>
          <section
            className={`${styles.container} ${styles.teachers}`}
            id="teachers"
          >
            <h2>Преподаватели</h2>
            <div className={styles.teacherGrid}>
              {teachers.map((teacher) => (
                <article key={teacher.name}>
                  <div className={styles.teacherPortrait}>
                    <img
                      loading="lazy"
                      src={teacher.image}
                      alt={teacher.name}
                      width={380}
                      height={320}
                    />
                  </div>
                  <div className={styles.teacherCard}>
                    <h3>{teacher.name}</h3>
                    <ul>
                      {teacher.bullets.map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <section className={styles.contactBand}>
          <div className={styles.container}>
            <h2>
              Если у вас возникли вопросы,
              <br /> свяжитесь с нами в мессенджерах
            </h2>
            <a
              href="https://t.me/innoprog_admin"
              target="_blank"
              rel="noreferrer"
            >
              Написать{" "}
              <img src={a.telegram} alt="в Telegram" width={50} height={50} />
            </a>
          </div>
        </section>
        <section
          className={`${styles.container} ${styles.section} ${styles.innopolis}`}
          id="innopolis"
        >
          <h2>Мы из Иннополиса</h2>
          <div className={styles.innopolisGrid}>
            <img
              className={styles.innopolisPhoto}
              src={a.innopolis}
              alt="Здание Иннополиса"
              loading="lazy"
              width={600}
              height={330}
            />
            <div>
              <p>
                Наше сотрудничество с Иннополисом базируется на реализации
                эффективного образовательного процесса{" "}
                <strong>ИННОПРОГ.</strong>
              </p>
              <p>
                Совместные усилия дают возможность для развития образовательной
                платформы и её методических материалов, а также использования
                современных методов обучения.
              </p>
              <div className={styles.partnerLogos}>
                <img
                  src={a["innoprog-logo"]}
                  alt="ИННОПРОГ Education"
                  width={200}
                  height={65}
                  loading="lazy"
                />
                <img
                  src={a["innopolis-logo"]}
                  alt="ОЭЗ Иннополис"
                  width={220}
                  height={70}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className={`${styles.container} ${styles.section}`}
          id="reviews"
        >
          <h2>Отзывы учеников</h2>
          <div className={styles.reviewHeading}>
            <p>
              Что думают о курсах сами дети? Читайте реальные
              <br /> отзывы наших учеников
            </p>
            <div className={styles.arrows}>
              <button
                aria-label="Предыдущий отзыв"
                onClick={() =>
                  carousel.current?.scrollBy({ left: -320, behavior: "smooth" })
                }
              >
                ←
              </button>
              <button
                aria-label="Следующий отзыв"
                onClick={() =>
                  carousel.current?.scrollBy({ left: 320, behavior: "smooth" })
                }
              >
                →
              </button>
            </div>
          </div>
          <div className={styles.reviews} ref={carousel}>
            {data.reviews.map((item, i) => (
              <article key={item.name}>
                <img
                  src={item.image}
                  alt={item.name}
                  width={380}
                  height={220}
                  loading="lazy"
                />
                <span>{item.course}</span>
                <h3>{item.name}</h3>
                <p>{item.text.slice(0, 185)}…</p>
                <Link
                  className={styles.button}
                  href={`/children/stories/${["amir", "eldar", "almaz"][i]}`}
                >
                  Подробнее<span className={styles.srOnly}> — {item.name}</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section
          className={`${styles.container} ${styles.section} ${styles.faq}`}
          id="faq"
        >
          <h2>Часто задаваемые вопросы</h2>
          {data.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <section
          className={`${styles.container} ${styles.section} ${styles.trial}`}
        >
          <div>
            <h2>За 45 минут вводного урока</h2>
            <ul>
              {[
                [
                  "Определим",
                  "направление в ИТ, к которому есть интерес у ребёнка",
                ],
                ["Разберём", "логику программирования и базовые алгоритмы"],
                ["Создадим", "мини-проект на первом занятии вместе с ребёнком"],
                ["Дадим", "необходимые навыки для дальнейшего развития в ИТ"],
              ].map(([verb, text]) => (
                <li key={verb}>
                  <strong>{verb}</strong> {text}
                </li>
              ))}
            </ul>
            <button
              className={styles.button}
              onClick={() => setApplication("Запись на пробное занятие")}
            >
              Записаться на пробное занятие
            </button>
          </div>
          <img
            src={a.trial}
            alt="Ребёнок создаёт свой первый проект"
            width={380}
            height={380}
            loading="lazy"
          />
        </section>
        <section className={styles.pricing} id="tariff">
          <div className={styles.container}>
            <div>
              <h2>Заявка на обучение</h2>
              <p>
                Оставьте <strong>заявку</strong>, и мы <strong>свяжемся</strong>{" "}
                с вами
                <br /> в ближайшее время
              </p>
              <LeadForm />
            </div>
            <div className={styles.priceCards}>
              <div className={styles.price}>
                <span className={styles.discount}>−27%</span>
                <h2>Стоимость обучения</h2>
                <del>9 990 руб/мес</del>
                <p>7 290 руб/мес</p>
              </div>
              <ul>
                <li>
                  Онлайн-занятия с опытными преподавателями <b>1 на 1</b>
                </li>
                <li>
                  Погружение ребёнка в <b>ИТ-профессию</b>
                </li>
                <li>
                  <b>Гарантируем результат</b> или мы вернём вам деньги
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter isMobile={isMobile} scale={scale} />
      <ChildrenMobileMenu open={menuOpen} onOpenChange={setMenuOpen} onApplication={() => setApplication("Подобрать курс для ребёнка")} />
      <Dialog.Root
        open={application !== null}
        onOpenChange={(open) => {
          if (!open) setApplication(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content
            ref={applicationDialog}
            className={styles.modal}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              applicationDialog.current?.focus({ preventScroll: true });
            }}
          >
            <Dialog.Close className={styles.close} aria-label="Закрыть окно">
              ×
            </Dialog.Close>
            <Dialog.Title>{application}</Dialog.Title>
            <Dialog.Description>
              Оставьте заявку, и мы поможем подобрать направление и удобное
              время занятий
            </Dialog.Description>
            <LeadForm key={application} context={application ?? undefined} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
