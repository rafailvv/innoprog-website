"use client";
import ChildrenMobileMenu from "../ChildrenMobileMenu";
import { childrenCourseNavigation } from "../courses/course-paths";

import { useRef, useState, useSyncExternalStore, type MouseEvent, type CSSProperties } from "react";
import Link from "next/link";
import { CalendarDays, CodeXml, Compass, GraduationCap, Laptop, Layers, Trophy, UserRound, Workflow } from "lucide-react";
import mobileHomePaths from "../../../imports/MainScreenMobile/svg-paths";
import * as Dialog from "@radix-ui/react-dialog";
import { LeadSheetControls, leadSheetClassName } from "../../components/LeadSheetControls";
import { SiteHeader } from "../../components/ResponsiveSiteHeader";
import { SiteFooter } from "../../components/ResponsiveSiteFooter";
import data from "./source-data.json";
import styles from "./school.module.css";
import LeadForm from "./LeadForm";
import { childrenTeachers as teachers } from "./teacher-data";
import { childrenCoursePaths } from "../courses/course-paths";

function CtaArrow() {
  return (
    <span className={styles.heroCtaIcon} aria-hidden="true">
      <svg viewBox="0 0 16.65 16.64" fill="none">
        <path d={mobileHomePaths.p2b850d80} stroke="currentColor" />
      </svg>
    </span>
  );
}

const a = data.assets;
const heroImage = "/children/school/hero-illustration-transparent";
const heroAvif = `${heroImage}-480.avif 480w, ${heroImage}-768.avif 768w, ${heroImage}-1080.avif 1080w, ${heroImage}-1440.avif 1440w`;
const heroWebp = `${heroImage}-480.webp 480w, ${heroImage}-768.webp 768w, ${heroImage}-1080.webp 1080w, ${heroImage}.webp 1440w`;
const heroSizes = "(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 49vw, 47vw";
const courses = [
  {
    id: "python",
    titleLines: ["программирование", "на Python"],
    age: "9 до 17",
    bullets: [
      "Научим писать код и создавать приложения",
      "Покажем, как применять Python на\u00a0практике",
      "Создадим полезные мини-проекты",
    ],
  },
  {
    id: "web",
    titleLines: ["создание сайтов", "с нуля"],
    age: "9 до 17",
    bullets: [
      "Научим создавать сайты",
      "Покажем, как добавлять анимации",
      "Создадим 3 сайта для портфолио",
    ],
  },
  {
    id: "exam",
    titleLines: ["информатика", "ОГЭ/ЕГЭ"],
    age: "9 до 17",
    bullets: [
      "Разберём темы, на которых теряются баллы",
      "Закроем пробелы и подтянем слабые знания",
      "Выведем результат на нужный балл",
    ],
  },
  {
    id: "olympiad",
    titleLines: ["олимпиадное", "программирование"],
    age: "12 до 17",
    bullets: [
      "Подготовимся к ВсОШ, перечневым олимпиадам",
      "Разберём задачи любой сложности",
      "Поможем пройти путь от отбора до финала",
    ],
  },
  {
    id: "ai",
    titleLines: ["разработка", "нейросетей"],
    age: "12 до 17",
    bullets: [
      "Познакомим с разработкой нейросетей",
      "Покажем, как тренировать модели",
      "Создадим собственные ИИ-проекты",
    ],
  },
  {
    id: "games",
    titleLines: ["создание", "3D игр"],
    age: "10 до 17",
    bullets: [
      "Освоим редактор Unreal Engine",
      "Разберём основы геймдизайна",
      "Соберем собственные 3D игры",
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
  const [application, setApplication] = useState({ title: "", open: false });
  const applicationDialog = useRef<HTMLDivElement>(null);
  const applicationTrigger = useRef<HTMLElement | null>(null);
  const openApplication = (title: string) => {
    applicationTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setApplication({ title, open: true });
  };
  const closeApplication = () => setApplication((current) => ({ ...current, open: false }));
  const carousel = useRef<HTMLDivElement>(null);
  const scrollReviews = (direction: -1 | 1) => {
    const track = carousel.current;
    const first = track?.children[0];
    const second = track?.children[1];
    if (!track || !first || !second) return;
    const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };
  const handleHeader = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-mobile-menu-toggle]")) setMenuOpen(true);
    const link = target.closest<HTMLAnchorElement>("a");
    if (link?.getAttribute("href") === "/application") {
      event.preventDefault();
      openApplication("Подобрать курс для ребёнка");
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
      <div className={`${styles.header} ${styles.schoolHeader}`}>
        <SiteHeader
          childrenHref="/children"
          childrenLinks={childrenCourseNavigation}
          mobileApplicationHref="/application"
          renderBoth
          isMobile={isMobile}
          mobileMenuOpen={menuOpen}
          scale={scale}
          onClickCapture={handleHeader}
        />
      </div>
      <main id="school-main" className={styles.schoolMain}>
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroInner}`}>
            <div className={styles.heroText}>
              <span className={styles.age}>для детей от 9 до 17 лет</span>
              <h1>
                <span className={styles.heroTitleLead}>Курсы</span>{" "}
                <span className={styles.heroTitleSubject}>программирования</span>{" "}
                <strong>для детей</strong>
              </h1>
            </div>
            <ul className={styles.heroBenefits} role="list">
              {[
                { text: "Индивидуальные занятия с преподавателем", Icon: UserRound },
                { text: "Развиваем навыки программирования", Icon: Laptop },
                { text: "Подстроимся под расписание ребёнка", Icon: CalendarDays },
              ].map(({ text, Icon }) => (
                <li key={text}>
                  <span className={styles.heroBenefitIcon}><Icon aria-hidden="true" size={23} /></span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <button
              className={`${styles.button} ${styles.heroCta}`}
              type="button"
              onClick={() => openApplication("Запись на бесплатное занятие")}
            >
              <span>записаться на бесплатное занятие</span>
              <CtaArrow />
            </button>
            <link rel="preload" as="image" type="image/avif" media="(max-width: 767px)" imageSrcSet={heroAvif} imageSizes={heroSizes} fetchPriority="high" />
            <link rel="preload" as="image" media="(min-width: 768px)" imageSrcSet={heroWebp} imageSizes={heroSizes} fetchPriority="high" />
            <picture className={styles.heroPicture}>
              <source type="image/avif" media="(max-width: 767px)" srcSet={heroAvif} sizes={heroSizes} />
              <img
                src={`${heroImage}.webp`}
                srcSet={heroWebp}
                sizes={heroSizes}
                alt="Ребёнок за ноутбуком. Вокруг него робот, ракета и плашки о проектах, алгоритмах, достижениях и сертификате"
                width={1440}
                height={884}
                fetchPriority="high"
              />
            </picture>
          </div>
        </section>
        <section className={styles.future}>
          <div className={styles.container}>
            <h2>Будьте спокойны за будущее вашего ребёнка</h2>
            <div className={styles.futureGrid}>
              {([
                [
                  "Поступление в ВУЗ",
                  <>
                    <span className={styles.futureAdmissionLead}>Подготовим к поступлению в ВУЗ</span>
                    <br />
                    <span className={styles.futureAdmissionDirection}>по ИТ-направлению</span>
                  </>,
                  a["future-2"],
                  GraduationCap,
                ],
                [
                  "ИТ-специальность",
                  "Вырастим из вашего ребёнка будущего ИТ-специалиста",
                  a["future-3"],
                  CodeXml,
                ],
                [
                  "Участие в олимпиадах",
                  "Прокачаем навыки для участия в олимпиадах по информатике",
                  a["future-1"],
                  Trophy,
                ],
              ] as const).map(([title, text, image, Icon]) => (
                <article key={title}>
                  <header>
                    <h3><Icon aria-hidden="true" size={22} />{title}</h3>
                    <p>{text}</p>
                  </header>
                  <img
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    src={image}
                    srcSet={`${image.replace(".webp", "-480.webp")} 480w, ${image.replace(".webp", "-720.webp")} 720w, ${image} 800w`}
                    sizes="(max-width: 767px) min(440px, calc(100vw - 32px)), 30vw"
                    alt=""
                    width={800}
                    height={720}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.catalog} id="professions">
          <div className={styles.container}>
            <header className={styles.catalogHeader}>
              <h2>Наши курсы</h2>
              <p>
                Ваш ребёнок изучит необходимые навыки для{" "}
                <strong>будущей ИТ-профессии</strong>
              </p>
            </header>
            <div className={styles.courseGrid}>
              {courses.map(({ id, titleLines, age, bullets }) => (
                <article className={styles.course} key={id} id={id}>
                  <div className={styles.courseContent}>
                    <div className={styles.courseMeta}>
                      <span className={styles.age}>для детей от {age} лет</span>
                      <h3>
                        {titleLines[0]}<br />{titleLines[1]}
                      </h3>
                      <ul>
                        {bullets.map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ul>
                      <img
                        className={styles.courseIcon}
                        src={`/children/school/catalog-icon-${id}.webp`}
                        alt=""
                        width={240}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                    <Link
                      className={`${styles.button} ${styles.detailLink}`}
                      href={childrenCoursePaths[id]}
                    >
                      подробнее
                      <span className={styles.srOnly}>
                        {" "}
                        о курсе «{titleLines.join(" ")}»
                      </span>
                      <CtaArrow />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <p className={styles.realSkills}>
              Мы не обучаем Scratch, Roblox и Minecraft, так как наш курс
              сосредоточен на обучении детей{" "}
              <strong>реальным ИТ-навыкам</strong>
            </p>
          </div>
        </section>
        <section className={styles.certificate} id="certificate">
          <div className={styles.container}>
            <div>
              <h2>
                после обучения ваш ребёнок получит <mark>диплом</mark> об
                успешном окончании ИТ-курса
              </h2>
              <a href="/license">№ Л035-01272-16/01064358</a>
            </div>
            <img
              loading="lazy" decoding="async"
              src={a.certificate}
              alt="Образец диплома ИННОПРОГ по курсу программирования на Python"
              width={1020}
              height={840}
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
                      loading="lazy" decoding="async"
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
                      loading="lazy" decoding="async"
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
              loading="lazy" decoding="async"
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
                  loading="lazy" decoding="async"
                />
                <img
                  src={a["innopolis-logo"]}
                  alt="ОЭЗ Иннополис"
                  width={220}
                  height={70}
                  loading="lazy" decoding="async"
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
              Что думают о курсах сами дети? Читайте реальные{" "}
              <strong>отзывы наших учеников</strong>
            </p>
          </div>
          <div className={styles.reviews} ref={carousel}>
            {data.reviews.map((item, i) => (
              <article key={item.name}>
                <div className={styles.reviewPhoto}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={380}
                    height={220}
                    loading="lazy" decoding="async"
                  />
                  <span>{item.course}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.text.slice(0, 185)}…</p>
                <Link
                  className={`${styles.button} ${styles.detailLink}`}
                  href={`/children/stories/${["amir", "eldar", "almaz"][i]}`}
                >
                  подробнее<span className={styles.srOnly}> — {item.name}</span>
                  <CtaArrow />
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.arrows}>
            <button type="button" aria-label="Предыдущий отзыв" onClick={() => scrollReviews(-1)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 16.65 16.64" fill="none">
                <path d={mobileHomePaths.p2b850d80} stroke="currentColor" />
              </svg>
            </button>
            <button type="button" aria-label="Следующий отзыв" onClick={() => scrollReviews(1)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 16.65 16.64" fill="none">
                <path d={mobileHomePaths.p2b850d80} stroke="currentColor" />
              </svg>
            </button>
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
              {([
                ["Создадим", "мини-проект на первом занятии вместе с ребёнком", CodeXml],
                ["Разберём", "логику программирования и базовые алгоритмы", Workflow],
                [
                  "Определим",
                  "направление в ИТ, к которому есть интерес у ребёнка",
                  Compass,
                ],
                ["Дадим", "необходимые навыки для дальнейшего развития в ИТ", Layers],
              ] as const).map(([verb, text, Icon]) => (
                <li key={verb}>
                  <Icon aria-hidden="true" size={24} strokeWidth={1.7} />
                  <span><strong>{verb}</strong> {text}</span>
                </li>
              ))}
            </ul>
            <button
              className={styles.button}
              onClick={() => openApplication("Запись на пробное занятие")}
            >
              Записаться на пробное занятие
            </button>
          </div>
          <img
            className={styles.trialPhoto}
            src={a.trial}
            alt="Школьник пишет код на Python во время онлайн-занятия с преподавателем"
            width={1448}
            height={1086}
            loading="lazy" decoding="async"
          />
        </section>
        <section className={styles.pricing} id="tariff">
          <div className={styles.container}>
            <aside className={styles.priceCard} aria-labelledby="children-price-title">
              <div className={styles.price}>
                <h3 id="children-price-title">Стоимость обучения</h3>
                <span className={styles.discount}>−27%</span>
                <del>9 990 руб/мес</del>
                <p>7&nbsp;290 <span>руб/мес</span></p>
              </div>
              <ul className={styles.priceBenefits}>
                <li>
                  онлайн-занятия <b>1&nbsp;на&nbsp;1</b> с опытными преподавателями
                </li>
                <li>
                  погружение ребёнка в <b>ИТ-профессию</b>
                </li>
              </ul>
              <div className={styles.taxBenefit}>
                <h4>налоговый вычет</h4>
                <p className={styles.taxReturn}>
                  <b>13%</b> <span>от стоимости обучения</span>
                </p>
                <p>вычет можно оформить после окончания курса</p>
              </div>
            </aside>
            <div className={styles.applicationCard}>
              <h2>Заявка на обучение</h2>
              <p>Оставьте заявку, и мы свяжемся с вами в удобное для вас время.</p>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <div className={styles.footerJoin}>
        <SiteFooter isMobile={isMobile} scale={scale} compactMobile />
      </div>
      <ChildrenMobileMenu open={menuOpen} onOpenChange={setMenuOpen} onApplication={() => openApplication("Подобрать курс для ребёнка")} />
      <Dialog.Root
        open={application.open}
        onOpenChange={(open) => {
          if (!open) closeApplication();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={`${styles.overlay} ${styles.applicationOverlay}`} />
          <Dialog.Content
            ref={applicationDialog}
            className={`${styles.modal} ${leadSheetClassName}`}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              applicationDialog.current?.focus({ preventScroll: true });
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              applicationTrigger.current?.focus({ preventScroll: true });
            }}
          >
            <Dialog.Close className={styles.close} aria-label="Закрыть окно">
              ×
            </Dialog.Close>
            <LeadSheetControls open={application.open} onClose={closeApplication} />
            <div className={styles.applicationModalBody}>
              <Dialog.Title>{application.title}</Dialog.Title>
              <Dialog.Description className={styles.applicationModalDescription}>
                Оставьте заявку, и мы поможем подобрать направление и удобное
                время занятий
              </Dialog.Description>
              <LeadForm key={application.title} context={application.title} presentation="modal" />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
