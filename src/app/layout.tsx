import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../styles/index.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_KEYWORDS,
  DEFAULT_ROBOTS,
  SITE_FAVICON_PATH,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./seo";

const YANDEX_METRIKA_ID = 110454081;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_LEGAL_NAME,
  category: "education",
  classification: "Online education",
  keywords: DEFAULT_KEYWORDS,
  manifest: "/manifest.webmanifest",
  robots: DEFAULT_ROBOTS,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ru-RU": SITE_URL,
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: SITE_FAVICON_PATH,
    apple: SITE_FAVICON_PATH,
  },
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: "ИННОПРОГ - онлайн школа программирования",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html:not(.site-app-ready) {
                overflow: hidden;
              }

              html:not(.site-app-ready) .site-shell {
                opacity: 0;
                visibility: hidden;
              }

              .site-boot-loader {
                position: fixed;
                inset: 0;
                z-index: 3000;
                display: flex;
                flex-direction: column;
                gap: 24px;
                align-items: center;
                justify-content: center;
                background: radial-gradient(circle at 50% 45%, rgba(156, 120, 255, 0.24), rgba(255, 255, 255, 0) 34%), #ffffff;
                opacity: 1;
                pointer-events: auto;
                transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), visibility 650ms step-end;
              }

              .site-boot-loader__logo {
                display: block;
                width: min(628px, 78vw);
                height: auto;
                user-select: none;
              }

              .site-boot-loader__bar {
                width: min(320px, 58vw);
                height: 6px;
                overflow: hidden;
                border-radius: 999px;
                background: rgba(70, 74, 106, 0.14);
              }

              .site-boot-loader__bar-fill {
                width: 46%;
                height: 100%;
                border-radius: inherit;
                background: #9c78ff;
                animation: site-loader-slide 1s cubic-bezier(0.65, 0, 0.35, 1) infinite;
              }

              @keyframes site-loader-slide {
                0% {
                  transform: translateX(-115%);
                }

                100% {
                  transform: translateX(250%);
                }
              }

              html.site-app-ready .site-boot-loader {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
              }
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="site-boot-loader" aria-hidden="true">
          <img
            alt=""
            className="site-boot-loader__logo"
            decoding="async"
            src="/logo_education.png"
          />
          <div className="site-boot-loader__bar">
            <div className="site-boot-loader__bar-fill" />
          </div>
        </div>
        {children}
        <Script id="site-boot-non-app" strategy="afterInteractive">
          {`
            if (!document.querySelector('.site-shell')) {
              document.documentElement.classList.add('site-app-ready');
            }
          `}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

            ym(${YANDEX_METRIKA_ID}, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
