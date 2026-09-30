import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import MainScreenDesktop from "./MainScreenDesktop/MainScreenDesktop";
import MainScreenMobile from "./MainScreenMobile/MainScreenMobile";

// Approved course durations shown on the landing cards (desktop carousel and
// mobile carousel render the same nine courses in the same order).
const APPROVED_LANDING_PERIODS = [
  ["/python-course", "≈12 месяцев"],
  ["/data-science-course", "≈12 месяцев"],
  ["/frontend-developer-course", "≈10 месяцев"],
  ["/data-analyst-course", "≈10 месяцев"],
  ["/cpp-developer-course", "≈12 месяцев"],
  ["/mobile-developer-course", "≈10 месяцев"],
  ["/unreal-engine-course", "≈10 месяцев"],
  ["/java-developer-course", "≈12 месяцев"],
  ["/ml-engineer-course", "≈12 месяцев"],
] as const;

const APPROVED_COURSES = APPROVED_LANDING_PERIODS.map(([course]) => course);

function publishedLandingPeriods(html: string) {
  const ordered = [...html.matchAll(/href="(\/[a-z-]+-course)"/g)]
    .map((match) => ({ course: match[1], index: match.index ?? 0 }))
    .filter(({ course }) => APPROVED_COURSES.includes(course))
    .sort((left, right) => left.index - right.index);

  // Navigation menus also link to courses; only the landing cards publish a
  // duration chip between their href and the next course link.
  const cards = ordered.flatMap((card, index) => {
    const end = index + 1 < ordered.length ? ordered[index + 1].index : html.length;
    const period = html.slice(card.index, end).match(/≈\d+ месяцев/)?.[0];
    return period ? [{ course: card.course, period }] : [];
  });

  const copies = cards.length / APPROVED_COURSES.length;
  expect(Number.isInteger(copies), `expected ${APPROVED_COURSES.length} course cards per copy, found ${cards.length}`).toBe(true);
  expect(cards.map(({ course }) => course)).toEqual(
    Array.from({ length: copies }, () => APPROVED_COURSES).flat(),
  );

  return cards.map(({ course, period }) => [course, period] as const);
}

describe("main screen server markup", () => {
  it.each([
    ["desktop", MainScreenDesktop],
    ["mobile", MainScreenMobile],
  ] as const)("renders the complete %s screen with centralized legal navigation", (_name, Screen) => {
    const html = renderToStaticMarkup(<Screen />);

    expect(html).toContain('href="/sveden/common"');
    expect(html).toContain('href="/privacy"');
    expect(html).toContain('href="/oferta"');
    expect(html).toContain('href="/software-operation-manual"');
    expect(html).toContain('href="/functional-characteristics"');
    expect(html).toContain("Сведения об образовательной организации");
    expect(html).toContain('href="tel:+79586067980">Тел: +7 (958) 606-79-80;</a>');
    expect(html).toContain('href="mailto:education@innoprog.ru">Email: education@innoprog.ru</a>');
    const landingPeriods = publishedLandingPeriods(html);
    expect(landingPeriods).toEqual(
      Array.from(
        { length: landingPeriods.length / APPROVED_LANDING_PERIODS.length },
        () => APPROVED_LANDING_PERIODS,
      ).flat(),
    );
    expect(html).toContain("(1) Диплом ИТ-школы ИННОПРОГ подтверждает прохождение курса и освоение программы по выбранному направлению");
    expect(html).toContain("(2) Диплом о профессиональной переподготовке подтверждает получение квалификации. Сведения вносятся в ФИС ФРДО.");
    expect(html).toContain('alt="Диплом ИТ-школы ИННОПРОГ о прохождении курса"');
    expect(html).not.toContain("Официальный диплом ИТ-школы ИННОПРОГ");
    expect(html).not.toContain("государственный реестр");
    expect(html).toContain('href="/consent"');
    expect(html).toContain('href="/advertising-consent"');
    expect(html).toContain("Я даю");
    expect(html).toContain("Форма защищена Yandex SmartCaptcha");
    expect(html).not.toContain("(необязательно)");
    expect(html).not.toContain("Нажимая на кнопку, вы даете");
  });
});
