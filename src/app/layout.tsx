import { ConversionTracking } from "./components/ConversionTracking";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "../styles/index.css";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_KEYWORDS,
  DEFAULT_ROBOTS,
  SITE_FAVICON_PATH,
  SITE_APPLE_TOUCH_ICON_PATH,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./seo";

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-cyrillic.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/manrope-latin.woff2", weight: "200 800", style: "normal" },
  ],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  variable: "--font-manrope",
});

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
    icon: [{ url: SITE_FAVICON_PATH, type: "image/x-icon", sizes: "16x16 32x32 48x48 64x64" }],
    apple: SITE_APPLE_TOUCH_ICON_PATH,
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

const analyticsBootstrap = `
(function (w, d) {
  w.ym = w.ym || function () { (w.ym.a = w.ym.a || []).push(arguments); };
  w.ym.l = Date.now();
  w.ym(110454081, "init", {
    ssr: true, webvisor: true, clickmap: true, referrer: d.referrer,
    url: w.location.href, accurateTrackBounce: true, trackLinks: true
  });

  var pixel = w._apxl || (w._apxl = []);
  pixel.push({ id: 8824496, start: Date.now() });
  pixel.q = pixel.q || [];
  pixel.sendEvent = pixel.sendEvent || function (args) {
    pixel.q.push([args, w.location.href, Date.now()]);
  };

  function include(id, url) {
    if (d.getElementById(id) || Array.prototype.some.call(d.scripts, function (script) { return script.src === url; })) return;
    var script = d.createElement("script");
    script.async = true;
    script.id = id;
    script.src = url;
    d.head.appendChild(script);
  }

  function start() {
    w.removeEventListener("pointerdown", start, true);
    w.removeEventListener("keydown", start, true);
    include("innoprog-metrika", "https://mc.yandex.ru/metrika/tag.js?id=110454081");
    include("apxl-code", "https://ac.avito.ru/tag.js");
  }

  function startWhenIdle() {
    if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(start, { timeout: 1000 });
    else w.setTimeout(start, 0);
  }

  if (new URLSearchParams(w.location.search).get("_ym_debug") === "1") {
    start();
  } else {
    w.addEventListener("pointerdown", start, { passive: true, capture: true });
    w.addEventListener("keydown", start, { capture: true });
    if (d.readyState === "complete") startWhenIdle();
    else w.addEventListener("load", startWhenIdle, { once: true });
  }
})(window, document);
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <head>
        <noscript><style>{".site-loader{display:none!important}"}</style></noscript>
        <meta name="yandex-verification" content="ca948d488c7e73d2" />
        <meta name="google-site-verification" content="ASsR_pT14eTWgOIz2S4bbEAO5UhRtcHBqv1F1O2a1AE" />
        <script dangerouslySetInnerHTML={{ __html: analyticsBootstrap }} />
      </head>
      <body className={manrope.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<div><img src="https://mc.yandex.ru/watch/110454081" style="position:absolute; left:-9999px;" alt="" /></div>',
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<div><img src="https://www.avito.st/static/ims/235e1f90-308c-4bf5-91a3-07239fde0f2f_ai_icon_common_12x16.png" style="position:absolute;left:-9999px;" alt="Avito Pixel" /></div>',
          }}
        />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
        <ConversionTracking />
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
      </body>
    </html>
  );
}
