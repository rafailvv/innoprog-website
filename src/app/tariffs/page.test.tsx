import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import TariffsPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe("tariffs contact details", () => {
  it("renders the complete education email address and mail link", () => {
    const html = renderToStaticMarkup(<TariffsPage />);

    expect(html).toContain('href="mailto:education@innoprog.ru"');
    expect(html).toContain("Email: education@innoprog.ru");
    expect(html).not.toContain("educatio@innoprog.ru");
  });

  it("renders the lesson counts in bold and includes the Python tariff benefits", () => {
    const html = renderToStaticMarkup(<TariffsPage />);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const cards = [...doc.querySelectorAll('section[aria-label="Список тарифов"] article')];

    expect(cards.map((card) => card.querySelector("li strong")?.textContent)).toEqual([
      "4 индивидуальных занятия в месяц",
      "8 индивидуальных занятий в месяц",
      "12 индивидуальных занятий в месяц",
    ]);
    const includedFeatures = cards.map((card) =>
      [...card.querySelectorAll("li:has(svg)")].map((feature) => feature.textContent),
    );
    for (const features of includedFeatures) {
      expect(features).toContain("Диплом ИТ-школы ИННОПРОГ о прохождении курса");
      expect(features).toContain("Диплом о профессиональной переподготовке");
    }
    expect(includedFeatures.map((features) => features.includes("Стажировка после обучения"))).toEqual([false, true, true]);
    expect(includedFeatures.map((features) => features.includes("2 тестовых технических собеседования"))).toEqual([false, false, true]);
    expect(includedFeatures.map((features) => features.includes("Подготовка резюме с HR-специалистом"))).toEqual([false, false, true]);
  });
});
