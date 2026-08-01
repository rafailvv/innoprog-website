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
  });
});
