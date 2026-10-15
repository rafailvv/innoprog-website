import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ComponentType } from "react";
import { courseFaqItems } from "./courseFaqData";
import { getCourseFaqItems, type CourseFaqDirection } from "./courseDirectionFaqData";
import * as programs from "./courseProgramData";
import { faqPageJsonLd } from "../app/seo";
import ChildrenCoursePage from "../app/children/courses/[slug]/page";
import { childrenCourses } from "../app/children/courses/course-data";
import PythonCourseDesktop from "./PythonCourseDesktop/PythonCourseDesktop";
import PythonCourseMobile from "./PythonCourseMobile/PythonCourseMobile";
import DataScienceCourseDesktop from "./DataScienceCourseDesktop/DataScienceCourseDesktop";
import DataScienceCourseMobile from "./DataScienceCourseMobile/DataScienceCourseMobile";
import FrontendCourseDesktop from "./FrontendCourseDesktop/FrontendCourseDesktop";
import FrontendCourseMobile from "./FrontendCourseMobile/FrontendCourseMobile";
import DataAnalystCourseDesktop from "./DataAnalystCourseDesktop/DataAnalystCourseDesktop";
import DataAnalystCourseMobile from "./DataAnalystCourseMobile/DataAnalystCourseMobile";
import CppCourseDesktop from "./CppCourseDesktop/CppCourseDesktop";
import CppCourseMobile from "./CppCourseMobile/CppCourseMobile";
import MobileDeveloperCourseDesktop from "./MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop";
import MobileDeveloperCourseMobile from "./MobileDeveloperCourseMobile/MobileDeveloperCourseMobile";
import UnrealEngineCourseDesktop from "./UnrealEngineCourseDesktop/UnrealEngineCourseDesktop";
import UnrealEngineCourseMobile from "./UnrealEngineCourseMobile/UnrealEngineCourseMobile";
import JavaCourseDesktop from "./JavaCourseDesktop/JavaCourseDesktop";
import JavaCourseMobile from "./JavaCourseMobile/JavaCourseMobile";
import MlEngineerCourseDesktop from "./MlEngineerCourseDesktop/MlEngineerCourseDesktop";
import MlEngineerCourseMobile from "./MlEngineerCourseMobile/MlEngineerCourseMobile";

const screens: readonly [CourseFaqDirection, string, string, programs.CourseProgramModule[], ComponentType][] = [
  ["python", "/python-course", "FastAPI", programs.pythonCourseProgramModules, PythonCourseDesktop],
  ["python", "/python-course", "FastAPI", programs.pythonCourseProgramModules, PythonCourseMobile],
  ["dataScience", "/data-science-course", "машинное обучение", programs.dataScienceCourseProgramModules, DataScienceCourseDesktop],
  ["dataScience", "/data-science-course", "машинное обучение", programs.dataScienceCourseProgramModules, DataScienceCourseMobile],
  ["frontend", "/frontend-developer-course", "TypeScript", programs.frontendCourseProgramModules, FrontendCourseDesktop],
  ["frontend", "/frontend-developer-course", "TypeScript", programs.frontendCourseProgramModules, FrontendCourseMobile],
  ["dataAnalyst", "/data-analyst-course", "Power BI", programs.dataAnalystCourseProgramModules, DataAnalystCourseDesktop],
  ["dataAnalyst", "/data-analyst-course", "Power BI", programs.dataAnalystCourseProgramModules, DataAnalystCourseMobile],
  ["cpp", "/cpp-developer-course", "CMake", programs.cppCourseProgramModules, CppCourseDesktop],
  ["cpp", "/cpp-developer-course", "CMake", programs.cppCourseProgramModules, CppCourseMobile],
  ["mobile", "/mobile-developer-course", "Flutter", programs.mobileDeveloperCourseProgramModules, MobileDeveloperCourseDesktop],
  ["mobile", "/mobile-developer-course", "Flutter", programs.mobileDeveloperCourseProgramModules, MobileDeveloperCourseMobile],
  ["unreal", "/unreal-engine-course", "Blueprint", programs.unrealEngineCourseProgramModules, UnrealEngineCourseDesktop],
  ["unreal", "/unreal-engine-course", "Blueprint", programs.unrealEngineCourseProgramModules, UnrealEngineCourseMobile],
  ["java", "/java-developer-course", "Spring Boot", programs.javaCourseProgramModules, JavaCourseDesktop],
  ["java", "/java-developer-course", "Spring Boot", programs.javaCourseProgramModules, JavaCourseMobile],
  ["mlEngineer", "/ml-engineer-course", "MLOps", programs.mlEngineerCourseProgramModules, MlEngineerCourseDesktop],
  ["mlEngineer", "/ml-engineer-course", "MLOps", programs.mlEngineerCourseProgramModules, MlEngineerCourseMobile],
];
const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

describe("individual course FAQ integration", () => {
  it.each(screens)("renders seven consistent FAQ answers for %s (%s)", (direction, path, marker, modules, Screen) => {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<Screen />);
    const rows = [...container.querySelectorAll(".site-course-faq-item")];
    const data = getCourseFaqItems(direction);
    const schema = faqPageJsonLd(data, path);
    expect(rows).toHaveLength(7);
    expect(data.map((item) => item.question)).toEqual(courseFaqItems.map((item) => item.question));
    expect(data.reduce((sum, item) => sum + item.answer.length, 0)).toBeLessThanOrEqual(25);
    rows.forEach((row, index) => {
      expect(normalize(row.querySelector(".site-course-faq-question")!.textContent!)).toBe(schema.mainEntity[index].name);
      expect(normalize([...row.querySelectorAll(".site-course-faq-answer p")].map((paragraph) => paragraph.textContent!).join(" "))).toBe(normalize(schema.mainEntity[index].acceptedAnswer.text));
      row.querySelectorAll("a").forEach((anchor) => expect(anchor.tabIndex).toBe(-1));
    });
    const months = ["frontend", "dataAnalyst", "mobile", "unreal"].includes(direction) ? 10 : 12;
    expect(rows[1].textContent).toContain(`Срок освоения этой программы — ${months} месяцев`);
    expect(data[1].tariffsLink).toBe(true);
    expect(data[1].answer.slice(1)).toEqual(courseFaqItems[1].answer.slice(1));
    expect(rows[0].textContent!.toLocaleLowerCase()).toContain(marker.toLocaleLowerCase());
    expect(JSON.stringify(modules).toLocaleLowerCase()).toContain(marker.toLocaleLowerCase());
    const related = [...rows[4].querySelectorAll("a")];
    expect(related.length).toBeGreaterThan(0);
    related.forEach((anchor) => {
      expect(anchor.getAttribute("href")).toMatch(/^\/[a-z-]+-course$/);
      expect(anchor.getAttribute("href")).not.toBe(path);
    });
    // Four shared conditions retain their complete base objects, including offer links.
    [2, 3, 5, 6].forEach((index) => expect(data[index]).toBe(courseFaqItems[index]));
  });

  it("provides distinct program answers for all nine directions", () => {
    const directions = [...new Set(screens.map(([direction]) => direction))];
    expect(directions).toHaveLength(9);
    expect(new Set(directions.map((direction) => getCourseFaqItems(direction)[0].answer.join(" "))).size).toBe(9);
  });

  it.each(childrenCourses)("links $slug to the actual shared teachers without an invented assignment", async ({ slug }) => {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(await ChildrenCoursePage({ params: Promise.resolve({ slug }) }));
    const link = container.querySelector('a[href="/children#teachers"]');
    expect(link?.textContent).toBe("преподавателем");
    expect(normalize(link!.parentElement!.textContent!)).toBe("Ребёнок занимается с преподавателем один на один, сразу задаёт вопросы и получает обратную связь по своей работе");
    const course = [...container.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent!)).find((item) => item["@type"] === "Course");
    expect(course.hasCourseInstance.instructor).toBeUndefined();
  });
});
