import type { Metadata } from "next";

export const SITE_URL = "https://innoprog.ru";
export const SITE_NAME = "ИННОПРОГ";
export const SITE_LEGAL_NAME = 'ООО "ИННОПРОГ"';
export const SITE_LOGO_PATH = "/logo_education.png";
export const SITE_FAVICON_PATH = "/favicon.png";
export const DEFAULT_DESCRIPTION =
  "ИННОПРОГ - онлайн-школа программирования для взрослых и детей с практикой, наставниками, собственной платформой и карьерной поддержкой.";
export const DEFAULT_KEYWORDS = [
  "ИННОПРОГ",
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

const DEFAULT_ROBOTS: Metadata["robots"] = {
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
    description: "История Кирилла: путь из HR в Python-разработку с ИННОПРОГ.",
    course: "Python-разработчик",
    result: "Из HR в ИТ",
    reviewBody:
      "Обучение проходило постепенно, от базовых тем к более сложным задачам. Через сложные задания лучше всего начинаешь понимать программирование.",
  },
  anastasia: {
    name: "Анастасия",
    title: "История Анастасии",
    description: "История Анастасии: обучение Data Science и переход к работе с продуктовой аналитикой.",
    course: "Data Science",
    result: "Из 1C в Product",
    reviewBody:
      "Обучение выстроено так, чтобы почти каждую тему можно было привязать к практике, анализировать результат и понимать, какую пользу дает модель.",
  },
  mikhail: {
    name: "Михаил",
    title: "История Михаила",
    description: "История Михаила: путь к созданию рабочего веб-приложения на обучении ИННОПРОГ.",
    course: "Веб-приложение",
    result: "От идеи к проекту",
    reviewBody:
      "Во время обучения получилось собрать рабочее веб-приложение, закрепить практику и увидеть, как знания складываются в реальный проект.",
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
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_LEGAL_NAME,
    category: "education",
    classification: "Online education",
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    referrer: "origin-when-cross-origin",
    robots: DEFAULT_ROBOTS,
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
          url: absoluteUrl(SITE_LOGO_PATH),
          width: 1256,
          height: 296,
          alt: "ИННОПРОГ Education",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(SITE_LOGO_PATH)],
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
  url: SITE_URL,
  inLanguage: "ru-RU",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/#courses`,
  name: "Курсы программирования ИННОПРОГ",
  description: DEFAULT_DESCRIPTION,
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
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
    "Практический онлайн-курс Python-разработчик в ИННОПРОГ с наставником, платформой, проектами, преподавателями и документами после обучения.",
  url: absoluteUrl("/python-course"),
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "ru-RU",
  courseMode: "online",
  educationalLevel: "beginner",
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
    priceCurrency: "RUB",
    url: absoluteUrl("/tariffs"),
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    inLanguage: "ru-RU",
    instructor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  },
};

export function webPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
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
  };
}
