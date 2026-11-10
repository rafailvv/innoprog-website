"use client";

import { useLayoutEffect, useRef, type PointerEvent } from "react";
import styles from "./LeadSheetControls.module.css";

export const leadSheetClassName = styles.sheet;

export function LeadSheetControls({ open, onClose }: { open: boolean; onClose: () => void }) {
  const controls = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointerId: number; startY: number } | null>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const sheet = controls.current?.parentElement;
    sheet?.removeAttribute("data-dragging");
    sheet?.style.removeProperty("--lead-sheet-offset");
    drag.current = null;
  }, [open]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!open || !event.isPrimary || event.button !== 0) return;
    drag.current = { pointerId: event.pointerId, startY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    controls.current?.parentElement?.setAttribute("data-dragging", "");
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (current?.pointerId !== event.pointerId) return;
    const distance = Math.max(0, event.clientY - current.startY);
    controls.current?.parentElement?.style.setProperty("--lead-sheet-offset", `${distance}px`);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (current?.pointerId !== event.pointerId) return;
    drag.current = null;
    const sheet = controls.current?.parentElement;
    sheet?.removeAttribute("data-dragging");
    if (event.type === "pointerup" && event.clientY - current.startY >= 80) {
      sheet?.style.setProperty("--lead-sheet-offset", `${event.clientY - current.startY}px`);
      onClose();
    } else {
      sheet?.style.removeProperty("--lead-sheet-offset");
    }
  }

  return (
    <div className={styles.controls} ref={controls}>
      <div
        aria-hidden="true"
        className={styles.grip}
        data-lead-sheet-grip
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
      />
      <button className={styles.close} type="button" onClick={onClose} aria-label="Закрыть окно">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
