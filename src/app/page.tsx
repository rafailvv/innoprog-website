import App from "./App";
import { HOME_BACKGROUND_IMAGE_URL, HOME_HERO_IMAGE_URL, HOME_HERO_IMAGE_SRCSET, HOME_HERO_IMAGE_SIZES } from "./homeCriticalAssets";
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
  "Курсы программирования для взрослых и детей с наставником. Индивидуальные онлайн-занятия, практика и проекты: Python, Java, frontend, аналитика данных и создание игр.";

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
      <link rel="preload" as="image" href={HOME_BACKGROUND_IMAGE_URL} fetchPriority="high" />
      <link rel="preload" as="image" href={HOME_HERO_IMAGE_URL} imageSrcSet={HOME_HERO_IMAGE_SRCSET} imageSizes={HOME_HERO_IMAGE_SIZES} media="(max-width: 767px)" fetchPriority="high" />
      <link rel="preload" as="image" href={HOME_HERO_IMAGE_URL} media="(min-width: 768px)" fetchPriority="high" />
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
      <App initialRoute={{ page: "home" }} />
    </>
  );
}
