import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "./manifest";
import { SITE_FAVICON_PATH, SITE_APPLE_TOUCH_ICON_PATH } from "./seo";

const asset = (path: string) => readFileSync(resolve(process.cwd(), "public", path.slice(1)));
const pngSize = (bytes: Buffer) => `${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`;

describe("browser and installed-app icons", () => {
  it("serves actual multi-resolution ICO frames instead of the large touch icon", () => {
    const ico = asset(SITE_FAVICON_PATH);
    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBe(4);
    expect(Array.from({ length: 4 }, (_, i) => ico[6 + i * 16])).toEqual([16, 32, 48, 64]);
    expect(ico.length).toBeLessThan(20_000);
    expect(pngSize(asset(SITE_APPLE_TOUCH_ICON_PATH))).toBe("420x420");
  });
  it("matches manifest MIME and declared dimensions to the actual PNG files", () => {
    for (const icon of manifest().icons ?? []) {
      const bytes = asset(icon.src);
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(icon.type).toBe("image/png");
      expect(icon.sizes).toBe(pngSize(bytes));
    }
  });
});
