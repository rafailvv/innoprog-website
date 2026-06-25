import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import {
  JAVA_COURSE_OG_IMAGE_PATH,
  JsonLd,
  breadcrumbJsonLd,
  javaCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title: "Курс Java-разработчик с нуля",
  description:
    "Курс Java-разработчик в ИННОПРОГ: Java Core, ООП, SQL, PostgreSQL, JavaFX, Spring Boot, REST API, безопасность, тестирование и 15 проектов за 28 учебных недель",
  path: "/java-developer-course",
  keywords: [
    "курс Java",
    "Java-разработчик с наставником",
    "обучение Java онлайн",
    "курс Spring Boot",
    "курс Java backend",
  ],
  ogImage: JAVA_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Java-разработчик с нуля в ИННОПРОГ",
});

export default function JavaCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс Java-разработчик с наставником и проектами в портфолио</h1>
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
      <App initialRoute={{ page: "javaCourse" }} />
    </>
  );
}
