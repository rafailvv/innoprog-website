import avitoLogo from "./python-course-avito.png";

const courseDetails = [
  { value: "12 месяцев", label: "длится программа" },
  { value: "4, 8 или 12", label: "занятий в месяц на выбор" },
  { value: "до 60 минут", label: "занятие один на один" },
  { value: "бесплатно", label: "первое занятие до 45 минут" },
];

const questions = [
  {
    title: "Не поздно ли начинать в моём возрасте?",
    answer:
      "В школе обычно учатся люди от 9 до 64 лет. Получится ли у вас, можно проверить на бесплатном занятии.",
  },
  {
    title: "Нужно ли техническое образование?",
    answer:
      "Курс рассчитан на тех, кто начинает с нуля, поэтому техническое образование не нужно. Между занятиями вы пишете вопросы преподавателю в чат, он отвечает в течение 48 часов в рабочие дни. Практика занимает 70% обучения.",
  },
  {
    title: "Успею ли я учиться, если работаю?",
    answer:
      "Начните с 4 занятий в месяц, каждое до 60 минут. Если предупредите нас не позднее чем за 3 часа до начала, занятие перенесём и оно не сгорит. Куратор поможет подстроить темп под ваш график.",
  },
  {
    title: "А если не пойдёт, деньги пропадут?",
    answer:
      "Вы оплачиваете один месяц, следующий по желанию. Отказаться от договора можно в любой момент. Вычтем занятия, проведённые или пропущенные по вашей вине, доступ и подтверждённые расходы, остаток вернём за 10 календарных дней.",
  },
];

export function PythonCourseDetails({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      aria-label="Формат курса Python"
      className={compact ? "grid w-full grid-cols-2 gap-[8px]" : "ml-[8px] grid grid-cols-[repeat(2,max-content)] gap-[12px]"}
    >
      {courseDetails.map(({ value, label }) => (
        <li
          key={label}
          className={`rounded-[32px] bg-[#464a6a] text-white ${compact ? "px-[16px] py-[10px]" : "px-[20px] py-[16px]"}`}
        >
          <p className={compact ? "text-[16px] leading-[20px] font-bold" : "text-[20px] leading-[27px] font-bold"}>
            {value}
          </p>
          <p className={compact ? "text-[16px] leading-[18px]" : "mt-[2px] text-[16px] leading-[21px] text-white/80"}>
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function PythonCourseAvitoLogo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={avitoLogo}
      alt="Авито"
      className={`block w-auto shrink-0 ${compact ? "h-[28px]" : "ml-[16px] h-[36px]"}`}
      decoding="async"
    />
  );
}

export function PythonCourseQuestions({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="python-course-questions"
      className={`mx-auto flex flex-col ${compact ? "w-[350px] gap-[16px]" : "w-[1280px] gap-[40px]"}`}
    >
      <h2
        id="python-course-questions"
        className={`font-extrabold text-[#464a6a] uppercase ${compact ? "text-[32px] leading-[36px]" : "text-[56px] leading-[60px]"}`}
      >
        <span className="text-[#9c78ff]">Получится</span> ли у меня?
      </h2>
      <ol className={compact ? "grid grid-cols-1" : "grid grid-cols-2 items-start gap-x-[80px] gap-y-[40px]"}>
        {questions.map(({ title, answer }, index) => (
          <li
            key={title}
            className={`grid border-t border-black ${compact ? "gap-[8px] py-[16px]" : "gap-[12px] pt-[24px]"}`}
          >
            <h3
              className={`flex gap-[8px] font-bold text-black ${compact ? "text-[20px] leading-[24px]" : "gap-[16px] text-[32px] leading-[38px] uppercase"}`}
            >
              <span aria-hidden className="shrink-0 text-[#9c78ff]">({index + 1})</span>
              {title}
            </h3>
            <p className={compact ? "text-[16px] leading-[20px] text-black" : "text-pretty text-[24px] leading-[30px] text-black"}>
              {answer}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
