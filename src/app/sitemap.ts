import type { MetadataRoute } from "next";
import { CPP_COURSE_OG_IMAGE_PATH, DATA_ANALYST_COURSE_OG_IMAGE_PATH, DATA_SCIENCE_COURSE_OG_IMAGE_PATH, DEFAULT_OG_IMAGE_PATH, FRONTEND_COURSE_OG_IMAGE_PATH, JAVA_COURSE_OG_IMAGE_PATH, ML_ENGINEER_COURSE_OG_IMAGE_PATH, MOBILE_DEVELOPER_COURSE_OG_IMAGE_PATH, PYTHON_COURSE_OG_IMAGE_PATH, SITE_URL, UNREAL_ENGINE_COURSE_OG_IMAGE_PATH, absoluteUrl } from "./seo";

const UPDATED_AT = new Date("2026-07-12T00:00:00.000Z");

const baseRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1, image: DEFAULT_OG_IMAGE_PATH },
  { path: "/python-course", changeFrequency: "weekly", priority: 0.9, image: PYTHON_COURSE_OG_IMAGE_PATH },
  { path: "/data-science-course", changeFrequency: "weekly", priority: 0.9, image: DATA_SCIENCE_COURSE_OG_IMAGE_PATH },
  { path: "/frontend-developer-course", changeFrequency: "weekly", priority: 0.9, image: FRONTEND_COURSE_OG_IMAGE_PATH },
  { path: "/data-analyst-course", changeFrequency: "weekly", priority: 0.9, image: DATA_ANALYST_COURSE_OG_IMAGE_PATH },
  { path: "/cpp-developer-course", changeFrequency: "weekly", priority: 0.9, image: CPP_COURSE_OG_IMAGE_PATH },
  { path: "/mobile-developer-course", changeFrequency: "weekly", priority: 0.9, image: MOBILE_DEVELOPER_COURSE_OG_IMAGE_PATH },
  { path: "/unreal-engine-course", changeFrequency: "weekly", priority: 0.9, image: UNREAL_ENGINE_COURSE_OG_IMAGE_PATH },
  { path: "/java-developer-course", changeFrequency: "weekly", priority: 0.9, image: JAVA_COURSE_OG_IMAGE_PATH },
  { path: "/ml-engineer-course", changeFrequency: "weekly", priority: 0.9, image: ML_ENGINEER_COURSE_OG_IMAGE_PATH },
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
    alternates: {
      languages: {
        "ru-RU": `${SITE_URL}${route.path}`,
      },
    },
    images: [absoluteUrl("image" in route ? route.image : DEFAULT_OG_IMAGE_PATH)],
  }));
}
