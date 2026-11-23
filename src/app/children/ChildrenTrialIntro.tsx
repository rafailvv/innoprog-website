import styles from "./children-trial-intro.module.css";

export default function ChildrenTrialIntro() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Родители и дети выбирают нас</h2>
      <p className={styles.description}>
        78% семей выбирают наши онлайн курсы программирования для детей после пробного занятия
      </p>
    </div>
  );
}
