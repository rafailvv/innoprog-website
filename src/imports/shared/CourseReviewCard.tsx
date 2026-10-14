import { STUDENT_REVIEWS, getStudentReviewPath, type StudentReview } from "../../app/studentReviewsData";

type Props = { direction: StudentReview["direction"]; index: number; className: string };

// Render the same published card on the server and client, without DOM replacement.
export function CourseReviewCard({ direction, index, className }: Props) {
  const review = STUDENT_REVIEWS.filter((item) => item.direction === direction)[index];
  if (!review) return null;
  return (
    <a
      className={`${className} site-course-review-card--dynamic`}
      data-course-review={review.courseReviewKey}
      data-student-review={review.courseReviewKey ? undefined : review.id}
      draggable={false}
      href={getStudentReviewPath(review)}
    >
      <span className="site-course-direction-review-card">
        <span className="site-course-direction-review-card__head">
          <span className="site-course-direction-review-card__avatar">{review.name.trim().charAt(0).toUpperCase() || "И"}</span>
          <span className="site-course-direction-review-card__person"><strong>{review.name}</strong><span>{review.age}</span></span>
          <span className="site-course-direction-review-card__rating">{review.rating} ★</span>
        </span>
        <span className="site-course-direction-review-card__course">Курс: {review.course}</span>
        <span className="site-course-direction-review-card__title">{review.title}</span>
        <span className="site-course-direction-review-card__body">{review.body}</span>
        <span className="site-course-direction-review-card__read-more">читать полностью</span>
      </span>
    </a>
  );
}
