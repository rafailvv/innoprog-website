import App from "./App";
import {
  JsonLd,
  HOME_PAGE_KEYWORDS,
  HOME_PAGE_TITLE,
  breadcrumbJsonLd,
  courseCatalogJsonLd,
  courseJsonLd,
  createPageMetadata,
  keyPagesJsonLd,
  organizationJsonLd,
  siteNavigationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "./seo";

export const metadata = createPageMetadata({
  title: HOME_PAGE_TITLE,
  description:
    "Онлайн-школа программирования ИННОПРОГ: IT курсы с нуля Python, Data Science, Java, аналитика данных, Unreal Engine с наставником, диплом и трудоустройство",
  path: "/",
  keywords: [...HOME_PAGE_KEYWORDS],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={siteNavigationJsonLd} />
      <JsonLd data={keyPagesJsonLd} />
      <JsonLd data={courseCatalogJsonLd} />
      <JsonLd data={courseJsonLd} />
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
