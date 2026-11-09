import styles from "./LeadSubmitLabel.module.css";

export function LeadSubmitLabel({
  label = "отправить заявку",
  pending,
}: { label?: string; pending?: boolean }) {
  return (
    <>
      {pending !== true && <span className={styles.idle}>{label}</span>}
      {pending !== false && (
        <span className={styles.pending}>
          <span className={styles.spinner} aria-hidden="true" />
          Отправляем…
        </span>
      )}
    </>
  );
}
