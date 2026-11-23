import dataScienceArtwork from "../imports/MainScreenDesktop/course-data-science-desktop.webp";

// Плашки дополнительных материалов в каталоге содержат только название материала.
export const PYTHON_START_COURSE = {
  title: "Первые шаги в Python",
  description: "Изучите основы Python с нуля, напишите первую программу и получите гайд по работе с нейросетями и проверке кода",
  href: "https://app.innoprog.ru/try/python-start?mode=reg",
  action: "перейти к курсу",
  tags: ["Бесплатно", "Для новичков", "Нейросети в Python"],
} as const;

export const ANALYTICS_START_COURSE = {
  title: "Первые шаги в аналитике данных",
  description: "Разберите первую выгрузку заказов в Python, сравните каналы и постройте график. В бонусе — гайд по нейросетям для аналитика",
  href: "https://app.innoprog.ru/try/analytics-start?mode=reg",
  action: "перейти к курсу",
  tags: ["Бесплатно", "Для новичков", "Нейросети для аналитиков"],
  artwork: { src: "/free-analytics-course-glass.webp", width: 680, height: 507 },
} as const;

export const SQL_START_COURSE = {
  title: "Первые шаги в SQL",
  description: "Научитесь выбирать, фильтровать и объединять данные в SQLite. В финале соберите отчёт по заказам",
  href: "https://app.innoprog.ru/try/sql-start?mode=reg",
  action: "перейти к курсу",
  tags: ["Бесплатно", "Для новичков", "Нейросети для SQL"],
  artwork: { src: "/free-sql-course-glass.webp", width: 680, height: 507 },
} as const;

export const DATA_SCIENCE_START_BONUS_TITLE = "Нейросети для ML-инженеров";

export const DATA_SCIENCE_START_COURSE = {
  title: "Первые шаги в ML",
  description: "Обучите модель на Python, чтобы предсказывать время доставки, и проверьте её точность. В бонусе — гайд по нейросетям для ML-инженеров",
  href: "https://app.innoprog.ru/try/data-science-start?mode=reg",
  action: "перейти к курсу",
  tags: ["Бесплатно", "Для новичков", DATA_SCIENCE_START_BONUS_TITLE],
  artwork: { src: dataScienceArtwork, width: 600, height: 428 },
} as const;
