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
