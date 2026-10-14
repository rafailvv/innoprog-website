import type { MetadataRoute } from "next";
import { REVIEW_ROUTE_TO_KEY, SITE_URL } from "./seo";
import { SVEDEN_SECTION_SLUGS } from "./sveden/data";

const SVEDEN_UPDATED_AT = new Date("2026-08-01T00:00:00.000Z");
const PYTHON_PROGRAM_UPDATED_AT = new Date("2026-08-29T00:00:00.000Z");
const SEO_UPDATED_AT = new Date("2026-10-14T00:00:00.000Z");

const baseRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/python-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/data-science-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/frontend-developer-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/data-analyst-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cpp-developer-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/mobile-developer-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/unreal-engine-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/java-developer-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ml-engineer-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tariffs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reviews", changeFrequency: "monthly", priority: 0.75 },
] as const;

const routes = [
  ...baseRoutes,
  ...Object.keys(REVIEW_ROUTE_TO_KEY).map((story) => ({
    path: `/reviews/${story}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  ...SVEDEN_SECTION_SLUGS.map((section) => ({
    path: `/sveden/${section}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: !route.path.startsWith("/sveden/")
      ? SEO_UPDATED_AT
      : route.path === "/sveden/education"
        ? PYTHON_PROGRAM_UPDATED_AT
        : SVEDEN_UPDATED_AT,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
