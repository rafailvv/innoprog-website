import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import ProgramAccordion from "./ProgramAccordion";
import type { ChildrenCourse } from "./course-data";
afterEach(cleanup);
const modules = [
  { title: "Первые шаги", description: "Разбираемся с основами", topics: ["Среда разработки", "Переменные"], practice: ["Создать первую программу"], outcome: "Ребёнок запускает свою программу" },
  { title: "Свой проект", description: "Соединяем знания", topics: ["План проекта", "Проверка результата"], practice: ["Собрать приложение"], outcome: "Готов самостоятельный проект" },
] as ChildrenCourse["modules"];
it("keeps every module's topics, practice and outcome in the initial HTML", () => {
  const html = renderToStaticMarkup(<ProgramAccordion modules={modules} />);
  for (const module of modules) {
    for (const text of [...module.topics, ...module.practice, module.outcome]) expect(html).toContain(text);
  }
  expect(html).not.toContain('aria-expanded="true"');
});
it("starts collapsed, opens one adult-style panel and lets it close again", () => {
  const { container } = render(<ProgramAccordion modules={modules} />);
  const toggles = screen.getAllByRole("button");
  expect(container.querySelectorAll('.site-course-program-module.is-open')).toHaveLength(0);
  expect(screen.queryAllByRole("region")).toHaveLength(0);
  fireEvent.click(toggles[0]);
  expect(toggles[0]).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("region", { name: "(1) Первые шаги" })).toHaveAttribute("id", toggles[0].getAttribute("aria-controls"));
  expect(screen.getByText("Создать первую программу")).toBeVisible();
  expect(screen.getByText("Ребёнок запускает свою программу")).toBeVisible();
  fireEvent.click(toggles[1]);
  expect(container.querySelectorAll('.site-course-program-module.is-open')).toHaveLength(1);
  expect(toggles[0]).toHaveAttribute("aria-expanded", "false");
  expect(toggles[1]).toHaveAttribute("aria-expanded", "true");
  expect(screen.getAllByRole("region")).toHaveLength(1);
  fireEvent.click(toggles[1]);
  expect(screen.queryAllByRole("region")).toHaveLength(0);
});
