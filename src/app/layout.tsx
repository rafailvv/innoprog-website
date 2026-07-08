import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../styles/index.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_KEYWORDS,
  DEFAULT_ROBOTS,
  KEY_SITE_LINKS,
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
        <meta name="yandex-verification" content="ca948d488c7e73d2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="site-seo-navigation" aria-label="Основные страницы сайта">
          {KEY_SITE_LINKS.map((link) => (
            <a href={link.path} key={link.path}>
              {link.name}
            </a>
          ))}
        </nav>
        {children}
        <Script id="site-resize-bottom-anchor" strategy="afterInteractive">
          {`
            (function() {
              var bottomThreshold = 96;
              var wasNearBottom = false;
              var resizeTimer = 0;

              function getMaxScroll() {
                var doc = document.documentElement;
                var body = document.body;
                var scrollHeight = Math.max(
                  doc ? doc.scrollHeight : 0,
                  body ? body.scrollHeight : 0
                );

                return Math.max(0, scrollHeight - window.innerHeight);
              }

              function updateBottomState() {
                var maxScroll = getMaxScroll();
                wasNearBottom = maxScroll > bottomThreshold && maxScroll - window.scrollY <= bottomThreshold;
                document.documentElement.classList.toggle("site-scroll-bottom", wasNearBottom);
              }

              function scrollToCurrentBottom() {
                window.scrollTo(0, getMaxScroll());
                updateBottomState();
              }

              function keepBottomAfterResize() {
                if (!wasNearBottom) {
                  updateBottomState();
                  return;
                }

                window.requestAnimationFrame(function() {
                  scrollToCurrentBottom();
                  window.requestAnimationFrame(scrollToCurrentBottom);
                });

                window.clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(scrollToCurrentBottom, 180);
              }

              updateBottomState();
              window.addEventListener("scroll", updateBottomState, { passive: true });
              window.addEventListener("resize", keepBottomAfterResize, { passive: true });
            })();
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
