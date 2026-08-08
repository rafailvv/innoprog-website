import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const validPayload = {
  name: "Иван Иванов",
  phone: "+7 999 123-45-67",
  email: "ivan@example.com",
  personal_data_consent: true,
  captcha_token: "captcha-token",
};

function request(body: Record<string, unknown>) {
  return new NextRequest("https://innoprog.ru/api/application/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": "203.0.113.7, 127.0.0.1",
      "X-Real-IP": "198.51.100.9",
    },
    body: JSON.stringify(body),
  });
}

afterEach(() => {
  delete process.env.SMARTCAPTCHA_SERVER_KEY;
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("application request SmartCaptcha protection", () => {
  it("rejects a submission without a captcha token", async () => {
    process.env.SMARTCAPTCHA_SERVER_KEY = "server-secret";
    const { POST } = await import("./route");

    const response = await POST(request({ ...validPayload, captcha_token: "" }));

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ error: "captcha_required" });
  });

  it("fails closed when the server key is not configured", async () => {
    const { POST } = await import("./route");

    const response = await POST(request(validPayload));

    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ error: "captcha_not_configured" });
  });

  it("validates the token and forwards only the normalized lead payload", async () => {
    process.env.SMARTCAPTCHA_SERVER_KEY = "server-secret";
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(Response.json({ status: "ok" }))
      .mockResolvedValueOnce(Response.json({ ok: true }));
    const { POST } = await import("./route");

    const response = await POST(request(validPayload));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://smartcaptcha.cloud.yandex.ru/validate",
      expect.objectContaining({ method: "POST", cache: "no-store" }),
    );
    const validationBody = fetchMock.mock.calls[0][1]?.body as URLSearchParams;
    expect(validationBody.get("secret")).toBe("server-secret");
    expect(validationBody.get("token")).toBe("captcha-token");
    expect(validationBody.get("ip")).toBe("198.51.100.9");

    const forwardedBody = JSON.parse(String(fetchMock.mock.calls[1][1]?.body));
    expect(forwardedBody).toMatchObject({
      name: "Иван Иванов",
      phone: "+79991234567",
      personal_data_consent: true,
    });
    expect(forwardedBody).not.toHaveProperty("captcha_token");
  });
});
