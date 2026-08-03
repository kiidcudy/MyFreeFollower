import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { locales } from "../src/lib/i18n/config";
import { buildLocaleSitemap } from "../src/lib/sitemap-entries";
import { siteConfig } from "../src/lib/site";

const publicDir = join(process.cwd(), "public");
const sitemapsDir = join(publicDir, "sitemaps");

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrlset(
  entries: ReturnType<typeof buildLocaleSitemap>,
): string {
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

function renderIndex(): string {
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

mkdirSync(sitemapsDir, { recursive: true });

let totalUrls = 0;
for (const locale of locales) {
  const entries = buildLocaleSitemap(locale);
  totalUrls += entries.length;
  writeFileSync(
    join(sitemapsDir, `${locale}.xml`),
    renderUrlset(entries),
    "utf8",
  );
}

writeFileSync(join(publicDir, "sitemap.xml"), renderIndex(), "utf8");

writeFileSync(
  join(publicDir, "robots.txt"),
  `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${siteConfig.url}/sitemap.xml
`,
  "utf8",
);

console.log(
  `Generated sitemap index + ${locales.length} locale files (${totalUrls} URLs).`,
);
