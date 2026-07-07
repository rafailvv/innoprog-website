import { TelegramRedirectClient } from "./TelegramRedirectClient";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Telegram-канал ИННОПРОГ",
  description: "Редирект на Telegram-канал ИННОПРОГ",
  path: "/telegram",
  noIndex: true,
});

export default function TelegramRedirectPage() {
  return <TelegramRedirectClient />;
}
