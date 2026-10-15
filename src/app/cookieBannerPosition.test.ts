import { afterEach, describe, expect, it, vi } from "vitest";
import { cookieBannerBottom, observeCookieBannerPosition } from "./cookieBannerPosition";
const banner = { left: 622, right: 1342, top: 630, bottom: 744, height: 114 };
const cta = { left: 385, right: 975, top: 618, bottom: 702, height: 84 };
describe("cookie notice placement", () => {
  it("moves an overlapping notice above the primary CTA", () => {
    const bottom = cookieBannerBottom(banner, cta, 768)!;
    expect(768 - bottom).toBeLessThan(cta.top);
    expect(768 - bottom - banner.height).toBeGreaterThanOrEqual(12);
  });
  it("preserves default position when CTA is above or horizontally separate", () => {
    expect(cookieBannerBottom(banner, { ...cta, top: 300, bottom: 400 }, 768)).toBeUndefined();
    expect(cookieBannerBottom(banner, { ...cta, left: 10, right: 100 }, 768)).toBeUndefined();
  });
  it("keeps dismissal on-screen when no space is available above", () => {
    expect(cookieBannerBottom({ ...banner, top: 50, height: 650 }, cta, 768)).toBeUndefined();
  });
});


describe("cookie notice lifecycle", () => {
  afterEach(() => { document.body.innerHTML = ""; vi.restoreAllMocks(); });
  function setup(withCta = true) {
    const notice = document.createElement("aside");
    const canvas = document.createElement("div");
    const button = document.createElement("button");
    button.className = "site-start-button";
    vi.spyOn(notice, "getBoundingClientRect").mockReturnValue(banner as DOMRect);
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue(cta as DOMRect);
    document.body.append(notice, canvas);
    if (withCta) canvas.append(button);
    return { notice, canvas, button };
  }
  it("positions synchronously before paint and removes inline position on cleanup", () => {
    const { notice, canvas } = setup();
    const dispose = observeCookieBannerPosition(notice, canvas);
    expect(notice.style.bottom).toBe(`${window.innerHeight - cta.top + 12}px`);
    dispose();
    expect(notice.style.bottom).toBe("");
  });
  it("positions a CTA that arrives later in a dynamic home screen", async () => {
    const { notice, canvas, button } = setup(false);
    const dispose = observeCookieBannerPosition(notice, canvas);
    expect(notice.style.bottom).toBe("");
    canvas.append(button);
    await Promise.resolve();
    expect(notice.style.bottom).toBe(`${window.innerHeight - cta.top + 12}px`);
    dispose();
  });
  it("disconnects the delayed-screen observer when navigation leaves home", async () => {
    const { notice, canvas, button } = setup(false);
    const dispose = observeCookieBannerPosition(notice, canvas);
    dispose();
    canvas.append(button);
    await Promise.resolve();
    expect(notice.style.bottom).toBe("");
  });
});
