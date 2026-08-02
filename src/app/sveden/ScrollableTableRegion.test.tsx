import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScrollableTableRegion } from "./ScrollableTableRegion";

describe("ScrollableTableRegion", () => {
  it("supports horizontal keyboard navigation while keeping the region focusable", () => {
    const { getByRole } = render(
      <ScrollableTableRegion ariaLabel="Тестовая таблица" className="table-scroll">
        <table><tbody><tr><td>Данные</td></tr></tbody></table>
      </ScrollableTableRegion>,
    );
    const region = getByRole("region", { name: "Тестовая таблица" }) as HTMLDivElement;

    Object.defineProperties(region, {
      clientWidth: { configurable: true, value: 400 },
      scrollLeft: { configurable: true, value: 0, writable: true },
      scrollWidth: { configurable: true, value: 1200 },
    });
    region.scrollTo = vi.fn(({ left }: ScrollToOptions) => {
      region.scrollLeft = Number(left);
    });

    region.focus();
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(region.scrollLeft).toBe(48);
    fireEvent.keyDown(region, { key: "PageDown" });
    expect(region.scrollLeft).toBe(368);
    fireEvent.keyDown(region, { key: "End" });
    expect(region.scrollLeft).toBe(800);
    fireEvent.keyDown(region, { key: "Home" });
    expect(region.scrollLeft).toBe(0);
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveAttribute("aria-keyshortcuts", "ArrowLeft ArrowRight PageUp PageDown Home End");
  });
});
