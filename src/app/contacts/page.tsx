import aboutInnopolisUrl from "../../imports/MainScreenDesktop/about-innopolis.opt.webp";
import { MaterialSymbolsMailOutline, MynauiTelegram, TablerPhoneCall } from "../../imports/shared/ContactIcons";
import { MAX_CONTACT_URL, MaxIcon } from "../../imports/shared/MaxFooterLink";
import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import { CONTACT_HOURS, CONTACT_RESPONSE_TIME } from "../contactHours";
import { LEGAL_LINKS } from "../legalLinks";
import { JsonLd, SITE_URL, breadcrumbJsonLd, createPageMetadata, organizationJsonLd, webPageJsonLd } from "../seo";
import { SvedenHeader } from "../sveden/SvedenHeader";
import "../../styles/adult-pages.css";
import styles from "./contacts.module.css";

const CONTACTS_TITLE = "Контакты онлайн-школы ИННОПРОГ";
const CONTACTS_DESCRIPTION = "Телефон, Telegram, MAX и почта онлайн-школы ИННОПРОГ. Адрес в Иннополисе, режим работы, карта и реквизиты.";
const ADDRESS = "420500, Республика Татарстан, Верхнеуслонский муниципальный район, г. Иннополис, ул. Университетская, д. 5, помещ. 115, рабочее место 15/2";
const ORGANIZATION_MAP = "https://yandex.ru/maps/org/61055877791/";
const MAP_EMBED = "https://yandex.ru/map-widget/v1/?mode=search&oid=61055877791&ol=biz&z=16";

const contactMethods = [
  { label: "Телефон", value: "+7 (958) 606-79-80", href: "tel:+79586067980", icon: <TablerPhoneCall /> },
  { label: "Telegram", value: "@innoprog_admin", href: "https://t.me/innoprog_admin", icon: <MynauiTelegram /> },
  { label: "MAX", value: "Написать в MAX", href: MAX_CONTACT_URL, icon: <span className={styles.maxCircle}><MaxIcon /></span> },
  { label: "Почта", value: organizationJsonLd.email, href: `mailto:${organizationJsonLd.email}`, icon: <MaterialSymbolsMailOutline /> },
];

const requisites = [
  { label: "Полное наименование", value: "Общество с ограниченной ответственностью «ИННОПРОГ»" },
  { label: "Сокращённое наименование", value: "ООО «ИННОПРОГ»" },
  { label: "ИНН", value: organizationJsonLd.taxID },
  { label: "ОГРН", value: "1221600105440" },
  { label: "КПП", value: "168301001" },
  { label: "Юридический адрес", value: ADDRESS },
  { label: "Расчётный счёт", value: "40702810401500170591" },
  { label: "Банк", value: "ООО «Банк Точка», г. Москва" },
  { label: "БИК", value: "044525104" },
  { label: "Корреспондентский счёт", value: "30101810745374525104" },
  { label: "Образовательная лицензия", value: <a href={LEGAL_LINKS.license}>№ Л035-01272-16/01064358 от 16.02.2024, бессрочная</a> },
  { label: "Реестр российского ПО", value: "ПО «INNOPROG», запись №34485 от 15.07.2026" },
];

export const metadata = createPageMetadata({
  title: CONTACTS_TITLE,
  description: CONTACTS_DESCRIPTION,
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <JsonLd data={{
        ...webPageJsonLd({
          path: "/contacts",
          name: CONTACTS_TITLE,
          description: CONTACTS_DESCRIPTION,
          primaryEntityId: `${SITE_URL}/#organization`,
        }),
        "@type": "ContactPage",
      }} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Главная", path: "/" },
        { name: "Контакты", path: "/contacts" },
      ])} />

      <SvedenHeader />
      <div className={styles.page}>
        <main className={styles.contacts}>
          <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
            <a href="/">главная</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">контакты</span>
          </nav>

          <div className={styles.content}>
            <header className={styles.intro}>
              <h1>Контакты</h1>
              <p>Поможем выбрать курс и тариф, ответим на вопросы об оплате и налоговом&nbsp;вычете</p>
            </header>

            <div className={styles.contactDetails}>
              <ul aria-label="Способы связи" className={styles.methods}>
                {contactMethods.map(({ label, value, href, icon }) => (
                  <li key={label}>
                    <a href={href} className={styles.method}>
                      <div aria-hidden="true" className={styles.methodIcon}>{icon}</div>
                      <span className={styles.methodText}>
                        <span className={styles.methodLabel}>{label}</span>
                        <span>{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className={styles.hours}><strong>{CONTACT_HOURS}</strong><br />{CONTACT_RESPONSE_TIME}</p>
            </div>

            <section className={`site-about-city ${styles.city}`} aria-labelledby="contact-city">
              <h2 id="contact-city">Мы из Иннополиса</h2>
              <div>
                <img alt="Иннополис" decoding="async" height={468} loading="lazy" src={aboutInnopolisUrl} width={791} />
                <div>
                  <p><strong>Адрес.</strong> {ADDRESS}</p>
                </div>
              </div>
            </section>

            <section className={styles.map} aria-labelledby="contact-map">
              <h2 className={styles.sectionHeading} id="contact-map">Как нас найти</h2>
              <div className={styles.mapFrame}>
                <iframe
                  allowFullScreen
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={MAP_EMBED}
                  title="Расположение ИННОПРОГ в Иннополисе на Яндекс Картах"
                  width="100%"
                />
              </div>
              <a href={ORGANIZATION_MAP}>Открыть в Яндекс Картах</a>
            </section>

            <section className={styles.requisites} aria-labelledby="contact-requisites">
              <h2 className={styles.sectionHeading} id="contact-requisites">Реквизиты</h2>
              <dl>
                {requisites.map(({ label, value }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={styles.trial} aria-labelledby="contact-trial">
              <h2 id="contact-trial">Начните с бесплатного занятия</h2>
              <a href="/application">
                <span>записаться на бесплатное занятие</span>
                <span aria-hidden="true" className={styles.trialArrow}>
                  <svg fill="none" viewBox="0 0 29.4591 29.4564">
                    <path d="M0 14.7318H28M13.125 28.7281L28 14.7318L13.125 0.728109" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </a>
            </section>
          </div>
        </main>
      </div>
      <ResponsiveSiteFooter />
    </>
  );
}
