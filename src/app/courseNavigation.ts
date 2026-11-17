import { EDUCATION_DISCLOSURE_LABEL, LEGAL_LINKS } from "./legalLinks";
import { childrenCourseNavigation } from "./children/courses/course-paths";

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

export const FREE_COURSES_LINK = { label: "Бесплатные курсы", href: "/free-courses" } as const;

export const ADULT_NAV_LINKS = [...ADULT_COURSE_LINKS, FREE_COURSES_LINK] as const;

export const CHILD_COURSE_LINKS = childrenCourseNavigation;

export const CONTACTS_LINK = { label: "контакты", href: "/contacts" } as const;

export const ABOUT_SITE_LINKS = [
  { label: "отзывы", href: "/reviews" },
  CONTACTS_LINK,
  { label: EDUCATION_DISCLOSURE_LABEL, href: LEGAL_LINKS.educationDisclosure },
  { label: "Блог", href: "/blog" },
] as const;
