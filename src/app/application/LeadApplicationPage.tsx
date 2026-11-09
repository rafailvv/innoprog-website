"use client";
import { LeadSubmitLabel } from "../components/LeadSubmitLabel";
import { LeadPhoneField } from "../components/LeadPhoneField";
import { isCompleteLeadPhone, leadPhoneNumber } from "../leadPhone";
import { CaptchaNotice } from "../components/CaptchaNotice";
import { CallbackTimeReveal } from "../components/CallbackTimeReveal";
import { CallbackTimePicker } from "../components/CallbackTimePicker";
import { trackApplicationSuccess } from "../analytics";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { YandexSmartCaptcha, type YandexSmartCaptchaHandle } from "../components/YandexSmartCaptcha";

const APPLICATION_REQUEST_URL = "/application/request";

type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  question: string;
  callback_window: string;
  callback_timezone: string;
  personal_data_consent: boolean;
  advertising_consent: boolean;
};

function isValidLead(payload: LeadPayload) {
  return (
    payload.name.trim().length >= 2 &&
    isCompleteLeadPhone(payload.phone) &&
    (!payload.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
  );
}

async function sendApplication(payload: LeadPayload, captchaToken: string): Promise<void> {
  const response = await fetch(APPLICATION_REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      captcha_token: captchaToken,
      source_page: window.location.href,
      form_id: "standalone-application",
    }),
  });
  const result = await response.json().catch(() => ({ error: null }));

  if (response.ok && result.ok) {
    trackApplicationSuccess("standalone-application");
    return;
  }

  throw new Error(result.error || "application-request-failed");
}

const BENEFITS = [
  "Бесплатное вводное занятие с преподавателем",
  "Ответы на вопросы о программе и формате обучения",
  "Подбор подходящего направления и тарифа",
  "Рекомендации по старту в IT-профессии",
];

export default function LeadApplicationPage({ success = false }: { success?: boolean }) {
  const router = useRouter();
  const smartCaptchaRef = useRef<YandexSmartCaptchaHandle>(null);
  const [phone, setPhone] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isAdvertisingConsentChecked, setIsAdvertisingConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);

  if (success || submitted) {
    return (
      <main className="site-application-page site-application-page--success">
        <section className="site-application-card site-application-card--success" aria-labelledby="application-success-title">
          <a className="site-application-back" href="/">← главная</a>
          <img className="site-application-logo" src="/logo_white_and_black.svg" alt="ИННОПРОГ Education" />
          <div className="site-application-success" role="status">
            <h1 id="application-success-title">Заявка успешно отправлена!</h1>
            <p>Спасибо, что доверяете нам</p>
            <p>Администратор ИННОПРОГ свяжется с вами в ближайшее время и поможет подобрать подходящий формат обучения</p>
            <a className="site-application-submit" href="/">на главную</a>
          </div>
        </section>
      </main>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isConsentChecked) {
      setError("Подтвердите согласие на обработку персональных данных");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: leadPhoneNumber(String(formData.get("phone") || "")),
      email: String(formData.get("email") || "").trim(),
      question: String(formData.get("question") || "").trim(),
      callback_window: String(formData.get("callback_window") || "anytime"),
      callback_timezone: String(formData.get("callback_timezone") || "Europe/Moscow"),
      personal_data_consent: true,
      advertising_consent: isAdvertisingConsentChecked,
    };

    if (!isValidLead(payload)) {
      setError("Заполните имя, российский номер телефона и проверьте почту");
      return;
    }

    setIsSubmitting(true);

    try {
      const captchaToken = await smartCaptchaRef.current?.requestToken();
      if (!captchaToken) throw new Error("captcha-failed");
      await sendApplication(payload, captchaToken);
      setSubmitted(true);
      router.push("/application/success");
    } catch (submitError) {
      setError(
        submitError instanceof Error && submitError.message === "captcha-closed"
          ? "Проверка не завершена. Пройдите капчу и отправьте заявку ещё раз"
          : "Не удалось отправить заявку. Проверьте данные и попробуйте еще раз",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="site-application-page">
      <YandexSmartCaptcha ref={smartCaptchaRef} />
      <section className="site-application-card" aria-labelledby="application-title">
        <div className="site-application-topline">
          <a className="site-application-back" href="/">← главная</a>
          <span className="site-application-crumb">заявка</span>
        </div>
        <div className="site-application-layout">
          <div className="site-application-intro">
            <img className="site-application-logo" src="/logo_white_and_black.svg" alt="ИННОПРОГ Education" />
            <h1 id="application-title">Бесплатное занятие</h1>
            <p className="site-application-lead">Познакомьтесь с форматом обучения и получите ответы на вопросы</p>
            <ul className="site-application-benefits">
              {BENEFITS.map((benefit) => (
                <li key={benefit}>
                  <span aria-hidden="true">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <form className="site-application-form" onSubmit={handleSubmit}>
            <h2>Оставьте заявку</h2>
            <p>Свяжемся с вами в удобное время</p>
            <div className="site-application-fields">
              <input aria-label="Ваше имя" autoComplete="name" name="name" placeholder="Ваше имя" type="text" />
              <LeadPhoneField value={phone} onValueChange={setPhone} />
              <CallbackTimeReveal phone={phone}><CallbackTimePicker disabled={isSubmitting} /></CallbackTimeReveal>
              <input aria-label="Почта" autoComplete="email" inputMode="email" name="email" placeholder="Почта" type="email" />
              <textarea aria-label="Ваш вопрос" name="question" placeholder="Ваш вопрос" />
            </div>
            <label className="site-application-consent">
              <input checked={isConsentChecked} onChange={(event) => setIsConsentChecked(event.target.checked)} type="checkbox" />
              <span>
                Я даю <a href="/consent" rel="noopener noreferrer" target="_blank">согласие на обработку персональных данных</a>
              </span>
            </label>
            <label className="site-application-consent">
              <input checked={isAdvertisingConsentChecked} onChange={(event) => setIsAdvertisingConsentChecked(event.target.checked)} type="checkbox" />
              <span>
                Я согласен(на) получать <a href="/advertising-consent" rel="noopener noreferrer" target="_blank">рекламные и информационные сообщения</a>
              </span>
            </label>
            {error ? <p className="site-application-error" role="alert">{error}</p> : null}
            <button className="site-application-submit" aria-busy={isSubmitting} disabled={!isConsentChecked || isSubmitting} type="submit">
              <LeadSubmitLabel pending={isSubmitting} />
            </button>
            <CaptchaNotice />
          </form>
        </div>
      </section>
    </main>
  );
}
