import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { pythonCourseProgramModules } from "../imports/courseProgramData";
import { EDUCATION_PROGRAMS } from "./sveden/data";

const approvedPythonModules = [
  ["Python Начальный", 80],
  ["Python Продвинутый", 80],
  ["ООП в Python", 40],
  ["Git", 24],
  ["Linux", 48],
  ["Алгоритмы и структуры данных", 48],
  ["Основы SQL", 32],
  ["PostgreSQL", 56],
  ["Основы HTML, CSS и JavaScript", 32],
  ["HTTP, REST API и асинхронный Python", 48],
  ["Django", 72],
  ["Redis, Celery и очереди сообщений", 40],
  ["Создание Telegram-бота", 32],
  ["FastAPI", 80],
  ["Тестирование", 64],
  ["Docker", 64],
  ["CI/CD", 40],
] as const;

const courseComponents = [
  ["Cpp", 800, 40],
  ["DataAnalyst", 800, 40],
  ["DataScience", 960, 48],
  ["Frontend", 800, 40],
  ["Java", 800, 40],
  ["MlEngineer", 960, 48],
  ["MobileDeveloper", 800, 40],
  ["Python", 960, null],
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

  it("publishes twelve months in Python, Data Science and ML metadata", () => {
    for (const route of ["python-course", "data-science-course", "ml-engineer-course"]) {
      const source = readFileSync(resolve(process.cwd(), "src", "app", route, "page.tsx"), "utf8");
      expect(source).toContain("12 месяцев обучения");
      expect(source).not.toContain("10 месяцев обучения");
    }
  });

  it("publishes all 17 approved Python modules in order with 880 module hours", () => {
    const publishedModules = pythonCourseProgramModules.map(({ title, tags }) => {
      const hours = Number.parseInt(tags[0], 10);
      expect(Number.isNaN(hours), title).toBe(false);
      return [title, hours] as const;
    });

    expect(publishedModules).toEqual(approvedPythonModules);
    expect(publishedModules.reduce((total, [, hours]) => total + hours, 0)).toBe(880);
  });

  it("keeps the 960-hour DPO program separate from the 800-hour general Python program", () => {
    const professional = EDUCATION_PROGRAMS.find(
      ({ kind, name }) => kind === "ДПО" && name === "Python-разработчик",
    );
    const general = EDUCATION_PROGRAMS.find(
      ({ fileName }) => fileName === "Python-разработчик программа обучения для детей от 12 лет и взрослых.pdf",
    );

    expect(professional).toMatchObject({
      volume: "960 академических часов",
      term: "12 месяцев (48 учебных недель), нагрузка 20 академических часов в неделю",
      subjects: approvedPythonModules.map(([title]) => title),
    });
    expect(general).toMatchObject({
      kind: "ДО",
      volume: "800 академических часов",
      term: "10 месяцев (40 учебных недель), рекомендуемая нагрузка 20 академических часов в неделю",
      subjects: [
        "Введение в профессию", "Python начальный", "Python продвинутый", "ООП в Python", "Git", "Основы SQL",
        "Алгоритмы и структуры данных", "HTML, CSS и JavaScript", "Linux", "PostgreSQL", "Создание Telegram-бота", "Django",
      ],
    });
  });
});
