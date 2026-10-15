import React, { type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import CppCourseDesktop from "./CppCourseDesktop/CppCourseDesktop";
import CppCourseMobile from "./CppCourseMobile/CppCourseMobile";
import DataAnalystCourseDesktop from "./DataAnalystCourseDesktop/DataAnalystCourseDesktop";
import DataAnalystCourseMobile from "./DataAnalystCourseMobile/DataAnalystCourseMobile";
import DataScienceCourseDesktop from "./DataScienceCourseDesktop/DataScienceCourseDesktop";
import DataScienceCourseMobile from "./DataScienceCourseMobile/DataScienceCourseMobile";
import FrontendCourseDesktop from "./FrontendCourseDesktop/FrontendCourseDesktop";
import FrontendCourseMobile from "./FrontendCourseMobile/FrontendCourseMobile";
import JavaCourseDesktop from "./JavaCourseDesktop/JavaCourseDesktop";
import JavaCourseMobile from "./JavaCourseMobile/JavaCourseMobile";
import MlEngineerCourseDesktop from "./MlEngineerCourseDesktop/MlEngineerCourseDesktop";
import MlEngineerCourseMobile from "./MlEngineerCourseMobile/MlEngineerCourseMobile";
import MobileDeveloperCourseDesktop from "./MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop";
import MobileDeveloperCourseMobile from "./MobileDeveloperCourseMobile/MobileDeveloperCourseMobile";
import PythonCourseDesktop from "./PythonCourseDesktop/PythonCourseDesktop";
import PythonCourseMobile from "./PythonCourseMobile/PythonCourseMobile";
import UnrealEngineCourseDesktop from "./UnrealEngineCourseDesktop/UnrealEngineCourseDesktop";
import UnrealEngineCourseMobile from "./UnrealEngineCourseMobile/UnrealEngineCourseMobile";

const screens: Record<string, { default: ComponentType }> = {
  "./CppCourseDesktop/CppCourseDesktop.tsx": { default: CppCourseDesktop },
  "./CppCourseMobile/CppCourseMobile.tsx": { default: CppCourseMobile },
  "./DataAnalystCourseDesktop/DataAnalystCourseDesktop.tsx": { default: DataAnalystCourseDesktop },
  "./DataAnalystCourseMobile/DataAnalystCourseMobile.tsx": { default: DataAnalystCourseMobile },
  "./DataScienceCourseDesktop/DataScienceCourseDesktop.tsx": { default: DataScienceCourseDesktop },
  "./DataScienceCourseMobile/DataScienceCourseMobile.tsx": { default: DataScienceCourseMobile },
  "./FrontendCourseDesktop/FrontendCourseDesktop.tsx": { default: FrontendCourseDesktop },
  "./FrontendCourseMobile/FrontendCourseMobile.tsx": { default: FrontendCourseMobile },
  "./JavaCourseDesktop/JavaCourseDesktop.tsx": { default: JavaCourseDesktop },
  "./JavaCourseMobile/JavaCourseMobile.tsx": { default: JavaCourseMobile },
  "./MlEngineerCourseDesktop/MlEngineerCourseDesktop.tsx": { default: MlEngineerCourseDesktop },
  "./MlEngineerCourseMobile/MlEngineerCourseMobile.tsx": { default: MlEngineerCourseMobile },
  "./MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop.tsx": { default: MobileDeveloperCourseDesktop },
  "./MobileDeveloperCourseMobile/MobileDeveloperCourseMobile.tsx": { default: MobileDeveloperCourseMobile },
  "./PythonCourseDesktop/PythonCourseDesktop.tsx": { default: PythonCourseDesktop },
  "./PythonCourseMobile/PythonCourseMobile.tsx": { default: PythonCourseMobile },
  "./UnrealEngineCourseDesktop/UnrealEngineCourseDesktop.tsx": { default: UnrealEngineCourseDesktop },
  "./UnrealEngineCourseMobile/UnrealEngineCourseMobile.tsx": { default: UnrealEngineCourseMobile },
};

describe("course image delivery", () => {
  it("covers both responsive variants of all nine adult courses", () => {
    expect(Object.keys(screens)).toHaveLength(18);
  });

  it.each(Object.entries(screens))("keeps the hero prioritized and lower content lazy: %s", (path, { default: Screen }) => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<Screen />), "text/html");
    const images = [...document.querySelectorAll("img")];
    const prioritized = images.filter((image) => image.getAttribute("fetchPriority") === "high");
    expect(prioritized).toHaveLength(1);
    expect(prioritized[0].getAttribute("loading")).toBe("eager");
    expect(prioritized[0].getAttribute("decoding")).toBe("async");

    const projects = [...document.querySelectorAll(".site-course-project-visual img, .site-course-mobile-project-visual img")];
    const skillIcons = [...document.querySelectorAll(".site-course-skill-icon img")];
    expect(projects.length).toBeGreaterThan(0);
    expect(skillIcons.length).toBeGreaterThan(0);
    const lowerImages = path.includes("Desktop")
      ? images.filter((image) => image.alt.startsWith("Диплом") || image.src.includes("circle-stack-swirl"))
      : [...document.querySelectorAll(".site-course-structure-mobile-arrow")];
    expect(lowerImages).toHaveLength(path.includes("Desktop") ? 3 : 1);

    for (const image of [...projects, ...skillIcons, ...lowerImages]) {
      expect(image.getAttribute("loading"), image.getAttribute("src") ?? "").toBe("lazy");
      expect(image.getAttribute("decoding")).toBe("async");
      expect(image.getAttribute("fetchPriority")).not.toBe("high");
    }
    if (path.includes("DataScience")) {
      expect(prioritized[0].getAttribute("src")).toContain("data-science-hero-2x.lossless.webp");
    }
  });
});
