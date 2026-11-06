import swirl from "../../imports/MainScreenDesktop/28cb6142c60d2e2ea34c6d404d2f0ef611085859.opt.webp";
import { InlineLeadForm } from "./InlineLeadForm";
import styles from "./HomeLeadSection.module.css";

export function HomeLeadSection() {
  return (
    <section className={styles.section} data-name="заявка" data-home-lead-section aria-label="Заявка на обучение">
      <div className={styles.art} aria-hidden="true"><div className={styles.artFrame}><div className={styles.artRotate}><div className={styles.artImage}><img src={swirl} alt="" loading="lazy" decoding="async" /></div></div></div></div>
      <div className={styles.content}>
        <header className={styles.heading}>
          <h2>Заявка<br />на обучение</h2>
          <p>Оставьте заявку, и мы свяжемся с вами в удобное время</p>
        </header>
        <InlineLeadForm />
      </div>
    </section>
  );
}
