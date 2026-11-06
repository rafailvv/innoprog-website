"use client";

import type { ReactNode } from "react";
import styles from "./CallbackTimeReveal.module.css";

export function hasCallbackPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function CallbackTimeReveal({ phone, children }: { phone: string; children: ReactNode }) {
  if (!hasCallbackPhone(phone)) return null;
  return <div className={styles.reveal} data-callback-reveal><div className={styles.content}>{children}</div></div>;
}
