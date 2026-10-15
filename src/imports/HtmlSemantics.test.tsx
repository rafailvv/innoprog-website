import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import type { ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { CourseProgramTagIcon } from "./courseProgramIcons";
import App from "../app/App";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));
const require = createRequire(import.meta.url);
const originals = [
  ["академических часов", "AccessTimeRounded"], ["Архитектура кода", "AccountTreeRounded"],
  ["Индивидуальная траектория", "AltRouteRounded"], ["Django-проект", "AppsRounded"],
  ["Практические задания", "AssignmentTurnedInRounded"], ["Практическая работа", "BuildRounded"],
  ["Docker и деплой", "CloudUploadRounded"], ["неизвестный тег", "CodeRounded"],
  ["SQL-запросы", "DataObjectRounded"], ["Linux-среда", "DnsRounded"],
  ["Aiogram", "ForumRounded"], ["GitHub", "GitHub"], ["Командная разработка", "GroupsRounded"],
  ["Поддерживаемые приложения", "IntegrationInstructionsRounded"], ["Деплой", "RocketLaunchRounded"],
  ["ORM", "SchemaRounded"], ["Тестирование", "Science"], ["Telegram-бот", "SmartToyRounded"],
  ["Базы данных", "StorageRounded"], ["Консольные программы", "TerminalRounded"],
  ["Django-шаблоны", "WebAssetRounded"], ["Веб-интерфейсы", "WebRounded"],
  ["Алгоритмическое мышление", "PsychologyRounded"],
];

const screens: Record<string, () => Promise<{ default: ComponentType }>> = {
  "CppCourseDesktop/CppCourseDesktop.tsx": () => import("./CppCourseDesktop/CppCourseDesktop"),
  "CppCourseMobile/CppCourseMobile.tsx": () => import("./CppCourseMobile/CppCourseMobile"),
  "DataAnalystCourseDesktop/DataAnalystCourseDesktop.tsx": () => import("./DataAnalystCourseDesktop/DataAnalystCourseDesktop"),
  "DataAnalystCourseMobile/DataAnalystCourseMobile.tsx": () => import("./DataAnalystCourseMobile/DataAnalystCourseMobile"),
  "DataScienceCourseDesktop/DataScienceCourseDesktop.tsx": () => import("./DataScienceCourseDesktop/DataScienceCourseDesktop"),
  "DataScienceCourseMobile/DataScienceCourseMobile.tsx": () => import("./DataScienceCourseMobile/DataScienceCourseMobile"),
  "FrontendCourseDesktop/FrontendCourseDesktop.tsx": () => import("./FrontendCourseDesktop/FrontendCourseDesktop"),
  "FrontendCourseMobile/FrontendCourseMobile.tsx": () => import("./FrontendCourseMobile/FrontendCourseMobile"),
  "JavaCourseDesktop/JavaCourseDesktop.tsx": () => import("./JavaCourseDesktop/JavaCourseDesktop"),
  "JavaCourseMobile/JavaCourseMobile.tsx": () => import("./JavaCourseMobile/JavaCourseMobile"),
  "MainScreenDesktop/MainScreenDesktop.tsx": () => import("./MainScreenDesktop/MainScreenDesktop"),
  "MainScreenMobile/MainScreenMobile.tsx": () => import("./MainScreenMobile/MainScreenMobile"),
  "MlEngineerCourseDesktop/MlEngineerCourseDesktop.tsx": () => import("./MlEngineerCourseDesktop/MlEngineerCourseDesktop"),
  "MlEngineerCourseMobile/MlEngineerCourseMobile.tsx": () => import("./MlEngineerCourseMobile/MlEngineerCourseMobile"),
  "MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop.tsx": () => import("./MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop"),
  "MobileDeveloperCourseMobile/MobileDeveloperCourseMobile.tsx": () => import("./MobileDeveloperCourseMobile/MobileDeveloperCourseMobile"),
  "PythonCourseDesktop/PythonCourseDesktop.tsx": () => import("./PythonCourseDesktop/PythonCourseDesktop"),
  "PythonCourseMobile/PythonCourseMobile.tsx": () => import("./PythonCourseMobile/PythonCourseMobile"),
  "UnrealEngineCourseDesktop/UnrealEngineCourseDesktop.tsx": () => import("./UnrealEngineCourseDesktop/UnrealEngineCourseDesktop"),
  "UnrealEngineCourseMobile/UnrealEngineCourseMobile.tsx": () => import("./UnrealEngineCourseMobile/UnrealEngineCourseMobile"),
};

describe("valid server HTML without changing programme icons", () => {
  it.each(originals)("preserves the original geometry for %s", (tag, icon) => {
    const originalSource = readFileSync(require.resolve(`@mui/icons-material/${icon}`), "utf8");
    const originalPaths = [...originalSource.matchAll(/\bd: ("[^"]+")/g)].map((match) => JSON.parse(match[1]));
    const markup = renderToStaticMarkup(<span className="site-course-program-tag"><CourseProgramTagIcon tag={tag} /></span>);
    const document = new DOMParser().parseFromString(markup, "text/html");
    expect([...document.querySelectorAll("path")].map((p) => p.getAttribute("d"))).toEqual(originalPaths);
    expect(originalPaths.length).toBeGreaterThan(0);
    expect(document.querySelector("style")).toBeNull();
    const svg = document.querySelector("svg")!;
    expect(svg.getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.getAttribute("focusable")).toBe("false");
    expect(svg.classList.contains("site-course-program-tag-icon")).toBe(true);
    expect(svg.getAttribute("style")).toContain("fill:currentColor");
  });

  it.each(Object.entries(screens))("uses phrasing content in buttons on %s", async (_name, load) => {
    const Screen = (await load()).default;
    const markup = renderToStaticMarkup(<Screen />);
    const document = new DOMParser().parseFromString(markup, "text/html");
    expect(document.querySelectorAll("button").length).toBeGreaterThan(0);
    expect([...document.querySelectorAll("button div, button p, button button, button a")].map((el) => el.outerHTML.slice(0, 240))).toEqual([]);
    expect(document.querySelectorAll(".site-course-program-tag style").length).toBe(0);
    const levels = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((heading) => Number(heading.tagName.slice(1)));
    expect(levels.filter((level, index) => index > 0 && level > levels[index - 1] + 1)).toEqual([]);
    if (_name === "PythonCourseMobile/PythonCourseMobile.tsx") {
      const headings = [...document.querySelectorAll("h1, h2, h3")];
      const firstProject = document.querySelector(".site-course-mobile-project-title")!;
      expect(headings.slice(0, headings.indexOf(firstProject)).some((heading) => heading.tagName === "H2")).toBe(true);
    }
    expect(document.querySelector('button[data-mobile-menu-toggle]') || document.querySelector('button[type="button"]')).not.toBeNull();
  });

  it("publishes both modal consent states before JavaScript", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<App initialRoute={{ page: "tariffs" }} />), "text/html");
    const controls = document.querySelectorAll('.site-lead-modal [role="checkbox"]');
    expect(controls).toHaveLength(2);
    controls.forEach((control) => expect(control.getAttribute("aria-checked")).toBe("false"));
  });

  it("keeps one main landmark on the about route", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<App initialRoute={{ page: "about" }} />), "text/html");
    expect(document.querySelectorAll("main")).toHaveLength(1);
    expect(document.querySelector("main main, section main")).toBeNull();
    const content = document.querySelector(".site-about-content")!;
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toContain("наша миссия:");
    expect(content.querySelectorAll("section").length).toBeGreaterThan(2);
  });

  it("keeps review headings in flow containers inside their navigable cards", () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<App initialRoute={{ page: "reviews" }} />), "text/html");
    const cards = [...document.querySelectorAll<HTMLAnchorElement>("a.site-reviews-index-card")];
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      const heading = card.querySelector("h3.site-reviews-index-card__title")!;
      expect(heading.parentElement?.tagName).toBe("DIV");
      expect(heading.parentElement?.classList.contains("site-reviews-index-card__copy")).toBe(true);
      expect(card.getAttribute("href")).toMatch(/^\/(?:reviews[/?]|[a-z-]+-course\/reviews\/)/);
      expect(card.querySelector(".site-reviews-index-card__body")?.textContent).not.toBe("");
    }
  });

});
