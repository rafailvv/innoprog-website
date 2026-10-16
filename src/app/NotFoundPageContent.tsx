import Link from "next/link";
import { COURSE_SEO_ITEMS } from "./seo";
import "../styles/adult-pages.css";
import { SvedenHeader as SiteNavigation } from "./sveden/SvedenHeader";
import { ResponsiveSiteFooter } from "./components/ResponsiveSiteFooter";
import styles from "./not-found.module.css";

export default function NotFoundPageContent() {
  return (
    <div className={styles.page}>
      <SiteNavigation />
      <main className={`site-reviews-index-page site-not-found ${styles.content}`}>
        <div className="site-reviews-index-page__inner site-not-found__inner">
          <section className="site-review-page__free site-not-found__message" aria-labelledby="not-found-title">
            <h1 id="not-found-title">Такой страницы нет</h1>
            <p>
              Похоже, ссылка устарела или адрес набран с ошибкой. Вернитесь на главную или выберите направление обучения
            </p>
            <div className="site-not-found__actions" aria-label="Действия">
              <Link className="site-not-found__primary" href="/">
                на главную
              </Link>
              <Link className="site-not-found__secondary" href="/reviews">
                посмотреть отзывы
              </Link>
            </div>
          </section>

          <section className="site-reviews-index-page__directions site-reviews-index-page__directions--top site-not-found__courses" aria-labelledby="not-found-courses">
            <h2 id="not-found-courses">Популярные направления</h2>
            <div>
              {COURSE_SEO_ITEMS.map((course) => (
                <Link href={course.path} key={course.path}>
                  {course.name}
                </Link>
              ))}
            </div>
          </section>
        </div>

      </main>
      <ResponsiveSiteFooter />
    </div>
  );
}
