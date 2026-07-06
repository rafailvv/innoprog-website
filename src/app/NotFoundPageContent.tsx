import Link from "next/link";
import { COURSE_SEO_ITEMS } from "./seo";

export default function NotFoundPageContent() {
  return (
    <main className="site-reviews-index-page site-not-found">
      <header className="site-review-page__header site-not-found__header" aria-label="Навигация по сайту">
        <Link className="site-review-page__logo" href="/" aria-label="ИННОПРОГ, на главную">
          <img alt="ИННОПРОГ Education" src="/logo_education.png" />
        </Link>
        <nav className="site-review-page__nav" aria-label="Основные разделы">
          <Link href="/python-course">для взрослых</Link>
          <Link href="/reviews">отзывы</Link>
          <Link href="/about">о нас</Link>
          <Link href="/tariffs">тарифы</Link>
        </nav>
        <Link className="site-review-page__header-cta" href="/#courses">
          подобрать курс
        </Link>
      </header>

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

        <section className="site-reviews-index-page__directions site-not-found__courses" aria-labelledby="not-found-courses">
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

      <footer className="site-review-page__footer">
        <img alt="" className="site-review-page__footer-logo" src="/logo_education.png" />
        <div className="site-review-page__footer-columns">
          <section>
            <h2>Контакты</h2>
            <a href="tel:+79586067980">Тел.: +7 (958) 606-79-80</a>
            <a href="mailto:educatio@innoprog.ru">Email: educatio@innoprog.ru</a>
            <a href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank">Telegram: @innoprog_admin</a>
          </section>
          <section>
            <h2>Адреса</h2>
            <p>г. Иннополис, ул. Университетская, д.5, пом.115, м.15/2</p>
            <p>420500 Республика Татарстан, Верхнеуслонский р-он</p>
          </section>
          <section>
            <h2>Правовая информация</h2>
            <a href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">Политика конфиденциальности</a>
            <a href="https://api.innoprog.ru/files/documents/contract_offer.pdf" rel="noopener noreferrer" target="_blank">Публичная оферта</a>
            <a href="/documents/software-operation-manual.pdf" rel="noopener noreferrer" target="_blank">Инструкция по эксплуатации</a>
            <a href="/documents/functional-characteristics.pdf" rel="noopener noreferrer" target="_blank">Описание функциональных характеристик</a>
          </section>
        </div>
        <p className="site-review-page__footer-company">
          ООО «ИННОПРОГ» · ИНН 1683011286 · ОГРН 1221600105440
          <br aria-hidden="true" />
          ОКВЭД: 62.09 (основной), 62.02 · Коды видов деятельности в области информационных технологий: 16.01 (основной), 1.01, 1.12
        </p>
      </footer>
    </main>
  );
}
