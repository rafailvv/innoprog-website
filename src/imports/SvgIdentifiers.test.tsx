import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ComponentType } from "react";

const screens: Record<string, () => Promise<{ default: ComponentType }>> = {
  "./CppCourseDesktop/CppCourseDesktop.tsx": () => import("./CppCourseDesktop/CppCourseDesktop"),
  "./CppCourseMobile/CppCourseMobile.tsx": () => import("./CppCourseMobile/CppCourseMobile"),
  "./DataAnalystCourseDesktop/DataAnalystCourseDesktop.tsx": () => import("./DataAnalystCourseDesktop/DataAnalystCourseDesktop"),
  "./DataAnalystCourseMobile/DataAnalystCourseMobile.tsx": () => import("./DataAnalystCourseMobile/DataAnalystCourseMobile"),
  "./DataScienceCourseDesktop/DataScienceCourseDesktop.tsx": () => import("./DataScienceCourseDesktop/DataScienceCourseDesktop"),
  "./DataScienceCourseMobile/DataScienceCourseMobile.tsx": () => import("./DataScienceCourseMobile/DataScienceCourseMobile"),
  "./FrontendCourseDesktop/FrontendCourseDesktop.tsx": () => import("./FrontendCourseDesktop/FrontendCourseDesktop"),
  "./FrontendCourseMobile/FrontendCourseMobile.tsx": () => import("./FrontendCourseMobile/FrontendCourseMobile"),
  "./JavaCourseDesktop/JavaCourseDesktop.tsx": () => import("./JavaCourseDesktop/JavaCourseDesktop"),
  "./JavaCourseMobile/JavaCourseMobile.tsx": () => import("./JavaCourseMobile/JavaCourseMobile"),
  "./MainScreenDesktop/MainScreenDesktop.tsx": () => import("./MainScreenDesktop/MainScreenDesktop"),
  "./MainScreenMobile/MainScreenMobile.tsx": () => import("./MainScreenMobile/MainScreenMobile"),
  "./MlEngineerCourseDesktop/MlEngineerCourseDesktop.tsx": () => import("./MlEngineerCourseDesktop/MlEngineerCourseDesktop"),
  "./MlEngineerCourseMobile/MlEngineerCourseMobile.tsx": () => import("./MlEngineerCourseMobile/MlEngineerCourseMobile"),
  "./MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop.tsx": () => import("./MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop"),
  "./MobileDeveloperCourseMobile/MobileDeveloperCourseMobile.tsx": () => import("./MobileDeveloperCourseMobile/MobileDeveloperCourseMobile"),
  "./PythonCourseDesktop/PythonCourseDesktop.tsx": () => import("./PythonCourseDesktop/PythonCourseDesktop"),
  "./PythonCourseMobile/PythonCourseMobile.tsx": () => import("./PythonCourseMobile/PythonCourseMobile"),
  "./UnrealEngineCourseDesktop/UnrealEngineCourseDesktop.tsx": () => import("./UnrealEngineCourseDesktop/UnrealEngineCourseDesktop"),
  "./UnrealEngineCourseMobile/UnrealEngineCourseMobile.tsx": () => import("./UnrealEngineCourseMobile/UnrealEngineCourseMobile"),
};

describe("SVG identifiers in server-rendered screens", () => {
  it.each(Object.entries(screens))("preserves references and unique identifiers in %s", async (_name, load) => {
    const Screen = (await load()).default;
    const markup = renderToStaticMarkup(<Screen />);
    const document = new DOMParser().parseFromString(markup, "text/html");
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    expect(ids.filter((id) => /^(?:Group|Vector|Star)(?:[ _]\d+)?$/.test(id))).toEqual([]);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect([...new Set(duplicates)]).toEqual([]);
    expect(ids.filter((id) => /\s/.test(id))).toEqual([]);
    for (const svg of document.querySelectorAll("svg")) {
      const definitions = new Set([...svg.querySelectorAll("[id]")].map((element) => element.id));
      const references = [...svg.outerHTML.matchAll(/url\(#([^\)]+)\)/g)].map((match) => match[1]);
      for (const reference of references) expect(definitions.has(reference), `missing SVG definition ${reference}`).toBe(true);
    }
  });
});
