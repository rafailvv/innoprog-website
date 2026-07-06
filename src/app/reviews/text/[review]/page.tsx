import { notFound, permanentRedirect } from "next/navigation";
import {
  findStudentReviewByRouteSlug,
  getStudentReviewPath,
} from "../../../studentReviewsData";

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
