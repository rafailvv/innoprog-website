import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

const routes = ["/", "/about", "/tariffs", "/reviews/kirill", "/reviews/anastasia", "/reviews/mikhail"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
