import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";
import { HOME_BACKGROUND_IMAGE, HOME_HERO_AVIF } from "./homeCriticalAssets";

// Render the actual mobile surface without Next's runtime dynamic-loading wrapper.
vi.mock("./App", async () => ({ default: (await import("../imports/MainScreenMobile/MainScreenMobile")).default }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));

describe("home hero preload selection", () => {
  it("preloads the AVIF used by the hero and keeps its background at low priority", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<HomePage />), "text/html");
    const image = document.querySelector('img[alt="Студент ИННОПРОГ за ноутбуком"]');
    expect(image?.getAttribute("src")).toMatch(/\.webp$/);
    expect(image?.closest("picture")?.querySelector('source[type="image/avif"]')?.getAttribute("srcset")).toBe(HOME_HERO_AVIF);
    expect(image?.hasAttribute("srcset")).toBe(false);
    const preloads = [...document.querySelectorAll('link[rel="preload"][as="image"]')];
    expect(preloads.map(link => link.getAttribute("href"))).toEqual([HOME_HERO_AVIF, HOME_BACKGROUND_IMAGE]);
    expect(preloads[0].getAttribute("type")).toBe("image/avif");
    expect(preloads.map(link => link.getAttribute("fetchPriority"))).toEqual(["high", "low"]);
    expect(preloads.every(link => !link.hasAttribute("imagesrcset") && !link.hasAttribute("media"))).toBe(true);
  });
});
