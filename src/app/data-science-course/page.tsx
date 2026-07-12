import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import { DATA_SCIENCE_COURSE_KEYWORDS } from "../courseKeywords";
import {
  DATA_SCIENCE_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_SECTION_HEADINGS,
  SeoSectionHeadings,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  dataScienceCourseJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title:
    "Курс Data Science с нуля: онлайн-обучение анализу данных и машинному обучению для начинающих — ИННОПРОГ",
  description:
    "Онлайн-курс «Data Science» с нуля от ИННОПРОГ. 10 месяцев обучения Python, SQL, анализу данных и машинному обучению: программа обучения, цены, диплом о профессиональной переподготовке и помощь в трудоустройстве.",
  absoluteTitle: true,
  path: "/data-science-course",
  keywords: DATA_SCIENCE_COURSE_KEYWORDS,
  ogImage: DATA_SCIENCE_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Data Science с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function DataScienceCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс Data Science с наставником и проектами в портфолио</h1>
      <SeoSectionHeadings headings={COURSE_SECTION_HEADINGS} />
      <JsonLd data={dataScienceCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/data-science-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/data-science-course",
          name: "Курс Data Science с нуля",
          description:
            "Практический онлайн-курс Data Science с Python, SQL, машинным обучением, MLOps и 13 проектными работами",
          primaryEntityId: "https://innoprog.ru/data-science-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Data Science", path: "/data-science-course" },
        ])}
      />
      <App initialRoute={{ page: "dataScienceCourse" }} />
    </>
  );
}
