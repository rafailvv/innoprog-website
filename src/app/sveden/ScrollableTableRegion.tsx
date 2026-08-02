"use client";

import type { KeyboardEvent, ReactNode } from "react";

type ScrollableTableRegionProps = {
  ariaLabel: string;
  children: ReactNode;
  className: string;
};

export function ScrollableTableRegion({ ariaLabel, children, className }: ScrollableTableRegionProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;

    const container = event.currentTarget;
    const pageStep = Math.max(160, Math.round(container.clientWidth * 0.8));
    let nextScrollLeft: number | null = null;

    switch (event.key) {
      case "ArrowLeft":
        nextScrollLeft = container.scrollLeft - 48;
        break;
      case "ArrowRight":
        nextScrollLeft = container.scrollLeft + 48;
        break;
      case "PageUp":
        nextScrollLeft = container.scrollLeft - pageStep;
        break;
      case "PageDown":
        nextScrollLeft = container.scrollLeft + pageStep;
        break;
      case "Home":
        nextScrollLeft = 0;
        break;
      case "End":
        nextScrollLeft = container.scrollWidth - container.clientWidth;
        break;
      default:
        return;
    }

    event.preventDefault();
    container.scrollTo({ left: nextScrollLeft, behavior: "auto" });
  }

  return (
    <div
      aria-keyshortcuts="ArrowLeft ArrowRight PageUp PageDown Home End"
      aria-label={ariaLabel}
      className={className}
      onKeyDown={handleKeyDown}
      role="region"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
