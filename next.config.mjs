!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "replicate.delivery",
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
