import { notFound } from "next/navigation";
import Link from "next/link";
import ProgramAccordion from "../ProgramAccordion";
import { getChildrenCourseFaq, type ChildrenCourseFaq } from "../course-faq";
import ChildrenShell from "../../ChildrenShell";
import LeadForm from "../../school/LeadForm";
import source from "../../school/source-data.json";
import {
  childrenCourses,
  getChildrenCourse,
  childrenCoursePath,
} from "../course-data";
import {
  JsonLd,
  createPageMetadata,
  breadcrumbJsonLd,
  faqPageJsonLd,
  absoluteUrl,
  webPageJsonLd,
} from "../../../seo";
import school from "../../school/school.module.css";
import styles from "../course.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return childrenCourses.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = getChildrenCourse(slug);
  if (!course) return {};
  return createPageMetadata({
    title: course.seoTitle,
    description: course.description,
    path: childrenCoursePath(slug),
    ogImage: `/og/children-${slug}-v1.png`,
    ogImageAlt: `${course.title} — курс для детей ${course.age}`,
    ogImageSize: { width: 1200, height: 630 },
    keywords: [
      course.title,
      "программирование для детей",
      "онлайн-курс для школьников",
      "индивидуальные занятия",
    ],
  });
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = getChildrenCourse(slug);
  if (!course) notFound();
  const path = childrenCoursePath(slug);
  const faq = getChildrenCourseFaq(course);
  const story = course.story
    ? source.reviews[["amir", "eldar", "almaz"].indexOf(course.story)]
    : null;
  return (
    <ChildrenShell className={styles.shell}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": `${absoluteUrl(path)}#course`,
          name: course.title,
          description: course.description,
          url: absoluteUrl(path),
          inLanguage: "ru-RU",
          educationalLevel: "Школьники",
          audience: {
            "@type": "EducationalAudience",
            educationalRole: "student",
            audienceType: `Дети ${course.age}`,
          },
          provider: {
            "@type": "Organization",
            "@id": "https://innoprog.ru/#organization",
            name: "ИННОПРОГ",
            url: "https://innoprog.ru",
          },
          teaches: course.skills,
          isAccessibleForFree: false,
          typicalAgeRange: course.age.replace(" лет", "").replace("–", "-"),
          offers: {
            "@type": "Offer",
            url: `${absoluteUrl(path)}#application`,
            price: "7290",
            priceCurrency: "RUB",
            seller: { "@id": "https://innoprog.ru/#organization" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "7290",
              priceCurrency: "RUB",
              unitText: "месяц",
            },
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            inLanguage: "ru-RU",
          },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Программирование для детей", path: "/children" },
          { name: course.title, path },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faq, path)} />
      <JsonLd
        data={webPageJsonLd({
          path,
          name: course.seoTitle,
          description: course.description,
          primaryEntityId: `${absoluteUrl(path)}#course`,
        })}
      />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={school.container}>
            <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
              <Link href="/children">Для детей</Link>
              <span aria-hidden="true">/</span>
              <span>{course.title}</span>
            </nav>
            <span className={styles.eyebrow}>Курс для детей {course.age}</span>
            <h1>{course.title}</h1>
            <div className={styles.heroCard}>
              <div>
                <div className={styles.tags}>
                  <span>Индивидуально с преподавателем</span>
                  <span>Онлайн</span>
                  <span>Практика и свои проекты</span>
                </div>
                <p>{course.lead.replace(/\.$/, "")}</p>
                <div className={styles.heroActions}>
                  <a className={school.button} href="#application">
                    Записаться на бесплатное занятие
                  </a>
                  <a href="#program">Посмотреть программу ↓</a>
                </div>
                <a className={styles.license} href="/license">
                  Образовательная лицензия № Л035-01272-16/01064358
                </a>
              </div>
              <img
                className={course.asset === "exam" || course.asset === "olympiad" ? styles.enlargedArtwork : undefined}
                src={source.assets[course.asset]}
                alt={course.title}
                width={320}
                height={340}
                fetchPriority="high"
              />
            </div>
          </div>
        </section>
        <div className={school.container}>
          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <span>01 / Знакомство</span>
              <h2 className={styles.sectionTitle}>
                Кому подойдёт
                <br />
                этот курс
              </h2>
            </div>
            <div className={styles.audience}>
              <p>{course.audience.replace(/\.$/, "")}</p>
              <div>
                <b>Начнём с ребёнка, а не с шаблона</b>
                <p>
                  На бесплатном вводном занятии узнаем об интересах, посмотрим
                  на текущие навыки и выберем подходящий маршрут
                </p>
              </div>
            </div>
          </section>
          <section className={styles.skillsSection}>
            <div className={styles.sectionHeading}>
              <span>02 / Навыки</span>
              <h2 className={styles.sectionTitle}>
                Чему научится
                <br />
                ваш ребёнок
              </h2>
            </div>
            <div className={styles.skills}>
              {course.skills.map((skill, i) => (
                <article key={skill}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{skill}</h3>
                </article>
              ))}
            </div>
          </section>
        </div>
        <section className={styles.program} id="program">
          <div className={school.container}>
            <div className={styles.sectionHeading}>
              <span>03 / Шаг за шагом</span>
              <h2 className={styles.sectionTitle}>
                Программа
                <br />
                обучения
              </h2>
            </div>
            <p className={styles.programIntro}>
              Основные темы направления. Глубину, порядок и темп прохождения
              подбираем после вводного занятия под уровень ребёнка
            </p>
            <ProgramAccordion modules={course.modules} />
          </div>
        </section>
        <div className={school.container}>
          <section className={styles.practice}>
            <div className={styles.sectionHeading}>
              <span>04 / Практика</span>
              <h2 className={styles.sectionTitle}>
                {slug === "informatics-exams" || slug === "olympiad-programming"
                  ? "Как будем практиковаться"
                  : "Что можно создать"}
              </h2>
            </div>
            <div className={styles.examples}>
              {course.examples.map((example, i) => (
                <article key={example.title}>
                  <span className={styles.exampleNumber}>({i + 1})</span>
                  <h3>{example.title}</h3>
                  <p>{example.description.replace(/\.$/, "")}</p>
                </article>
              ))}
            </div>
            <p className={styles.note}>
              Конкретные задания и проекты преподаватель подбирает по подготовке
              и интересам ученика
            </p>
          </section>
          <section className={styles.format}>
            <div>
              <span className={styles.label}>
                05 / Поддержка на каждом шаге
              </span>
              <h2 className={styles.sectionTitle}>
                Учиться легче,
                <br />
                когда вы не одни
              </h2>
              <p>
                Ребёнок занимается с{" "}
                <a className="text-inherit hover:underline focus-visible:underline underline-offset-4" href="/children#teachers">преподавателем</a>{" "}
                один на один, сразу задаёт вопросы и получает обратную связь по своей работе
              </p>
              <ul>
                <li>Расписание подстраиваем под школу и другие занятия</li>
                <li>Закрепляем темы практикой и домашними заданиями</li>
                <li>Делимся с родителями результатами и прогрессом</li>
              </ul>
            </div>
            <img
              src={source.assets.lesson}
              alt="Онлайн-занятие ребёнка с преподавателем"
              width={560}
              height={380}
              loading="lazy"
              decoding="async"
            />
          </section>
          <section className={styles.result}>
            <div>
              <span className={styles.label}>06 / Результат</span>
              <h2 className={styles.sectionTitle}>
                Знания, которые
                <br />
                останутся с ребёнком
              </h2>
              <p>{course.result.replace(/\.$/, "")}</p>
              <p>После успешного окончания ИТ-курса — сертификат ИННОПРОГ</p>
            </div>
            <img
              src={source.assets.certificate}
              alt="Сертификат ИННОПРОГ об успешном окончании курса"
              width={420}
              height={360}
              loading="lazy"
              decoding="async"
            />
          </section>
          {story && course.story ? (
            <section className={styles.story}>
              <img
                src={story.image}
                alt={story.name}
                width={480}
                height={300}
                loading="lazy"
                decoding="async"
              />
              <div>
                <span className={styles.label}>История ученика</span>
                <h2 className={styles.sectionTitle}>{story.name}</h2>
                <p>{story.text.slice(0, 220)}…</p>
                <Link href={`/children/stories/${course.story}`}>
                  Читать историю и смотреть фотографии ↗
                </Link>
              </div>
            </section>
          ) : null}
          <section className={styles.faq}>
            <h2 className={styles.sectionTitle}>
              Часто задаваемые
              <br />
              вопросы
            </h2>
            {faq.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p><FaqAnswer item={item} /></p>
              </details>
            ))}
          </section>
        </div>
        <section className={styles.application} id="application">
          <div className={school.container}>
            <div>
              <span className={styles.label}>
                Начните с бесплатного занятия
              </span>
              <h2 className={styles.sectionTitle}>
                Попробуйте
                <br />
                Разберитесь
                <br />
                <em>Выберите своё</em>
              </h2>
              <p>
                Оставьте заявку на курс «{course.title}». Обсудим ваши цели,
                познакомимся с ребёнком и подберём удобное время
              </p>
              <div className={styles.price}>
                <span>Стоимость обучения</span>
                <del>9 990 ₽/мес</del>
                <b>7 290 ₽/мес</b>
              </div>
            </div>
            <div className={styles.formCard}>
              <h3>Заявка на курс</h3>
              <p>{course.title}</p>
              <LeadForm
                course={`Запись на курс «${course.title}»`}
                formId={`children-${course.slug}`}
              />
            </div>
          </div>
        </section>
        <section className={`${school.container} ${styles.related}`}>
          <h2 className={styles.sectionTitle}>Другие направления</h2>
          <div>
            {childrenCourses
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link href={childrenCoursePath(c.slug)} key={c.slug}>
                  {c.title}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </ChildrenShell>
  );
}

function FaqAnswer({ item }: { item: ChildrenCourseFaq }) {
  const text = item.answer[0];
  if (!item.link) return text;
  const index = text.indexOf(item.link.label);
  if (index < 0) return text;
  return <>{text.slice(0, index)}<Link className="text-inherit underline underline-offset-4" href={item.link.href}>{item.link.label}</Link>{text.slice(index + item.link.label.length)}</>;
}
