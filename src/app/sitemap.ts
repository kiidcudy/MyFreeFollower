import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { buildLocaleSitemap } from "@/lib/sitemap-entries";

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    items.push(...buildLocaleSitemap(locale));
  }
  return items;
}
