import App from "../App";
import { JsonLd, breadcrumbJsonLd, createPageMetadata, organizationJsonLd, webPageJsonLd } from "../seo";

const ABOUT_DESCRIPTION =
  "О школе ИННОПРОГ: миссия, документы, юридическая информация и подход к обучению программированию с практикой, наставниками и поддержкой";

export const metadata = createPageMetadata({
  title: "О нас",
  description: ABOUT_DESCRIPTION,
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
          description: ABOUT_DESCRIPTION,
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
