"use client";
import { LeadSubmitLabel } from "./LeadSubmitLabel";

import { LeadPhoneField } from "./LeadPhoneField";
import { useState } from "react";
import { CallbackTimePicker } from "./CallbackTimePicker";
import { CallbackTimeReveal } from "./CallbackTimeReveal";
import { CaptchaNotice } from "./CaptchaNotice";
import styles from "./InlineLeadForm.module.css";

function Consent({ advertising = false }: { advertising?: boolean }) {
  return (
    <div className={`site-consent ${styles.consent}${advertising ? " site-consent--advertising" : ""}`} {...(advertising ? { "data-advertising-consent-toggle": true } : { "data-consent-toggle": true })} role="checkbox" aria-checked="false" tabIndex={0}>
      <span className={`site-consent__box ${styles.box}`}>
        <span className="site-consent__border" />
        <svg className="site-consent__check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17l9-10" fill="none" /></svg>
      </span>
      <span>{advertising ? <>Я согласен(на) получать <a className="site-consent__link" href="/advertising-consent" target="_blank" rel="noreferrer">рекламные и информационные сообщения</a></> : <>Я даю <a className="site-consent__link" href="/consent" target="_blank" rel="noreferrer">согласие на обработку персональных данных</a></>}</span>
    </div>
  );
}

export function InlineLeadForm({ course = false }: { course?: boolean }) {
  const [phone, setPhone] = useState("");
  return (
    <form className={`${styles.form}${course ? ` ${styles.course}` : ""}`} data-inline-lead-form onSubmit={(event) => event.preventDefault()} onReset={() => setPhone("")}>
      <div className={styles.fields}>
        <input name="name" aria-label="Ваше имя" autoComplete="name" placeholder="Ваше имя" />
        <LeadPhoneField value={phone} onValueChange={setPhone} />
      </div>
      <CallbackTimeReveal phone={phone}><CallbackTimePicker /></CallbackTimeReveal>
      {course ? <div className={styles.fields}>
        <input name="email" aria-label="Почта" autoComplete="email" type="email" placeholder="Почта" />
        <textarea name="question" aria-label="Ваш вопрос" placeholder="Ваш вопрос" rows={3} />
      </div> : null}
      <div className="site-consent-group"><Consent /><Consent advertising /></div>
      <button className={`${styles.submit}${course ? " site-course-lead-submit" : ""}`} data-name="кнопки пд" type="submit" disabled aria-disabled="true"><LeadSubmitLabel /></button>
      <CaptchaNotice />
    </form>
  );
}
