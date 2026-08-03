import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n/config";
import { buildLocaleSitemap } from "@/lib/sitemap-entries";

export const revalidate = 86400;

type RouteParams = { params: Promise<{ locale: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }
  const entries = buildLocaleSitemap(locale);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${item.lastModified instanceof Date ? item.lastModified.toISOString() : item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency ?? "weekly"}</changefreq>
    <priority>${item.priority ?? 0.5}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
