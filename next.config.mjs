const metrikaHosts = [
  "https://mc.yandex.ru",
  "https://mc.yandex.az",
  "https://mc.yandex.by",
  "https://mc.yandex.co.il",
  "https://mc.yandex.com",
  "https://mc.yandex.com.am",
  "https://mc.yandex.com.ge",
  "https://mc.yandex.com.tr",
  "https://mc.yandex.ee",
  "https://mc.yandex.fr",
  "https://mc.yandex.kg",
  "https://mc.yandex.kz",
  "https://mc.yandex.lt",
  "https://mc.yandex.lv",
  "https://mc.yandex.md",
  "https://mc.yandex.tj",
  "https://mc.yandex.tm",
  "https://mc.yandex.uz",
  "https://mc.webvisor.com",
  "https://mc.webvisor.org",
];

const metrikaWebSocketHosts = metrikaHosts.map((host) => host.replace("https://", "wss://"));

const metrikaFrameAncestors = [
  "https://metrika.yandex.ru",
  "https://analytics.yandex.by",
  "https://analytics.yandex.com",
  "https://analytics.yandex.com.tr",
  "https://analytics.yandex.kz",
  "https://analytics.yandex.ru",
  "https://metr.yandex.by",
  "https://metr.yandex.com",
  "https://metr.yandex.com.tr",
  "https://metr.yandex.kz",
  "https://metr.yandex.ru",
  "https://metrica.ya.ru",
  "https://metrica.yandex",
  "https://metrica.yandex.by",
  "https://metrica.yandex.com",
  "https://metrica.yandex.com.tr",
  "https://metrica.yandex.kz",
  "https://metrica.yandex.ru",
  "https://metrika.ya.ru",
  "https://metrika.yandex",
  "https://metrika.yandex.by",
  "https://metrika.yandex.com",
  "https://metrika.yandex.com.tr",
  "https://metrika.yandex.kz",
  "https://metrika.yandex.uz",
];

const metrikaSources = metrikaHosts.join(" ");
const metrikaWebSocketSources = metrikaWebSocketHosts.join(" ");
const metrikaFrameAncestorSources = metrikaFrameAncestors.join(" ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
      `frame-ancestors 'self' ${metrikaFrameAncestorSources}`,
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${metrikaSources} https://yastatic.net https://*.yastatic.net`,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      `img-src 'self' data: blob: ${metrikaSources} https://yastatic.net https://*.yastatic.net https://api.innoprog.ru`,
      "media-src 'self' blob:",
      `connect-src 'self' ${metrikaSources} ${metrikaWebSocketSources} https://yastatic.net https://*.yastatic.net https://api.innoprog.ru`,
      `child-src 'self' blob: ${metrikaSources}`,
      `frame-src 'self' blob: ${metrikaSources}`,
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join("; "),
  },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  htmlLimitedBots: /.*/,
  images: {
    disableStaticImages: true,
  },
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/logo-education-360.webp",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/favicon.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/og/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/documents/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/reviews",
        has: [
          {
            type: "query",
            key: "direction",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
      {
        source: "/reviews",
        has: [
          {
            type: "query",
            key: "review",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
      {
        source: "/reviews/:story",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet",
          },
        ],
      },
      {
        source: "/application/request",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet",
          },
        ],
      },
      {
        source: "/healthz",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon.png",
        permanent: true,
      },
      {
        source: "/python",
        destination: "/python-course",
        permanent: true,
      },
      {
        source: "/oop_python",
        destination: "/python-course",
        permanent: true,
      },
      {
        source: "/python_advanced",
        destination: "/python-course",
        permanent: true,
      },
      {
        source: "/databases",
        destination: "/python-course",
        permanent: true,
      },
      {
        source: "/page34389955.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/data-scientist",
        destination: "/data-science-course",
        permanent: true,
      },
      {
        source: "/frontend",
        destination: "/frontend-developer-course",
        permanent: true,
      },
      {
        source: "/frontend-developer",
        destination: "/frontend-developer-course",
        permanent: true,
      },
      {
        source: "/data-analyst",
        destination: "/data-analyst-course",
        permanent: true,
      },
      {
        source: "/data-analytics",
        destination: "/data-analyst-course",
        permanent: true,
      },
      {
        source: "/cpp",
        destination: "/cpp-developer-course",
        permanent: true,
      },
      {
        source: "/cpp-developer",
        destination: "/cpp-developer-course",
        permanent: true,
      },
      {
        source: "/c-plus-plus",
        destination: "/cpp-developer-course",
        permanent: true,
      },
      {
        source: "/mobile-developer",
        destination: "/mobile-developer-course",
        permanent: true,
      },
      {
        source: "/mobile",
        destination: "/mobile-developer-course",
        permanent: true,
      },
      {
        source: "/flutter",
        destination: "/mobile-developer-course",
        permanent: true,
      },
      {
        source: "/unreal",
        destination: "/unreal-engine-course",
        permanent: true,
      },
      {
        source: "/unreal-engine",
        destination: "/unreal-engine-course",
        permanent: true,
      },
      {
        source: "/game-development",
        destination: "/unreal-engine-course",
        permanent: true,
      },
      {
        source: "/java",
        destination: "/java-developer-course",
        permanent: true,
      },
      {
        source: "/java-developer",
        destination: "/java-developer-course",
        permanent: true,
      },
      {
        source: "/spring-boot",
        destination: "/java-developer-course",
        permanent: true,
      },
      {
        source: "/ml",
        destination: "/ml-engineer-course",
        permanent: true,
      },
      {
        source: "/ml-engineer",
        destination: "/ml-engineer-course",
        permanent: true,
      },
      {
        source: "/machine-learning",
        destination: "/ml-engineer-course",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/oferta",
        destination: "/documents/offer.pdf",
      },
      {
        source: "/privacy",
        destination: "/documents/privacy.pdf",
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;
