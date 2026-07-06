import { notFound, permanentRedirect } from "next/navigation";
import {
  findStudentReviewByRouteSlug,
  getStudentReviewPath,
  getStudentReviewSlug,
  STUDENT_REVIEWS,
} from "../../../studentReviewsData";

const LEGACY_PYTHON_REVIEW_ROUTES = new Set([
  "maria",
  "vladimir",
  "vildan",
  "veniamin",
  "ilya",
  "andrey",
]);

export function generateStaticParams() {
  const routes = new Set([
    ...LEGACY_PYTHON_REVIEW_ROUTES,
    ...STUDENT_REVIEWS
      .filter((studentReview) => studentReview.direction === "python")
      .map((studentReview) => getStudentReviewSlug(studentReview)),
  ]);

  return Array.from(routes).map((review) => ({ review }));
}

export default async function LegacyPythonReviewRoute({
  params,
}: {
  params: Promise<{ review: string }>;
}) {
  const { review } = await params;
  const studentReview = findStudentReviewByRouteSlug(review);

  if (studentReview && studentReview.direction === "python") {
    permanentRedirect(getStudentReviewPath(studentReview));
  }

  if (LEGACY_PYTHON_REVIEW_ROUTES.has(review)) {
    permanentRedirect("/reviews?direction=python");
  }

  notFound();
}
