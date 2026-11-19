"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./free-courses.module.css";

type Course = { slug: string; title: string };

export function CourseCarousel({ courses, children }: { courses: Course[]; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const showLinkedCourse = () => {
      const index = Array.from(track.children).findIndex((child) => `#${child.id}` === window.location.hash);
      const slide = track.children.item(index);
      if (slide instanceof HTMLElement && track.scrollWidth > track.clientWidth) {
        track.scrollTo({ left: slide.offsetLeft, behavior: "instant" });
        setActiveIndex(index);
      }
    };

    showLinkedCourse();
    window.addEventListener("hashchange", showLinkedCourse);
    return () => window.removeEventListener("hashchange", showLinkedCourse);
  }, []);

  return (
    <>
      <div
        className={styles.grid}
        id="free-courses-track"
        ref={trackRef}
        onScroll={({ currentTarget }) => {
          const slideSpacing = (currentTarget.children[1] as HTMLElement | undefined)?.offsetLeft;
          if (slideSpacing) setActiveIndex(Math.round(currentTarget.scrollLeft / slideSpacing));
        }}
      >
        {children}
      </div>
      <div className={styles.dots} role="group" aria-label="Выбор бесплатного курса">
        {courses.map(({ slug, title }, index) => (
          <button
            key={slug}
            type="button"
            className="site-mobile-direction-dot"
            aria-controls={slug}
            aria-current={index === activeIndex ? "true" : undefined}
            aria-label={`Показать курс «${title}»`}
            data-active={index === activeIndex}
            onClick={() => {
              const track = trackRef.current;
              const slide = track?.children.item(index);
              if (track && slide instanceof HTMLElement) track.scrollTo({ left: slide.offsetLeft });
            }}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </>
  );
}
