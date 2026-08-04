import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function renderSitemapUrlset(entries: MetadataRoute.Sitemap): string {
  const rows = entries
    .map((item) => {
      const lastmod =
        item.lastModified instanceof Date
          ? item.lastModified.toISOString()
          : item.lastModified;
      return `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changeFrequency ?? "weekly"}</changefreq>
    <priority>${item.priority ?? 0.5}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</urlset>`;
}

export function renderSitemapIndex(): string {
  const now = new Date().toISOString();
  const rows = locales
    .map(
      (locale) => `  <sitemap>
    <loc>${siteConfig.url}/sitemaps/${locale}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</sitemapindex>`;
}

export function renderRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${siteConfig.url}/sitemap.xml
`;
}

export const sitemapResponseHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
} as const;
