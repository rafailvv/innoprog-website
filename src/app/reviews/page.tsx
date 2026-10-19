import App, { type AppInitialRoute } from "../App";
import {
  JsonLd,
  REVIEWS_PAGE_KEYWORDS,
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd,
} from "../seo";

const REVIEWS_TITLE = "Отзывы учеников ИННОПРОГ";
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

const reviewsRoute: AppInitialRoute = { page: "reviews" };

export default function ReviewsPage() {
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
      <App initialRoute={reviewsRoute} />
    </>
  );
}
