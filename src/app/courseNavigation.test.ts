import { describe, expect, it } from "vitest";

import { ADULT_COURSE_LINKS, CHILD_COURSE_LINKS } from "./courseNavigation";
import { getChildrenCourse } from "./children/courses/course-data";
import { pythonCourseProgramModules } from "../imports/courseProgramData";

describe("course configuration contracts", () => {
  it("keeps nine unique adult course routes", () => {
    expect(ADULT_COURSE_LINKS).toHaveLength(9);
    expect(new Set(ADULT_COURSE_LINKS.map(({ href }) => href)).size).toBe(9);
    expect(ADULT_COURSE_LINKS.every(({ label, href }) => label && href.startsWith("/"))).toBe(true);
  });

  it("routes every child direction to its matching local course page", () => {
    expect(CHILD_COURSE_LINKS.map(({ href }) => href)).toEqual([
      "/children/courses/python",
      "/children/courses/web-development",
      "/children/courses/informatics-exams",
      "/children/courses/olympiad-programming",
      "/children/courses/neural-networks",
      "/children/courses/game-development",
    ]);
    for (const { label, href } of CHILD_COURSE_LINKS) {
      const course = getChildrenCourse(href.split("/").at(-1)!);
      expect(course, `${label} must resolve to an existing child course`).toBeDefined();
      expect(course?.title).toBe(label);
    }
  });

  it("provides complete typed program modules", () => {
    expect(pythonCourseProgramModules.length).toBeGreaterThan(5);
    for (const module of pythonCourseProgramModules) {
      expect(module.title.trim()).not.toBe("");
      expect(module.description.trim()).not.toBe("");
      expect(module.topics.length).toBeGreaterThan(0);
      expect(module.tags.length).toBeGreaterThan(0);
    }
  });
});
