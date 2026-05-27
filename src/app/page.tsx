import App from "./App";
import { JsonLd, courseJsonLd, createPageMetadata, organizationJsonLd, websiteJsonLd } from "./seo";

export const metadata = createPageMetadata({
  title: "ИННОПРОГ - онлайн-школа программирования",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={courseJsonLd} />
      <App initialRoute={{ page: "home" }} />
    </>
  );
}
