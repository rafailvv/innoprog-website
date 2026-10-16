"use client";

import { useEffect, useState } from "react";
import styles from "./blog.module.css";

async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    // Some browsers deny Clipboard API access but allow a user-initiated copy.
  }
  const focused = document.activeElement;
  const input = document.createElement("textarea");
  input.value = text;
  input.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
  input.setAttribute("readonly", "");
  document.body.append(input);
  try {
    input.select();
    if (!document.execCommand?.("copy")) throw new Error("Copy unavailable");
  } finally {
    input.remove();
    if (focused instanceof HTMLElement) focused.focus({ preventScroll: true });
  }
}

export function CopyCodeButton({ code, caption }: { code: string; caption: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    if (busy) return;
    setBusy(true);
    try { await copyText(code); setStatus("copied"); }
    catch { setStatus("error"); }
    finally { setBusy(false); }
  }

  return <div className={styles.copyControl}>
    <button type="button" className={styles.copyButton} onClick={copy} aria-disabled={busy} aria-label={`Копировать код: ${caption}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">{status === "copied" ? <path d="m5 12 4 4 10-10" /> : <><rect x="9" y="9" width="10" height="10" rx="2" /><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /></>}</svg>
      <span>{status === "copied" ? "Скопировано" : "Копировать"}</span>
    </button>
    <span role="status" className={status === "error" ? styles.copyError : styles.srOnly}>{status === "error" ? "Не удалось скопировать. Выделите код и скопируйте вручную." : status === "copied" ? "Код скопирован" : ""}</span>
  </div>;
}
