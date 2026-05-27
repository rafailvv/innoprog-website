import App from "../App";
import { JsonLd, createPageMetadata, organizationJsonLd } from "../seo";

export const metadata = createPageMetadata({
  title: "О нас",
  description: "О школе ИННОПРОГ, миссии, документах и подходе к обучению программированию.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <App initialRoute={{ page: "about" }} />
    </>
  );
}
