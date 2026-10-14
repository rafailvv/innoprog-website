import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import { CPP_COURSE_KEYWORDS } from "../courseKeywords";
import {
  CPP_COURSE_OG_IMAGE_PATH,
  COURSE_OG_IMAGE_SIZE,
  JsonLd,
  breadcrumbJsonLd,
  cppCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title:
    "Курс C++ с нуля онлайн с наставником — ИННОПРОГ",
  description:
    "Курс C++ с нуля: 12 месяцев обучения с наставником, алгоритмы, ООП, STL, CMake и Linux. Практика и проекты в портфолио. От 7 990 ₽ в месяц в ИННОПРОГ.",
  absoluteTitle: true,
  path: "/cpp-developer-course",
  keywords: CPP_COURSE_KEYWORDS,
  ogImage: CPP_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс C++ разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function CppCourseRoute() {
  return (
    <>
      <JsonLd data={cppCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/cpp-developer-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/cpp-developer-course",
          name: "Курс C++ разработчик с нуля",
          description:
            "Практический онлайн-курс C++ разработчик с C++, алгоритмами, STL, ООП, Git, CMake, SQL, Linux, тестами и 15 проектами",
          primaryEntityId: "https://innoprog.ru/cpp-developer-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "C++ разработчик", path: "/cpp-developer-course" },
        ])}
      />
      <App key="cpp-developer-course" initialRoute={{ page: "cppCourse" }} />
    </>
  );
}
