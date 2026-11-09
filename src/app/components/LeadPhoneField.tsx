"use client";

import { useState } from "react";
import { nationalLeadPhoneDigits } from "../leadPhone";
import styles from "./LeadPhoneField.module.css";

type Props = {
  name?: string;
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
};

export function LeadPhoneField({ name = "phone", className, defaultValue = "", value, onValueChange, required, disabled }: Props) {
  const [localValue, setLocalValue] = useState(() => nationalLeadPhoneDigits(defaultValue));
  const [focused, setFocused] = useState(false);
  const digits = value ?? localValue;
  const displayed = !focused && digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`
    : digits;

  return (
    <span className={className ? `${styles.field} ${className}` : styles.field} data-lead-phone>
      <span className={styles.prefix} aria-hidden="true">
        <span className={styles.flag} data-lead-phone-flag />
        +7
      </span>
      <input
        aria-label="Номер телефона"
        aria-description="Российский номер с кодом +7"
        autoComplete="tel-national"
        disabled={disabled}
        inputMode="tel"
        name={name}
        onBlur={() => setFocused(false)}
        onChange={(event) => {
          const typed = (event.nativeEvent as InputEvent).inputType === "insertText";
          const next = nationalLeadPhoneDigits(event.currentTarget.value, !typed);
          if (value === undefined) setLocalValue(next);
          onValueChange?.(next);
        }}
        onFocus={() => setFocused(true)}
        placeholder="(999) 123-45-67"
        required={required}
        type="tel"
        value={displayed}
      />
    </span>
  );
}
