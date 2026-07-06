import App, { type AppInitialRoute } from "../App";
import {
  findStudentReviewByRouteSlug,
  getStudentReviewPath,
  getStudentReviewSlug,
} from "../studentReviewsData";
import {
  JsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd,
} from "../seo";

const REVIEWS_TITLE = "Отзывы учеников ИННОПРОГ";
const REVIEWS_DESCRIPTION =
  "Отзывы учеников ИННОПРОГ о курсах программирования, наставниках, практических проектах и результатах обучения в онлайн-школе";

export const metadata = createPageMetadata({
  title: REVIEWS_TITLE,
  description: REVIEWS_DESCRIPTION,
  path: "/reviews",
  keywords: [
    "отзывы ИННОПРОГ",
    "отзывы онлайн школа программирования",
    "отзывы курс Python-разработчик",
    "истории учеников ИННОПРОГ",
  ],
});

type ReviewsPageProps = {
  searchParams?: Promise<{
    direction?: string | string[];
    review?: string | string[];
  }>;
};

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const params = await searchParams;
  const direction = Array.isArray(params?.direction) ? params.direction[0] : params?.direction;
  const reviewSlug = Array.isArray(params?.review) ? params.review[0] : params?.review;
  const studentReview = findStudentReviewByRouteSlug(reviewSlug);
  const route: AppInitialRoute = studentReview
    ? { page: "studentReview", review: studentReview.id }
    : { page: "reviews", direction };
  const pagePath = studentReview ? getStudentReviewPath(studentReview) : "/reviews";
  const pageTitle = studentReview
    ? `Отзыв ${studentReview.name} о курсе ${studentReview.course}`
    : REVIEWS_TITLE;
  const pageDescription = studentReview
    ? `${studentReview.title}. Отзыв ученика ИННОПРОГ о курсе ${studentReview.course}`
    : REVIEWS_DESCRIPTION;

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: pagePath,
          name: pageTitle,
          description: pageDescription,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Отзывы", path: "/reviews" },
          ...(studentReview
            ? [{ name: studentReview.name, path: getStudentReviewPath(getStudentReviewSlug(studentReview)) }]
            : []),
        ])}
      />
      <App initialRoute={route} />
    </>
  );
}
