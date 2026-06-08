import type { MetadataRoute } from "next";
import { SITE_LOGO_PATH, SITE_URL, absoluteUrl } from "./seo";

const UPDATED_AT = new Date("2026-06-01T00:00:00.000Z");

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/python-course", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tariffs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reviews/kirill", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reviews/anastasia", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reviews/mikhail", changeFrequency: "monthly", priority: 0.7 },
  { path: "/python-course/reviews/maria", changeFrequency: "monthly", priority: 0.65 },
  { path: "/python-course/reviews/vladimir", changeFrequency: "monthly", priority: 0.65 },
  { path: "/python-course/reviews/vildan", changeFrequency: "monthly", priority: 0.65 },
  { path: "/python-course/reviews/veniamin", changeFrequency: "monthly", priority: 0.65 },
  { path: "/python-course/reviews/ilya", changeFrequency: "monthly", priority: 0.65 },
  { path: "/python-course/reviews/andrey", changeFrequency: "monthly", priority: 0.65 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: UPDATED_AT,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        "ru-RU": `${SITE_URL}${route.path}`,
      },
    },
    images: [absoluteUrl(SITE_LOGO_PATH)],
  }));
}
