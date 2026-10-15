import App from "../App";
import { getCourseFaqItems } from "../../imports/courseDirectionFaqData";
import { JAVA_COURSE_KEYWORDS } from "../courseKeywords";
import {
  JAVA_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  javaCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

const courseFaqItems = getCourseFaqItems("java");

export const metadata = createPageMetadata({
  title:
    "Курс Java с нуля с наставником: Spring Boot — ИННОПРОГ",
  description:
    "Java-разработка с нуля онлайн: Java Core, ООП, SQL, PostgreSQL, Spring Boot и REST API. Индивидуальные занятия с наставником. Программа на 12 месяцев и тарифы.",
  absoluteTitle: true,
  path: "/java-developer-course",
  keywords: JAVA_COURSE_KEYWORDS,
  ogImage: JAVA_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Java-разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function JavaCourseRoute() {
  return (
    <>
      <JsonLd data={javaCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/java-developer-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/java-developer-course",
          name: "Курс Java-разработчик с нуля",
          description:
            "Практический онлайн-курс Java-разработчик с Java Core, ООП, SQL, PostgreSQL, Spring Framework и Spring Boot, REST API, тестированием, Docker, CI/CD и 15 проектами",
          primaryEntityId: "https://innoprog.ru/java-developer-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Java-разработчик", path: "/java-developer-course" },
        ])}
      />
      <App key="java-developer-course" initialRoute={{ page: "javaCourse" }} />
    </>
  );
}
