/** @type {import('next').NextConfig} */

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://embed.tawk.to",
    "https://tawk.to",
    "https://*.tawk.to",
    "https://accounts.google.com",
    "https://apis.google.com",
    "https://va.vercel-scripts.com",
    "https://*.vercel-scripts.com",
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com https://embed.tawk.to https://tawk.to https://*.tawk.to",
  "font-src 'self' data: https://fonts.gstatic.com https://embed.tawk.to https://*.tawk.to",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob: https:",
  [
    "connect-src 'self'",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.googletagmanager.com",
    "https://stats.g.doubleclick.net",
    "https://tawk.to",
    "https://*.tawk.to",
    "wss://*.tawk.to",
    "https://accounts.google.com",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
  ].join(" "),
  [
    "frame-src 'self'",
    "https://accounts.google.com",
    "https://embed.tawk.to",
    "https://*.tawk.to",
    "https://pay.binance.com",
    "https://app.cryptomus.com",
  ].join(" "),
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig = {
  poweredByHeader: false,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
