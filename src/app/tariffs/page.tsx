import App from "../App";
import { JsonLd, courseJsonLd, createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Тарифы",
  description: "Тарифы обучения в ИННОПРОГ: базовый, оптимальный и премиальный форматы.",
  path: "/tariffs",
});

export default function TariffsPage() {
  return (
    <>
      <JsonLd data={courseJsonLd} />
      <App initialRoute={{ page: "tariffs" }} />
    </>
  );
}
