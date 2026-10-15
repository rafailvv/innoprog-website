import type { CourseFaqItem } from "../courseFaqData";

export function CourseFaqAnswer({ item, isOpen }: { item: CourseFaqItem; isOpen: boolean }) {
  return (
    <>
      {item.answer.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {item.tariffsLink ? (
        <p><a className="underline underline-offset-4" href="/tariffs" tabIndex={isOpen ? undefined : -1}>Сравнить тарифы и состав услуг</a></p>
      ) : null}
    </>
  );
}
