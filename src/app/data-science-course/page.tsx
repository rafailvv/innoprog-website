import { dataScienceMobileHeroAvifCandidates, dataScienceMobileHeroSizes } from "../../imports/DataScienceCourseMobile/dataScienceMobileHero";
import { dataScienceDesktopHeroCandidates, dataScienceDesktopHeroSizes } from "../../imports/courseDesktopHeroAssets";
import App from "../App";
import { getCourseFaqItems } from "../../imports/courseDirectionFaqData";
import { DATA_SCIENCE_COURSE_KEYWORDS } from "../courseKeywords";
import {
  DATA_SCIENCE_COURSE_OG_IMAGE_PATH,
  JsonLd,
  COURSE_OG_IMAGE_SIZE,
  breadcrumbJsonLd,
  createPageMetadata,
  dataScienceCourseJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "../seo";

const courseFaqItems = getCourseFaqItems("dataScience");

// Next serves these hashed stylesheets with a deployment query. Webpack's
// lazy CSS loader looks up the same stylesheet by path in data-href.
const reuseInitialStyles = `
  for (const sheet of document.querySelectorAll('link[rel="stylesheet"][href^="/_next/static/css/"]')) {
    const href = sheet.getAttribute("href");
    const pathname = href?.split("?dpl=")[0];
    if (pathname && pathname !== href && pathname.endsWith(".css")) {
      sheet.setAttribute("data-href", pathname);
    }
  }
`;

export const metadata = createPageMetadata({
  title:
    "Курс Data Science с нуля онлайн с наставником — ИННОПРОГ",
  description:
    "Data Science с нуля: индивидуальное обучение онлайн, Python, SQL, статистика, машинное обучение и MLOps. 12 месяцев с наставником. Программа и тарифы.",
  absoluteTitle: true,
  path: "/data-science-course",
  keywords: DATA_SCIENCE_COURSE_KEYWORDS,
  ogImage: DATA_SCIENCE_COURSE_OG_IMAGE_PATH,
  ogImageAlt: "Курс Data Science с нуля в ИННОПРОГ",
  ogImageSize: COURSE_OG_IMAGE_SIZE,
});

export default function DataScienceCourseRoute() {
  return (
    <>
      <link rel="preload" as="image" type="image/avif" imageSrcSet={dataScienceMobileHeroAvifCandidates} imageSizes={dataScienceMobileHeroSizes} media="(width < 768px)" fetchPriority="high" />
      <link rel="preload" as="image" imageSrcSet={dataScienceDesktopHeroCandidates} imageSizes={dataScienceDesktopHeroSizes} media="(min-width: 768px)" fetchPriority="high" />
      <script dangerouslySetInnerHTML={{ __html: reuseInitialStyles }} />
      <JsonLd data={dataScienceCourseJsonLd} />
      <JsonLd data={faqPageJsonLd(courseFaqItems, "/data-science-course")} />
      <JsonLd
        data={webPageJsonLd({
          path: "/data-science-course",
          name: "Курс Data Science с нуля",
          description:
            "Практический онлайн-курс Data Science с Python, SQL, машинным обучением, MLOps и 13 проектными работами",
          primaryEntityId: "https://innoprog.ru/data-science-course#course",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Data Science", path: "/data-science-course" },
        ])}
      />
      <App key="data-science-course" initialRoute={{ page: "dataScienceCourse" }} />
    </>
  );
}
