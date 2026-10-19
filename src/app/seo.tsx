import type { Metadata } from "next";
import { STUDENT_REVIEWS, type StudentReview } from "./studentReviewsData";
import { childrenCourseNavigation } from "./children/courses/course-paths";
import { teachers, type TeacherRole } from "../imports/shared/teacherData";

export const SITE_URL = "https://innoprog.ru";
export const SITE_NAME = "ИННОПРОГ";
export const HOME_PAGE_TITLE = `${SITE_NAME} - курсы программирования для взрослых и детей`;
export const SITE_LEGAL_NAME = 'ООО "ИННОПРОГ"';
export const SITE_LOGO_PATH = "/logo-education-360.webp";
export const SITE_FAVICON_PATH = "/favicon.png";
export const DEFAULT_OG_IMAGE_PATH = "/og-brand.png";
export const PYTHON_COURSE_OG_IMAGE_PATH = "/og/python-course.png";
export const DATA_SCIENCE_COURSE_OG_IMAGE_PATH = "/og/data-science-course.png";
export const FRONTEND_COURSE_OG_IMAGE_PATH = "/og/frontend-developer-course.png";
export const DATA_ANALYST_COURSE_OG_IMAGE_PATH = "/og/data-analyst-course.png";
export const CPP_COURSE_OG_IMAGE_PATH = "/og/cpp-developer-course.png";
export const MOBILE_DEVELOPER_COURSE_OG_IMAGE_PATH = "/og/mobile-developer-course.png";
export const UNREAL_ENGINE_COURSE_OG_IMAGE_PATH = "/og/unreal-engine-course.png";
export const JAVA_COURSE_OG_IMAGE_PATH = "/og/java-developer-course.png";
export const ML_ENGINEER_COURSE_OG_IMAGE_PATH = "/og/ml-engineer-course.png";
export const DEFAULT_OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};
export const COURSE_OG_IMAGE_SIZE = {
  width: 1280,
  height: 599,
};
export const DEFAULT_DESCRIPTION =
  "ИННОПРОГ - онлайн школа программирования для взрослых и детей с практикой, наставниками, собственной платформой и карьерной поддержкой";
export const DEFAULT_KEYWORDS = [
  "ИННОПРОГ",
  "онлайн школа программирования",
  "курсы программирования",
  "обучение программированию",
  "IT-профессии",
  "курсы с наставником",
  "программирование для детей",
  "программирование для взрослых",
];

export const HOME_PAGE_KEYWORDS = [
  "онлайн школа программирования",
  "курсы программирования",
  "обучение программированию с нуля",
  "IT-профессии",
  "курсы с наставником",
  "программирование для детей",
  "программирование для школьников",
  "программирование для взрослых",
];

export const TARIFFS_PAGE_KEYWORDS = [
  "стоимость обучения программированию",
  "сколько стоит обучение программированию",
  "платное обучение программированию",
  "цена обучения программированию",
  "стоимость обучения курсов программирования",
  "цена курсов обучения программированию",
  "цены школы программирования для детей",
  "стоимость обучения в онлайн-школе",
] as const;

export const ABOUT_PAGE_KEYWORDS = [
  "обучение IT-профессиям",
  "школа IT-профессий",
  "курсы IT-профессий",
  "онлайн школа программирования для детей",
  "онлайн школа программирования для школьников",
  "онлайн школа программирования для подростков",
  "школа программирования для детей",
  "школа программирования для взрослых",
  "онлайн школа программирования для взрослых",
  "о школе ИННОПРОГ",
  "innoprog",
  "иннопрог",
] as const;

export const REVIEWS_PAGE_KEYWORDS = [
  "отзывы ИННОПРОГ",
  "ИННОПРОГ отзывы учеников",
  "отзывы об онлайн школе программирования",
  "отзывы о курсах программирования",
  "отзывы учеников о курсах IT",
  "результаты обучения программированию",
  "истории учеников ИННОПРОГ",
  "отзывы о наставниках по программированию",
] as const;

export const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  "max-image-preview": "large",
  "max-snippet": -1,
  "max-video-preview": -1,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const COURSE_SEO_ITEMS = [
  {
    name: "Python-разработчик",
    path: "/python-course",
    description: "Онлайн-курс Python-разработчик с наставником, практикой на платформе, проектами в портфолио и документами после обучения",
  },
  {
    name: "Data Science",
    path: "/data-science-course",
    description: "Онлайн-курс Data Science: Python, SQL, статистика, машинное обучение, MLOps и 13 проектных работ с наставником",
  },
  {
    name: "Frontend-разработчик",
    path: "/frontend-developer-course",
    description: "Онлайн-курс Frontend-разработчик: HTML, CSS, JavaScript, TypeScript, React, API, тестирование и 15 проектных работ",
  },
  {
    name: "Data-аналитик",
    path: "/data-analyst-course",
    description: "Онлайн-курс Data-аналитик: SQL, Python, BI, статистика, A/B-тестирование и 15 аналитических проектов",
  },
  {
    name: "C++ разработчик",
    path: "/cpp-developer-course",
    description: "Онлайн-курс C++ разработчик: C++, алгоритмы, STL, ООП, Git, CMake, SQL, Linux, тестирование и 15 проектов",
  },
  {
    name: "Мобильный разработчик",
    path: "/mobile-developer-course",
    description: "Онлайн-курс мобильной разработки: Dart, Flutter, API, локальное хранение, Android/iOS, тестирование и 15 проектов",
  },
  {
    name: "Unreal Engine",
    path: "/unreal-engine-course",
    description: "Онлайн-курс Unreal Engine: Unreal Engine 5, Blueprint, игровые механики, UMG, State Tree, оптимизация и 6 проектов",
  },
  {
    name: "Java-разработчик",
    path: "/java-developer-course",
    description: "Онлайн-курс Java-разработчик: Java Core, ООП, SQL, PostgreSQL, Spring Boot, REST API, тестирование и 15 проектов",
  },
  {
    name: "ML-инженер",
    path: "/ml-engineer-course",
    description: "Онлайн-курс ML-инженер: Python, SQL, статистика, ML, deep learning, NLP, CV, MLOps, FastAPI, Docker и 15 проектов",
  },
] as const;

export const REVIEW_ROUTE_TO_KEY = {
  kirill: "кирилл",
  anastasia: "анастасия",
  mikhail: "михаил",
} as const;

export const REVIEW_META = {
  kirill: {
    name: "Кирилл",
    title: "Из HR в ИТ: история Кирилла об обучении Python",
    description:
      "История Кирилла о переходе из HR в Python-разработку: обучение в ИННОПРОГ, практика с наставником и первые уверенные шаги в ИТ",
    course: "Python-разработчик",
    coursePath: "/python-course",
    result: "Из HR в ИТ",
    reviewBody:
      "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование",
  },
  anastasia: {
    name: "Анастасия",
    title: "Из 1С в аналитику: история Анастасии об обучении Data Science",
    description:
      "История Анастасии о переходе из 1С в продуктовую аналитику: обучение Data Science, практика с данными и поддержка наставника",
    course: "Data Science",
    coursePath: "/data-science-course",
    result: "Из 1C в Product",
    reviewBody:
      "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту",
  },
  mikhail: {
    name: "Михаил",
    title: "Веб-приложение на Python: история обучения Михаила",
    description:
      "История Михаила о разработке веб-приложения в ИННОПРОГ: как обучение, практика и обратная связь помогли собрать рабочий проект",
    course: "Python-разработчик",
    coursePath: "/python-course",
    result: "От идеи к проекту",
    reviewBody:
      "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение",
  },
} as const;

export type ReviewRoute = keyof typeof REVIEW_ROUTE_TO_KEY;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export const KEY_SITE_LINKS = [
  {
    name: "Главная",
    path: "/",
    description: "Главная страница онлайн-школы программирования ИННОПРОГ",
  },
  ...COURSE_SEO_ITEMS,
  { name: "Программирование для детей", path: "/children", description: "Индивидуальные онлайн-занятия программированием для детей 9–17 лет" },
  ...childrenCourseNavigation.map(({ label, href }) => ({ name: label, path: href, description: `${label}: индивидуальные онлайн-занятия для школьников` })),
  {
    name: "Стоимость обучения",
    path: "/tariffs",
    description: "Стоимость и форматы обучения в ИННОПРОГ",
  },
  {
    name: "Отзывы учеников",
    path: "/reviews",
    description: "Отзывы и истории учеников ИННОПРОГ",
  },
  {
    name: "О нас",
    path: "/about",
    description: "Информация об онлайн-школе ИННОПРОГ, документах и подходе к обучению",
  },
  { name: "Блог", path: "/blog", description: "Практические статьи о Python, Data Science и продуктовой аналитике" },
] as const;

function courseEntityId(path: string) {
  return `${absoluteUrl(path)}#course`;
}

function offerEntityId(path: string) {
  return `${absoluteUrl(path)}#offer`;
}

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
  noIndex = false,
  follow = !noIndex,
  absoluteTitle = false,
  ogImage = DEFAULT_OG_IMAGE_PATH,
  ogImageAlt = "ИННОПРОГ - онлайн школа программирования",
  ogImageSize = DEFAULT_OG_IMAGE_SIZE,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  follow?: boolean;
  absoluteTitle?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageSize?: {
    width: number;
    height: number;
  };
}): Metadata {
  const url = absoluteUrl(path);
  const robots = noIndex
    ? {
        index: false,
        follow,
        googleBot: {
          index: false,
          follow,
        },
      }
    : DEFAULT_ROBOTS;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_LEGAL_NAME,
    category: "education",
    classification: "Online education",
    keywords: [SITE_NAME, "INNOPROG", ...keywords].filter(
      (keyword, index, items) =>
        items.findIndex((item) => item.toLocaleLowerCase("ru-RU") === keyword.toLocaleLowerCase("ru-RU")) === index,
    ),
    robots,
    alternates: {
      canonical: url,
      languages: {
        "ru-RU": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: absoluteUrl(ogImage),
          width: ogImageSize.width,
          height: ogImageSize.height,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "ИННОПРОГ",
  legalName: SITE_LEGAL_NAME,
  alternateName: "INNOPROG Education",
  url: SITE_URL,
  logo: absoluteUrl(SITE_LOGO_PATH),
  image: absoluteUrl(SITE_LOGO_PATH),
  email: "education@innoprog.ru",
  telephone: "+7 958 606-79-80",
  taxID: "1683011286",
  identifier: [
    {
      "@type": "PropertyValue",
      name: "ИНН",
      value: "1683011286",
    },
    {
      "@type": "PropertyValue",
      name: "ОГРН",
      value: "1221600105440",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Республика Татарстан",
    addressLocality: "Иннополис",
    streetAddress: "ул. Университетская, д. 5, пом. 115, м. 15/2",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "admissions",
      telephone: "+7 958 606-79-80",
      email: "education@innoprog.ru",
      availableLanguage: ["ru"],
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Россия",
  },
  hasOfferCatalog: {
    "@id": `${absoluteUrl("/tariffs")}#course-offers`,
  },
  sameAs: ["https://t.me/innoprog"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: "ИННОПРОГ - онлайн школа программирования",
  url: SITE_URL,
  inLanguage: "ru-RU",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  hasPart: KEY_SITE_LINKS.map((link) => ({
    "@type": "WebPage",
    "@id": `${absoluteUrl(link.path)}#webpage`,
    name: link.name,
    url: absoluteUrl(link.path),
  })),
};

export const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#site-navigation`,
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Главная",
      url: SITE_URL,
    },
    ...COURSE_SEO_ITEMS.map((course, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 2,
      name: `Курс ${course.name}`,
      url: absoluteUrl(course.path),
    })),
    {
      "@type": "SiteNavigationElement",
      position: COURSE_SEO_ITEMS.length + 2,
      name: "Стоимость обучения",
      url: absoluteUrl("/tariffs"),
    },
    {
      "@type": "SiteNavigationElement",
      position: COURSE_SEO_ITEMS.length + 3,
      name: "Отзывы",
      url: absoluteUrl("/reviews"),
    },
    {
      "@type": "SiteNavigationElement",
      position: COURSE_SEO_ITEMS.length + 4,
      name: "О нас",
      url: absoluteUrl("/about"),
    },
    { "@type": "SiteNavigationElement", position: COURSE_SEO_ITEMS.length + 5, name: "Блог", url: absoluteUrl("/blog") },
  ],
};

export const courseCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#course-catalog`,
  name: "Направления обучения ИННОПРОГ",
  description: "Каталог онлайн-курсов программирования ИННОПРОГ для взрослых и детей",
  itemListElement: COURSE_SEO_ITEMS.map((course, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(course.path),
    item: {
      "@type": "Course",
      "@id": `${absoluteUrl(course.path)}#course`,
      name: course.name,
      description: course.description,
      url: absoluteUrl(course.path),
      provider: {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
      },
      inLanguage: "ru-RU",
      isAccessibleForFree: false,
    },
  })),
};

export const keyPagesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#key-pages`,
  name: "Основные страницы ИННОПРОГ",
  description: "Главные страницы сайта ИННОПРОГ: курсы, стоимость обучения, отзывы учеников и информация о школе",
  itemListElement: KEY_SITE_LINKS.map((link, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: link.name,
    url: absoluteUrl(link.path),
    item: {
      "@type": "WebPage",
      "@id": `${absoluteUrl(link.path)}#webpage`,
      name: link.name,
      description: link.description,
      url: absoluteUrl(link.path),
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
    },
  })),
};

export const tariffsOfferCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${absoluteUrl("/tariffs")}#course-offers`,
  name: "Стоимость обучения в ИННОПРОГ",
  description: "Стоимость и форматы обучения на онлайн-курсах программирования ИННОПРОГ",
  url: absoluteUrl("/tariffs"),
  itemListElement: COURSE_SEO_ITEMS.map((course, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Offer",
      "@id": offerEntityId(course.path),
      name: `Тариф курса ${course.name}`,
      url: absoluteUrl("/tariffs"),
      category: "Paid online course",
      availability: "https://schema.org/InStock",
      price: "7990",
      priceCurrency: "RUB",
      seller: { "@id": `${SITE_URL}/#organization` },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "7990",
        priceCurrency: "RUB",
        unitText: "месяц",
      },
      itemOffered: {
        "@type": "Course",
        "@id": courseEntityId(course.path),
        name: course.name,
        description: course.description,
        url: absoluteUrl(course.path),
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    },
  })),
};

// Share the same published teacher records with the visible course carousels.
function courseInstructorsJsonLd(role: TeacherRole) {
  return teachers.filter((teacher) => teacher.role === role).map((teacher) => ({
    "@type": "Person",
    name: teacher.name,
    jobTitle: teacher.role,
    image: absoluteUrl(teacher.image),
  }));
}

function publishedCourseReviewsJsonLd(direction: StudentReview["direction"]) {
  return STUDENT_REVIEWS.filter((review) => review.direction === direction).slice(0, 4).map((review) => ({
    "@type": "Review",
    author: { "@type": "Person", name: review.name },
    reviewBody: review.body,
  }));
}

export const pythonCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/python-course#course`,
  name: "Python-разработчик",
  description:
    "Практический онлайн-курс Python-разработчик с нуля в ИННОПРОГ: Python, ООП, SQL, PostgreSQL, Django, FastAPI, тестирование, Docker и CI/CD с наставником",
  url: absoluteUrl("/python-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P12M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  review: publishedCourseReviewsJsonLd("python"),
  teaches: [
    "основы и продвинутые возможности Python",
    "объектно-ориентированное программирование на Python",
    "алгоритмы и структуры данных",
    "Git и Linux",
    "SQL и PostgreSQL",
    "HTTP, REST API и асинхронный Python с asyncio",
    "Django и FastAPI",
    "Redis, Celery и фоновые задачи",
    "Telegram-боты на aiogram",
    "тестирование с pytest",
    "Docker и CI/CD",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/python-course#course-instance`,
    courseMode: "online",
    courseWorkload: "960 академических часов",
    inLanguage: "ru-RU",
    instructor: courseInstructorsJsonLd("Python-разработчик"),
  },
};

export const dataScienceCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/data-science-course#course`,
  name: "Data Science",
  description:
    "Практический онлайн-курс Data Science в ИННОПРОГ: Python, SQL, статистика, машинное обучение, MLOps и 13 проектных работ с наставником",
  url: absoluteUrl("/data-science-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P12M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  teaches: [
    "Python для анализа данных",
    "SQL и PostgreSQL",
    "статистика",
    "исследовательский анализ данных",
    "машинное обучение",
    "глубокое обучение",
    "MLOps",
    "портфолио Data Science проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/data-science-course#course-instance`,
    courseMode: "online",
    courseWorkload: "960 академических часов",
    inLanguage: "ru-RU",
    instructor: courseInstructorsJsonLd("Data Scientist"),
  },
};

export const frontendCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/frontend-developer-course#course`,
  name: "Frontend-разработчик",
  description:
    "Практический онлайн-курс Frontend-разработчик в ИННОПРОГ: HTML, CSS, JavaScript, TypeScript, React, API, тестирование и 15 проектных работ с наставником",
  url: absoluteUrl("/frontend-developer-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P10M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  review: publishedCourseReviewsJsonLd("frontend"),
  teaches: [
    "HTML и CSS",
    "адаптивная верстка",
    "JavaScript",
    "TypeScript",
    "React",
    "маршрутизация и состояние",
    "работа с API",
    "тестирование frontend-приложений",
    "доступность и производительность",
    "портфолио frontend-проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/frontend-developer-course#course-instance`,
    courseMode: "online",
    courseWorkload: "800 академических часов",
    inLanguage: "ru-RU",
  },
};

export const dataAnalystCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/data-analyst-course#course`,
  name: "Data-аналитик",
  description:
    "Практический онлайн-курс Data-аналитик в ИННОПРОГ: SQL, Python, BI, статистика, A/B-тестирование и 15 аналитических проектов с наставником",
  url: absoluteUrl("/data-analyst-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P10M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  teaches: [
    "SQL и реляционные базы данных",
    "Python для анализа данных",
    "pandas и NumPy",
    "очистка и контроль качества данных",
    "математическая статистика",
    "BI и визуализация",
    "аналитические витрины",
    "продуктовая и бизнес-аналитика",
    "A/B-тестирование",
    "портфолио аналитических проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/data-analyst-course#course-instance`,
    courseMode: "online",
    courseWorkload: "800 академических часов",
    inLanguage: "ru-RU",
    instructor: courseInstructorsJsonLd("Data-аналитик"),
  },
};

export const cppCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/cpp-developer-course#course`,
  name: "C++ разработчик",
  description:
    "Практический онлайн-курс C++ разработчик в ИННОПРОГ: C++, алгоритмы, STL, ООП, Git, CMake, SQL, Linux, тестирование и 15 C++ проектов с наставником",
  url: absoluteUrl("/cpp-developer-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P12M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  review: publishedCourseReviewsJsonLd("cpp"),
  teaches: [
    "основы программирования на C++",
    "алгоритмы и структуры данных",
    "современный C++ и STL",
    "объектно-ориентированное программирование",
    "CMake и Git",
    "SQL и PostgreSQL",
    "Linux и эксплуатация C++ приложений",
    "unit-тестирование и отладка",
    "портфолио C++ проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/cpp-developer-course#course-instance`,
    courseMode: "online",
    courseWorkload: "960 академических часов",
    inLanguage: "ru-RU",
    instructor: courseInstructorsJsonLd("C++ разработчик"),
  },
};

export const mobileDeveloperCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/mobile-developer-course#course`,
  name: "Мобильный разработчик",
  description:
    "Практический онлайн-курс Мобильный разработчик в ИННОПРОГ: Dart, Flutter, API, локальное хранение, Android/iOS, тестирование, публикация и 15 мобильных проектов с наставником",
  url: absoluteUrl("/mobile-developer-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P10M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  review: publishedCourseReviewsJsonLd("mobile"),
  teaches: [
    "Dart",
    "Flutter",
    "мобильные интерфейсы",
    "архитектура Flutter-приложений",
    "работа с API, JSON и HTTP",
    "локальное хранение и offline-first",
    "нативные интеграции Android и iOS",
    "тестирование мобильных приложений",
    "сборка и публикация приложений",
    "портфолио мобильных проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/mobile-developer-course#course-instance`,
    courseMode: "online",
    courseWorkload: "800 академических часов",
    inLanguage: "ru-RU",
  },
};

export const unrealEngineCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/unreal-engine-course#course`,
  name: "Unreal Engine",
  description:
    "Практический онлайн-курс Unreal Engine в ИННОПРОГ: Unreal Engine 5, Blueprint, игровые механики, персонажи, UMG, State Tree, оптимизация, публикация и 6 игровых проектов с наставником",
  url: absoluteUrl("/unreal-engine-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P10M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  review: publishedCourseReviewsJsonLd("unreal"),
  teaches: [
    "Unreal Engine 5",
    "Blueprint",
    "разработка игровых прототипов",
    "игровые механики",
    "level design",
    "UMG и User Widget",
    "State Tree и простой AI",
    "профилирование и оптимизация",
    "публикация игры на itch.io",
    "портфолио игровых проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/unreal-engine-course#course-instance`,
    courseMode: "online",
    courseWorkload: "800 академических часов",
    inLanguage: "ru-RU",
    instructor: courseInstructorsJsonLd("Unreal Engine разработчик"),
  },
};

export const javaCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/java-developer-course#course`,
  name: "Java-разработчик",
  description:
    "Практический онлайн-курс Java-разработчик в ИННОПРОГ: Java Core, ООП, SQL, PostgreSQL, Spring Framework и Spring Boot, REST API, тестирование, Docker и CI/CD, 15 Java-проектов с наставником",
  url: absoluteUrl("/java-developer-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P12M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  review: publishedCourseReviewsJsonLd("java"),
  teaches: [
    "Java Core",
    "объектно-ориентированное программирование",
    "коллекции, исключения и Stream API",
    "SQL и PostgreSQL",
    "JDBC, JPA и Hibernate",
    "Spring Boot",
    "REST API и Spring Security",
    "JUnit, Mockito и тестирование",
    "Docker, Linux и деплой Java-приложений",
    "портфолио Java-проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/java-developer-course#course-instance`,
    courseMode: "online",
    courseWorkload: "960 академических часов",
    inLanguage: "ru-RU",
    instructor: courseInstructorsJsonLd("Java-разработчик"),
  },
};

export const mlEngineerCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/ml-engineer-course#course`,
  name: "ML-инженер",
  description:
    "Практический онлайн-курс ML-инженер в ИННОПРОГ: Python, SQL, статистика, feature engineering, machine learning, deep learning, NLP, CV, MLOps, FastAPI, Docker и 15 ML-проектов с наставником",
  url: absoluteUrl("/ml-engineer-course"),
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: "ru-RU",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P12M",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  review: publishedCourseReviewsJsonLd("ml"),
  teaches: [
    "Python для машинного обучения",
    "SQL и PostgreSQL для ML-задач",
    "математические основы ML и метрики",
    "EDA и feature engineering",
    "валидация моделей",
    "scikit-learn",
    "deep learning",
    "NLP и компьютерное зрение",
    "FastAPI и ML API",
    "Docker, MLflow или DVC",
    "мониторинг качества и дрейфа модели",
    "портфолио ML-проектов",
  ],
  offers: {
    "@type": "Offer",
    category: "Paid online course",
    availability: "https://schema.org/InStock",
    price: "7990",
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7990",
      priceCurrency: "RUB",
      unitText: "месяц",
    },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    "@id": `${SITE_URL}/ml-engineer-course#course-instance`,
    courseMode: "online",
    courseWorkload: "960 академических часов",
    inLanguage: "ru-RU",
  },
};

export function faqPageJsonLd(
  items: ReadonlyArray<{
    question: string;
    answer: readonly string[];
    tariffsLink?: boolean;
    links?: readonly { text: string; href: string }[];
  }>,
  path = "/python-course",
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    url: absoluteUrl(path),
    inLanguage: "ru-RU",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [
          ...item.answer,
          ...(item.links?.map((link) => link.text) ?? []),
          ...(item.tariffsLink ? ["Сравнить тарифы и состав услуг"] : []),
        ].join("\n\n"),
      },
    })),
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
  primaryEntityId,
  pageType = "WebPage",
  significantLinks,
}: {
  path: string;
  name: string;
  description: string;
  primaryEntityId?: string;
  pageType?: "WebPage" | "AboutPage" | "CollectionPage";
  significantLinks?: readonly string[];
}) {
  const linkPaths = significantLinks ?? KEY_SITE_LINKS.map((link) => link.path);
  const significantLinkUrls = Array.from(
    new Set(linkPaths.filter((linkPath) => linkPath !== path).map((linkPath) => absoluteUrl(linkPath))),
  );

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "ru-RU",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    ...(significantLinkUrls.length > 0 ? { significantLink: significantLinkUrls } : {}),
    ...(primaryEntityId ? { mainEntity: { "@id": primaryEntityId } } : {}),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// Published interview excerpts; no invented stars, counts or publication dates.
export function reviewStoryJsonLd(story: ReviewRoute) {
  const meta = REVIEW_META[story];
  const url = absoluteUrl(`/reviews/${story}`);
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${url}#review`,
    url,
    name: meta.title,
    inLanguage: "ru-RU",
    author: { "@type": "Person", name: meta.name },
    publisher: { "@id": `${SITE_URL}/#organization` },
    reviewBody: meta.reviewBody,
    itemReviewed: {
      "@type": "Course",
      "@id": courseEntityId(meta.coursePath),
      name: meta.course,
      url: absoluteUrl(meta.coursePath),
      provider: { "@id": `${SITE_URL}/#organization` },
    },
  };
}
