import type { Metadata } from "next";
import { TelegramRedirectClient } from "./TelegramRedirectClient";

export const metadata: Metadata = {
  title: "Telegram-канал ИННОПРОГ",
  description: "Редирект на Telegram-канал ИННОПРОГ",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TelegramRedirectPage() {
  return <TelegramRedirectClient />;
}

