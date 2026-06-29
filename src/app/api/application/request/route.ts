import { NextRequest, NextResponse } from "next/server";

const BOT_APPLICATION_URL =
  process.env.APPLICATION_REQUEST_PROXY_URL || "https://bot.innoprog.ru/application/request";
const BOT_APPLICATION_TOKEN =
  process.env.APPLICATION_REQUEST_PROXY_TOKEN ||
  process.env.BOT_API_SERVICE_TOKEN ||
  process.env.AUTH_TOKEN ||
  "";
const BOT_ALLOWED_ORIGIN = "https://innoprog.ru";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TEST_KEY_PREFIX = "1x000";
const IS_TURNSTILE_TEMPORARILY_HIDDEN = true;

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
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return req.headers.get("x-real-ip") || undefined;
}

async function verifyTurnstileToken(token: string, req: NextRequest) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || secret.startsWith(TURNSTILE_TEST_KEY_PREFIX)) {
    return true;
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });
  const remoteIp = getClientIp(req);

  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();

  return Boolean(result.success);
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
    };
    const captchaToken = String(body.captchaToken || "").trim();

    if (payload.name.length < 2 || payload.phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const shouldVerifyCaptcha =
      !IS_TURNSTILE_TEMPORARILY_HIDDEN &&
      Boolean(process.env.TURNSTILE_SECRET_KEY) &&
      !process.env.TURNSTILE_SECRET_KEY.startsWith(TURNSTILE_TEST_KEY_PREFIX);

    if (shouldVerifyCaptcha && (!captchaToken || !(await verifyTurnstileToken(captchaToken, req)))) {
      return NextResponse.json({ ok: false, error: "captcha_failed" }, { status: 403 });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Origin: BOT_ALLOWED_ORIGIN,
      Referer: `${BOT_ALLOWED_ORIGIN}/`,
    };
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
