import { ArrowDownRight } from "lucide-react";
import { CONTACT_HOURS, CONTACT_RESPONSE_TIME } from "../contactHours";
import { ADULT_COURSE_LINKS, CHILD_COURSE_LINKS, CONTACTS_LINK } from "../courseNavigation";
import { FIRST_LESSON_GUIDE, PARENT_GUIDE } from "../firstLessonLinks";
import { FooterLegalDetails } from "../FooterLegalDetails";
import { LEGAL_LINKS } from "../legalLinks";
import { MynauiTelegram } from "../../imports/shared/ContactIcons";
import { MAX_CONTACT_URL, MaxIcon } from "../../imports/shared/MaxFooterLink";
import { EducationDisclosureLink } from "./EducationDisclosureLink";
import styles from "./SiteFooterContent.module.css";

const schoolLinks = [
  { label: "О нас", href: "/about" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Истории учеников", href: "/student-stories" },
  { label: "Преподаватели", href: "/children#teachers" },
  CONTACTS_LINK,
  { label: "Блог", href: "/blog" },
];

const guideLinks = [
  { label: "Памятка к первому занятию", href: FIRST_LESSON_GUIDE },
  { label: "Руководство для родителей", href: PARENT_GUIDE },
];

const documents = [
  { label: "Политика конфиденциальности", href: LEGAL_LINKS.privacy },
  { label: "Публичная оферта", href: LEGAL_LINKS.offer },
  { label: "Инструкция по эксплуатации", href: LEGAL_LINKS.softwareOperationManual },
  { label: "Описание функциональных характеристик", href: LEGAL_LINKS.functionalCharacteristics },
];

function FooterLinks({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className={styles.links}>
      <h2>{title}</h2>
      <ul>
        {links.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}
      </ul>
    </nav>
  );
}

export function SiteFooterContent({
  landmark = false,
  applicationHref = "/application?type=trial",
}: {
  landmark?: boolean;
  applicationHref?: string;
}) {
  const Root = landmark ? "footer" : "div";

  return (
    <Root className={styles.footer} data-site-footer>
      <div className={styles.main}>
        <section className={styles.contacts}>
          <h2>Контакты</h2>
          <a className={styles.phone} href="tel:+79586067980">Тел: +7 (958) 606-79-80</a>
          <div className={styles.messengers}>
            <a href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank">
              <span className={styles.telegramIcon} aria-hidden="true"><MynauiTelegram /></span>
              Telegram
            </a>
            <a href={MAX_CONTACT_URL} rel="noopener noreferrer" target="_blank">
              <span className={styles.maxIcon} aria-hidden="true"><MaxIcon /></span>
              MAX
            </a>
          </div>
          <a href="mailto:education@innoprog.ru">Email: education@innoprog.ru</a>
          <p className={styles.hours}><strong>{CONTACT_HOURS}</strong><br />{CONTACT_RESPONSE_TIME}</p>
          <a className={styles.trial} href={applicationHref}>
            Бесплатный урок <ArrowDownRight aria-hidden="true" size={20} strokeWidth={2} />
          </a>
        </section>
        <FooterLinks title="Взрослым" links={ADULT_COURSE_LINKS} />
        <FooterLinks title="Детям" links={CHILD_COURSE_LINKS} />
        <FooterLinks title="О школе" links={schoolLinks} />
        <FooterLinks title="Памятки" links={guideLinks} />
      </div>
      <div className={styles.bottom}>
        <section>
          <h2>Адрес</h2>
          <p>420500, Республика Татарстан, г. Иннополис, ул. Университетская, д. 5, пом. 115, р. м. 15/2</p>
        </section>
        <FooterLinks title="Документы" links={documents} />
        <section className={styles.requisites}>
          <h2>Реквизиты</h2>
          <p><FooterLegalDetails compactActivityCodes showEducationLicense /></p>
          <EducationDisclosureLink className={styles.disclosure} />
        </section>
      </div>
    </Root>
  );
}
