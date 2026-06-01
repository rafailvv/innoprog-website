import { notFound } from "next/navigation";
import App, { type AppInitialRoute } from "../../App";
import {
  JsonLd,
  REVIEW_META,
  REVIEW_ROUTE_TO_KEY,
  type ReviewRoute,
  breadcrumbJsonLd,
  createPageMetadata,
  reviewJsonLd,
  webPageJsonLd,
} from "../../seo";

function isReviewRoute(value: string): value is ReviewRoute {
  return Object.prototype.hasOwnProperty.call(REVIEW_ROUTE_TO_KEY, value);
}

export function generateStaticParams() {
  return Object.keys(REVIEW_ROUTE_TO_KEY).map((story) => ({ story }));
}

export async function generateMetadata({ params }: { params: Promise<{ story: string }> }) {
  const { story } = await params;

  if (!isReviewRoute(story)) {
    return {};
  }

  const meta = REVIEW_META[story];

  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/reviews/${story}`,
    keywords: [`отзыв ${meta.name} ИННОПРОГ`, `история ${meta.name}`, `отзывы ИННОПРОГ`, meta.course],
  });
}

export default async function ReviewPage({ params }: { params: Promise<{ story: string }> }) {
  const { story } = await params;

  if (!isReviewRoute(story)) {
    notFound();
  }

  const route: AppInitialRoute = {
    page: "review",
    story: REVIEW_ROUTE_TO_KEY[story],
  };
  const meta = REVIEW_META[story];

  return (
    <>
      <JsonLd data={reviewJsonLd(story)} />
      <JsonLd
        data={webPageJsonLd({
          path: `/reviews/${story}`,
          name: meta.title,
          description: meta.description,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Отзывы", path: "/reviews/kirill" },
          { name: meta.name, path: `/reviews/${story}` },
        ])}
      />
      <App initialRoute={route} />
    </>
  );
}
