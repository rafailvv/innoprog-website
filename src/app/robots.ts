import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

const SITE_HOST = new URL(SITE_URL).host;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/application/request", "/healthz"],
      },
    ],
    host: SITE_HOST,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
