/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: false,
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
