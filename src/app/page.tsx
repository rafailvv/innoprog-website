import App from "./App";
import {
  JsonLd,
  breadcrumbJsonLd,
  courseJsonLd,
  createPageMetadata,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "./seo";

export const metadata = createPageMetadata({
  title: "ИННОПРОГ - онлайн-школа программирования",
  description:
    "Онлайн-школа ИННОПРОГ: курсы программирования для взрослых с практикой, наставниками, собственной платформой и поддержкой в обучении.",
  path: "/",
  keywords: ["обучение Python", "курсы IT онлайн", "онлайн обучение программированию"],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: "ИННОПРОГ - онлайн-школа программирования",
          description:
            "Курсы программирования с практикой, наставниками, платформой и поддержкой учеников.",
        })}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }])} />
      <App initialRoute={{ page: "home" }} />
    </>
  );
}
