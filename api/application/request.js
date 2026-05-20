const BOT_APPLICATION_URL = "https://bot.innoprog.ru/application/request";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

async function readBody(req) {
  if (req.body) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");

  return rawBody ? JSON.parse(rawBody) : {};
}

function normalizePhone(rawPhone) {
  const digits = String(rawPhone || "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.length === 11 && digits.startsWith("8")) {
    return `+7${digits.slice(1)}`;
  }

  if (digits.startsWith("7")) {
    return `+${digits}`;
  }

  return String(rawPhone || "").trim().startsWith("+") ? `+${digits}` : digits;
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return req.socket?.remoteAddress;
}

async function verifyTurnstileToken(token, req) {
  const secret = process.env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET_KEY;
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

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  try {
    const body = await readBody(req);
    const payload = {
      name: String(body.name || "").trim(),
      phone: normalizePhone(body.phone),
    };
    const captchaToken = String(body.captchaToken || "").trim();

    if (payload.name.length < 2 || payload.phone.replace(/\D/g, "").length < 10) {
      res.status(400).json({ ok: false, error: "invalid_payload" });
      return;
    }

    if (!captchaToken || !(await verifyTurnstileToken(captchaToken, req))) {
      res.status(403).json({ ok: false, error: "captcha_failed" });
      return;
    }

    const botResponse = await fetch(BOT_APPLICATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!botResponse.ok) {
      res.status(502).json({ ok: false, error: "bot_request_failed" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false, error: "internal_error" });
  }
}
