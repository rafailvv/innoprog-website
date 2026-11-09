"use client";

import type { ReactNode } from "react";
import { isCompleteLeadPhone, leadPhoneNumber } from "../leadPhone";
import styles from "./CallbackTimeReveal.module.css";

export function hasCallbackPhone(phone: string) {
  return isCompleteLeadPhone(leadPhoneNumber(phone));
}

export function CallbackTimeReveal({ phone, children }: { phone: string; children: ReactNode }) {
  if (!hasCallbackPhone(phone)) return null;
  return <div className={styles.reveal} data-callback-reveal><div className={styles.content}>{children}</div></div>;
}
