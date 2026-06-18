import { notFound } from "next/navigation";
import App, { type AppInitialRoute, type CourseReviewKey } from "../../../App";
import { JsonLd, SITE_URL, absoluteUrl, breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "../../../seo";

const COURSE_REVIEW_ROUTE_TO_KEY = {
  maria: "maria",
  vladimir: "vladimir",
  vildan: "vildan",
  veniamin: "veniamin",
  ilya: "ilya",
  andrey: "andrey",
} as const satisfies Record<string, CourseReviewKey>;

const COURSE_REVIEW_META = {
  maria: {
    name: "Мария",
    title: "Отзыв Марии о курсе Python-разработчик",
    description:
      "Отзыв Марии о курсе Python-разработчик в ИННОПРОГ: обучение с наставником, практика на платформе и путь к офферу в финтех",
  },
  vladimir: {
    name: "Владимир",
    title: "Отзыв Владимира о курсе Python-разработчик",
    description:
      "Отзыв Владимира о курсе Python-разработчик: как практика, проекты для портфолио и поддержка наставника помогли увереннее проходить собеседования",
  },
  vildan: {
    name: "Вильдан",
    title: "Отзыв Вильдана о курсе Python-разработчик",
    description:
      "Отзыв Вильдана о переходе к Python-разработке после обучения в ИННОПРОГ: индивидуальные занятия, практика и подготовка к новой работе",
  },
  veniamin: {
    name: "Вениамин",
    title: "Отзыв Вениамина о курсе Python-разработчик",
    description:
      "Отзыв Вениамина о курсе Python-разработчик: регулярные занятия с преподавателем, практические задания и понятная программа обучения",
  },
  ilya: {
    name: "Илья",
    title: "Отзыв Ильи о курсе Python-разработчик",
    description:
      "Отзыв Ильи о курсе Python-разработчик: подготовка к техническому собеседованию, алгоритмические задачи и выход на стажировку",
  },
  andrey: {
    name: "Андрей",
    title: "Отзыв Андрея о курсе Python-разработчик",
    description:
      "Отзыв Андрея о курсе Python-разработчик в ИННОПРОГ: теория, практика, домашние задания и обратная связь от преподавателя",
  },
} as const;

type CourseReviewRoute = keyof typeof COURSE_REVIEW_ROUTE_TO_KEY;

function isCourseReviewRoute(value: string): value is CourseReviewRoute {
  return Object.prototype.hasOwnProperty.call(COURSE_REVIEW_ROUTE_TO_KEY, value);
}

export function generateStaticParams() {
  return Object.keys(COURSE_REVIEW_ROUTE_TO_KEY).map((review) => ({ review }));
}

export async function generateMetadata({ params }: { params: Promise<{ review: string }> }) {
  const { review } = await params;

  if (!isCourseReviewRoute(review)) {
    return {};
  }

  const meta = COURSE_REVIEW_META[review];

  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/python-course/reviews/${review}`,
    keywords: [
      `отзыв ${meta.name} Python-разработчик`,
      "отзывы курс Python",
      "ИННОПРОГ Python отзывы",
    ],
  });
}

export default async function CourseReviewPage({ params }: { params: Promise<{ review: string }> }) {
  const { review } = await params;

  if (!isCourseReviewRoute(review)) {
    notFound();
  }

  const meta = COURSE_REVIEW_META[review];
  const route: AppInitialRoute = {
    page: "courseReview",
    review: COURSE_REVIEW_ROUTE_TO_KEY[review],
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Review",
          "@id": `${absoluteUrl(`/python-course/reviews/${review}`)}#review`,
          name: meta.title,
          reviewBody: meta.description,
          url: absoluteUrl(`/python-course/reviews/${review}`),
          author: {
            "@type": "Person",
            name: meta.name,
          },
          itemReviewed: {
            "@type": "Course",
            "@id": `${SITE_URL}/python-course#course`,
            name: "Python-разработчик",
            provider: {
              "@id": `${SITE_URL}/#organization`,
            },
          },
          publisher: {
            "@id": `${SITE_URL}/#organization`,
          },
        }}
      />
      <JsonLd
        data={webPageJsonLd({
          path: `/python-course/reviews/${review}`,
          name: meta.title,
          description: meta.description,
          primaryEntityId: `${absoluteUrl(`/python-course/reviews/${review}`)}#review`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Python-разработчик", path: "/python-course" },
          { name: meta.name, path: `/python-course/reviews/${review}` },
        ])}
      />
      <App initialRoute={route} />
    </>
  );
}
