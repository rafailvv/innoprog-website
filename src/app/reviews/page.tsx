import App, { type AppInitialRoute } from "../App";
import {
  JsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd,
} from "../seo";

const REVIEWS_TITLE = "Отзывы учеников ИННОПРОГ";
const REVIEWS_DESCRIPTION =
  "Отзывы учеников ИННОПРОГ о курсах программирования, наставниках, практических проектах и результатах обучения в онлайн-школе.";

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

export default function ReviewsPage() {
  const route: AppInitialRoute = { page: "reviews" };

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: "/reviews",
          name: REVIEWS_TITLE,
          description: REVIEWS_DESCRIPTION,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Отзывы", path: "/reviews" },
        ])}
      />
      <App initialRoute={route} />
    </>
  );
}
