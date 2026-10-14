import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ProgramAccordion from "./ProgramAccordion";
import { childrenCourses } from "./course-data";
afterEach(cleanup);
it("starts collapsed, keeps one module open and lets it close again", () => {
  const { container } = render(<ProgramAccordion modules={childrenCourses[0].modules} />);
  const summaries = container.querySelectorAll("summary");
  expect(container.querySelectorAll("details[open]")).toHaveLength(0);
  fireEvent.click(summaries[0]);
  expect(summaries[0].parentElement).toHaveAttribute("open");
  fireEvent.click(summaries[1]);
  expect(container.querySelectorAll("details[open]")).toHaveLength(1);
  expect(summaries[0].parentElement).not.toHaveAttribute("open");
  expect(summaries[1].parentElement).toHaveAttribute("open");
  fireEvent.click(summaries[1]);
  expect(container.querySelectorAll("details[open]")).toHaveLength(0);
});
