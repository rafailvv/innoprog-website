export const childrenCoursePaths = {
  python: "/children/courses/python",
  web: "/children/courses/web-development",
  exam: "/children/courses/informatics-exams",
  olympiad: "/children/courses/olympiad-programming",
  ai: "/children/courses/neural-networks",
  games: "/children/courses/game-development",
} as const;

export const childrenCourseNavigation = [
  { label: "Программирование на Python", href: childrenCoursePaths.python },
  { label: "Создание сайтов с нуля", href: childrenCoursePaths.web },
  { label: "Информатика ОГЭ/ЕГЭ", href: childrenCoursePaths.exam },
  { label: "Олимпиадное программирование", href: childrenCoursePaths.olympiad },
  { label: "Разработка нейросетей", href: childrenCoursePaths.ai },
  { label: "Игры своими руками", href: childrenCoursePaths.games },
] as const;
