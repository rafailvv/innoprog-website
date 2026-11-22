import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import styles from "../components/SiteInformation.module.css";
import { EDUCATION_LICENSE_NUMBER, LEGAL_LINKS } from "../legalLinks";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Образовательная лицензия ИННОПРОГ",
  description: "Карточка лицензии в реестре Рособрнадзора и выписка из реестра",
  path: "/license",
});

export default function LicensePage() {
  return (
    <div className={styles.surface}>
      <main className={styles.page}>
        <a href="/">← На главную</a>
        <h1>Образовательная лицензия</h1>
        <p>Лицензия ООО «ИННОПРОГ» № <span className="site-license-number">{EDUCATION_LICENSE_NUMBER}</span> выдана 16 февраля 2024 года и действует бессрочно</p>
        <div className={styles.actions}>
          <a href={LEGAL_LINKS.licenseRegistry} rel="noopener noreferrer" target="_blank">Проверить в реестре Рособрнадзора</a>
          <a href={LEGAL_LINKS.licenseExtract} rel="noopener noreferrer" target="_blank">Открыть выписку (PDF)</a>
        </div>
      </main>
      <ResponsiveSiteFooter />
    </div>
  );
}
