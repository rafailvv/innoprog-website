import chatArt from "../../imports/MainScreenDesktop/benefit-icons-chat-figma.webp";
import lessonArt from "../../imports/MainScreenDesktop/benefit-card1-figma.png";
import { MentorBenefitBriefcaseIcon, MentorBenefitSupportIcon } from "../../imports/shared/MentorBenefitIcons";
import styles from "./FreeTrialSection.module.css";

const trialSteps = [
  { title: "Обсудим", text: "вашу цель и направление в ИТ, которое ей подходит" },
  { title: "Разберём", text: "логику программирования и базовые алгоритмы на простой задаче" },
  { title: "Напишем", text: "вместе с вами первую небольшую программу" },
  { title: "Подберём", text: "тариф и удобный для вас график занятий" },
];

const stepArt = [
  <div className={styles.chatArt}><img src={chatArt} alt="" loading="lazy" decoding="async" /></div>,
  <MentorBenefitSupportIcon />,
  <div className={styles.lessonArt}><img src={lessonArt} alt="" loading="lazy" decoding="async" /></div>,
  <MentorBenefitBriefcaseIcon />,
];

export function FreeTrialSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${styles.section}${compact ? ` ${styles.compact}` : ""}`} aria-label="Бесплатное занятие">
      <div className={styles.heading}>
        <h2>
          <span className={styles.duration}>до <strong>45</strong> минут</span>
          <span className={styles.title}>на бесплатном занятии</span>
        </h2>
        <p>Вы поймёте, подходит ли вам направление и получается ли у вас писать код</p>
      </div>
      <ol className={styles.steps}>
        {trialSteps.map((step, index) => (
          <li className={styles.step} key={step.title}>
            {!compact && <div className={styles.stepArt} aria-hidden="true">{stepArt[index]}</div>}
            <span className={styles.number} aria-hidden="true">({index + 1})</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.footer}>
        <p>Абонемент покупаете после, если решите учиться</p>
        <a className={styles.cta} href="/application?type=trial">
          записаться на занятие
          <span aria-hidden="true">
            <svg viewBox="0 0 33.2913 33.2654" fill="none" focusable="false">
              <path d="M0 16.6327H32M18.9279 32.6327L32 16.6327L18.9279 0.632692" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
