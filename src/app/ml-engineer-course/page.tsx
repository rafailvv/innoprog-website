import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import {
  ML_ENGINEER_COURSE_OG_IMAGE_PATH,
  JsonLd,
  breadcrumbJsonLd,
  mlEngineerCourseJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title: "Курс ML-инженер с нуля",
  description:
    "Курс ML-инженер в ИННОПРОГ: Python, SQL, статистика, feature engineering, ML, DL, NLP, CV, MLOps, FastAPI, Docker и 15 проектов за 28 учебных недель",
  path: "/ml-engineer-course",
  keywords: [
    "курс ML-инженер",
    "ML-инженер с наставником",
    "обучение машинному обучению онлайн",
    "курс Machine Learning",
    "курс MLOps",
  ],
  ogImage: ML_ENGINEER_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс ML-инженер с нуля в ИННОПРОГ",
});

export default function MlEngineerCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс ML-инженер с наставником и проектами в портфолио</h1>
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
