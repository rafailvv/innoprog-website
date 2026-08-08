"use client";

import { InvisibleSmartCaptcha } from "@yandex/smart-captcha";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SMARTCAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY ||
  "ysc1_wj2JOYBSFKg36aN2NijxZo9V89aoJzy6ctBRfFkt96753033";
const CAPTCHA_TIMEOUT_MS = 120_000;

export type YandexSmartCaptchaHandle = {
  requestToken: () => Promise<string>;
};

type PendingChallenge = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
  timeoutId: ReturnType<typeof setTimeout>;
};

export const YandexSmartCaptcha = forwardRef<YandexSmartCaptchaHandle>(
  function YandexSmartCaptcha(_props, ref) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const pendingRef = useRef<PendingChallenge | null>(null);

    useEffect(() => {
      setMounted(true);

      return () => {
        const pending = pendingRef.current;
        if (!pending) return;
        clearTimeout(pending.timeoutId);
        pending.reject(new Error("captcha-unmounted"));
        pendingRef.current = null;
      };
    }, []);

    const finish = (token?: string, error?: Error) => {
      const pending = pendingRef.current;
      if (!pending) return;

      clearTimeout(pending.timeoutId);
      pendingRef.current = null;
      setVisible(false);

      if (token) {
        pending.resolve(token);
      } else {
        pending.reject(error || new Error("captcha-failed"));
      }
    };

    useImperativeHandle(ref, () => ({
      requestToken: () => {
        if (!mounted) {
          return Promise.reject(new Error("captcha-not-ready"));
        }

        if (pendingRef.current) {
          return Promise.reject(new Error("captcha-in-progress"));
        }

        return new Promise<string>((resolve, reject) => {
          const timeoutId = setTimeout(
            () => finish(undefined, new Error("captcha-timeout")),
            CAPTCHA_TIMEOUT_MS,
          );
          pendingRef.current = { resolve, reject, timeoutId };
          setVisible(true);
        });
      },
    }));

    if (!mounted) return null;

    return (
      <InvisibleSmartCaptcha
        host="smartcaptcha.yandexcloud.net"
        hideShield={false}
        language="ru"
        onChallengeHidden={() => finish(undefined, new Error("captcha-closed"))}
        onJavascriptError={() => finish(undefined, new Error("captcha-failed"))}
        onNetworkError={() => finish(undefined, new Error("captcha-failed"))}
        onSuccess={(token) => finish(token)}
        shieldPosition="bottom-right"
        sitekey={SMARTCAPTCHA_SITE_KEY}
        visible={visible}
      />
    );
  },
);
