import { servicePointsFromMoney, eurToUsd, siteConfig } from "../site";
import { applyTierPriceFloor, volumeDiscountFactor } from "./pricing";
import type { PaidCatalogService, PaidTier, Platform } from "./types";
import { buildPaidSlug } from "./slug-utils";

/** BCF standard preset quantities — up to 1M */
export const STANDARD_TIER_QUANTITIES = [
  100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000, 25000, 50000, 100000, 250000,
  500000, 1000000,
] as const;

/** BCF bulk preset quantities — views/plays/traffic up to 2M */
export const BULK_TIER_QUANTITIES = [
  500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2000000,
] as const;

export const SMALL_TIER_QUANTITIES = [5, 10, 25, 50, 100, 250] as const;

export const WATCHTIME_TIER_QUANTITIES = [
  500, 1000, 2000, 4000, 8000, 15000, 30000,
] as const;

const round2 = (v: number) => Math.round(v * 100) / 100;

/** Build preset tiers using the same volume curve as buycheapfollower.com */
export function buildTiersFromBase100(
  base100EUR: number,
  quantities: readonly number[] = STANDARD_TIER_QUANTITIES,
): PaidTier[] {
  const df100 = volumeDiscountFactor(100);
  let prevEur = 0;
  const tiers = quantities.map((quantity) => {
    let priceEUR = round2(
      base100EUR *
        (quantity / 100) *
        (volumeDiscountFactor(quantity) / df100) *
        siteConfig.priceMarkup,
    );
    if (priceEUR <= prevEur) priceEUR = round2(prevEur + 0.01);
    prevEur = priceEUR;
    const priceUSD = eurToUsd(priceEUR);
    const points = servicePointsFromMoney(priceUSD);
    return { quantity, priceEUR, priceUSD, points };
  });
  return applyTierPriceFloor(tiers);
}

type TierProfile = "standard" | "bulk" | "small" | "watchtime";

interface PaidServiceDef {
  platform: Platform;
  type: string;
  unit: string;
  base100EUR: number;
  delivery?: string;
  tierProfile?: TierProfile;
}

function tierQuantitiesFor(profile: TierProfile): readonly number[] {
  switch (profile) {
    case "bulk":
      return BULK_TIER_QUANTITIES;
    case "small":
      return SMALL_TIER_QUANTITIES;
    case "watchtime":
      return WATCHTIME_TIER_QUANTITIES;
    default:
      return STANDARD_TIER_QUANTITIES;
  }
}

function inferTierProfile(unit: string, type: string): TierProfile {
  if (unit === "reviews") return "small";
  if (unit === "hours") return "watchtime";
  if (unit === "views" || unit === "plays" || unit === "visits") return "bulk";
  if (type.toLowerCase().includes("traffic")) return "bulk";
  return "standard";
}

function paid(def: PaidServiceDef): PaidCatalogService {
  const tierProfile = def.tierProfile ?? inferTierProfile(def.unit, def.type);
  return {
    tier: "paid",
    platform: def.platform,
    type: def.type,
    slug: buildPaidSlug(def.platform, def.type),
    unit: def.unit,
    delivery: def.delivery ?? "0–60 min",
    tiers: buildTiersFromBase100(def.base100EUR, tierQuantitiesFor(tierProfile)),
  };
}

/**
 * Paid catalog — buycheapfollower.com EUR reference prices (100-unit base).
 * USD via eurToUsd (1.08). Points: max(1, round(priceUSD * 200)).
 */
export const PAID_SERVICE_CATALOG: PaidCatalogService[] = [
  // Instagram (10)
  paid({ platform: "Instagram", type: "Followers", unit: "followers", base100EUR: 1.16 }),
  paid({ platform: "Instagram", type: "Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "Instagram", type: "Video Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Instagram", type: "Reels Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Instagram", type: "Story Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Instagram", type: "Comments", unit: "comments", base100EUR: 0.5 }),
  paid({ platform: "Instagram", type: "Auto Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "Instagram", type: "Auto Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Instagram", type: "Profile Visits", unit: "visits", base100EUR: 0.45 }),
  paid({ platform: "Instagram", type: "Saves", unit: "saves", base100EUR: 0.3 }),

  // TikTok (7)
  paid({ platform: "TikTok", type: "Followers", unit: "followers", base100EUR: 0.76 }),
  paid({ platform: "TikTok", type: "Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "TikTok", type: "Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "TikTok", type: "Comments", unit: "comments", base100EUR: 0.42 }),
  paid({ platform: "TikTok", type: "Shares", unit: "shares", base100EUR: 0.3 }),
  paid({ platform: "TikTok", type: "Saves", unit: "saves", base100EUR: 0.3 }),
  paid({ platform: "TikTok", type: "Live Views", unit: "views", base100EUR: 0.61 }),

  // YouTube (6)
  paid({ platform: "YouTube", type: "Subscribers", unit: "subscribers", base100EUR: 3.32, delivery: "Gradual" }),
  paid({ platform: "YouTube", type: "Views", unit: "views", base100EUR: 0.75 }),
  paid({ platform: "YouTube", type: "Likes", unit: "likes", base100EUR: 0.87 }),
  paid({ platform: "YouTube", type: "Comments", unit: "comments", base100EUR: 1.7 }),
  paid({ platform: "YouTube", type: "Watch Hours", unit: "hours", base100EUR: 27.6, delivery: "1–3 days" }),
  paid({ platform: "YouTube", type: "Live Views", unit: "views", base100EUR: 2.65 }),

  // X (Twitter) (5)
  paid({ platform: "X (Twitter)", type: "Followers", unit: "followers", base100EUR: 1.52 }),
  paid({ platform: "X (Twitter)", type: "Likes", unit: "likes", base100EUR: 0.96 }),
  paid({ platform: "X (Twitter)", type: "Views", unit: "views", base100EUR: 0.35 }),
  paid({ platform: "X (Twitter)", type: "Comments", unit: "comments", base100EUR: 0.55 }),
  paid({ platform: "X (Twitter)", type: "Reposts", unit: "reposts", base100EUR: 0.4 }),

  // Facebook (7)
  paid({ platform: "Facebook", type: "Followers", unit: "followers", base100EUR: 0.35 }),
  paid({ platform: "Facebook", type: "Page Likes", unit: "likes", base100EUR: 0.49 }),
  paid({ platform: "Facebook", type: "Post Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "Facebook", type: "Video Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Facebook", type: "Comments", unit: "comments", base100EUR: 0.45 }),
  paid({ platform: "Facebook", type: "Shares", unit: "shares", base100EUR: 0.3 }),
  paid({ platform: "Facebook", type: "Reactions", unit: "reactions", base100EUR: 0.35 }),

  // Telegram (4)
  paid({ platform: "Telegram", type: "Members", unit: "members", base100EUR: 0.85 }),
  paid({ platform: "Telegram", type: "Post Views", unit: "views", base100EUR: 0.28 }),
  paid({ platform: "Telegram", type: "Reactions", unit: "reactions", base100EUR: 0.35 }),
  paid({ platform: "Telegram", type: "Comments", unit: "comments", base100EUR: 0.5 }),

  // Spotify (4)
  paid({ platform: "Spotify", type: "Followers", unit: "followers", base100EUR: 1.23 }),
  paid({ platform: "Spotify", type: "Plays", unit: "plays", base100EUR: 0.35 }),
  paid({ platform: "Spotify", type: "Monthly Listeners", unit: "listeners", base100EUR: 1.85 }),
  paid({ platform: "Spotify", type: "Saves", unit: "saves", base100EUR: 0.4 }),

  // Twitch (3)
  paid({ platform: "Twitch", type: "Followers", unit: "followers", base100EUR: 1.05 }),
  paid({ platform: "Twitch", type: "Channel Views", unit: "views", base100EUR: 0.32 }),
  paid({ platform: "Twitch", type: "Live Views", unit: "views", base100EUR: 0.68 }),

  // Snapchat (3)
  paid({ platform: "Snapchat", type: "Followers", unit: "followers", base100EUR: 0.92 }),
  paid({ platform: "Snapchat", type: "Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Snapchat", type: "Story Views", unit: "views", base100EUR: 0.3 }),

  // Discord (3)
  paid({ platform: "Discord", type: "Members", unit: "members", base100EUR: 0.78 }),
  paid({ platform: "Discord", type: "Online Members", unit: "members", base100EUR: 1.15 }),
  paid({ platform: "Discord", type: "Reactions", unit: "reactions", base100EUR: 0.35 }),

  // Threads (3)
  paid({ platform: "Threads", type: "Followers", unit: "followers", base100EUR: 0.88 }),
  paid({ platform: "Threads", type: "Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "Threads", type: "Reposts", unit: "reposts", base100EUR: 0.35 }),

  // Kick (3)
  paid({ platform: "Kick", type: "Followers", unit: "followers", base100EUR: 0.95 }),
  paid({ platform: "Kick", type: "Live Views", unit: "views", base100EUR: 0.65 }),
  paid({ platform: "Kick", type: "Views", unit: "views", base100EUR: 0.3 }),

  // LinkedIn (3)
  paid({ platform: "LinkedIn", type: "Followers", unit: "followers", base100EUR: 2.85, delivery: "1–24 hours" }),
  paid({ platform: "LinkedIn", type: "Likes", unit: "likes", base100EUR: 1.2 }),
  paid({ platform: "LinkedIn", type: "Comments", unit: "comments", base100EUR: 1.45 }),

  // Pinterest (3)
  paid({ platform: "Pinterest", type: "Followers", unit: "followers", base100EUR: 0.82 }),
  paid({ platform: "Pinterest", type: "Saves", unit: "saves", base100EUR: 0.3 }),
  paid({ platform: "Pinterest", type: "Views", unit: "views", base100EUR: 0.3 }),

  // SoundCloud (5)
  paid({ platform: "SoundCloud", type: "Followers", unit: "followers", base100EUR: 0.9 }),
  paid({ platform: "SoundCloud", type: "Plays", unit: "plays", base100EUR: 0.28 }),
  paid({ platform: "SoundCloud", type: "Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "SoundCloud", type: "Reposts", unit: "reposts", base100EUR: 0.35 }),
  paid({ platform: "SoundCloud", type: "Comments", unit: "comments", base100EUR: 0.48 }),

  // Reddit (3)
  paid({ platform: "Reddit", type: "Members", unit: "members", base100EUR: 1.1 }),
  paid({ platform: "Reddit", type: "Upvotes", unit: "upvotes", base100EUR: 0.38 }),
  paid({ platform: "Reddit", type: "Comments", unit: "comments", base100EUR: 0.52 }),

  // Tumblr (3)
  paid({ platform: "Tumblr", type: "Followers", unit: "followers", base100EUR: 0.72 }),
  paid({ platform: "Tumblr", type: "Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "Tumblr", type: "Reposts", unit: "reposts", base100EUR: 0.32 }),

  // Trovo (2)
  paid({ platform: "Trovo", type: "Followers", unit: "followers", base100EUR: 0.85 }),
  paid({ platform: "Trovo", type: "Live Views", unit: "views", base100EUR: 0.58 }),

  // Rumble (3)
  paid({ platform: "Rumble", type: "Subscribers", unit: "subscribers", base100EUR: 0.9 }),
  paid({ platform: "Rumble", type: "Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Rumble", type: "Likes", unit: "likes", base100EUR: 0.3 }),

  // Dailymotion (3)
  paid({ platform: "Dailymotion", type: "Followers", unit: "followers", base100EUR: 0.8 }),
  paid({ platform: "Dailymotion", type: "Views", unit: "views", base100EUR: 0.3 }),
  paid({ platform: "Dailymotion", type: "Likes", unit: "likes", base100EUR: 0.3 }),

  // VK (3)
  paid({ platform: "VK", type: "Followers", unit: "followers", base100EUR: 0.7 }),
  paid({ platform: "VK", type: "Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "VK", type: "Views", unit: "views", base100EUR: 0.28 }),

  // Likee (3)
  paid({ platform: "Likee", type: "Followers", unit: "followers", base100EUR: 0.74 }),
  paid({ platform: "Likee", type: "Likes", unit: "likes", base100EUR: 0.3 }),
  paid({ platform: "Likee", type: "Views", unit: "views", base100EUR: 0.3 }),

  // Google (2)
  paid({ platform: "Google", type: "Reviews", unit: "reviews", base100EUR: 4.5, delivery: "2–5 days" }),
  paid({ platform: "Google", type: "Page Reviews", unit: "reviews", base100EUR: 4.2, delivery: "2–5 days" }),

  // Website Traffic (2)
  paid({ platform: "Website Traffic", type: "Website Traffic", unit: "visits", base100EUR: 1.85 }),
  paid({ platform: "Website Traffic", type: "Live Website Traffic", unit: "visits", base100EUR: 2.4 }),
];

export const allPaidServices: PaidCatalogService[] = PAID_SERVICE_CATALOG;

export function getPaidBySlug(slug: string): PaidCatalogService | undefined {
  return PAID_SERVICE_CATALOG.find((s) => s.slug === slug);
}

export function getPaidServicesByPlatform(
  platform: Platform,
): PaidCatalogService[] {
  return PAID_SERVICE_CATALOG.filter((s) => s.platform === platform);
}

export function getPaidServiceByPlatformAndType(
  platform: Platform,
  type: string,
): PaidCatalogService | undefined {
  return PAID_SERVICE_CATALOG.find(
    (s) => s.platform === platform && s.type === type,
  );
}

export function getSmallestTierUnitPriceUSD(
  service: PaidCatalogService,
): number {
  const smallest = service.tiers[0];
  if (!smallest || smallest.quantity <= 0) return 0;
  return smallest.priceUSD / smallest.quantity;
}
