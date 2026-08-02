import type { Locale } from "@/lib/i18n/config";
import { getServiceDisplayTitle } from "@/lib/i18n/catalog-labels";
import { allFreeServices, allPaidServices } from "./index";
import type { CatalogService } from "./types";

export type SearchResult = {
  service: CatalogService;
  href: string;
  label: string;
};

export function searchCatalog(
  query: string,
  locale: Locale = "en",
  limit = 12,
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const all = [...allFreeServices, ...allPaidServices];
  const results: SearchResult[] = [];

  for (const service of all) {
    const displayTitle = getServiceDisplayTitle(locale, service);
    const haystack =
      `${displayTitle} ${service.platform} ${service.type} ${service.slug}`.toLowerCase();
    if (!haystack.includes(q)) continue;

    const hub = service.tier === "free" ? "/free-followers" : "/buy-followers";
    results.push({
      service,
      href: `${hub}/${service.slug}`,
      label: displayTitle,
    });
    if (results.length >= limit) break;
  }

  return results;
}
