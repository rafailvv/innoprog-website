import { useState } from "react";
import { Check } from "lucide-react";
import styles from "./comparison.module.css";

const rows = [
  {
    topic: "Формат занятий",
    individual: ["Один на один", "Преподаватель подбирает программу обучения, задания и темп под ребёнка"],
    group: ["В группе", "Преподаватель делит внимание между учениками, у группы общий темп"],
  },
  {
    topic: "Условия оплаты",
    individual: ["Помесячно", "Можно оплачивать занятия напрямую школе, без банковского кредита"],
    group: ["По условиям курса", "Некоторые школы предлагают оплату за весь курс или рассрочку"],
  },
  {
    topic: "Чему учат",
    individual: ["Код и свои проекты", "Python, сайты, 3D-игры и нейросети — без Scratch и Minecraft"],
    group: ["Зависит от курса", "Среди направлений для начинающих встречаются Scratch и Minecraft"],
  },
] as const;

const options = [
  { id: "individual", heading: "В ИННОПРОГ", label: "С нами" },
  { id: "group", heading: "В другой онлайн-школе", label: "Без нас" },
] as const;

export default function SchoolComparison({ className }: { className: string }) {
  const [selected, setSelected] = useState<"individual" | "group">("individual");

  return (
    <section
      className={`${className} ${styles.section}`}
      id="school-comparison"
      aria-labelledby="school-comparison-title"
    >
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h2 id="school-comparison-title">Как ребёнку учиться программированию?</h2>
          <p>Посмотрите, как проходят индивидуальные и групповые занятия, чтобы выбрать подходящий формат для ребёнка</p>
        </div>
        <div className={styles.portrait}>
          <img
            src="/children/school/comparison-boy.webp"
            alt=""
            width={640}
            height={791}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className={styles.switch} role="group" aria-label="Формат обучения для сравнения">
        {options.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={styles[id]}
            aria-pressed={selected === id}
            aria-controls="school-comparison-table"
            onClick={() => setSelected(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.tableFrame} data-selected={selected}>
        <table id="school-comparison-table" className={styles.table} aria-label="Сравнение условий обучения">
          <thead>
            <tr>
              <th scope="col">Условия</th>
              {options.map(({ id, heading }) => (
                <th key={id} scope="col" className={styles[id]}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ topic, ...values }) => (
              <tr key={topic}>
                <th scope="row">{topic}</th>
                {options.map(({ id }) => (
                  <td key={id} className={styles[id]}>
                    <div className={styles.condition}>
                      {id === "individual" && <Check className={styles.check} aria-hidden="true" />}
                      <div>
                        <b>{values[id][0]}</b>
                        <span>{values[id][1]}</span>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.summary}>
        <div className={styles.individual}>
          <b>С нами</b>
          <p>Занятия один на один в темпе ребёнка, свои проекты и помесячная оплата напрямую школе</p>
        </div>
        <div>
          <b>Без нас</b>
          <p>Занятия в группе по общей программе, график и условия оплаты зависят от школы</p>
        </div>
      </div>
    </section>
  );
}
