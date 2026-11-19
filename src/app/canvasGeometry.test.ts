import { describe, expect, it } from "vitest";
import { getRenderedScale, getVisibleCarouselCenter } from "./canvasGeometry";

function layout(element: HTMLElement, values: Record<string, unknown>) {
  Object.entries(values).forEach(([key, value]) => Object.defineProperty(element, key, { configurable: true, value }));
}

describe("scaled canvas geometry", () => {
  it.each([0.5, 1, 1.5, 2])("keeps carousel centers in layout units at scale %s", (scale) => {
    const carousel = document.createElement("div");
    layout(carousel, { offsetWidth: 1440, clientWidth: 1440 });
    carousel.getBoundingClientRect = () => ({ left: 0, right: 1440 * scale, width: 1440 * scale }) as DOMRect;
    expect(getRenderedScale(carousel)).toBe(scale);
    expect(getVisibleCarouselCenter(carousel, 1440 * scale)).toBe(720);
    // A 200px pointer movement must move 200 screen pixels at every scale.
    expect((200 / getRenderedScale(carousel)) * scale).toBe(200);
  });

  it("centers the visible portion of a clipped carousel", () => {
    const carousel = document.createElement("div");
    layout(carousel, { offsetWidth: 1440, clientWidth: 1440 });
    carousel.getBoundingClientRect = () => ({ left: -100, right: 620, width: 720 }) as DOMRect;
    expect(getVisibleCarouselCenter(carousel, 500)).toBe(700);
  });
});
