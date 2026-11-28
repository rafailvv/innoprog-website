import App from "./App";
import { HomeAudience } from "./components/HomeAudience";
import { HOME_BACKGROUND_IMAGE, HOME_HERO_AVIF } from "./homeCriticalAssets";
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

const HOME_DESCRIPTION =
  "Курсы программирования для взрослых и детей с наставником. Индивидуальные онлайн-занятия, практика и проекты: Python, Java, frontend, аналитика, игры.";

export const metadata = createPageMetadata({
  title: HOME_PAGE_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: [...HOME_PAGE_KEYWORDS],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <link rel="preload" as="image" type="image/avif" href={HOME_HERO_AVIF} fetchPriority="high" />
      <link rel="preload" as="image" href={HOME_BACKGROUND_IMAGE} media="(min-width: 768px)" fetchPriority="low" />
      <JsonLd data={siteNavigationJsonLd} />
      <JsonLd data={keyPagesJsonLd} />
      <JsonLd data={courseCatalogJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: HOME_PAGE_TITLE,
          description: HOME_DESCRIPTION,
        })}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }])} />
      <App initialRoute={{ page: "home" }} homeBeforeCourses={<HomeAudience />} />
    </>
  );
}
