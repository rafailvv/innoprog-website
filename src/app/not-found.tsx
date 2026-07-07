import NotFoundPageContent from "./NotFoundPageContent";
import { createPageMetadata } from "./seo";

export const metadata = createPageMetadata({
  title: "Страница не найдена",
  description: "Страница не найдена. Перейдите на главную страницу ИННОПРОГ или выберите подходящий курс программирования.",
  path: "/not-found",
  noIndex: true,
  follow: true,
});

export default function NotFound() {
  return <NotFoundPageContent />;
}
