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
    "Индивидуальные онлайн-занятия по программированию для детей: Python, сайты и игры, нейросети, подготовка к ОГЭ, ЕГЭ и олимпиадам. Бесплатное вводное занятие.",
  path: "/children",
  ogImage: "/og/children-school-v1.png",
  ogImageAlt: "Программирование для детей в ИННОПРОГ",
  ogImageSize: { width: 1200, height: 630 },
  keywords: [
    "курсы программирования для детей",
    "программирование для школьников",
    "онлайн-школа программирования для детей",
  ],
});
const avitoPixel = `
var _apxl = window._apxl || (window._apxl = []);
_apxl.push({
    id: 8824496,
    start: (new Date()).getTime()
});
_apxl.q = _apxl.q || [];
_apxl.sendEvent = _apxl.sendEvent || function (args) {
    _apxl.q.push([args, location.href, (new Date()).getTime()]);
};
(function (d, w, id) {
    if (d.getElementById(id)) return;
    var ts = d.createElement("script");
    ts.type = "text/javascript";
    ts.async = true;
    ts.id = id;
    ts.src = "https://ac.avito.ru/tag.js";
    var f = function () {
        var s = d.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(ts, s);
    };
    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "apxl-code");
`;

export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: avitoPixel }} />
      <noscript
        dangerouslySetInnerHTML={{
          __html: '<div><img src="https://www.avito.st/static/ims/235e1f90-308c-4bf5-91a3-07239fde0f2f_ai_icon_common_12x16.png" style="position:absolute;left:-9999px;" alt="Avito Pixel" /></div>',
        }}
      />
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
