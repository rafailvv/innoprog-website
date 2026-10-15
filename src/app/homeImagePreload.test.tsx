import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";
import { HOME_CRITICAL_IMAGE_URLS } from "./homeCriticalAssets";

// Render the actual mobile surface without Next's runtime dynamic-loading wrapper.
vi.mock("./App", async () => ({ default: (await import("../imports/MainScreenMobile/MainScreenMobile")).default }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));

describe("home hero preload selection", () => {
  it("preloads the unchanged first-screen image before its background without alternate unused candidates", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<HomePage />), "text/html");
    const image = document.querySelector('img[alt="Студент ИННОПРОГ за ноутбуком"]');
    expect(image?.getAttribute("src")).toBe(HOME_CRITICAL_IMAGE_URLS[0]);
    expect(image?.hasAttribute("srcset")).toBe(false);
    const preloads = [...document.querySelectorAll('link[rel="preload"][as="image"]')];
    expect(preloads.map(link => link.getAttribute("href"))).toEqual([...HOME_CRITICAL_IMAGE_URLS]);
    expect(preloads.every(link => !link.hasAttribute("imagesrcset") && !link.hasAttribute("media"))).toBe(true);
  });
});
