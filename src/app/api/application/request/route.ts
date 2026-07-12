import { NextRequest, NextResponse } from "next/server";

const BOT_APPLICATION_URL =
  process.env.APPLICATION_REQUEST_PROXY_URL || "https://bot.innoprog.ru/application/request";
const BOT_APPLICATION_TOKEN =
  process.env.APPLICATION_REQUEST_PROXY_TOKEN ||
  process.env.BOT_API_SERVICE_TOKEN ||
  process.env.AUTH_TOKEN ||
  "";
const BOT_ALLOWED_ORIGIN = "https://innoprog.ru";

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

function getCaptchaRedirect(response: Response, result: Record<string, any>) {
  const responseRedirect = result?.error?.redirect_uri || result?.redirect_uri;
  const challengeUrl = response.headers.get("x-challenge-url");

  if (responseRedirect) {
    return String(responseRedirect);
  }

  if (!challengeUrl) {
    return "";
  }

  return new URL(challengeUrl, BOT_APPLICATION_URL).toString();
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
      ...(String(body.success_token || "").trim()
        ? { success_token: String(body.success_token).trim() }
        : {}),
    };

    if (payload.name.length < 2 || payload.phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
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
      const result = await botResponse.json().catch(() => ({}));
      const captchaRedirect = getCaptchaRedirect(botResponse, result);

      if (captchaRedirect) {
        return NextResponse.json(
          {
            ok: false,
            error: {
              error_code: 14,
              redirect_uri: captchaRedirect,
            },
          },
          { status: 403 },
        );
      }

      return NextResponse.json({ ok: false, error: "bot_request_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
