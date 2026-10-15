import App from "../App";
import { getCourseFaqItems } from "../../imports/courseDirectionFaqData";
import { MOBILE_DEVELOPER_COURSE_KEYWORDS } from "../courseKeywords";
import {
  MOBILE_DEVELOPER_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  mobileDeveloperCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

const courseFaqItems = getCourseFaqItems("mobile");

export const metadata = createPageMetadata({
  title:
    "Курс Flutter и Dart с нуля: мобильная разработка — ИННОПРОГ",
  description:
    "Курс мобильной разработки на Flutter и Dart с нуля: интерфейсы, API, хранение данных и тестирование. 10 месяцев индивидуального обучения онлайн с наставником.",
  absoluteTitle: true,
  path: "/mobile-developer-course",
  keywords: MOBILE_DEVELOPER_COURSE_KEYWORDS,
  ogImage: MOBILE_DEVELOPER_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Мобильный разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function MobileDeveloperCourseRoute() {
  return (
    <>
      <JsonLd data={mobileDeveloperCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/mobile-developer-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/mobile-developer-course",
          name: "Курс Мобильный разработчик с нуля",
          description:
            "Практический онлайн-курс мобильный разработчик с Dart, Flutter, API, локальным хранением, тестами, публикацией и 15 проектами",
          primaryEntityId: "https://innoprog.ru/mobile-developer-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Мобильный разработчик", path: "/mobile-developer-course" },
        ])}
      />
      <App key="mobile-developer-course" initialRoute={{ page: "mobileDeveloperCourse" }} />
    </>
  );
}
