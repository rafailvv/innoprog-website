import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
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

export const metadata = createPageMetadata({
  title:
    "Курс Java-разработчик с нуля: онлайн-обучение программированию на Java для начинающих — ИННОПРОГ",
  description:
    "Онлайн-курс «Java-разработчик» с нуля от ИННОПРОГ. 10 месяцев обучения Java Core, SQL, Spring Boot и backend-разработке: программа обучения, цены, диплом о профессиональной переподготовке и помощь в трудоустройстве.",
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
            "Практический онлайн-курс Java-разработчик с Java Core, ООП, SQL, PostgreSQL, JavaFX, Spring Boot, REST API, тестированием, деплоем и 15 проектами",
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
