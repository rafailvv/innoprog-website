import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, SITE_APP_ICON_PATH, SITE_APPLE_TOUCH_ICON_PATH, SITE_NAME, SITE_URL } from "./seo";

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
        src: SITE_APP_ICON_PATH,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: SITE_APPLE_TOUCH_ICON_PATH,
        sizes: "420x420",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
