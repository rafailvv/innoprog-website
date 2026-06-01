import App from "../App";
import { JsonLd, breadcrumbJsonLd, courseJsonLd, createPageMetadata, webPageJsonLd } from "../seo";

export const metadata = createPageMetadata({
  title: "Тарифы",
  description: "Тарифы обучения в ИННОПРОГ: базовый, оптимальный и премиальный форматы.",
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
          description: "Тарифы обучения в ИННОПРОГ: базовый, оптимальный и премиальный форматы.",
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
