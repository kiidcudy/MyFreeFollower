import type { Platform } from "./types";

/** URL-safe platform segment for slugs */
const PLATFORM_SLUG: Record<Platform, string> = {
  Instagram: "instagram",
  TikTok: "tiktok",
  YouTube: "youtube",
  "X (Twitter)": "x",
  Facebook: "facebook",
  Telegram: "telegram",
  Spotify: "spotify",
  Twitch: "twitch",
  Snapchat: "snapchat",
  Discord: "discord",
  Threads: "threads",
  Kick: "kick",
  LinkedIn: "linkedin",
  Pinterest: "pinterest",
  SoundCloud: "soundcloud",
  Reddit: "reddit",
  Tumblr: "tumblr",
  Trovo: "trovo",
  Rumble: "rumble",
  Dailymotion: "dailymotion",
  VK: "vk",
  Likee: "likee",
  Google: "google",
  "Website Traffic": "website-traffic",
};

/** English service type → slug segment */
const TYPE_SLUG: Record<string, string> = {
  Followers: "followers",
  Likes: "likes",
  "Video Views": "video-views",
  "Reels Views": "reels-views",
  "Story Views": "story-views",
  Comments: "comments",
  "Auto Likes": "auto-likes",
  "Auto Views": "auto-views",
  "Profile Visits": "profile-visits",
  Saves: "saves",
  Views: "views",
  Shares: "shares",
  "Live Views": "live-views",
  Subscribers: "subscribers",
  "Watch Hours": "watch-hours",
  Reposts: "reposts",
  "Page Likes": "page-likes",
  "Post Likes": "post-likes",
  Reactions: "reactions",
  Members: "members",
  "Post Views": "post-views",
  Plays: "plays",
  "Monthly Listeners": "monthly-listeners",
  "Channel Views": "channel-views",
  "Online Members": "online-members",
  Upvotes: "upvotes",
  Reviews: "reviews",
  "Page Reviews": "page-reviews",
  "Website Traffic": "website-traffic",
  "Live Website Traffic": "live-website-traffic",
};

export function platformToSlug(platform: Platform): string {
  return PLATFORM_SLUG[platform];
}

export function typeToSlug(type: string): string {
  if (TYPE_SLUG[type]) return TYPE_SLUG[type];
  return type
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildFreeSlug(platform: Platform, type: string): string {
  return `free-${platformToSlug(platform)}-${typeToSlug(type)}`;
}

export function buildPaidSlug(platform: Platform, type: string): string {
  return `buy-${platformToSlug(platform)}-${typeToSlug(type)}`;
}

export function slugPrefix(slug: string): "free" | "buy" | null {
  if (slug.startsWith("free-")) return "free";
  if (slug.startsWith("buy-")) return "buy";
  return null;
}

export function parseSlugSegments(
  slug: string,
): { prefix: "free" | "buy"; platformSlug: string; typeSlug: string } | null {
  const prefix = slugPrefix(slug);
  if (!prefix) return null;
  const rest = slug.slice(prefix.length + 1);
  const dash = rest.indexOf("-");
  if (dash === -1) return null;
  return {
    prefix,
    platformSlug: rest.slice(0, dash),
    typeSlug: rest.slice(dash + 1),
  };
}

export function platformFromSlug(platformSlug: string): Platform | undefined {
  const entry = Object.entries(PLATFORM_SLUG).find(
    ([, slug]) => slug === platformSlug,
  );
  return entry?.[0] as Platform | undefined;
}
