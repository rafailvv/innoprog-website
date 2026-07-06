import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import {
  DATA_ANALYST_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  dataAnalystCourseJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title: "Курс Data-аналитик с нуля",
  description:
    "Курс Data-аналитик в ИННОПРОГ: SQL, Python, BI, статистика, A/B-тесты и 15 аналитических проектов за 28 учебных недель",
  path: "/data-analyst-course",
  keywords: [
    "курс Data-аналитик",
    "курс аналитик данных",
    "обучение аналитике данных онлайн",
    "курс SQL Python BI",
    "Data-аналитик с наставником",
  ],
  ogImage: DATA_ANALYST_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Data-аналитик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function DataAnalystCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс Data-аналитик с наставником и проектами в портфолио</h1>
      <JsonLd data={dataAnalystCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/data-analyst-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/data-analyst-course",
          name: "Курс Data-аналитик с нуля",
          description:
            "Практический онлайн-курс Data-аналитик с SQL, Python, BI, статистикой, A/B-тестированием и 15 аналитическими проектами",
          primaryEntityId: "https://innoprog.ru/data-analyst-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Data-аналитик", path: "/data-analyst-course" },
        ])}
      />
      <App initialRoute={{ page: "dataAnalystCourse" }} />
    </>
  );
}
