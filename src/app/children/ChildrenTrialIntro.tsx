import styles from "./children-trial-intro.module.css";

export default function ChildrenTrialIntro() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Родители и дети выбирают нас</h2>
      <p className={styles.description}>
        На бесплатном пробном занятии ребёнок знакомится с преподавателем и
        пробует задания по теме курса
      </p>
    </div>
  );
}
