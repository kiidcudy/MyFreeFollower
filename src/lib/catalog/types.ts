/** Service tier — free task redemption or paid shop purchase */
export type ServiceTier = "free" | "paid";

/** All supported social / traffic platforms (24 total) */
export type Platform =
  | "Instagram"
  | "TikTok"
  | "YouTube"
  | "X (Twitter)"
  | "Facebook"
  | "Telegram"
  | "Spotify"
  | "Twitch"
  | "Snapchat"
  | "Discord"
  | "Threads"
  | "Kick"
  | "LinkedIn"
  | "Pinterest"
  | "SoundCloud"
  | "Reddit"
  | "Tumblr"
  | "Trovo"
  | "Rumble"
  | "Dailymotion"
  | "VK"
  | "Likee"
  | "Google"
  | "Website Traffic";

export const PLATFORMS: Platform[] = [
  "Instagram",
  "TikTok",
  "YouTube",
  "X (Twitter)",
  "Facebook",
  "Telegram",
  "Spotify",
  "Twitch",
  "Snapchat",
  "Discord",
  "Threads",
  "Kick",
  "LinkedIn",
  "Pinterest",
  "SoundCloud",
  "Reddit",
  "Tumblr",
  "Trovo",
  "Rumble",
  "Dailymotion",
  "VK",
  "Likee",
  "Google",
  "Website Traffic",
];

/** Preset paid package tier with EUR/USD pricing and shop points */
export interface PaidTier {
  quantity: number;
  priceEUR: number;
  priceUSD: number;
  points: number;
}

/** Free catalog entry — redeemable via task points */
export interface FreeCatalogService {
  tier: "free";
  platform: Platform;
  type: string;
  slug: string;
  amount: number;
  unit: string;
}

/** Paid catalog entry — purchasable with points or checkout */
export interface PaidCatalogService {
  tier: "paid";
  platform: Platform;
  type: string;
  slug: string;
  unit: string;
  delivery: string;
  tiers: PaidTier[];
}

export type CatalogService = FreeCatalogService | PaidCatalogService;

export function isFreeService(
  service: CatalogService,
): service is FreeCatalogService {
  return service.tier === "free";
}

export function isPaidService(
  service: CatalogService,
): service is PaidCatalogService {
  return service.tier === "paid";
}
