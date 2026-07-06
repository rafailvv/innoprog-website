import type { Metadata } from "next";
import NotFoundPageContent from "./NotFoundPageContent";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Страница не найдена. Перейдите на главную страницу ИННОПРОГ или выберите подходящий курс программирования.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundPageContent />;
}
