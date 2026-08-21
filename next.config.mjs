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
      "frame-ancestors 'self' https://yandex.ru https://*.yandex.ru https://yandex.com https://*.yandex.com https://yandex.by https://*.yandex.by https://yandex.kz https://*.yandex.kz https://yandex.com.tr https://*.yandex.com.tr https://yandex.uz https://*.yandex.uz https://ya.ru https://*.ya.ru https://metrica.yandex https://metrika.yandex https://webvisor.com https://*.webvisor.com https://webvisor.org https://*.webvisor.org",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://*.mc.yandex.ru https://mc.yandex.com https://*.mc.yandex.com https://mc.yandex.md https://yastatic.net https://*.yastatic.net https://smartcaptcha.yandexcloud.net https://smartcaptcha.cloud.yandex.ru",
      "style-src 'self' 'unsafe-inline' https://*.metrika.yandex.net",
      "font-src 'self' data: https://*.metrika.yandex.net",
      "img-src 'self' data: blob: https://*.metrika.yandex.net https://mc.yandex.ru https://*.mc.yandex.ru https://mc.yandex.com https://*.mc.yandex.com https://mc.yandex.md https://mc.webvisor.com https://mc.webvisor.org https://yastatic.net https://*.yastatic.net https://smartcaptcha.yandexcloud.net https://smartcaptcha.cloud.yandex.ru https://api.innoprog.ru",
      "media-src 'self' blob: https://*.metrika.yandex.net",
      "connect-src 'self' https://*.metrika.yandex.net https://mc.yandex.ru https://*.mc.yandex.ru https://mc.yandex.com https://*.mc.yandex.com https://mc.yandex.md https://mc.webvisor.com https://mc.webvisor.org wss://mc.yandex.ru wss://*.mc.yandex.ru wss://mc.yandex.com wss://*.mc.yandex.com wss://mc.yandex.md wss://mc.webvisor.com wss://mc.webvisor.org https://yastatic.net https://*.yastatic.net https://smartcaptcha.yandexcloud.net https://smartcaptcha.cloud.yandex.ru https://api.innoprog.ru",
      "child-src 'self' blob: https://mc.yandex.ru https://*.mc.yandex.ru https://mc.yandex.com https://*.mc.yandex.com https://mc.yandex.md https://mc.webvisor.com https://mc.webvisor.org https://smartcaptcha.yandexcloud.net https://smartcaptcha.cloud.yandex.ru",
      "frame-src 'self' blob: https://mc.yandex.ru https://*.mc.yandex.ru https://mc.yandex.com https://*.mc.yandex.com https://mc.yandex.md https://mc.webvisor.com https://mc.webvisor.org https://smartcaptcha.yandexcloud.net https://smartcaptcha.cloud.yandex.ru",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join("; "),
  },
];

const deploymentId = process.env.NEXT_DEPLOYMENT_ID?.trim() || null;

/** @type {import("next").NextConfig} */
const nextConfig = {
  ...(deploymentId
    ? {
        deploymentId,
        generateBuildId: async () => deploymentId,
        experimental: {
          // Mark rendered documents with the release that produced them. This
          // makes release skew observable and keeps the application ready for
          // sticky multi-release routing if Server Actions are introduced.
          useSkewCookie: true,
        },
      }
    : {}),
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
        source:
          "/((?!_next/static|_next/image|favicon.png|logo-education-360.webp|og/|videos/|documents/|files/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
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
        source: "/files/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Robots-Tag", value: "noindex, noarchive" },
        ],
      },
      {
        source: "/(privacy|consent|advertising-consent|oferta|license|software-operation-manual|functional-characteristics)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noarchive" }],
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
        source: "/documents/privacy.pdf",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/documents/consent.pdf",
        destination: "/consent",
        permanent: true,
      },
      {
        source: "/documents/offer.pdf",
        destination: "/oferta",
        permanent: true,
      },
      {
        source: "/documents/software-operation-manual.pdf",
        destination: "/software-operation-manual",
        permanent: true,
      },
      {
        source: "/documents/functional-characteristics.pdf",
        destination: "/functional-characteristics",
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
