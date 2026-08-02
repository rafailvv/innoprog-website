import { describe, expect, it } from "vitest";
import { GET, HEAD } from "./route";

const legacyPath = [
  "sveden",
  "document",
  "Приказ_об_организации_обучения_с_применением_электронного_обучения_и_ДОТ.pdf",
];

describe("legacy educational document redirect", () => {
  it.each([GET, HEAD])("redirects the old unnumbered order to order No. OBR-12", async (handler) => {
    const response = await handler(
      new Request("https://innoprog.ru/files/legacy-order.pdf"),
      { params: Promise.resolve({ path: legacyPath }) },
    );

    expect(response.status).toBe(301);
    expect(decodeURI(response.headers.get("location") ?? "")).toBe(
      "https://innoprog.ru/files/sveden/document/Приказ_№_ОБР-12_об_организации_образовательной_деятельности_с_применением_электронного_обучения_и_ДОТ.pdf",
    );
  });
});
