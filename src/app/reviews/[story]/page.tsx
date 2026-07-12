import { notFound } from "next/navigation";
import App, { type AppInitialRoute } from "../../App";
import {
  REVIEW_META,
  REVIEW_ROUTE_TO_KEY,
  type ReviewRoute,
  createPageMetadata,
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
    // Individual stories stay available to visitors, while /reviews remains the sole indexable reviews page.
    noIndex: true,
    follow: true,
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

  return <App initialRoute={route} />;
}
