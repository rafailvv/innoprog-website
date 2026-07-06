import { notFound, permanentRedirect } from "next/navigation";
import {
  findStudentReviewByRouteSlug,
  getStudentReviewPath,
  STUDENT_REVIEWS,
} from "../../../studentReviewsData";

export function generateStaticParams() {
  return STUDENT_REVIEWS.map((review) => ({ review: review.id }));
}

export default async function LegacyStudentReviewRoute({
  params,
}: {
  params: Promise<{ review: string }>;
}) {
  const { review } = await params;
  const studentReview = findStudentReviewByRouteSlug(review);

  if (!studentReview) {
    notFound();
  }

  permanentRedirect(getStudentReviewPath(studentReview));
}
