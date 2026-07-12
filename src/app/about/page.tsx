import App from "../App";
import aboutHeroUrl from "../../imports/MainScreenDesktop/about-hero.opt.webp";
import {
  ABOUT_SECTION_HEADINGS,
  ABOUT_PAGE_KEYWORDS,
  JsonLd,
  SeoSectionHeadings,
  breadcrumbJsonLd,
  createPageMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "../seo";

const ABOUT_DESCRIPTION =
  "О школе ИННОПРОГ: миссия, документы, юридическая информация и подход к обучению программированию с практикой, наставниками и поддержкой";

export const metadata = createPageMetadata({
  title: "О нас",
  description: ABOUT_DESCRIPTION,
  path: "/about",
  keywords: [...ABOUT_PAGE_KEYWORDS, "ИННОПРОГ документы", "онлайн-платформа ИННОПРОГ"],
});

export default function AboutPage() {
  return (
    <>
      <link rel="preload" as="image" href={aboutHeroUrl} fetchPriority="high" />
      <SeoSectionHeadings headings={ABOUT_SECTION_HEADINGS} />
      <JsonLd data={organizationJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/about",
          name: "О нас",
          description: ABOUT_DESCRIPTION,
          pageType: "AboutPage",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "О нас", path: "/about" },
        ])}
      />
      <App initialRoute={{ page: "about" }} />
    </>
  );
}
