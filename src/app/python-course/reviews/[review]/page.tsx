import { notFound } from "next/navigation";
import App, { type AppInitialRoute, type CourseReviewKey } from "../../../App";
import { JsonLd, breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "../../../seo";

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
    description: "История Марии о прохождении курса Python-разработчик в ИННОПРОГ.",
  },
  vladimir: {
    name: "Владимир",
    title: "Отзыв Владимира о курсе Python-разработчик",
    description: "История Владимира о практике, наставнике и проектах на курсе Python-разработчик.",
  },
  vildan: {
    name: "Вильдан",
    title: "Отзыв Вильдана о курсе Python-разработчик",
    description: "История Вильдана о переходе к разработке после обучения Python в ИННОПРОГ.",
  },
  veniamin: {
    name: "Вениамин",
    title: "Отзыв Вениамина о курсе Python-разработчик",
    description: "История Вениамина о занятиях с преподавателем и практике на курсе Python.",
  },
  ilya: {
    name: "Илья",
    title: "Отзыв Ильи о курсе Python-разработчик",
    description: "История Ильи о подготовке к собеседованию и стажировке на курсе Python.",
  },
  andrey: {
    name: "Андрей",
    title: "Отзыв Андрея о курсе Python-разработчик",
    description: "История Андрея об обучении Python с преподавателем и обратной связью.",
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
          name: meta.title,
          reviewBody: meta.description,
          author: {
            "@type": "Person",
            name: meta.name,
          },
          itemReviewed: {
            "@type": "Course",
            name: "Python-разработчик",
          },
        }}
      />
      <JsonLd
        data={webPageJsonLd({
          path: `/python-course/reviews/${review}`,
          name: meta.title,
          description: meta.description,
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
