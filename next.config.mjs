!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["replicate.delivery", "firebasestorage.googleapis.com"],
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
