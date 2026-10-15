import { cleanup, fireEvent, render } from "@testing-library/react";
import type { ComponentType } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const screens: Record<string, () => Promise<{ default: ComponentType }>> = {
  "CppCourseDesktop/CppCourseDesktop.tsx": () => import("./CppCourseDesktop/CppCourseDesktop"),
  "CppCourseMobile/CppCourseMobile.tsx": () => import("./CppCourseMobile/CppCourseMobile"),
  "DataAnalystCourseDesktop/DataAnalystCourseDesktop.tsx": () => import("./DataAnalystCourseDesktop/DataAnalystCourseDesktop"),
  "DataAnalystCourseMobile/DataAnalystCourseMobile.tsx": () => import("./DataAnalystCourseMobile/DataAnalystCourseMobile"),
  "DataScienceCourseDesktop/DataScienceCourseDesktop.tsx": () => import("./DataScienceCourseDesktop/DataScienceCourseDesktop"),
  "DataScienceCourseMobile/DataScienceCourseMobile.tsx": () => import("./DataScienceCourseMobile/DataScienceCourseMobile"),
  "FrontendCourseDesktop/FrontendCourseDesktop.tsx": () => import("./FrontendCourseDesktop/FrontendCourseDesktop"),
  "FrontendCourseMobile/FrontendCourseMobile.tsx": () => import("./FrontendCourseMobile/FrontendCourseMobile"),
  "JavaCourseDesktop/JavaCourseDesktop.tsx": () => import("./JavaCourseDesktop/JavaCourseDesktop"),
  "JavaCourseMobile/JavaCourseMobile.tsx": () => import("./JavaCourseMobile/JavaCourseMobile"),
  "MlEngineerCourseDesktop/MlEngineerCourseDesktop.tsx": () => import("./MlEngineerCourseDesktop/MlEngineerCourseDesktop"),
  "MlEngineerCourseMobile/MlEngineerCourseMobile.tsx": () => import("./MlEngineerCourseMobile/MlEngineerCourseMobile"),
  "MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop.tsx": () => import("./MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop"),
  "MobileDeveloperCourseMobile/MobileDeveloperCourseMobile.tsx": () => import("./MobileDeveloperCourseMobile/MobileDeveloperCourseMobile"),
  "PythonCourseDesktop/PythonCourseDesktop.tsx": () => import("./PythonCourseDesktop/PythonCourseDesktop"),
  "PythonCourseMobile/PythonCourseMobile.tsx": () => import("./PythonCourseMobile/PythonCourseMobile"),
  "UnrealEngineCourseDesktop/UnrealEngineCourseDesktop.tsx": () => import("./UnrealEngineCourseDesktop/UnrealEngineCourseDesktop"),
  "UnrealEngineCourseMobile/UnrealEngineCourseMobile.tsx": () => import("./UnrealEngineCourseMobile/UnrealEngineCourseMobile"),
};

afterEach(cleanup);

describe("course pages remain interactive after SEO changes", () => {
  it.each(Object.entries(screens))("preserves FAQ, programme and carousel controls in %s", async (_name, load) => {
    const Screen = (await load()).default;
    const { container } = render(<Screen />);
    const faq = [...container.querySelectorAll<HTMLButtonElement>(".site-course-faq-trigger")];
    expect(faq.length).toBeGreaterThan(2);
    const firstAnswer = faq[0].closest(".site-course-faq-item")!.querySelector(".site-course-faq-answer-shell")!;
    expect(faq[0]).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(faq[0]);
    expect(faq[0]).toHaveAttribute("aria-expanded", "true");
    expect(firstAnswer).toHaveAttribute("aria-hidden", "false");
    fireEvent.click(faq[1]);
    expect(faq[0]).toHaveAttribute("aria-expanded", "false");
    expect(faq[1]).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(faq[1]);
    expect(faq[1]).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelectorAll('.site-course-faq-answer a[tabindex="-1"]').length).toBeGreaterThan(0);

    const programme = [...container.querySelectorAll<HTMLButtonElement>(".site-course-program-toggle")];
    expect(programme.length).toBeGreaterThan(2);
    const panel = container.querySelector(`[id="${programme[0].getAttribute("aria-controls")}"]`)!;
    fireEvent.click(programme[0]);
    expect(programme[0]).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("aria-hidden", "false");
    fireEvent.click(programme[0]);
    expect(programme[0]).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-hidden", "true");

    for (const content of ["проекты", "отзывы"]) {
      const next = container.querySelector<HTMLButtonElement>(`button[aria-label="Следующие ${content}"]`)!;
      const prev = container.querySelector<HTMLButtonElement>(`button[aria-label="Предыдущие ${content}"]`)!;
      expect(next).not.toBeNull();
      const carousel = container.querySelector<HTMLElement>(`[data-carousel="${next.dataset.carouselTarget}"]`)!;
      Object.defineProperties(carousel, { clientWidth: { configurable: true, value: 300 }, scrollWidth: { configurable: true, value: carousel.children.length * 300 }, scrollLeft: { configurable: true, writable: true, value: 0 } });
      [...carousel.children].forEach((item, index) => Object.defineProperties(item, { offsetLeft: { configurable: true, value: index * 300 }, offsetWidth: { configurable: true, value: 300 } }));
      const scrollTo = vi.fn((options?: ScrollToOptions | number, _y?: number) => {
        carousel.scrollLeft = typeof options === "number" ? options : options?.left || 0;
      });
      carousel.scrollTo = scrollTo;
      fireEvent.click(next);
      expect(scrollTo).toHaveBeenLastCalledWith({ left: 300, behavior: "smooth" });
      fireEvent.click(prev);
      expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });
    }
  });
});
