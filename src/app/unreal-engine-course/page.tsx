import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import {
  UNREAL_ENGINE_COURSE_OG_IMAGE_PATH,
  JsonLd,
  breadcrumbJsonLd,
  unrealEngineCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title: "Курс Unreal Engine с нуля",
  description:
    "Курс Unreal Engine в ИННОПРОГ: Unreal Engine 5, Blueprint, игровые механики, UMG, State Tree, оптимизация и 6 проектов за 28 учебных недель",
  path: "/unreal-engine-course",
  keywords: [
    "курс Unreal Engine",
    "Unreal Engine с наставником",
    "обучение Unreal Engine онлайн",
    "курс Unreal Engine 5 Blueprint",
    "курс разработка игр Unreal Engine",
  ],
  ogImage: UNREAL_ENGINE_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Unreal Engine с нуля в ИННОПРОГ",
});

export default function UnrealEngineCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс Unreal Engine с наставником и проектами в портфолио</h1>
      <JsonLd data={unrealEngineCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/unreal-engine-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/unreal-engine-course",
          name: "Курс Unreal Engine с нуля",
          description:
            "Практический онлайн-курс Unreal Engine с Unreal Engine 5, Blueprint, игровыми механиками, UMG, State Tree, оптимизацией и 6 проектами",
          primaryEntityId: "https://innoprog.ru/unreal-engine-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Unreal Engine", path: "/unreal-engine-course" },
        ])}
      />
      <App initialRoute={{ page: "unrealEngineCourse" }} />
    </>
  );
}
