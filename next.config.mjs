/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  async rewrites() {
    return [
      {
        source: "/sitemaps/:locale.xml",
        destination: "/sitemaps/:locale",
      },
    ];
  },
};

export default nextConfig;
