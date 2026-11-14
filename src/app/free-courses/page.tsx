import { PythonDesktopCard, PythonMobileCard } from "../../imports/shared/PythonDirectionCard";
import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import { FREE_COURSES_LINK } from "../courseNavigation";
import { PYTHON_START_COURSE } from "../freeCourse";
import { JsonLd, SITE_URL, absoluteUrl, breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "../seo";
import { SvedenHeader } from "../sveden/SvedenHeader";
import styles from "./free-courses.module.css";

const { title, description, href, action, tags } = PYTHON_START_COURSE;
const card = { title, description, href, action, tagRows: [tags.slice(0, 2), tags.slice(2)] };
const catalogDescription = "Бесплатные онлайн-курсы программирования с нуля в ИННОПРОГ. Начните с Python: изучите основы, решите практические задачи и напишите первую программу.";
const catalogUrl = absoluteUrl(FREE_COURSES_LINK.href);
const courseEntityId = `${catalogUrl}#python-start`;

export const metadata = createPageMetadata({
  title: "Бесплатные курсы программирования с нуля",
  description: catalogDescription,
  path: FREE_COURSES_LINK.href,
});

export default function FreeCoursesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({
        path: FREE_COURSES_LINK.href,
        name: FREE_COURSES_LINK.label,
        description: catalogDescription,
        pageType: "CollectionPage",
        primaryEntityId: courseEntityId,
      })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Главная", path: "/" },
        { name: FREE_COURSES_LINK.label, path: FREE_COURSES_LINK.href },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Course",
        "@id": courseEntityId,
        url: courseEntityId,
        name: title,
        description,
        inLanguage: "ru-RU",
        isAccessibleForFree: true,
        provider: { "@id": `${SITE_URL}/#organization` },
      }} />
      <SvedenHeader />
      <main className={styles.catalog}>
        <h1>{FREE_COURSES_LINK.label}</h1>
        <div className={styles.grid} id="python-start">
          <div className={styles.desktop}><PythonDesktopCard {...card} catalog /></div>
          <div className={styles.mobile}><PythonMobileCard {...card} catalog /></div>
        </div>
      </main>
      <ResponsiveSiteFooter />
    </>
  );
}
