import { afterEach, describe, expect, it, vi } from "vitest";
import { PDF_STORAGE_KEYS, proxyPdf } from "./pdfProxy";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("PDF proxy", () => {
  it("streams an allowed range response with indexing protection", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("%", {
      status: 206,
      headers: {
        "Accept-Ranges": "bytes",
        "Content-Length": "1",
        "Content-Range": "bytes 0-0/121776",
        "Content-Type": "application/pdf",
      },
    }));

    const request = {
      headers: { get: (name: string) => name === "range" ? "bytes=0-0" : null } as Headers,
      method: "GET",
    } as Request;
    const response = await proxyPdf(request, PDF_STORAGE_KEYS.privacy);

    expect(response.status).toBe(206);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, noarchive");
    expect(await response.text()).toBe("%");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://storage.yandexcloud.net/innoprog-documents/site-public/legal/privacy.pdf",
      expect.objectContaining({ headers: { Range: "bytes=0-0" }, method: "GET" }),
    );
  });

  it("does not expose files outside the generated public manifest", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const response = await proxyPdf(
      new Request("https://innoprog.ru/files/99/service.pdf"),
      "site-public/99/service.pdf",
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("x-robots-tag")).toContain("noindex");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
