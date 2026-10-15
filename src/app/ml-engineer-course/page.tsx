import App from "../App";
import { getCourseFaqItems } from "../../imports/courseDirectionFaqData";
import { ML_ENGINEER_COURSE_KEYWORDS } from "../courseKeywords";
import {
  ML_ENGINEER_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  mlEngineerCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

const courseFaqItems = getCourseFaqItems("mlEngineer");

export const metadata = createPageMetadata({
  title:
    "Курс ML-инженера с нуля: машинное обучение онлайн — ИННОПРОГ",
  description:
    "Курс ML-инженера с нуля: 12 месяцев обучения с наставником, Python, SQL, машинное обучение, нейросети и MLOps. От 7 990 ₽ в месяц в ИННОПРОГ.",
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
      <App key="ml-engineer-course" initialRoute={{ page: "mlEngineerCourse" }} />
    </>
  );
}
