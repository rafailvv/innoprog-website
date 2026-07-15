import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import { FRONTEND_COURSE_KEYWORDS } from "../courseKeywords";
import {
  FRONTEND_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  frontendCourseJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title:
    "Курс Frontend-разработчик с нуля: онлайн-обучение веб-разработке для начинающих — ИННОПРОГ",
  description:
    "Онлайн-курс «Frontend-разработчик» с нуля от ИННОПРОГ. 10 месяцев обучения HTML, CSS, JavaScript, TypeScript и React: программа обучения, цены, диплом о профессиональной переподготовке и помощь в трудоустройстве.",
  absoluteTitle: true,
  path: "/frontend-developer-course",
  keywords: FRONTEND_COURSE_KEYWORDS,
  ogImage: FRONTEND_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Frontend-разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function FrontendCourseRoute() {
  return (
    <>
      <JsonLd data={frontendCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/frontend-developer-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/frontend-developer-course",
          name: "Курс Frontend-разработчик с нуля",
          description:
            "Практический онлайн-курс Frontend-разработчик с HTML, CSS, JavaScript, TypeScript, React, API, тестами и 15 проектными работами",
          primaryEntityId: "https://innoprog.ru/frontend-developer-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Frontend-разработчик", path: "/frontend-developer-course" },
        ])}
      />
      <App initialRoute={{ page: "frontendCourse" }} />
    </>
  );
}
