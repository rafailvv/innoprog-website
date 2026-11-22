import { useEffect } from "react";

export type CourseAudience = "adult" | "children";

const courseLinks = {
  adult: [
    { href: "#course-section-program", label: "Программа" },
    { href: "#course-section-projects", label: "Проекты" },
    { href: "#course-section-price", label: "Стоимость" },
    { href: "#course-section-reviews", label: "Отзывы" },
    { href: "#course-section-faq", label: "Вопросы" },
  ],
  children: [
    { href: "#course-section-skills", label: "Чему научится" },
    { href: "#program", label: "Программа" },
    { href: "#course-section-format", label: "Как учимся" },
    { href: "#course-section-price", label: "Стоимость" },
    { href: "#course-section-faq", label: "Вопросы" },
  ],
} as const;

export function CourseSectionNav({
  audience,
  mobile = false,
}: {
  audience: CourseAudience;
  mobile?: boolean;
}) {
  const links = courseLinks[audience];

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches !== mobile) return;

    const alignCurrentSection = () => {
      const hash = window.location.hash;
      if (!links.some(({ href }) => href === hash)) return;

      const target = document.getElementById(hash.slice(1));
      const content = target?.closest("main");
      if (!target || !content) return;

      // The responsive layout can still resize after the browser jumps to the anchor.
      const observer = new ResizeObserver(() => target.scrollIntoView({ block: "start" }));
      observer.observe(content);

      const interaction = new AbortController();
      const stop = () => {
        interaction.abort();
        observer.disconnect();
        window.clearTimeout(timeout);
      };
      const timeout = window.setTimeout(stop, 2000);
      for (const event of ["pointerdown", "touchstart", "wheel", "keydown"]) {
        window.addEventListener(event, stop, { passive: true, signal: interaction.signal });
      }
      return stop;
    };

    let stop = alignCurrentSection();
    const handleHashChange = () => {
      stop?.();
      stop = alignCurrentSection();
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      stop?.();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [links, mobile]);

  return (
    <nav aria-label="Разделы курса" className="site-course-section-nav">
      {links.map(({ href, label }) => (
        <a href={href} key={href}>{label}</a>
      ))}
    </nav>
  );
}
