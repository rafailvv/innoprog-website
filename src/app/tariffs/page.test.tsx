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

  it("includes both diploma documents in every tariff", () => {
    const html = renderToStaticMarkup(<TariffsPage />);

    expect(html.match(/Диплом ИТ-школы ИННОПРОГ о прохождении курса/g)).toHaveLength(3);
    expect(html.match(/Диплом о профессиональной переподготовке/g)).toHaveLength(3);
  });
});
