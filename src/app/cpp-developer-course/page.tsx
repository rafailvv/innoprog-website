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
    "Курс C++ разработчик с нуля: онлайн-обучение программированию на C++ для начинающих — ИННОПРОГ",
  description:
    "Онлайн-курс «C++ разработчик» с нуля от ИННОПРОГ. 10 месяцев обучения C++, алгоритмам, ООП, CMake и Linux: программа обучения, цены, диплом о профессиональной переподготовке и помощь в трудоустройстве.",
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
      <App initialRoute={{ page: "cppCourse" }} />
    </>
  );
}
