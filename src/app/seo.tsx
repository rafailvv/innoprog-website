import type { Metadata } from "next";

export const SITE_URL = "https://innoprog.ru";
export const SITE_NAME = "ИННОПРОГ";
export const SITE_LEGAL_NAME = 'ООО "ИННОПРОГ"';
export const SITE_LOGO_PATH = "/logo_education.png";
export const SITE_FAVICON_PATH = "/favicon.png";
export const DEFAULT_OG_IMAGE_PATH = "/og-home.png";
export const PYTHON_COURSE_OG_IMAGE_PATH = "/og-python-course.png";
export const DATA_SCIENCE_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const FRONTEND_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const DATA_ANALYST_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const CPP_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const MOBILE_DEVELOPER_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const UNREAL_ENGINE_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const JAVA_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const ML_ENGINEER_COURSE_OG_IMAGE_PATH = "/og-home.png";
export const DEFAULT_DESCRIPTION =
  "ИННОПРОГ - онлайн школа программирования для взрослых и детей с практикой, наставниками, собственной платформой и карьерной поддержкой";
export const DEFAULT_KEYWORDS = [
  "ИННОПРОГ",
  "онлайн школа программирования",
  "онлайн-школа программирования",
  "курсы программирования",
  "курс Python",
  "Python-разработчик",
  "Data Science",
  "Data-аналитик",
  "аналитик данных",
  "SQL",
  "BI",
  "C++ разработчик",
  "курс C++",
  "CMake",
  "Мобильный разработчик",
  "курс Flutter",
  "Dart",
  "Flutter",
  "Unreal Engine",
  "Unreal Engine 5",
  "Blueprint",
  "разработка игр",
  "Java-разработчик",
  "курс Java",
  "Spring Boot",
  "Hibernate",
  "JavaFX",
  "Maven",
  "Gradle",
  "ML-инженер",
  "курс машинное обучение",
  "Machine Learning",
  "MLOps",
  "scikit-learn",
  "PyTorch",
  "Frontend-разработчик",
  "React",
  "JavaScript",
  "TypeScript",
  "программирование онлайн",
  "обучение программированию",
  "ИТ-курсы",
  "курсы с наставником",
];

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
    description: "Онлайн-курс Java-разработчик: Java Core, ООП, SQL, PostgreSQL, JavaFX, Spring Boot, REST API и 15 проектов",
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
    title: "История Кирилла",
    description:
      "История Кирилла о переходе из HR в Python-разработку: обучение в ИННОПРОГ, практика с наставником и первые уверенные шаги в ИТ",
    course: "Python-разработчик",
    result: "Из HR в ИТ",
    reviewBody:
      "Обучение проходило постепенно, от базовых тем к более сложным задачам. Через сложные задания лучше всего начинаешь понимать программирование",
  },
  anastasia: {
    name: "Анастасия",
    title: "История Анастасии",
    description:
      "История Анастасии о переходе из 1С в продуктовую аналитику: обучение Data Science, практика с данными и поддержка наставника",
    course: "Data Science",
    result: "Из 1C в Product",
    reviewBody:
      "Обучение выстроено так, чтобы почти каждую тему можно было привязать к практике, анализировать результат и понимать, какую пользу дает модель",
  },
  mikhail: {
    name: "Михаил",
    title: "История Михаила",
    description:
      "История Михаила о разработке веб-приложения в ИННОПРОГ: как обучение, практика и обратная связь помогли собрать рабочий проект",
    course: "Веб-приложение",
    result: "От идеи к проекту",
    reviewBody:
      "Во время обучения получилось собрать рабочее веб-приложение, закрепить практику и увидеть, как знания складываются в реальный проект",
  },
} as const;

export type ReviewRoute = keyof typeof REVIEW_ROUTE_TO_KEY;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
  noIndex = false,
  absoluteTitle = false,
  ogImage = DEFAULT_OG_IMAGE_PATH,
  ogImageAlt = "ИННОПРОГ - онлайн школа программирования",
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  absoluteTitle?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const robots = noIndex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
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
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    referrer: "origin-when-cross-origin",
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
          width: 1200,
          height: 630,
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
  sameAs: ["https://t.me/innoprog_admin"],
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
      name: "Тарифы",
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
  ],
};

export const courseCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#course-catalog`,
  name: "Направления обучения ИННОПРОГ",
  description: "Каталог онлайн-курсов программирования ИННОПРОГ для взрослых и детей",
  inLanguage: "ru-RU",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
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
        "@id": `${SITE_URL}/#organization`,
      },
      courseMode: "online",
      inLanguage: "ru-RU",
      isAccessibleForFree: false,
    },
  })),
};

export const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/#courses`,
  name: "Курсы программирования ИННОПРОГ",
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  isAccessibleForFree: false,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  teaches: [
    "Python",
    "Data Science",
    "Frontend-разработка",
    "Data-аналитика",
    "C++",
    "мобильная разработка",
    "Unreal Engine",
    "Java",
    "машинное обучение",
    "программирование",
    "аналитика данных",
    "разработка приложений",
  ],
};

export const pythonCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/python-course#course`,
  name: "Python-разработчик",
  description:
    "Практический онлайн-курс Python-разработчик с нуля в ИННОПРОГ с наставником, платформой, проектами в портфолио и документами после обучения",
  url: absoluteUrl("/python-course"),
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  teaches: [
    "Python",
    "backend-разработка",
    "работа с кодом",
    "практические задачи",
    "портфолио проектов",
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
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
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
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
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
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
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
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
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
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
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
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
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  },
};

export const javaCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/java-developer-course#course`,
  name: "Java-разработчик",
  description:
    "Практический онлайн-курс Java-разработчик в ИННОПРОГ: Java Core, ООП, SQL, PostgreSQL, JavaFX, Spring Boot, REST API, безопасность, тестирование, деплой и 15 Java-проектов с наставником",
  url: absoluteUrl("/java-developer-course"),
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  teaches: [
    "Java Core",
    "объектно-ориентированное программирование",
    "коллекции, исключения и Stream API",
    "SQL и PostgreSQL",
    "JDBC, JPA и Hibernate",
    "JavaFX",
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
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
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
  isAccessibleForFree: false,
  timeRequired: "P28W",
  totalTime: "PT560H",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
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
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  },
};

export function faqPageJsonLd(
  items: ReadonlyArray<{ question: string; answer: readonly string[] }>,
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
        text: item.answer.join("\n\n"),
      },
    })),
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
  primaryEntityId,
}: {
  path: string;
  name: string;
  description: string;
  primaryEntityId?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
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
    ...(primaryEntityId ? { primaryEntity: { "@id": primaryEntityId } } : {}),
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

export function reviewJsonLd(route: ReviewRoute) {
  const meta = REVIEW_META[route];

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${absoluteUrl(`/reviews/${route}`)}#review`,
    itemReviewed: {
      "@type": "Course",
      "@id": `${SITE_URL}/#courses`,
      name: meta.course,
      provider: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    author: {
      "@type": "Person",
      name: meta.name,
    },
    name: meta.title,
    reviewBody: meta.reviewBody,
    url: absoluteUrl(`/reviews/${route}`),
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}
