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
