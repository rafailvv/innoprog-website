import { describe, expect, it } from "vitest";
import { GET, HEAD } from "./route";

const legacyFilenames = [
  "Приказ_об_организации_обучения_с_применением_электронного_обучения_и_ДОТ.pdf",
  "Приказ_об_организации_дистанционного_обучения.pdf",
  "ПРИКАЗ_ОБ_ОРГАНИЗАЦИИ_ДИСТАНЦИОННОГО_ОБУЧЕНИЯ.pdf",
];

describe("legacy educational document redirect", () => {
  it.each([GET, HEAD])("redirects old order URLs to the current order", async (handler) => {
    const legacyPath = ["sveden", "document", legacyFilenames[0]];
    const response = await handler(
      new Request("https://innoprog.ru/files/legacy-order.pdf"),
      { params: Promise.resolve({ path: legacyPath }) },
    );

    expect(response.status).toBe(301);
    expect(decodeURI(response.headers.get("location") ?? "")).toBe(
      "https://innoprog.ru/files/sveden/document/Приказ_№_ОБР-12_об_организации_образовательной_деятельности_с_применением_электронного_обучения_и_ДОТ.pdf",
    );
  });

  it.each(legacyFilenames)("redirects the legacy filename %s", async (filename) => {
    const response = await GET(
      new Request("https://innoprog.ru/files/legacy-order.pdf"),
      { params: Promise.resolve({ path: ["sveden", "document", filename] }) },
    );

    expect(response.status).toBe(301);
    expect(decodeURI(response.headers.get("location") ?? "")).toContain("/files/sveden/document/Приказ_№_ОБР-12_");
  });

  it.each([GET, HEAD])("does not expose the internal archive", async (handler) => {
    const response = await handler(
      new Request("https://innoprog.ru/files/sveden/archive/document/legacy.pdf"),
      { params: Promise.resolve({ path: ["sveden", "archive", "document", "legacy.pdf"] }) },
    );

    expect(response.status).toBe(404);
  });
});
