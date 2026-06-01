import App from "../App";
import { JsonLd, breadcrumbJsonLd, createPageMetadata, pythonCourseJsonLd, webPageJsonLd } from "../seo";

export const metadata = createPageMetadata({
  title: "Python-разработчик",
  description:
    "Курс Python-разработчик в ИННОПРОГ: практика на платформе, личный наставник, преподаватели и документы после обучения.",
  path: "/python-course",
  keywords: [
    "курс Python-разработчик",
    "Python с наставником",
    "обучение Python онлайн",
    "Python-разработчик с нуля",
  ],
});

export default function PythonCourseRoute() {
  return (
    <>
      <JsonLd data={pythonCourseJsonLd} />
      <JsonLd
        data={webPageJsonLd({
          path: "/python-course",
          name: "Курс Python-разработчик",
          description:
            "Практический онлайн-курс Python-разработчик с наставником, платформой и проектами.",
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
