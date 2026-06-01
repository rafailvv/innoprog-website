import App from "../App";
import { JsonLd, breadcrumbJsonLd, createPageMetadata, organizationJsonLd, webPageJsonLd } from "../seo";

export const metadata = createPageMetadata({
  title: "О нас",
  description: "О школе ИННОПРОГ, миссии, документах и подходе к обучению программированию.",
  path: "/about",
  keywords: ["о школе ИННОПРОГ", "ИННОПРОГ документы", "онлайн-платформа ИННОПРОГ"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/about",
          name: "О нас",
          description: "О школе ИННОПРОГ, миссии, документах и подходе к обучению программированию.",
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
