import App from "../App";
import { getCourseFaqItems } from "../../imports/courseDirectionFaqData";
import { PYTHON_COURSE_KEYWORDS } from "../courseKeywords";
import {
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  PYTHON_COURSE_OG_IMAGE_PATH,
  pythonCourseJsonLd,
  webPageJsonLd,
} from "../seo";

const courseFaqItems = getCourseFaqItems("python");

export const metadata = createPageMetadata({
  title:
    "Курс Python с нуля с наставником: Django и FastAPI — ИННОПРОГ",
  description:
    "Курс Python-разработчика с нуля: индивидуальные онлайн-занятия с наставником, Django, FastAPI, SQL и PostgreSQL. 12 месяцев. Программа, практика и тарифы.",
  absoluteTitle: true,
  path: "/python-course",
  keywords: PYTHON_COURSE_KEYWORDS,
  ogImage: PYTHON_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Python-разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function PythonCourseRoute() {
  return (
    <>
      <JsonLd data={pythonCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/python-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/python-course",
          name: "Курс Python-разработчик с нуля",
          description:
            "Практический онлайн-курс Python-разработчик с наставником, платформой и проектами в портфолио",
          primaryEntityId: "https://innoprog.ru/python-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Python-разработчик", path: "/python-course" },
        ])}
      />
      <App key="python-course" initialRoute={{ page: "pythonCourse" }} />
    </>
  );
}
