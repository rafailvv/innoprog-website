import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import MainScreenDesktop from "./MainScreenDesktop/MainScreenDesktop";
import MainScreenMobile from "./MainScreenMobile/MainScreenMobile";

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
    expect(html.match(/≈12 месяцев/g)).toHaveLength(3);
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
