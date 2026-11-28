export const adultCourseOverviewContent = {
  python: {
    name: "Python-разработчик",
    months: 12,
    trialFocus: "как устроен старт в backend-разработке на Python",
    startingPoint: "с основ Python, чтобы постепенно перейти к разработке серверной части веб-приложений",
  },
  dataScience: {
    name: "Data Science",
    months: 12,
    trialFocus: "как из вопроса и данных получается задача для анализа или машинного обучения",
    startingPoint: "с Python и работы с данными, чтобы постепенно перейти к машинному обучению",
  },
  frontend: {
    name: "Frontend-разработчик",
    months: 10,
    trialFocus: "из чего состоит веб-интерфейс и как пользователь взаимодействует со страницей",
    startingPoint: "с вёрстки и основ JavaScript, чтобы постепенно перейти к интерфейсам на React",
  },
  dataAnalyst: {
    name: "Data-аналитик",
    months: 10,
    trialFocus: "как превратить вопрос бизнеса в задачу для анализа данных",
    startingPoint: "с таблиц и запросов к данным, чтобы постепенно перейти к отчётам и дашбордам",
  },
  cpp: {
    name: "C++ разработчик",
    months: 12,
    trialFocus: "как разбить задачу на шаги и выразить их в программе на C++",
    startingPoint: "с синтаксиса и простых программ на C++, чтобы постепенно перейти к более сложным проектам",
  },
  mobileDeveloper: {
    name: "Мобильный разработчик",
    months: 10,
    trialFocus: "как устроено мобильное приложение и зачем в разработке нужны Dart и Flutter",
    startingPoint: "с основ Dart и первых экранов на Flutter, чтобы постепенно перейти к полноценному приложению",
  },
  unrealEngine: {
    name: "Unreal Engine",
    months: 10,
    trialFocus: "из чего складывается игровая механика и как с ней работают в Unreal Engine",
    startingPoint: "со знакомства с редактором и базовых игровых механик, чтобы постепенно перейти к своему проекту",
  },
  java: {
    name: "Java-разработчик",
    months: 12,
    trialFocus: "как простая задача превращается в программу на Java",
    startingPoint: "с основ Java и простых программ, чтобы постепенно перейти к серверной разработке",
  },
  mlEngineer: {
    name: "ML-инженер",
    months: 12,
    trialFocus: "как модель машинного обучения становится частью работающего приложения",
    startingPoint: "с Python, данных и основ машинного обучения, чтобы постепенно перейти к интеграции моделей в приложения",
  },
} as const;

export type AdultCourseOverviewKey = keyof typeof adultCourseOverviewContent;
