import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
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

export const metadata = createPageMetadata({
  title: "Курс Мобильный разработчик с нуля",
  description:
    "Курс Мобильный разработчик в ИННОПРОГ: Dart, Flutter, API, локальное хранение, Android/iOS, тестирование и 15 проектов за 28 учебных недель",
  path: "/mobile-developer-course",
  keywords: [
    "курс мобильный разработчик",
    "мобильный разработчик с наставником",
    "обучение Flutter онлайн",
    "курс Dart Flutter",
    "курс мобильная разработка Flutter",
  ],
  ogImage: MOBILE_DEVELOPER_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Мобильный разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function MobileDeveloperCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс мобильный разработчик с наставником и проектами в портфолио</h1>
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
      <App initialRoute={{ page: "mobileDeveloperCourse" }} />
    </>
  );
}
