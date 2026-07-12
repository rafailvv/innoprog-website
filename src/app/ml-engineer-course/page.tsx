import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import { ML_ENGINEER_COURSE_KEYWORDS } from "../courseKeywords";
import {
  ML_ENGINEER_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_SECTION_HEADINGS,
  SeoSectionHeadings,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  mlEngineerCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title:
    "Курс ML-инженер с нуля: онлайн-обучение машинному обучению для начинающих — ИННОПРОГ",
  description:
    "Онлайн-курс «ML-инженер» с нуля от ИННОПРОГ. 10 месяцев обучения Python, SQL, машинному обучению, MLOps и нейросетям: программа обучения, цены, диплом о профессиональной переподготовке и помощь в трудоустройстве.",
  absoluteTitle: true,
  path: "/ml-engineer-course",
  keywords: ML_ENGINEER_COURSE_KEYWORDS,
  ogImage: ML_ENGINEER_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс ML-инженер с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function MlEngineerCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс ML-инженер с наставником и проектами в портфолио</h1>
      <SeoSectionHeadings headings={COURSE_SECTION_HEADINGS} />
      <JsonLd data={mlEngineerCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/ml-engineer-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/ml-engineer-course",
          name: "Курс ML-инженер с нуля",
          description:
            "Практический онлайн-курс ML-инженер с Python, SQL, статистикой, feature engineering, ML, DL, NLP, CV, MLOps, FastAPI, Docker и 15 проектами",
          primaryEntityId: "https://innoprog.ru/ml-engineer-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "ML-инженер", path: "/ml-engineer-course" },
        ])}
      />
      <App initialRoute={{ page: "mlEngineerCourse" }} />
    </>
  );
}
