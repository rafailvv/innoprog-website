"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { LeadModal } from "../../components/LeadModal";
import { YandexSmartCaptcha, type YandexSmartCaptchaHandle } from "../../components/YandexSmartCaptcha";
import { FREE_MODULE_FORM_ID, type ComplimentaryCourseLeadSource } from "../../complimentaryCourseLead";
import { getLeadPayload, isLeadPayloadValid, sendLeadApplication } from "../../leadApplication";
import "../../../styles/adult-pages.css";
import "./free-module.css";

function notifyPlatform(type: string) {
  if (!document.referrer || window.parent === window) return;
  window.parent.postMessage({ type }, new URL(document.referrer).origin);
}

export default function FreeModuleApplication({
  source, offerUntil,
}: { source: ComplimentaryCourseLeadSource; offerUntil: number | null }) {
  const courseName = source.module === "analytics-start" ? "«Аналитик данных»" : "Python-разработчик";
  const [consent, setConsent] = useState(false);
  const [advertisingConsent, setAdvertisingConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [applicationContext, setApplicationContext] = useState<string | null>(null);
  const captcha = useRef<YandexSmartCaptchaHandle>(null);
  const [offerActive, setOfferActive] = useState(offerUntil == null || offerUntil > Date.now());

  useEffect(() => {
    if (offerUntil == null) return;
    const remaining = offerUntil - Date.now();
    setOfferActive(remaining > 0);
    if (remaining <= 0) return;
    const timeout = window.setTimeout(() => setOfferActive(false), Math.min(remaining, 2_147_483_647));
    return () => window.clearTimeout(timeout);
  }, [offerUntil]);

  function close() {
    if (window.parent === window) {
      window.location.assign("/");
    } else {
      notifyPlatform("innoprog:free-module-application-close");
    }
  }

  useEffect(() => {
    const parentOrigin = document.referrer ? new URL(document.referrer).origin : null;
    const receiveContext = (event: MessageEvent) => {
      if (event.source !== window.parent || event.origin !== parentOrigin
        || event.data?.type !== "innoprog:free-module-application-context") return;
      if (typeof event.data.value === "string") {
        setApplicationContext(event.data.value);
      } else {
        setError("Не удалось проверить данные курса. Закройте окно и откройте его снова");
      }
    };
    window.addEventListener("message", receiveContext);
    notifyPlatform("innoprog:free-module-application-ready");
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("message", receiveContext);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !consent || !applicationContext) return;
    setError("");
    const payload = getLeadPayload(event.currentTarget);
    if (!isLeadPayloadValid(payload)) {
      setError("Заполните имя, российский номер телефона и проверьте почту");
      return;
    }

    setPending(true);
    try {
      const token = await captcha.current?.requestToken();
      if (!token) throw new Error("captcha-failed");
      await sendLeadApplication({
        ...payload,
        personal_data_consent: true,
        advertising_consent: advertisingConsent,
      }, token, FREE_MODULE_FORM_ID, source, applicationContext);
      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof Error && cause.message === "captcha-closed"
        ? "Проверка не завершена. Пройдите капчу и отправьте заявку ещё раз"
        : "Не удалось отправить заявку. Проверьте данные и попробуйте ещё раз");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className={[
      "site-shell free-module-lead",
      consent ? "site-shell--consent-checked" : "",
      advertisingConsent ? "site-shell--advertising-consent-checked" : "",
    ].filter(Boolean).join(" ")}>
      <LeadModal
        state={submitted ? "success" : "form"}
        onClose={close}
        onHome={close}
        onSubmit={submit}
        consent={consent}
        submitDisabled={!applicationContext}
        advertisingConsent={advertisingConsent}
        onToggleConsent={() => setConsent((checked) => !checked)}
        onToggleAdvertisingConsent={() => setAdvertisingConsent((checked) => !checked)}
        pending={pending}
        error={error}
        subtitle={offerActive
          ? <>Оставьте заявку и получите фиксированную скидку <strong>до 40%</strong> на весь период обучения по курсу {courseName}</>
          : `Оставьте заявку на обучение по курсу ${courseName}`}
      />
      <YandexSmartCaptcha ref={captcha} />
    </main>
  );
}
