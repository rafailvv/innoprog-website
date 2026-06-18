import { notFound } from "next/navigation";
import App, { type AppInitialRoute } from "../../../App";
import {
  findStudentReviewById,
  getStudentReviewPath,
  STUDENT_REVIEWS,
} from "../../../studentReviewsData";
import {
  JsonLd,
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd,
} from "../../../seo";

function createDescription(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= 155) {
    return normalized;
  }

  return `${normalized.slice(0, 152).replace(/\s+\S*$/, "")}...`;
}

export function generateStaticParams() {
  return STUDENT_REVIEWS
    .filter((review) => !review.courseReviewKey)
    .map((review) => ({ review: review.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ review: string }> }) {
  const { review } = await params;
  const studentReview = findStudentReviewById(review);

  if (!studentReview || studentReview.courseReviewKey) {
    return {};
  }

  return createPageMetadata({
    title: `Отзыв ${studentReview.name} о курсе ${studentReview.course}`,
    description: createDescription(studentReview.body),
    path: getStudentReviewPath(studentReview.id),
    keywords: [
      `отзыв ${studentReview.name} ИННОПРОГ`,
      `отзывы ${studentReview.course}`,
      "отзывы учеников ИННОПРОГ",
    ],
  });
}

export default async function StudentReviewRoute({ params }: { params: Promise<{ review: string }> }) {
  const { review } = await params;
  const studentReview = findStudentReviewById(review);

  if (!studentReview || studentReview.courseReviewKey) {
    notFound();
  }

  const path = getStudentReviewPath(studentReview.id);
  const title = `Отзыв ${studentReview.name} о курсе ${studentReview.course}`;
  const description = createDescription(studentReview.body);
  const route: AppInitialRoute = {
    page: "studentReview",
    review: studentReview.id,
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Review",
          "@id": `${absoluteUrl(path)}#review`,
          name: title,
          reviewBody: studentReview.body,
          url: absoluteUrl(path),
          author: {
            "@type": "Person",
            name: studentReview.name,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: studentReview.rating,
            bestRating: "5",
            worstRating: "1",
          },
          itemReviewed: {
            "@type": "Course",
            name: studentReview.course,
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
          path,
          name: title,
          description,
          primaryEntityId: `${absoluteUrl(path)}#review`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Отзывы", path: "/reviews" },
          { name: studentReview.name, path },
        ])}
      />
      <App initialRoute={route} />
    </>
  );
}
