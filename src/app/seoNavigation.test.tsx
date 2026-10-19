import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { CHILD_COURSE_LINKS } from "./courseNavigation";
import sitemap from "./sitemap";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));

describe("server-rendered navigation", () => {
  it.each([
    "pythonCourse", "dataScienceCourse", "frontendCourse", "dataAnalystCourse",
    "cppCourse", "mobileDeveloperCourse", "unrealEngineCourse", "javaCourse", "mlEngineerCourse",
  ] as const)("retains a desktop viewport cover for a mobile-ready course on %s", (page) => {
    const d = new DOMParser().parseFromString(renderToStaticMarkup(<App initialRoute={{ page }} />), "text/html");
    const shell = d.querySelector(".site-shell");
    // The same response serves phones and desktops: phones can paint this
    // ready tree immediately; CSS must have an overlay available on desktops.
    expect(shell?.classList.contains("site-shell--mobile")).toBe(true);
    expect(shell?.classList.contains("site-shell--ready")).toBe(true);
    expect(shell?.querySelector(".site-loader")).not.toBeNull();
    expect(shell?.firstElementChild?.classList.contains("site-loader")).toBe(true);
  });
  it.each(["home", "tariffs", "about", "reviews"] as const)("exposes children destinations on %s before JavaScript", (page) => {
    const d = new DOMParser().parseFromString(renderToStaticMarkup(<App initialRoute={{ page }} />), "text/html");
    for (const href of ["/children", ...CHILD_COURSE_LINKS.map(x => x.href)]) {
      expect(d.querySelector(`a[href="${href}"]`), href).not.toBeNull();
    }
    const menu = d.querySelector('nav[aria-label="Мобильное меню"]');
    expect(menu?.hasAttribute("hidden")).toBe(true);
    expect(menu?.getAttribute("aria-hidden")).toBe("true");
  });
  it("keeps document dates while dating changed course content explicitly", () => {
    const entries = sitemap();
    expect(new Date(entries.find(x => x.url.endsWith("/python-course"))!.lastModified!).toISOString()).toBe("2026-10-19T00:00:00.000Z");
    expect(new Date(entries.find(x => x.url.endsWith("/sveden/education"))!.lastModified!).toISOString()).toBe("2026-08-29T00:00:00.000Z");
    for (const entry of entries.filter(x => x.url.endsWith("/children") || x.url.includes("/children/courses/"))) {
      expect(new Date(entry.lastModified!).toISOString()).toBe("2026-10-19T00:00:00.000Z");
    }
    expect(new Date(entries.find(x => x.url.endsWith("/children/stories/amir"))!.lastModified!).toISOString()).toBe("2026-10-14T00:00:00.000Z");
  });
});
