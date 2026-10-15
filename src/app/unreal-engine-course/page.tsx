import App from "../App";
import { getCourseFaqItems } from "../../imports/courseDirectionFaqData";
import { UNREAL_ENGINE_COURSE_KEYWORDS } from "../courseKeywords";
import {
  UNREAL_ENGINE_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  unrealEngineCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

const courseFaqItems = getCourseFaqItems("unreal");

export const metadata = createPageMetadata({
  title:
    "Курс Unreal Engine с нуля: разработка игр онлайн — ИННОПРОГ",
  description:
    "Курс Unreal Engine с нуля: 10 месяцев обучения с наставником, Unreal Engine 5, Blueprint, игровые механики и 6 проектов. От 7 990 ₽ в месяц в ИННОПРОГ.",
  absoluteTitle: true,
  path: "/unreal-engine-course",
  keywords: UNREAL_ENGINE_COURSE_KEYWORDS,
  ogImage: UNREAL_ENGINE_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Unreal Engine с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function UnrealEngineCourseRoute() {
  return (
    <>
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
      <App key="unreal-engine-course" initialRoute={{ page: "unrealEngineCourse" }} />
    </>
  );
}
