import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { buildLocaleSitemap } from "@/lib/sitemap-entries";
import { renderSitemapUrlset, sitemapResponseHeaders } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 86400;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const body = renderSitemapUrlset(buildLocaleSitemap(locale));
  return new Response(body, { headers: sitemapResponseHeaders });
}
