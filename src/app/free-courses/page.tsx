import { PythonDesktopCard, PythonMobileCard } from "../../imports/shared/PythonDirectionCard";
import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import { FREE_COURSES_LINK } from "../courseNavigation";
import { ANALYTICS_START_COURSE, DATA_SCIENCE_START_COURSE, PYTHON_START_COURSE } from "../freeCourse";
import { JsonLd, SITE_URL, absoluteUrl, breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "../seo";
import { SvedenHeader } from "../sveden/SvedenHeader";
import styles from "./free-courses.module.css";

const courses = [
  { slug: "python-start", ...PYTHON_START_COURSE, artwork: undefined },
  { slug: "analytics-start", ...ANALYTICS_START_COURSE },
  { slug: "data-science-start", ...DATA_SCIENCE_START_COURSE },
];
const catalogDescription = "Бесплатные курсы ИННОПРОГ для новичков. Напишите первую программу на Python, соберите отчёт по заказам или спрогнозируйте время доставки с помощью машинного обучения.";
const catalogUrl = absoluteUrl(FREE_COURSES_LINK.href);


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
      })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Главная", path: "/" },
        { name: FREE_COURSES_LINK.label, path: FREE_COURSES_LINK.href },
      ])} />
      {courses.map(({ slug, title, description }) => {
        const entityId = `${catalogUrl}#${slug}`;
        return <JsonLd key={slug} data={{
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": entityId,
          url: entityId,
          name: title,
          description,
          inLanguage: "ru-RU",
          isAccessibleForFree: true,
          provider: { "@id": `${SITE_URL}/#organization` },
        }} />;
      })}
      <SvedenHeader />
      <main className={styles.catalog}>
        <h1>{FREE_COURSES_LINK.label}</h1>
        <div className={styles.grid}>
          {courses.map(({ slug, tags, ...course }) => {
            const card = { ...course, tagRows: [tags.slice(0, 2), tags.slice(2)] };
            return <div key={slug} id={slug}>
              <div className={styles.desktop}><PythonDesktopCard {...card} catalog /></div>
              <div className={styles.mobile}><PythonMobileCard {...card} catalog /></div>
            </div>;
          })}
        </div>
      </main>
      <ResponsiveSiteFooter />
    </>
  );
}
