import { SITE_URL } from "../seo";

export const dynamic = "force-static";

// Served as a route: the robots metadata file cannot emit Clean-param.
// Clean-param tells Yandex that these parameters do not change the page;
// Host is omitted because Yandex no longer reads it.
export function GET() {
  const body = [
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /application/request",
    "Disallow: /healthz",
    "Clean-param: direction&review /reviews",
    "Clean-param: ref&amp /",
    "Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
