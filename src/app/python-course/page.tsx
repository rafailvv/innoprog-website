import App from "../App";
import { courseFaqItems } from "../../imports/courseFaqData";
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

export const metadata = createPageMetadata({
  title: "Курс Python-разработчик с нуля",
  description:
    "Курс Python-разработчик с нуля в ИННОПРОГ: онлайн-обучение с наставником, практика на платформе, проекты в портфолио и документы после обучения",
  path: "/python-course",
  keywords: [
    "курс Python-разработчик",
    "Python с наставником",
    "обучение Python онлайн",
    "Python-разработчик с нуля",
  ],
  ogImage: PYTHON_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Python-разработчик с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function PythonCourseRoute() {
  return (
    <>
      <h1 className="site-seo-heading">Курс Python-разработчик с наставником и практическими проектами</h1>
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
