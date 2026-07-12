import App from "./App";
import {
  JsonLd,
  breadcrumbJsonLd,
  courseCatalogJsonLd,
  courseJsonLd,
  createPageMetadata,
  keyPagesJsonLd,
  organizationJsonLd,
  siteNavigationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "./seo";

export const metadata = createPageMetadata({
  title: "ИННОПРОГ – курсы программирования для взрослых и детей",
  description:
    "Онлайн-школа программирования ИННОПРОГ: IT курсы с нуля Python, Data Science, Java, аналитика данных, Unreal Engine с наставником, диплом и трудоустройство",
  path: "/",
  keywords: ["обучение Python", "курсы IT онлайн", "онлайн обучение программированию", "курсы программирования для детей"],
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <h1 className="site-seo-heading">ИННОПРОГ - онлайн школа программирования</h1>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={siteNavigationJsonLd} />
      <JsonLd data={keyPagesJsonLd} />
      <JsonLd data={courseCatalogJsonLd} />
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: "ИННОПРОГ - онлайн школа программирования",
          description:
            "Курсы программирования для взрослых и детей с практикой, наставниками, платформой и поддержкой учеников",
        })}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }])} />
      <App initialRoute={{ page: "home" }} />
    </>
  );
}
