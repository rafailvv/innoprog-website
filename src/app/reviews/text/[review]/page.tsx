import { notFound } from "next/navigation";
import App, { type AppInitialRoute } from "../../../App";
import {
  findStudentReviewByRouteSlug,
  getStudentReviewSlug,
  getStudentReviewTextPath,
  STUDENT_REVIEWS,
} from "../../../studentReviewsData";
import {
  JsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd,
} from "../../../seo";

export function generateStaticParams() {
  return STUDENT_REVIEWS.map((review) => ({ review: getStudentReviewSlug(review) }));
}

export async function generateMetadata({ params }: { params: Promise<{ review: string }> }) {
  const { review } = await params;
  const studentReview = findStudentReviewByRouteSlug(review);

  if (!studentReview) {
    return {};
  }

  return createPageMetadata({
    title: `Отзыв ${studentReview.name} о курсе ${studentReview.course}`,
    description: `${studentReview.title}. Отзыв ученика ИННОПРОГ о курсе ${studentReview.course}`,
    path: getStudentReviewTextPath(studentReview),
    keywords: [
      `отзыв ${studentReview.name} ИННОПРОГ`,
      `отзывы курс ${studentReview.course}`,
      "отзывы учеников ИННОПРОГ",
    ],
  });
}

export default async function StudentReviewRoute({
  params,
}: {
  params: Promise<{ review: string }>;
}) {
  const { review } = await params;
  const studentReview = findStudentReviewByRouteSlug(review);

  if (!studentReview) {
    notFound();
  }

  const route: AppInitialRoute = {
    page: "studentReview",
    review: studentReview.id,
  };

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: getStudentReviewTextPath(studentReview),
          name: `Отзыв ${studentReview.name} о курсе ${studentReview.course}`,
          description: studentReview.title,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Отзывы", path: "/reviews" },
          { name: studentReview.name, path: getStudentReviewTextPath(studentReview) },
        ])}
      />
      <App initialRoute={route} />
    </>
  );
}
