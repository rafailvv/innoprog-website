import { describe, expect, it } from "vitest";
import { getLayoutBottom, getRenderedScale, getVisibleCarouselCenter } from "./canvasGeometry";

function layout(element: HTMLElement, values: Record<string, unknown>) {
  Object.entries(values).forEach(([key, value]) => Object.defineProperty(element, key, { configurable: true, value }));
}

describe("scaled canvas geometry", () => {
  it("converts a nested footer's scaled bottom to canvas units regardless of scroll position", () => {
    const canvas = document.createElement("div");
    const stack = document.createElement("div");
    const footer = document.createElement("footer");
    canvas.append(stack);
    stack.append(footer);
    let scrollY = 0;
    canvas.getBoundingClientRect = () => ({ top: -scrollY }) as DOMRect;
    footer.getBoundingClientRect = () => ({ bottom: 10797.25 - scrollY }) as DOMRect;
    expect(getLayoutBottom(footer, canvas, 0.75)).toBe(14397);
    scrollY = 10500;
    expect(getLayoutBottom(footer, canvas, 0.75)).toBe(14397);
  });

  it("rejects elements outside the canvas", () => {
    expect(getLayoutBottom(document.createElement("footer"), document.createElement("div"), 1)).toBeNull();
  });

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
