import App from "../App";
import {
  JsonLd,
  SeoSectionHeadings,
  TARIFFS_SECTION_HEADINGS,
  TARIFFS_PAGE_KEYWORDS,
  breadcrumbJsonLd,
  courseJsonLd,
  createPageMetadata,
  tariffsOfferCatalogJsonLd,
  webPageJsonLd,
} from "../seo";

const TARIFFS_DESCRIPTION =
  "Стоимость обучения в ИННОПРОГ: форматы занятий с наставником, цены на курсы программирования онлайн и условия выбора подходящей программы";

export const metadata = createPageMetadata({
  title: "Стоимость обучения",
  description: TARIFFS_DESCRIPTION,
  path: "/tariffs",
  keywords: [...TARIFFS_PAGE_KEYWORDS, "тарифы ИННОПРОГ", "тарифы курса Python"],
});

export default function TariffsPage() {
  return (
    <>
      <SeoSectionHeadings headings={TARIFFS_SECTION_HEADINGS} />
      <JsonLd data={courseJsonLd} />
      <JsonLd data={tariffsOfferCatalogJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/tariffs",
          name: "Стоимость обучения",
          description: TARIFFS_DESCRIPTION,
          primaryEntityId: "https://innoprog.ru/tariffs#course-offers",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Стоимость обучения", path: "/tariffs" },
        ])}
      />
      <App initialRoute={{ page: "tariffs" }} />
    </>
  );
}
