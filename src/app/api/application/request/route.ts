import { NextRequest, NextResponse } from "next/server";

const BOT_APPLICATION_URL =
  process.env.APPLICATION_REQUEST_PROXY_URL || "https://bot.innoprog.ru/application/request";
const BOT_APPLICATION_TOKEN =
  process.env.APPLICATION_REQUEST_PROXY_TOKEN ||
  process.env.BOT_API_SERVICE_TOKEN ||
  process.env.AUTH_TOKEN ||
  "";
const BOT_ALLOWED_ORIGIN = "https://innoprog.ru";
const SMARTCAPTCHA_SERVER_KEY = process.env.SMARTCAPTCHA_SERVER_KEY || "";
const SMARTCAPTCHA_VALIDATE_URL = "https://smartcaptcha.cloud.yandex.ru/validate";

export const runtime = "nodejs";

function normalizePhone(rawPhone: unknown) {
  const digits = String(rawPhone || "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.length === 11 && digits.startsWith("8")) {
    return `+7${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `+7${digits}`;
  }

  if (digits.startsWith("7")) {
    return `+${digits}`;
  }

  return String(rawPhone || "").trim().startsWith("+") ? `+${digits}` : digits;
}

function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
    ""
  );
}

function normalizeSourcePage(rawValue: unknown, fallback: string) {
  const value = String(rawValue || fallback || "").trim();
  if (!value) return BOT_ALLOWED_ORIGIN;

  try {
    const url = new URL(value, BOT_ALLOWED_ORIGIN);
    if (url.hostname !== "innoprog.ru" && url.hostname !== "www.innoprog.ru" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      return BOT_ALLOWED_ORIGIN;
    }
    url.hash = "";
    return url.toString();
  } catch {
    return BOT_ALLOWED_ORIGIN;
  }
}

function normalizeFormId(rawValue: unknown) {
  const value = String(rawValue || "ordinary-application").trim().slice(0, 80);
  return /^[a-z0-9][a-z0-9_-]*$/i.test(value) ? value : "ordinary-application";
}

async function validateCaptcha(token: string, ip: string) {
  if (!SMARTCAPTCHA_SERVER_KEY) {
    return { ok: false, error: "captcha_not_configured" };
  }

  const body = new URLSearchParams({ secret: SMARTCAPTCHA_SERVER_KEY, token });
  if (ip) body.set("ip", ip);

  try {
    const response = await fetch(SMARTCAPTCHA_VALIDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(2_000),
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, error: "captcha_service_error" };

    const result = await response.json().catch(() => ({}));
    return result.status === "ok"
      ? { ok: true, error: "" }
      : { ok: false, error: "captcha_failed" };
  } catch {
    return { ok: false, error: "captcha_service_error" };
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const payload = {
      name: String(body.name || "").trim(),
      phone: normalizePhone(body.phone),
      email: String(body.email || "").trim(),
      question: String(body.question || "").trim(),
      personal_data_consent: body.personal_data_consent === true,
      advertising_consent: body.advertising_consent === true,
      source_page: normalizeSourcePage(body.source_page, req.headers.get("referer") || ""),
      form_id: normalizeFormId(body.form_id),
    };
    const captchaToken = String(body.captcha_token || "").trim();

    if (
      payload.name.length < 2 ||
      payload.phone.replace(/\D/g, "").length < 10 ||
      !payload.personal_data_consent
    ) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    if (!captchaToken) {
      return NextResponse.json({ ok: false, error: "captcha_required" }, { status: 400 });
    }

    const captcha = await validateCaptcha(captchaToken, getClientIp(req));
    if (!captcha.ok) {
      const status = captcha.error === "captcha_not_configured" ? 503 : 403;
      return NextResponse.json({ ok: false, error: captcha.error }, { status });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Origin: BOT_ALLOWED_ORIGIN,
      Referer: `${BOT_ALLOWED_ORIGIN}/`,
    };
    const clientIp = getClientIp(req);
    const userAgent = req.headers.get("user-agent")?.trim();
    if (clientIp) {
      headers["X-Real-IP"] = clientIp;
      headers["X-Forwarded-For"] = clientIp;
    }
    if (userAgent) headers["User-Agent"] = userAgent;
    const normalizedToken = BOT_APPLICATION_TOKEN.replace(/^Bearer\s+/i, "").trim();
    if (normalizedToken) {
      headers.Authorization = `Bearer ${normalizedToken}`;
    }

    const botResponse = await fetch(BOT_APPLICATION_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!botResponse.ok) {
      return NextResponse.json({ ok: false, error: "bot_request_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
