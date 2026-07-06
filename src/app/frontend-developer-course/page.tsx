import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
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
  title: "Курс Frontend-разработчик с нуля",
  description:
    "Курс Frontend-разработчик в ИННОПРОГ: HTML, CSS, JavaScript, TypeScript, React, API, тесты и 15 проектных работ за 28 учебных недель",
  path: "/frontend-developer-course",
  keywords: [
    "курс Frontend-разработчик",
    "Frontend-разработчик с наставником",
    "обучение frontend онлайн",
    "курс React с нуля",
    "курс JavaScript TypeScript",
  ],
  ogImage: FRONTEND_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Frontend-разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function FrontendCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс Frontend-разработчик с наставником и проектами в портфолио</h1>
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
