import { childrenTeachers } from "./school/teacher-data";
import SchoolPage from "./school/SchoolPage";
import source from "./school/source-data.json";
import { childrenCourses, childrenCoursePath } from "./courses/course-data";
import {
  JsonLd,
  createPageMetadata,
  breadcrumbJsonLd,
  faqPageJsonLd,
  absoluteUrl,
  webPageJsonLd,
} from "../seo";

export const metadata = createPageMetadata({
  title: "Курсы программирования для детей 9–17 лет онлайн",
  description:
    "Индивидуальные онлайн-занятия по программированию для детей: Python, создание сайтов и игр, нейросети, подготовка к ОГЭ, ЕГЭ и олимпиадам. Бесплатное вводное занятие.",
  path: "/children",
  ogImage: "/og/children-school-v1.png",
  ogImageAlt: "Программирование для детей 9–17 лет в ИННОПРОГ",
  ogImageSize: { width: 1200, height: 630 },
  keywords: [
    "курсы программирования для детей",
    "программирование для школьников",
    "онлайн-школа программирования для детей",
  ],
});
export default function Page() {
  return (
    <>
      <JsonLd data={{
        ...webPageJsonLd({ path: "/children", name: "Программирование для детей от 9 до 17 лет", description: "Индивидуальные онлайн-занятия программированием для школьников", primaryEntityId: `${absoluteUrl("/children")}#course-catalog` }),
        mentions: childrenTeachers.map((teacher) => ({
          "@type": "Person", name: teacher.name, image: absoluteUrl(teacher.image), description: teacher.bullets.join(". "),
        })),
      }} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Программирование для детей", path: "/children" },
        ])}
      />
      <JsonLd
        data={faqPageJsonLd(
          source.faq.map(([question, answer]) => ({
            question,
            answer: [answer],
          })),
          "/children",
        )}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${absoluteUrl("/children")}#course-catalog`,
          name: "Курсы программирования для детей",
          numberOfItems: childrenCourses.length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: childrenCourses.map((course, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: course.title,
            url: absoluteUrl(childrenCoursePath(course.slug)),
          })),
        }}
      />
      <SchoolPage />
    </>
  );
}
