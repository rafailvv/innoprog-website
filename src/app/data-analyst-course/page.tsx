import App from "../App";
import { getCourseFaqItems } from "../../imports/courseDirectionFaqData";
import { DATA_ANALYST_COURSE_KEYWORDS } from "../courseKeywords";
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

const courseFaqItems = getCourseFaqItems("dataAnalyst");

export const metadata = createPageMetadata({
  title:
    "Курс аналитика данных с нуля: SQL, Python и BI — ИННОПРОГ",
  description:
    "Курс аналитика данных с нуля: 10 месяцев обучения с наставником, SQL, Python, BI, статистика и A/B-тестирование. От 7 990 ₽ в месяц в ИННОПРОГ.",
  absoluteTitle: true,
  path: "/data-analyst-course",
  keywords: DATA_ANALYST_COURSE_KEYWORDS,
  ogImage: DATA_ANALYST_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Data-аналитик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function DataAnalystCourseRoute() {
  return (
    <>
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
      <App key="data-analyst-course" initialRoute={{ page: "dataAnalystCourse" }} />
    </>
  );
}
