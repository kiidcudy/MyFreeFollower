import { renderRobotsTxt } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new Response(renderRobotsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
