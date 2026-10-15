import { describe, expect, it } from "vitest";
import { cookieBannerBottom } from "./cookieBannerPosition";
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
