import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import { DATA_ANALYST_COURSE_KEYWORDS } from "../courseKeywords";
import {
  DATA_ANALYST_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_SECTION_HEADINGS,
  SeoSectionHeadings,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  dataAnalystCourseJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title:
    "Курс Data-аналитик с нуля: онлайн-обучение анализу данных для начинающих — ИННОПРОГ",
  description:
    "Онлайн-курс «Data-аналитик» с нуля от ИННОПРОГ. 10 месяцев обучения SQL, Python, BI, статистике и A/B-тестированию: программа обучения, цены, диплом о профессиональной переподготовке и помощь в трудоустройстве.",
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
      <h1 className="site-seo-heading">Курс Data-аналитик с наставником и проектами в портфолио</h1>
      <SeoSectionHeadings headings={COURSE_SECTION_HEADINGS} />
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
