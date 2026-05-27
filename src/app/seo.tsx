import type { Metadata } from "next";

export const SITE_URL = "https://innoprog.ru";
export const SITE_NAME = "ИННОПРОГ";
export const DEFAULT_DESCRIPTION =
  "ИННОПРОГ - онлайн-школа программирования с практикой, наставниками, платформой и карьерной поддержкой.";

export const REVIEW_ROUTE_TO_KEY = {
  kirill: "кирилл",
  anastasia: "анастасия",
  mikhail: "михаил",
} as const;

export const REVIEW_META = {
  kirill: {
    name: "Кирилл",
    title: "История Кирилла",
    description: "История выпускника курса Python-разработчик в ИННОПРОГ.",
  },
  anastasia: {
    name: "Анастасия",
    title: "История Анастасии",
    description: "История выпускницы курса Data Science в ИННОПРОГ.",
  },
  mikhail: {
    name: "Михаил",
    title: "История Михаила",
    description: "История ученика ИННОПРОГ, который собрал рабочее веб-приложение.",
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
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
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
          url: absoluteUrl("/logo_education.png"),
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
      images: [absoluteUrl("/logo_education.png")],
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
  name: "ИННОПРОГ",
  url: SITE_URL,
  logo: absoluteUrl("/logo_education.png"),
  email: "education@innoprog.ru",
  telephone: "+7 958 606-79-80",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Республика Татарстан",
    addressLocality: "Иннополис",
    streetAddress: "ул. Университетская, д. 5, пом. 115, м. 15/2",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ru-RU",
};

export const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Курсы программирования ИННОПРОГ",
  description: DEFAULT_DESCRIPTION,
  provider: {
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    sameAs: SITE_URL,
  },
};
