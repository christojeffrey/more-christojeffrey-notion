/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */

  pageExtensions: ["page.tsx", "page.ts", "api.ts"],
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
