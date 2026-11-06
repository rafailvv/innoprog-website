import styles from "./CaptchaNotice.module.css";

export function CaptchaNotice({ dark = false }: { dark?: boolean }) {
  return <p className={`${styles.notice}${dark ? ` ${styles.dark}` : ""}`} data-captcha-notice>Форма защищена Yandex SmartCaptcha</p>;
}
