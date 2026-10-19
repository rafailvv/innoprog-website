import { describe, expect, it } from "vitest";
import { pythonCourseProgramModules } from "../imports/courseProgramData";
import { pythonCourseJsonLd } from "./seo";

describe("Python course structured learning outcomes", () => {
  it("describes the published backend stack rather than generic marketing outcomes", () => {
    const visibleProgram = JSON.stringify(pythonCourseProgramModules).toLowerCase();
    const structuredOutcomes = pythonCourseJsonLd.teaches.join(" ").toLowerCase();

    for (const technology of [
      "Python", "Git", "Linux", "SQL", "PostgreSQL", "HTTP", "REST API",
      "asyncio", "Django", "FastAPI", "Redis", "Celery", "aiogram",
      "pytest", "Docker", "CI/CD",
    ]) {
      expect(visibleProgram, `${technology} must have a published curriculum source`).toContain(technology.toLowerCase());
      expect(structuredOutcomes, `${technology} must be discoverable in learning outcomes`).toContain(technology.toLowerCase());
    }

    for (const technology of ["Python", "SQL", "PostgreSQL", "Django", "FastAPI", "Docker", "CI/CD"]) {
      expect(pythonCourseJsonLd.description).toContain(technology);
    }
    expect(pythonCourseJsonLd.teaches).not.toContain("работа с кодом");
    expect(pythonCourseJsonLd.teaches).not.toContain("практические задачи");
  });

  it("preserves the approved duration and monthly payment unit", () => {
    expect(pythonCourseJsonLd.timeRequired).toBe("P12M");
    expect(pythonCourseJsonLd.hasCourseInstance.courseWorkload).toBe("960 академических часов");
    expect(pythonCourseJsonLd.offers.priceSpecification).toMatchObject({
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    });
  });
});
