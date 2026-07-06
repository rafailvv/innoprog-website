import { notFound, permanentRedirect } from "next/navigation";
import {
  findStudentReviewByRouteSlug,
  getReviewCoursePath,
  getStudentReviewPath,
  STUDENT_REVIEWS,
} from "../../../studentReviewsData";

function getValidStudentReview(course: string, review: string) {
  const coursePath = `/${course}`;
  const studentReview = findStudentReviewByRouteSlug(review);

  if (
    !studentReview ||
    getReviewCoursePath(studentReview.direction) !== coursePath
  ) {
    return null;
  }

  return studentReview;
}

export function generateStaticParams() {
  return STUDENT_REVIEWS
    .filter((studentReview) => studentReview.direction !== "python" && !studentReview.courseReviewKey)
    .map((studentReview) => ({
      course: getReviewCoursePath(studentReview.direction).slice(1),
      review: studentReview.id,
    }));
}

export default async function LegacyCourseReviewRoute({
  params,
}: {
  params: Promise<{ course: string; review: string }>;
}) {
  const { course, review } = await params;
  const studentReview = getValidStudentReview(course, review);

  if (!studentReview) {
    notFound();
  }

  permanentRedirect(getStudentReviewPath(studentReview));
}
