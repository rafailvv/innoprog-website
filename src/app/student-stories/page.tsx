import { ArrowRight } from "lucide-react";
import Image from "next/image";
import kirillPhoto from "../../imports/MainScreenDesktop/review-story-kirill-hero.webp";
import anastasiaPhoto from "../../imports/MainScreenDesktop/review-anastasia-high.webp";
import mikhailPhoto from "../../imports/MainScreenDesktop/review-mikhail-high.webp";
import storyIllustration from "../../imports/MainScreenDesktop/review-story-collaboration.webp";
import schoolData from "../children/school/source-data.json";
import { storySlugs } from "../children/stories/story-data";
import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import { STUDENT_STORIES_LINK } from "../courseNavigation";
import { JsonLd, REVIEW_META, breadcrumbJsonLd, createPageMetadata, webPageJsonLd, type ReviewRoute } from "../seo";
import { SvedenHeader } from "../sveden/SvedenHeader";
import styles from "./student-stories.module.css";

const { label: title, href: path } = STUDENT_STORIES_LINK;
const introLead = "Как ученики ИННОПРОГ меняют профессию";
const introResult = "и создают первые проекты";
const description = `${introLead} ${introResult}`;

const adultStories = {
  kirill: { image: kirillPhoto, outcome: "Перешёл из HR в ИТ", position: "center 29%" },
  anastasia: { image: anastasiaPhoto, outcome: "Перешла из 1С в аналитику", position: "center 26%" },
  mikhail: { image: mikhailPhoto, outcome: "Собрал веб-приложение", position: "center 24%" },
} satisfies Record<ReviewRoute, { image: string; outcome: string; position: string }>;

const childStories = {
  amir: { outcome: "Создал бота для общения", position: "66% center" },
  eldar: { outcome: "Сделал первые шаги к своей игре", position: "center" },
  almaz: { outcome: "Написал бота для магазина мамы", position: "37% center" },
} satisfies Record<(typeof storySlugs)[number], { outcome: string; position: string }>;

const groups = [
  {
    id: "adults",
    title: "Истории взрослых",
    stories: (Object.keys(adultStories) as ReviewRoute[]).map((slug) => ({
      ...adultStories[slug],
      name: REVIEW_META[slug].name,
      href: `/reviews/${slug}`,
    })),
  },
  {
    id: "children",
    title: "Истории детей и подростков",
    stories: storySlugs.map((slug, index) => ({
      ...childStories[slug],
      name: schoolData.reviews[index].name,
      image: schoolData.reviews[index].image,
      href: `/children/stories/${slug}`,
    })),
  },
];

export const metadata = createPageMetadata({ title, description, path });

export default function StudentStoriesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path, name: title, description, pageType: "CollectionPage" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: title, path }])} />
      <div className={styles.header}>
        <SvedenHeader />
      </div>
      <main className={styles.page}>
        <div className={styles.hero}>
          <nav aria-label="Хлебные крошки" className={`${styles.container} ${styles.breadcrumb}`}>
            <a href="/">Главная</a>
            <span aria-hidden="true">/</span>
            <strong aria-current="page">{title}</strong>
          </nav>
          <div className={`${styles.container} ${styles.intro}`}>
            <div className={styles.introCopy}>
              <h1>Истории <span>учеников</span></h1>
              <p>{introLead}{" "}<br className={styles.desktopBreak} />{introResult}</p>
            </div>
            <div className={styles.illustration}>
              <Image src={storyIllustration} alt="" fill priority unoptimized />
            </div>
          </div>
        </div>

        <div className={styles.catalog}>
          <div className={`${styles.container} ${styles.content}`}>
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-stories`}>
                <h2 id={`${group.id}-stories`}>{group.title}</h2>
                <ul role="list" className={styles.stories}>
                  {group.stories.map((story) => (
                    <li key={story.href}>
                      <a className={styles.card} href={story.href}>
                        <div className={styles.photo}>
                          <Image
                            src={story.image}
                            alt=""
                            fill
                            unoptimized
                            style={{ objectPosition: story.position }}
                          />
                        </div>
                        <p>{story.name}</p>
                        <h3>{story.outcome}</h3>
                        <span className={styles.open}><ArrowRight aria-hidden="true" /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <a className={styles.reviews} href="/reviews">
              все отзывы об обучении
              <span><ArrowRight size={19} aria-hidden="true" /></span>
            </a>
          </div>
        </div>
      </main>
      <ResponsiveSiteFooter />
    </>
  );
}
