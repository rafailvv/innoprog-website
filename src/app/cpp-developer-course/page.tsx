import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
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
  title: "Курс C++ разработчик с нуля",
  description:
    "Курс C++ разработчик в ИННОПРОГ: C++, алгоритмы, STL, ООП, Git, CMake, SQL, Linux, тестирование и 15 проектов за 28 учебных недель",
  path: "/cpp-developer-course",
  keywords: [
    "курс C++ разработчик",
    "C++ разработчик с наставником",
    "обучение C++ онлайн",
    "курс CMake Linux",
    "курс алгоритмы и структуры данных C++",
  ],
  ogImage: CPP_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс C++ разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function CppCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс C++ разработчик с наставником и проектами в портфолио</h1>
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
