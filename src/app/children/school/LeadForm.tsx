"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import {
  YandexSmartCaptcha,
  type YandexSmartCaptchaHandle,
} from "../../components/YandexSmartCaptcha";
import { childrenCourseNavigation } from "../courses/course-paths";
import styles from "./school.module.css";
import formStyles from "./form.module.css";

export function normalizeChildrenPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 10) digits = "7" + digits;
  if (digits.length === 11 && digits.startsWith("8")) digits = "7" + digits.slice(1);
  return digits ? "+" + digits : "";
}

export function formatChildrenPhone(value: string) {
  const normalized = normalizeChildrenPhone(value);
  const digits = normalized.slice(1);
  return digits.length === 11 && digits.startsWith("7")
    ? `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
    : value;
}

export default function LeadForm({ course, formId, context }: { course?: string; formId?: string; context?: string }) {
  const id = useId();
  const captcha = useRef<YandexSmartCaptchaHandle>(null);
  const inFlight = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name") || "").trim();
    const childName = String(values.get("child_name") || "").trim();
    const age = String(values.get("child_age") || "").trim();
    const email = String(values.get("email") || "").trim();
    const normalizedPhone = normalizeChildrenPhone(String(values.get("phone") || ""));
    const digits = normalizedPhone.slice(1);
    if (name.length < 2 || childName.length < 2) {
      setError("Укажите ваше имя и имя ребёнка — не меньше двух букв.");
      return;
    }
    if (!/^\d{1,2}$/.test(age) || Number(age) < 5 || Number(age) > 18) {
      setError("Укажите возраст ребёнка от 5 до 18 лет.");
      return;
    }
    if (digits.length < 10 || digits.length > 15 || (/^[78]/.test(digits) && digits.length !== 11)) {
      setError("Проверьте номер телефона. Для российского номера нужно 11 цифр, включая +7.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Проверьте адрес электронной почты или оставьте это поле пустым.");
      return;
    }
    if (values.get("consent") !== "on") {
      setError("Подтвердите согласие на обработку персональных данных.");
      return;
    }
    const direction = course || String(values.get("direction") || "Помогите подобрать курс");
    const message = String(values.get("message") || "").trim();
    inFlight.current = true;
    setPending(true);
    setError("");
    try {
      const token = await captcha.current?.requestToken();
      if (!token) throw new Error("captcha-failed");
      const response = await fetch("/application/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: normalizedPhone,
          email,
          question: [context, direction, `Имя ребёнка: ${childName}`, `Возраст ребёнка: ${age}`, message && `Пожелания: ${message}`].filter(Boolean).join("\n"),
          personal_data_consent: true,
          advertising_consent: values.get("advertising_consent") === "on",
          captcha_token: token,
          source_page: window.location.href,
          form_id: formId || (course ? "children-course-application" : "children-school-application"),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error("request-failed");
      setSent(true);
      form.reset();
      setPhone("");
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message.startsWith("captcha-")
          ? "Проверка безопасности не завершена. Пройдите капчу и попробуйте снова."
          : "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.",
      );
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }
  if (sent) return (
    <div className={formStyles.success} role="status">
      <span className={formStyles.successIcon} aria-hidden="true">✓</span>
      <h3>Заявка отправлена!</h3>
      <p>Спасибо! Мы свяжемся с вами и подберём удобное время занятия</p>
    </div>
  );
  return (
    <form className={formStyles.form} onSubmit={submit} aria-busy={pending} aria-label="Заявка на бесплатное занятие">
      <YandexSmartCaptcha ref={captcha} />
      <div className={formStyles.fields}>
        <label className={formStyles.field}>
          <span>Ваше имя <span aria-hidden="true">*</span></span>
          <input name="name" placeholder="Как к вам обращаться" autoComplete="name" minLength={2} maxLength={100} required disabled={pending} />
        </label>
        <label className={formStyles.field}>
          <span>Имя ребёнка <span aria-hidden="true">*</span></span>
          <input name="child_name" placeholder="Как зовут ребёнка" autoComplete="off" minLength={2} maxLength={100} required disabled={pending} />
        </label>
        <label className={formStyles.field}>
          <span>Возраст ребёнка <span aria-hidden="true">*</span></span>
          <input name="child_age" type="number" min={5} max={18} step={1} placeholder="От 5 до 18 лет" inputMode="numeric" required disabled={pending} />
        </label>
        <label className={formStyles.field}>
          <span>Номер телефона <span aria-hidden="true">*</span></span>
          <input type="tel" name="phone" placeholder="+7 (999) 123-45-67" autoComplete="tel" inputMode="tel" maxLength={30} required disabled={pending} value={phone} onChange={(event) => setPhone(event.target.value)} onBlur={() => setPhone(formatChildrenPhone(phone))} />
        </label>
        <label className={formStyles.field}>
          <span>Электронная почта <small>необязательно</small></span>
          <input type="email" name="email" placeholder="name@example.ru" autoComplete="email" maxLength={254} disabled={pending} />
        </label>
        <label className={formStyles.field}>
          <span>Направление</span>
          {course ? <input name="direction" value={course.replace(/^Запись на курс\s*/, "")} readOnly /> : (
            <select name="direction" defaultValue="Помогите подобрать курс" disabled={pending}>
              <option>Помогите подобрать курс</option>
              {childrenCourseNavigation.map((item) => <option key={item.href}>{item.label}</option>)}
            </select>
          )}
        </label>
        <label className={`${formStyles.field} ${formStyles.fullWidth}`}>
          <span>Пожелания или вопрос <small>необязательно</small></span>
          <textarea name="message" rows={3} maxLength={1500} placeholder="Что интересно ребёнку? Есть ли опыт? Когда удобно заниматься?" disabled={pending} />
        </label>
      </div>
      <label className={formStyles.consent}>
        <input type="checkbox" name="consent" required disabled={pending} />
        <span>Я даю <a href="/consent" target="_blank" rel="noreferrer">согласие на обработку персональных данных</a> и принимаю <a href="/privacy" target="_blank" rel="noreferrer">политику конфиденциальности</a></span>
      </label>
      <label className={formStyles.consent}>
        <input type="checkbox" name="advertising_consent" disabled={pending} />
        <span>Я согласен(на) получать <a href="/advertising-consent" target="_blank" rel="noreferrer">рекламные и информационные сообщения</a> <span className={formStyles.optional}>(необязательно)</span></span>
      </label>
      {error ? <p id={`${id}-error`} role="alert" className={formStyles.error}>{error}{" "}<a href="https://t.me/innoprog_admin" target="_blank" rel="noreferrer">Написать в Telegram</a></p> : null}
      <button className={`${styles.button} ${formStyles.submit}`} type="submit" disabled={pending} aria-describedby={error ? `${id}-error` : undefined}>{pending ? "Отправляем…" : "Отправить"}</button>
    </form>
  );
}
