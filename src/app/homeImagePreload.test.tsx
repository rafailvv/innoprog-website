import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";
import { HOME_BACKGROUND_IMAGE_URL, HOME_HERO_IMAGE_URL } from "./homeCriticalAssets";

// Render the actual mobile surface without Next's runtime dynamic-loading wrapper.
vi.mock("./App", async () => ({ default: (await import("../imports/MainScreenMobile/MainScreenMobile")).default }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));

describe("home hero preload selection", () => {
  it("matches the mobile image candidates instead of preloading an unused full-size fallback", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<HomePage />), "text/html");
    const image = document.querySelector('img[alt="Студент ИННОПРОГ за ноутбуком"]');
    expect(image).not.toBeNull();
    const preloads = [...document.querySelectorAll('link[rel="preload"][as="image"]')];
    const mobile = preloads.find(link => link.getAttribute("media") === "(max-width: 767px)");
    const desktop = preloads.find(link => link.getAttribute("media") === "(min-width: 768px)");
    expect(mobile?.getAttribute("imagesrcset")).toBe(image?.getAttribute("srcset"));
    expect(mobile?.getAttribute("imagesizes")).toBe(image?.getAttribute("sizes"));
    expect(desktop?.getAttribute("href")).toBe(HOME_HERO_IMAGE_URL);
    expect(preloads.some(link => link.getAttribute("href") === HOME_HERO_IMAGE_URL && !link.hasAttribute("media") && !link.hasAttribute("imagesrcset"))).toBe(false);
    expect(preloads.some(link => link.getAttribute("href") === HOME_BACKGROUND_IMAGE_URL && !link.hasAttribute("media"))).toBe(true);
  });
});
