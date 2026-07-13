"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const APPLICATION_REQUEST_URL = "/application/request";

type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  question: string;
};

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("8")) {
    return `+7${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `+7${digits}`;
  }

  if (digits.startsWith("7")) {
    return `+${digits}`;
  }

  return value.trim().startsWith("+") ? `+${digits}` : digits;
}

function isValidLead(payload: LeadPayload) {
  return (
    payload.name.trim().length >= 2 &&
    normalizePhone(payload.phone).replace(/\D/g, "").length >= 10 &&
    (!payload.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
  );
}

async function sendApplication(payload: LeadPayload, successToken = "", attempt = 0): Promise<void> {
  const response = await fetch(APPLICATION_REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, phone: normalizePhone(payload.phone), success_token: successToken }),
  });
  const result = await response.json().catch(() => ({ error: null }));

  if (response.ok && result.ok) {
    return;
  }

  const { checkCaptchaError, CheckCaptchaType } = await import("@vkid/captcha");
  const { captchaType, captchaWidget } = checkCaptchaError({
    responseHeaders: response.headers,
    url: response.url,
    responseError: result.error,
    withWidget: true,
  });

  if (attempt === 0 && captchaType && captchaType !== CheckCaptchaType.UNKNOWN && captchaWidget) {
    let captchaToken: string;

    try {
      captchaToken = await captchaWidget.show({ container: document.body, view: "popup", scheme: "light", lang: "ru" });
    } catch (error) {
      throw new Error(error === "close" ? "captcha-closed" : "captcha-failed");
    }

    return sendApplication(payload, captchaToken, attempt + 1);
  }

  throw new Error("application-request-failed");
}

const BENEFITS = [
  "Бесплатное вводное занятие с преподавателем",
  "Ответы на вопросы о программе и формате обучения",
  "Подбор подходящего направления и тарифа",
  "Рекомендации по старту в IT-профессии",
];

export default function LeadApplicationPage({ success = false }: { success?: boolean }) {
  const router = useRouter();
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (success) {
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
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      question: String(formData.get("question") || "").trim(),
    };

    if (!isValidLead(payload)) {
      setError("Заполните имя, корректный номер телефона и проверьте почту");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendApplication(payload);
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
            <p>Мы свяжемся с вами в ближайшее время</p>
            <div className="site-application-fields">
              <input aria-label="Ваше имя" autoComplete="name" name="name" placeholder="Ваше имя" type="text" />
              <input aria-label="Номер телефона" autoComplete="tel" inputMode="tel" name="phone" placeholder="+7(000)-000-00-00" type="tel" />
              <input aria-label="Почта" autoComplete="email" inputMode="email" name="email" placeholder="Почта" type="email" />
              <textarea aria-label="Ваш вопрос" name="question" placeholder="Ваш вопрос" />
            </div>
            <label className="site-application-consent">
              <input checked={isConsentChecked} onChange={(event) => setIsConsentChecked(event.target.checked)} type="checkbox" />
              <span>
                Нажимая на кнопку, вы даете <a href="https://api.innoprog.ru/files/documents/consent_to_personal_data_processing.pdf" rel="noopener noreferrer" target="_blank">согласие на обработку персональных данных</a> и соглашаетесь с <a href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">политикой конфиденциальности</a>
              </span>
            </label>
            {error ? <p className="site-application-error" role="alert">{error}</p> : null}
            <button className="site-application-submit" disabled={!isConsentChecked || isSubmitting} type="submit">
              {isSubmitting ? "отправляем..." : "отправить заявку"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
