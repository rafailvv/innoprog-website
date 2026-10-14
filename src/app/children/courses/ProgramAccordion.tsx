"use client";

import { useState } from "react";
import type { ChildrenCourse } from "./course-data";
import styles from "./course.module.css";

export default function ProgramAccordion({ modules }: { modules: ChildrenCourse["modules"] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className={styles.modules}>
      {modules.map((module, index) => (
        <details key={module.title} open={active === index}>
          <summary onClick={(event) => {
            event.preventDefault();
            setActive((current) => current === index ? null : index);
          }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{module.title}</h3>
            <b aria-hidden="true">+</b>
          </summary>
          <div>
            <p>{module.description.replace(/\.$/, "")}</p>
            <ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
          </div>
        </details>
      ))}
    </div>
  );
}
