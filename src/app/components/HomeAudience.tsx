"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeAudience.module.css";

const audienceId = "komu-podoydet";

const audiences = [
  {
    title: "С нуля",
    courses: [
      { label: "Бесплатные курсы", href: "/free-courses" },
      { label: "Python-разработчик", href: "/python-course" },
    ],
  },
  {
    title: "Меняю профессию",
    courses: [
      { label: "Фронтенд-разработчик", href: "/frontend-developer-course" },
      { label: "Аналитик данных", href: "/data-analyst-course" },
    ],
  },
  {
    title: "Уже работаю и хочу расти",
    courses: [
      { label: "Data Science", href: "/data-science-course" },
      { label: "ML-инженер", href: "/ml-engineer-course" },
    ],
  },
  {
    title: "Школьник от 9 до 17 лет",
    courses: [{ label: "Детские курсы", href: "/children" }],
  },
];

export function HomeAudience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.hash !== `#${audienceId}`) return;

    // The desktop canvas replaces the mobile server layout after hydration.
    const frame = window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "instant" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="home-audience-title" id={audienceId}>
      <h2 className={styles.title} id="home-audience-title">Кому подойдёт обучение?</h2>
      <ul className={styles.cards} role="list">
        {audiences.map(({ title, courses }) => (
          <li className={styles.card} key={title}>
            <h3>{title}</h3>
            <div className={styles.links}>
              {courses.map(({ label, href }) => (
                <a className={styles.link} href={href} key={href}>
                  {label}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
