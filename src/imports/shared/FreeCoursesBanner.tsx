import { FREE_COURSES_LINK } from "../../app/courseNavigation";
import { DirectionArrow } from "./DirectionArrow";
import { DirectionHoverOverlay } from "./DirectionHoverOverlay";
import styles from "./FreeCoursesBanner.module.css";

const DESCRIPTION = "Курсы для тех, кто только знакомится с программированием. Бесплатно изучите основы и напишите свой первый код до того, как решите учиться дальше";

export function FreeCoursesBanner() {
  return (
    <a className={`site-desktop-direction-card ${styles.banner}`} href={FREE_COURSES_LINK.href}>
      <img alt="" className={styles.illustration} decoding="async" loading="lazy" src="/free-courses-banner-pearl.webp" />
      <div className={styles.copy}>
        <h3>{FREE_COURSES_LINK.label}</h3>
        <p>{DESCRIPTION}</p>
      </div>
      <span className={styles.arrow}>
        <span className="block max-md:hidden"><DirectionArrow /></span>
        <span className="hidden max-md:block"><DirectionArrow mobile /></span>
      </span>
      <DirectionHoverOverlay
        title={FREE_COURSES_LINK.label}
        description={DESCRIPTION}
        tagRows={[["Бесплатно", "Для новичков", "Бонус — гайд по нейросетям в программировании"]]}
        action="Посмотреть бесплатные курсы"
        showArrow
      />
    </a>
  );
}
