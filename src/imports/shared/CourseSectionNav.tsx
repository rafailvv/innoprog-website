import { useEffect, type MouseEventHandler } from "react";

export type CourseAudience = "adult" | "children";

const courseLinks = {
  adult: [
    { href: "#course-section-program", label: "программа" },
    { href: "#course-section-projects", label: "проекты" },
    { href: "#course-section-price", label: "стоимость" },
    { href: "#course-section-reviews", label: "отзывы" },
    { href: "#course-section-faq", label: "вопросы" },
  ],
  children: [
    { href: "#course-section-skills", label: "чему научится" },
    { href: "#program", label: "программа" },
    { href: "#course-section-format", label: "как учимся" },
    { href: "#course-section-price", label: "стоимость" },
    { href: "#course-section-faq", label: "вопросы" },
  ],
} as const;

export function useCourseSectionAlignment(audience?: CourseAudience, mobile = false) {
  const links = audience ? courseLinks[audience] : undefined;

  useEffect(() => {
    if (!links || window.matchMedia("(max-width: 767px)").matches !== mobile) return;

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
}

export function CourseSectionLinks({
  audience,
  onClick,
}: {
  audience: CourseAudience;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return courseLinks[audience].map(({ href, label }) => (
    <a href={href} key={href} onClick={onClick}>{label}</a>
  ));
}

export function CourseSectionNav({ audience }: { audience: CourseAudience }) {
  useCourseSectionAlignment(audience);
  return (
    <nav aria-label="Разделы курса" className="site-course-section-nav">
      <CourseSectionLinks audience={audience} />
    </nav>
  );
}
