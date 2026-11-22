"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./school/school.module.css";

type Props = {
  id: string;
  className: string;
  items: { question: string; answer: ReactNode }[];
};

export default function ChildrenFaq({ id, className, items }: Props) {
  const panelPrefix = useId();
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  return (
    <section className={`${className} ${styles.faq}`} id={id}>
      <h2>Часто задаваемые вопросы</h2>
      {items.map(({ question, answer }, index) => {
        const isOpen = openQuestions.includes(question);
        const answerId = `${panelPrefix}-answer-${index}`;
        return (
          <div className={styles.faqItem} key={question}>
            <button
              className={styles.faqToggle}
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenQuestions((current) =>
                current.includes(question)
                  ? current.filter((item) => item !== question)
                  : [...current, question],
              )}
            >
              {question}
              <span aria-hidden="true">+</span>
            </button>
            <div className={styles.faqAnswer} id={answerId} aria-hidden={!isOpen}>
              <div><p>{answer}</p></div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
