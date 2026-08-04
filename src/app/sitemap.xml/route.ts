import { renderSitemapIndex, sitemapResponseHeaders } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new Response(renderSitemapIndex(), {
    headers: sitemapResponseHeaders,
  });
}
