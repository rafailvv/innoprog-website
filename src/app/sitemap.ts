import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

const UPDATED_AT = new Date("2026-07-13T00:00:00.000Z");

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

const routes = [...baseRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: UPDATED_AT,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
