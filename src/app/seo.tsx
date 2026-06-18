import type { Metadata } from "next";

export const SITE_URL = "https://innoprog.ru";
export const SITE_NAME = "ИННОПРОГ";
export const SITE_LEGAL_NAME = 'ООО "ИННОПРОГ"';
export const SITE_LOGO_PATH = "/logo_education.png";
export const SITE_FAVICON_PATH = "/favicon.png";
export const DEFAULT_OG_IMAGE_PATH = "/og-home.png";
export const PYTHON_COURSE_OG_IMAGE_PATH = "/og-python-course.png";
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
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Курс Python-разработчик",
      url: absoluteUrl("/python-course"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Тарифы",
      url: absoluteUrl("/tariffs"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Отзывы",
      url: absoluteUrl("/reviews"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "О нас",
      url: absoluteUrl("/about"),
    },
  ],
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
