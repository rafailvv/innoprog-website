import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
import { PYTHON_COURSE_KEYWORDS } from "../courseKeywords";
import {
  JsonLd,
  COURSE_SECTION_HEADINGS,
  SeoSectionHeadings,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  PYTHON_COURSE_OG_IMAGE_PATH,
  pythonCourseJsonLd,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title:
    "Курс Python-разработчик с нуля: онлайн-обучение языку программирования Python (питон) для начинающих — ИННОПРОГ",
  description:
    "Онлайн-курс «Python-разработчик» с нуля от ИННОПРОГ. 10 месяцев обучения языку программирования Python для начинающих: программа обучения, цены, выдача диплома о профессиональной переподготовке, помощь в трудоустройстве. Обучение профессии Python-разработчик с нуля.",
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
      <h1 className="site-seo-heading">Курс Python-разработчик с наставником и практическими проектами</h1>
      <SeoSectionHeadings headings={COURSE_SECTION_HEADINGS} />
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
      <App initialRoute={{ page: "pythonCourse" }} />
    </>
  );
}
