import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, SITE_FAVICON_PATH, SITE_LOGO_PATH, SITE_NAME, SITE_URL } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: SITE_URL,
    name: "ИННОПРОГ Education",
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9c78ff",
    lang: "ru-RU",
    icons: [
      {
        src: SITE_FAVICON_PATH,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: SITE_LOGO_PATH,
        sizes: "1256x296",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
