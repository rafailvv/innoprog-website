"use client";

import { CONTACT_HOURS, CONTACT_RESPONSE_TIME } from "../contactHours";
import { FIRST_LESSON_GUIDE } from "../firstLessonLinks";
import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import { CallbackTimePicker } from "./CallbackTimePicker";
import { CaptchaNotice } from "./CaptchaNotice";
import { LeadPhoneField } from "./LeadPhoneField";
import { LeadSheetControls, leadSheetClassName } from "./LeadSheetControls";
import { LeadSubmitLabel } from "./LeadSubmitLabel";
import type { LeadPayload } from "../leadApplication";

type Props = {
  state: "closed" | "form" | "success";
  onClose: () => void;
  onHome: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  draft?: Partial<LeadPayload>;
  consent: boolean;
  submitDisabled?: boolean;
  advertisingConsent: boolean;
  onToggleConsent: () => void;
  onToggleAdvertisingConsent: () => void;
  pending: boolean;
  error: string;
  subtitle?: ReactNode;
};

function handleConsentKey(event: KeyboardEvent<HTMLDivElement>, toggle: () => void) {
  if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault();
  toggle();
}

export function LeadModal({
  state, onClose, onHome, onSubmit, draft = {}, consent, advertisingConsent, submitDisabled = false,
  onToggleConsent, onToggleAdvertisingConsent, pending, error,
  subtitle = <>{CONTACT_HOURS}<br />{CONTACT_RESPONSE_TIME}</>,
}: Props) {
  return (
    <div
      aria-hidden={state === "closed"}
      className={[
        "site-lead-modal",
        state === "closed" ? "site-lead-modal--closed" : "",
      ].filter(Boolean).join(" ")}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <section
        aria-label={state === "form" ? "Заявка на обучение" : "Заявка успешно отправлена"}
        aria-modal="true"
        className={[
          "site-lead-modal__card",
          leadSheetClassName,
          state === "success" ? "site-lead-modal__card--success" : "",
        ].filter(Boolean).join(" ")}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <LeadSheetControls open={state !== "closed"} onClose={onClose} />
        <div className="site-lead-modal__top">
          <div className="site-lead-modal__brand">
            <button className="site-lead-modal__back" onClick={onClose} type="button">
              <svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
              <span>назад</span>
            </button>
            <img alt="ИННОПРОГ Education" title="ИННОПРОГ Education" className="site-lead-modal__logo" src="/logo_white_and_black.svg" />
          </div>
          <div className="site-lead-modal__crumbs">
            <button
              onClick={onHome}
              type="button"
            >
              главная
            </button>
            <span aria-hidden="true">/</span>
            <strong>заявка</strong>
          </div>
        </div>

        {state !== "success" ? (
          <form key={state} className="site-lead-modal__form" onSubmit={onSubmit}>
            <h2 className="site-lead-modal__title">Записаться на обучение</h2>
            <p className="site-lead-modal__subtitle">
              {subtitle}
            </p>
            <div className="site-lead-modal__fields">
              <input
                aria-label="Ваше имя"
                autoComplete="name"
                className="site-lead-modal__input"
                defaultValue={draft.name || ""}
                name="modal-name"
                placeholder="Ваше имя"
                type="text"
              />
              <LeadPhoneField
                className="site-lead-modal__input"
                defaultValue={draft.phone}
                name="modal-phone"
              />
              <input
                aria-label="Почта"
                autoComplete="email"
                className="site-lead-modal__input"
                defaultValue={draft.email || ""}
                inputMode="email"
                name="modal-email"
                placeholder="Почта"
                type="email"
              />
              <textarea
                aria-label="Ваш вопрос"
                className="site-lead-modal__input site-lead-modal__textarea"
                defaultValue={draft.question || ""}
                name="modal-question"
                placeholder="Ваш вопрос"
              />
            </div>
            <CallbackTimePicker defaultValue={draft.callback_window} defaultTimezone={draft.callback_timezone} disabled={pending} />
            <div
              aria-checked={consent}
              className="site-lead-modal__consent site-consent"
              onClick={(event) => {
                if (!(event.target instanceof Element && event.target.closest("a"))) onToggleConsent();
              }}
              onKeyDown={(event) => handleConsentKey(event, onToggleConsent)}
              role="checkbox"
              tabIndex={0}
            >
              <span className="site-lead-modal__checkbox site-consent__box">
                <span className="site-lead-modal__checkbox-border site-consent__border" />
                <svg className="site-consent__check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5 10 17l9-10" fill="none" />
                </svg>
              </span>
              <span>
                Я даю&nbsp;
                <a
                  className="site-consent__link"
                  href="/consent"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  согласие на обработку персональных данных
                </a>
              </span>
            </div>
            <div
              aria-checked={advertisingConsent}
              className="site-lead-modal__consent site-consent site-consent--advertising"
              onClick={(event) => {
                if (!(event.target instanceof Element && event.target.closest("a"))) onToggleAdvertisingConsent();
              }}
              onKeyDown={(event) => handleConsentKey(event, onToggleAdvertisingConsent)}
              role="checkbox"
              tabIndex={0}
            >
              <span className="site-lead-modal__checkbox site-consent__box">
                <span className="site-lead-modal__checkbox-border site-consent__border" />
                <svg className="site-consent__check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5 10 17l9-10" fill="none" />
                </svg>
              </span>
              <span>
                Я согласен(на) получать&nbsp;
                <a
                  className="site-consent__link"
                  href="/advertising-consent"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  рекламные и информационные сообщения
                </a>
              </span>
            </div>
            {error ? (
              <p className="site-lead-modal__error" role="alert">
                {error}
              </p>
            ) : null}
            <button
              className="site-lead-modal__submit"
              aria-busy={pending}
              disabled={!consent || pending || submitDisabled}
              type="submit"
            >
              <LeadSubmitLabel pending={pending} />
            </button>
            <CaptchaNotice />
          </form>
        ) : (
          <div className="site-lead-modal__success" role="status">
            <h2>ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА!</h2>
            <p>Спасибо, что доверяете нам!</p>
            <p>
              Администратор ИННОПРОГ свяжется с вами в ближайшее время, уточнит детали и поможет подобрать
              подходящий формат обучения. Пожалуйста, ожидайте 🙏
            </p>
            <a className="site-first-lesson-guide-link" href={FIRST_LESSON_GUIDE}>Памятка к первому занятию</a>
            <button className="site-lead-modal__submit" onClick={onClose} type="button">
              закрыть
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
