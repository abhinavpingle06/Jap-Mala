import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache";

const pwaSettings = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
};

const nextConfig = {
  reactStrictMode: true,
  output: "standalone" as const,
  turbopack: {},
};

// next-pwa manages a service worker for offline caching and installability.
// This service worker precaches static pages, assets, and the PWA manifest so the landing page,
// login, and signup screens remain available even when the network drops.
// In development mode the service worker is disabled; use `npm run build && npm start`
// and open the site in Chrome to test installability and offline behavior.
export default withPWA(pwaSettings)(nextConfig);
