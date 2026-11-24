import App from "../../App";
import { HOME_CRITICAL_IMAGE_URLS } from "../../homeCriticalAssets";
import { createPageMetadata } from "../../seo";
import { HomeAudience } from "./HomeAudience";

export const metadata = createPageMetadata({
  title: "Предпросмотр главной",
  description: "Макет главной страницы ИННОПРОГ с блоком «Кому подойдёт обучение».",
  path: "/preview/home",
  noIndex: true,
});

export default function HomePreviewPage() {
  return (
    <>
      {HOME_CRITICAL_IMAGE_URLS.map((href) => (
        <link key={href} rel="preload" as="image" href={href} fetchPriority="high" />
      ))}
      <App initialRoute={{ page: "home" }} homeBeforeCourses={<HomeAudience />} />
    </>
  );
}
