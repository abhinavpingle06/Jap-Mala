const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  output: "standalone",
  turbopack: {},
  allowedDevOrigins: ["127.0.0.1"],
});