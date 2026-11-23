import App, { type AppInitialRoute } from "../App";
import { findStudentReviewByRouteSlug, normalizeReviewsDirectionKey } from "../studentReviewsData";
import {
  JsonLd,
  REVIEWS_PAGE_KEYWORDS,
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd,
} from "../seo";

const REVIEWS_TITLE = "Отзывы о курсах программирования и преподавателях";
const REVIEWS_DESCRIPTION =
  "Отзывы учеников ИННОПРОГ о курсах программирования, наставниках, практических проектах и результатах обучения в онлайн-школе";

export async function generateMetadata({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const isFiltered = query.direction !== undefined || query.review !== undefined;
  return createPageMetadata({
    title: REVIEWS_TITLE,
    description: REVIEWS_DESCRIPTION,
    path: "/reviews",
    keywords: [...REVIEWS_PAGE_KEYWORDS],
    noIndex: isFiltered,
    follow: true,
  });
}

export default async function ReviewsPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { direction, review } = await searchParams;
  const item = findStudentReviewByRouteSlug(Array.isArray(review) ? review[0] : review);
  const initialRoute: AppInitialRoute = item
    ? { page: "studentReview", review: item.id }
    : { page: "reviews", direction: normalizeReviewsDirectionKey(Array.isArray(direction) ? direction[0] : direction) };

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: "/reviews",
          name: REVIEWS_TITLE,
          description: REVIEWS_DESCRIPTION,
          pageType: "CollectionPage",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Отзывы", path: "/reviews" },
        ])}
      />
      <App initialRoute={initialRoute} />
    </>
  );
}
