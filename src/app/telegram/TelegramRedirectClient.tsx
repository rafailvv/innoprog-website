"use client";

import { useEffect } from "react";

const TELEGRAM_CHANNEL_URL = "https://t.me/innoprog";
const TELEGRAM_ATTRIBUTION_STORAGE_KEY = "innoprog_telegram_redirect_attribution";

function readQueryParams(searchParams: URLSearchParams) {
  return Array.from(searchParams.entries()).reduce<Record<string, string>>((params, [key, value]) => {
    params[key] = value;
    return params;
  }, {});
}

export function TelegramRedirectClient() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams = readQueryParams(searchParams);
    const attribution = {
      capturedAt: new Date().toISOString(),
      landingPath: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer || "",
      queryParams,
    };

    try {
      window.localStorage.setItem(TELEGRAM_ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    } catch {
      // Redirect should still work when localStorage is unavailable.
    }

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(TELEGRAM_CHANNEL_URL);
    }, 700);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, []);

  return null;
}
