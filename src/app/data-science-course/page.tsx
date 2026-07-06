import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import {
  DATA_SCIENCE_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  dataScienceCourseJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title: "Курс Data Science с нуля",
  description:
    "Курс Data Science в ИННОПРОГ: Python, SQL, статистика, машинное обучение, MLOps и 13 проектных работ с наставником за 28 учебных недель",
  path: "/data-science-course",
  keywords: [
    "курс Data Science",
    "Data Science с наставником",
    "обучение Data Science онлайн",
    "машинное обучение с нуля",
    "Python для анализа данных",
  ],
  ogImage: DATA_SCIENCE_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Data Science с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function DataScienceCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс Data Science с наставником и проектами в портфолио</h1>
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
