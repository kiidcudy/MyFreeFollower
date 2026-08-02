import { getHardcodedFreePoints } from "./free-service-points";
import { pointsFromMoney, priceFromTiers } from "./pricing";
import {
  FREE_SERVICE_CATALOG,
  PLATFORM_EMOJI,
  PLATFORM_ORDER,
  allFreeServices,
  getFreeBySlug,
  getFreeServicesByPlatform,
} from "./free-catalog";
import {
  PAID_SERVICE_CATALOG,
  allPaidServices,
  getPaidBySlug,
  getPaidServiceByPlatformAndType,
  getPaidServicesByPlatform,
  getSmallestTierUnitPriceUSD,
} from "./paid-catalog";
import { buildPaidSlug } from "./slug-utils";
import type {
  CatalogService,
  FreeCatalogService,
  PaidCatalogService,
  Platform,
} from "./types";

export type {
  CatalogService,
  FreeCatalogService,
  PaidCatalogService,
  PaidTier,
  Platform,
  ServiceTier,
} from "./types";

export {
  PLATFORMS,
  isFreeService,
  isPaidService,
} from "./types";

export {
  buildFreeSlug,
  buildPaidSlug,
  platformFromSlug,
  platformToSlug,
  slugPrefix,
  typeToSlug,
} from "./slug-utils";

export {
  FREE_SERVICE_CATALOG,
  PLATFORM_EMOJI,
  PLATFORM_ORDER,
  allFreeServices,
  getFreeBySlug,
  getFreeServicesByPlatform,
} from "./free-catalog";

export {
  PAID_SERVICE_CATALOG,
  STANDARD_TIER_QUANTITIES,
  allPaidServices,
  buildTiersFromBase100,
  getPaidBySlug,
  getPaidServicesByPlatform,
  getPaidServiceByPlatformAndType,
  getSmallestTierUnitPriceUSD,
} from "./paid-catalog";

/** All catalog services (free + paid) */
export const allCatalogServices: CatalogService[] = [
  ...allFreeServices,
  ...allPaidServices,
];

/**
 * Points cost to redeem a free service — derived from matching paid
 * service smallest-tier unit price × free quantity.
 */
export function computeFreePointsCost(service: FreeCatalogService): number {
  const hardcoded = getHardcodedFreePoints(
    service.platform,
    service.type,
    service.amount,
  );
  if (hardcoded !== undefined) return hardcoded;

  const paidMatch = getPaidServiceByPlatformAndType(
    service.platform,
    service.type,
  );
  if (!paidMatch || paidMatch.tiers.length === 0) {
    return Math.max(1, service.amount * 2);
  }
  const referenceUsd = priceFromTiers(service.amount, paidMatch.tiers);
  return pointsFromMoney(referenceUsd);
}

export function getServicesByPlatform(platform: Platform): {
  free: FreeCatalogService[];
  paid: PaidCatalogService[];
} {
  return {
    free: getFreeServicesByPlatform(platform),
    paid: getPaidServicesByPlatform(platform),
  };
}

/** Related services: same platform (free + paid), excluding current slug */
export function getRelatedServices(
  slug: string,
  limit = 6,
): CatalogService[] {
  const current =
    getFreeBySlug(slug) ?? getPaidBySlug(slug);
  if (!current) return [];

  const platform = current.platform;
  const related: CatalogService[] = [];

  for (const service of getFreeServicesByPlatform(platform)) {
    if (service.slug !== slug) related.push(service);
  }
  for (const service of getPaidServicesByPlatform(platform)) {
    if (service.slug !== slug) related.push(service);
  }

  if (related.length < limit) {
    const type = current.type;
    for (const service of allPaidServices) {
      if (
        service.platform !== platform &&
        service.type === type &&
        !related.some((r) => r.slug === service.slug)
      ) {
        related.push(service);
      }
    }
  }

  return related.slice(0, limit);
}

/** Map free slug → corresponding paid slug (same platform + type) */
export function freeSlugToPaidSlug(freeSlug: string): string | undefined {
  const free = getFreeBySlug(freeSlug);
  if (!free) return undefined;
  return buildPaidSlug(free.platform, free.type);
}

/** Map paid slug → corresponding free slug (same platform + type) */
export function paidSlugToFreeSlug(paidSlug: string): string | undefined {
  const paid = getPaidBySlug(paidSlug);
  if (!paid) return undefined;
  const free = FREE_SERVICE_CATALOG.find(
    (s) => s.platform === paid.platform && s.type === paid.type,
  );
  return free?.slug;
}

export function getCatalogServiceBySlug(
  slug: string,
): CatalogService | undefined {
  return getFreeBySlug(slug) ?? getPaidBySlug(slug);
}

export function getPlatformsWithServices(): Platform[] {
  return PLATFORM_ORDER.filter(
    (p) =>
      getFreeServicesByPlatform(p).length > 0 ||
      getPaidServicesByPlatform(p).length > 0,
  );
}

export function getPlatformEmoji(platform: Platform): string {
  return PLATFORM_EMOJI[platform] ?? "🎁";
}
