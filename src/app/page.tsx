import App from "./App";
import { HOME_CRITICAL_IMAGE_URLS } from "./homeCriticalAssets";
import {
  JsonLd,
  HOME_PAGE_KEYWORDS,
  HOME_PAGE_TITLE,
  breadcrumbJsonLd,
  courseCatalogJsonLd,
  createPageMetadata,
  keyPagesJsonLd,
  siteNavigationJsonLd,
  webPageJsonLd,
} from "./seo";

export const metadata = createPageMetadata({
  title: HOME_PAGE_TITLE,
  description:
    "Онлайн-школа программирования ИННОПРОГ: IT курсы с нуля Python, Data Science, Java, аналитика данных, Unreal Engine с наставником, диплом и карьерная поддержка",
  path: "/",
  keywords: [...HOME_PAGE_KEYWORDS],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      {HOME_CRITICAL_IMAGE_URLS.map((href) => (
        <link key={href} rel="preload" as="image" href={href} fetchPriority="high" />
      ))}
      <JsonLd data={siteNavigationJsonLd} />
      <JsonLd data={keyPagesJsonLd} />
      <JsonLd data={courseCatalogJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: HOME_PAGE_TITLE,
          description:
            "Курсы программирования для взрослых и детей с практикой, наставниками, платформой и поддержкой учеников",
        })}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }])} />
      <App initialRoute={{ page: "home" }} />
    </>
  );
}
