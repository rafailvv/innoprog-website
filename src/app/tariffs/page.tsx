import App from "../App";
import { JsonLd, breadcrumbJsonLd, courseJsonLd, createPageMetadata, webPageJsonLd } from "../seo";

const TARIFFS_DESCRIPTION =
  "Тарифы обучения в ИННОПРОГ: форматы занятий с наставником, стоимость программирования онлайн и условия выбора подходящего курса";

export const metadata = createPageMetadata({
  title: "Тарифы",
  description: TARIFFS_DESCRIPTION,
  path: "/tariffs",
  keywords: ["тарифы ИННОПРОГ", "стоимость обучения программированию", "тарифы курса Python"],
});

export default function TariffsPage() {
  return (
    <>
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/tariffs",
          name: "Тарифы обучения",
          description: TARIFFS_DESCRIPTION,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Тарифы", path: "/tariffs" },
        ])}
      />
      <App initialRoute={{ page: "tariffs" }} />
    </>
  );
}
