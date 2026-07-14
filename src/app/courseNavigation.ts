export const ADULT_COURSE_LINKS = [
  { label: "Python-разработчик", href: "/python-course" },
  { label: "Data Science", href: "/data-science-course" },
  { label: "Frontend-разработчик", href: "/frontend-developer-course" },
  { label: "Data-аналитик", href: "/data-analyst-course" },
  { label: "C++ разработчик", href: "/cpp-developer-course" },
  { label: "Мобильный разработчик", href: "/mobile-developer-course" },
  { label: "Unreal Engine", href: "/unreal-engine-course" },
  { label: "Java-разработчик", href: "/java-developer-course" },
  { label: "ML-инженер", href: "/ml-engineer-course" },
] as const;

export const CHILD_COURSE_LINKS = [
  "Программирование на Python",
  "Создание сайтов с нуля",
  "Школьная информатика",
  "Олимпиадное программирование",
  "Разработка нейросетей",
  "Игры своими руками",
].map((label) => ({
  label,
  href: "https://pages.innoprog.ru/children/school",
}));
