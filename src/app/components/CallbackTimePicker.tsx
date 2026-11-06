"use client";

import { useEffect, useState } from "react";
import { CALLBACK_ANYTIME, CALLBACK_WINDOWS, MOSCOW_TIMEZONE, isCallbackTimezone, localTimeLabel, timezoneOffset } from "../callbackTime";
import styles from "./CallbackTimePicker.module.css";

export function CallbackTimePicker({ defaultValue = CALLBACK_ANYTIME, defaultTimezone, disabled = false }: { defaultValue?: string; defaultTimezone?: string; disabled?: boolean }) {
  const [timeZone, setTimeZone] = useState(defaultTimezone || MOSCOW_TIMEZONE);
  const [localZone, setLocalZone] = useState(MOSCOW_TIMEZONE);
  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!isCallbackTimezone(zone)) return;
    setLocalZone(zone);
    if (!defaultTimezone && timezoneOffset(zone) !== 180) setTimeZone(zone);
  }, [defaultTimezone]);
  const canSwitch = timezoneOffset(localZone) !== 180;
  const local = timeZone !== MOSCOW_TIMEZONE;
  const timezoneLabel = local ? localTimeLabel(timeZone) : "Время по Москве";
  const timezoneText = <><span className={styles.timezoneFull}>{timezoneLabel}</span><span className={styles.timezoneShort}>{local ? localTimeLabel(timeZone) : "По Москве"}</span></>;

  return (
    <fieldset className={styles.picker} disabled={disabled}>
      <legend>
        <span>Когда удобно созвониться?</span>
        {canSwitch ? (
          <button className={styles.timezone} type="button" title={local ? "Показать время по Москве" : "Показать местное время"} aria-label={`${timezoneLabel}. ${local ? "Переключить на время по Москве" : "Переключить на местное время"}`} onClick={() => setTimeZone(local ? MOSCOW_TIMEZONE : localZone)}>{timezoneText}<span aria-hidden="true"> ⇄</span></button>
        ) : <span className={styles.timezone}>{timezoneText}</span>}
      </legend>
      <input name="callback_timezone" type="hidden" value={timeZone} />
      <div className={styles.options}>
        {[...CALLBACK_WINDOWS, CALLBACK_ANYTIME].map((value) => (
          <label className={styles.option} key={value}>
            <input type="radio" name="callback_window" value={value} defaultChecked={value === defaultValue} />
            <span>{value === CALLBACK_ANYTIME ? "Любое время" : value}<span className={styles.check} aria-hidden="true">✓</span></span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
