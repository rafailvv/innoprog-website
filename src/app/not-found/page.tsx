import type { Metadata } from "next";
import NotFoundPageContent from "../NotFoundPageContent";

export const metadata: Metadata = {
  title: "Такой страницы нет",
  description: "Страница не найдена. Перейдите на главную страницу ИННОПРОГ или выберите подходящий курс программирования.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundRoutePage() {
  return <NotFoundPageContent />;
}
