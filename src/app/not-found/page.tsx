import NotFoundPageContent from "../NotFoundPageContent";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Такой страницы нет",
  description: "Страница не найдена. Перейдите на главную страницу ИННОПРОГ или выберите подходящий курс программирования.",
  path: "/not-found",
  noIndex: true,
  follow: true,
});

export default function NotFoundRoutePage() {
  return <NotFoundPageContent />;
}
