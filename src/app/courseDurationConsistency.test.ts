import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const courseComponents = [
  ["Cpp", 800, 40],
  ["DataAnalyst", 800, 40],
  ["DataScience", 960, 48],
  ["Frontend", 800, 40],
  ["Java", 800, 40],
  ["MlEngineer", 960, 48],
  ["MobileDeveloper", 800, 40],
  ["Python", 800, null],
  ["UnrealEngine", 800, 40],
] as const;

describe("public course duration facts", () => {
  it.each(courseComponents)("publishes approved facts for %s on desktop and mobile", (course, hours, weeks) => {
    for (const viewport of ["Desktop", "Mobile"] as const) {
      const componentName = `${course}Course${viewport}`;
      const source = readFileSync(
        resolve(process.cwd(), "src", "imports", componentName, `${componentName}.tsx`),
        "utf8",
      );

      expect(source).toContain(`>${hours}</p>`);
      if (weeks !== null) expect(source).toContain(`>${weeks}</p>`);
      expect(source).not.toContain(">560</p>");
      expect(source).not.toContain(">28</p>");
    }
  });

  it("publishes twelve months in Data Science and ML metadata", () => {
    for (const route of ["data-science-course", "ml-engineer-course"]) {
      const source = readFileSync(resolve(process.cwd(), "src", "app", route, "page.tsx"), "utf8");
      expect(source).toContain("12 месяцев обучения");
      expect(source).not.toContain("10 месяцев обучения");
    }
  });
});
