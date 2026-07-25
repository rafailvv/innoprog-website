import { describe, expect, it } from "vitest";

import { ADULT_COURSE_LINKS, CHILD_COURSE_LINKS } from "./courseNavigation";
import { pythonCourseProgramModules } from "../imports/courseProgramData";

describe("course configuration contracts", () => {
  it("keeps nine unique adult course routes", () => {
    expect(ADULT_COURSE_LINKS).toHaveLength(9);
    expect(new Set(ADULT_COURSE_LINKS.map(({ href }) => href)).size).toBe(9);
    expect(ADULT_COURSE_LINKS.every(({ label, href }) => label && href.startsWith("/"))).toBe(true);
  });

  it("keeps child directions linked to the school landing", () => {
    expect(CHILD_COURSE_LINKS.length).toBeGreaterThan(0);
    expect(CHILD_COURSE_LINKS.every(({ href }) => href.endsWith("/children/school"))).toBe(true);
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
