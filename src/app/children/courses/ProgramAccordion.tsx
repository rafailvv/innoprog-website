"use client";

import { useId, useState } from "react";
import svgPaths from "../../../imports/PythonCourseDesktop/svg-egdjewsyn7";
import { CourseProgramTagIcon } from "../../../imports/courseProgramIcons";
import type { ChildrenCourse } from "./course-data";
import styles from "./course.module.css";

function Topics({ topics = [] }: { topics: string[] }) {
  const middle = Math.ceil(topics.length / 2);
  return (
    <div className="site-course-program-topics">
      {[topics.slice(0, middle), topics.slice(middle)].map((column, index) => (
        <ul className="site-course-program-topics-column" key={index}>
          {column.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
      ))}
    </div>
  );
}

function Tag({ label, icon = label }: { label: string; icon?: string }) {
  return <span className="site-course-program-tag"><CourseProgramTagIcon tag={icon} /><span className="site-course-program-tag-label">{label}</span></span>;
}

export default function ProgramAccordion({ modules }: { modules: ChildrenCourse["modules"] }) {
  const [active, setActive] = useState<number | null>(null);
  const id = useId();
  return (
    <div className={`${styles.modules} site-course-program-list`}>
      {modules.map((module, index) => {
        const isOpen = active === index;
        const buttonId = `${id}-toggle-${index}`;
        const panelId = `${id}-panel-${index}`;
        return (
          <div key={module.title} className={`site-course-program-module ${isOpen ? "is-open" : ""}`}>
            <h3 className="site-course-program-heading">
              <button aria-controls={panelId} aria-expanded={isOpen} className="site-course-program-toggle" data-name="программа обучения" id={buttonId} onClick={() => setActive((current) => current === index ? null : index)} type="button">
                <span className="site-course-program-title">{`(${index + 1}) ${module.title}`}</span>
                <span className="site-course-program-chevron" aria-hidden="true" data-name="стрелка программы обучения">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564"><path d={svgPaths.p3133300} stroke="currentColor" strokeWidth="2" /></svg>
                </span>
              </button>
            </h3>
            <div aria-hidden={!isOpen} aria-labelledby={buttonId} className="site-course-program-panel-shell" id={panelId} role="region">
              <div>
              <div className="site-course-program-panel">
                <div className="site-course-program-panel-inner">
                  <div className="site-course-program-tags">
                    <Tag label={`${module.topics.length} тем занятий`} icon="Индивидуальная траектория" />
                    <Tag label="Практические задания" />
                  </div>
                  <p className="site-course-program-description">{module.description.replace(/\.$/, "")}</p>
                  <Topics topics={module.topics} />
                  <div className="site-course-program-tags"><Tag label="Практика" icon="Практическая работа" /></div>
                  <Topics topics={module.practice} />
                  <div className="site-course-program-tags"><Tag label="Результат модуля" icon="Поддерживаемые приложения" /></div>
                  <p className="site-course-program-description">{module.outcome.replace(/\.$/, "")}</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
