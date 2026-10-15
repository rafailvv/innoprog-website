import type { MetadataRoute } from "next";
import { REVIEW_ROUTE_TO_KEY, SITE_URL } from "./seo";
import { childrenCoursePaths } from "./children/courses/course-paths";
import { SVEDEN_SECTION_SLUGS } from "./sveden/data";

const SVEDEN_UPDATED_AT = new Date("2026-08-01T00:00:00.000Z");
const PYTHON_PROGRAM_UPDATED_AT = new Date("2026-08-29T00:00:00.000Z");
const SEO_UPDATED_AT = new Date("2026-10-14T00:00:00.000Z");
// Dates represent substantial published changes, not the time of a request/build.
const PAGE_UPDATED_AT: Readonly<Record<string, string>> = {
  "/": "2026-10-15", "/python-course": "2026-10-15",
  "/data-science-course": "2026-10-15", "/frontend-developer-course": "2026-10-15",
  "/data-analyst-course": "2026-10-15", "/cpp-developer-course": "2026-10-15",
  "/mobile-developer-course": "2026-10-15", "/unreal-engine-course": "2026-10-15",
  "/java-developer-course": "2026-10-15", "/ml-engineer-course": "2026-10-15",
  "/children": "2026-10-15",
  "/children/courses/python": "2026-10-15",
  "/children/courses/web-development": "2026-10-15",
  "/children/courses/informatics-exams": "2026-10-15",
  "/children/courses/olympiad-programming": "2026-10-15",
  "/children/courses/neural-networks": "2026-10-15",
  "/children/courses/game-development": "2026-10-15",
};

const baseRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/python-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/data-science-course", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/frontend-developer-course",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  { path: "/data-analyst-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cpp-developer-course", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/mobile-developer-course",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  { path: "/unreal-engine-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/java-developer-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ml-engineer-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tariffs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reviews", changeFrequency: "monthly", priority: 0.75 },
] as const;

const routes = [
  ...baseRoutes,
  {
    path: "/children",
    changeFrequency: "weekly" as const,
    priority: 0.85,
  },
  ...Object.values(childrenCoursePaths).map((path) => ({
    path,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  ...["amir", "eldar", "almaz"].map((slug) => ({
    path: `/children/stories/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  })),
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
      ? PAGE_UPDATED_AT[route.path] ? new Date(`${PAGE_UPDATED_AT[route.path]}T00:00:00.000Z`) : SEO_UPDATED_AT
      : route.path === "/sveden/education"
        ? PYTHON_PROGRAM_UPDATED_AT
        : SVEDEN_UPDATED_AT,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
