import App, { type AppInitialRoute } from "../App";
import {
  JsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
  reviewsItemListJsonLd,
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
          primaryEntityId: "https://innoprog.ru/reviews#student-reviews",
        })}
      />
      <JsonLd data={reviewsItemListJsonLd} />
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
