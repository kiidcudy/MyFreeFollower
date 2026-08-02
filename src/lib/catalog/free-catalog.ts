import type { FreeCatalogService, Platform } from "./types";
import { buildFreeSlug } from "./slug-utils";

function free(
  platform: Platform,
  type: string,
  amount: number,
  unit: string,
): FreeCatalogService {
  return {
    tier: "free",
    platform,
    type,
    slug: buildFreeSlug(platform, type),
    amount,
    unit,
  };
}

/** buycheapfollower.com/free-services — 93 free trials across 24 platforms */
export const FREE_SERVICE_CATALOG: FreeCatalogService[] = [
  // Instagram (10)
  free("Instagram", "Followers", 25, "followers"),
  free("Instagram", "Likes", 50, "likes"),
  free("Instagram", "Video Views", 250, "views"),
  free("Instagram", "Reels Views", 250, "views"),
  free("Instagram", "Story Views", 250, "views"),
  free("Instagram", "Comments", 5, "comments"),
  free("Instagram", "Auto Likes", 50, "likes"),
  free("Instagram", "Auto Views", 250, "views"),
  free("Instagram", "Profile Visits", 100, "visits"),
  free("Instagram", "Saves", 30, "saves"),
  // TikTok (7)
  free("TikTok", "Followers", 25, "followers"),
  free("TikTok", "Likes", 50, "likes"),
  free("TikTok", "Views", 250, "views"),
  free("TikTok", "Comments", 5, "comments"),
  free("TikTok", "Shares", 20, "shares"),
  free("TikTok", "Saves", 30, "saves"),
  free("TikTok", "Live Views", 100, "views"),
  // YouTube (6)
  free("YouTube", "Subscribers", 15, "subscribers"),
  free("YouTube", "Views", 250, "views"),
  free("YouTube", "Likes", 50, "likes"),
  free("YouTube", "Comments", 5, "comments"),
  free("YouTube", "Watch Hours", 50, "hours"),
  free("YouTube", "Live Views", 100, "views"),
  // X (Twitter) (5)
  free("X (Twitter)", "Followers", 25, "followers"),
  free("X (Twitter)", "Likes", 50, "likes"),
  free("X (Twitter)", "Views", 250, "views"),
  free("X (Twitter)", "Comments", 5, "comments"),
  free("X (Twitter)", "Reposts", 20, "reposts"),
  // Facebook (7)
  free("Facebook", "Followers", 25, "followers"),
  free("Facebook", "Page Likes", 50, "likes"),
  free("Facebook", "Post Likes", 50, "likes"),
  free("Facebook", "Video Views", 250, "views"),
  free("Facebook", "Comments", 5, "comments"),
  free("Facebook", "Shares", 20, "shares"),
  free("Facebook", "Reactions", 25, "reactions"),
  // Telegram (4)
  free("Telegram", "Members", 25, "members"),
  free("Telegram", "Post Views", 250, "views"),
  free("Telegram", "Reactions", 25, "reactions"),
  free("Telegram", "Comments", 5, "comments"),
  // Spotify (4)
  free("Spotify", "Followers", 25, "followers"),
  free("Spotify", "Plays", 250, "plays"),
  free("Spotify", "Monthly Listeners", 100, "listeners"),
  free("Spotify", "Saves", 30, "saves"),
  // Twitch (3)
  free("Twitch", "Followers", 25, "followers"),
  free("Twitch", "Channel Views", 250, "views"),
  free("Twitch", "Live Views", 100, "views"),
  // Snapchat (3)
  free("Snapchat", "Followers", 25, "followers"),
  free("Snapchat", "Views", 250, "views"),
  free("Snapchat", "Story Views", 250, "views"),
  // Discord (3)
  free("Discord", "Members", 25, "members"),
  free("Discord", "Online Members", 25, "members"),
  free("Discord", "Reactions", 25, "reactions"),
  // Threads (3)
  free("Threads", "Followers", 25, "followers"),
  free("Threads", "Likes", 50, "likes"),
  free("Threads", "Reposts", 20, "reposts"),
  // Kick (3)
  free("Kick", "Followers", 25, "followers"),
  free("Kick", "Live Views", 100, "views"),
  free("Kick", "Views", 250, "views"),
  // LinkedIn (3)
  free("LinkedIn", "Followers", 25, "followers"),
  free("LinkedIn", "Likes", 50, "likes"),
  free("LinkedIn", "Comments", 5, "comments"),
  // Pinterest (3)
  free("Pinterest", "Followers", 25, "followers"),
  free("Pinterest", "Saves", 30, "saves"),
  free("Pinterest", "Views", 250, "views"),
  // SoundCloud (5)
  free("SoundCloud", "Followers", 25, "followers"),
  free("SoundCloud", "Plays", 250, "plays"),
  free("SoundCloud", "Likes", 50, "likes"),
  free("SoundCloud", "Reposts", 20, "reposts"),
  free("SoundCloud", "Comments", 5, "comments"),
  // Reddit (3)
  free("Reddit", "Members", 25, "members"),
  free("Reddit", "Upvotes", 25, "upvotes"),
  free("Reddit", "Comments", 5, "comments"),
  // Tumblr (3)
  free("Tumblr", "Followers", 25, "followers"),
  free("Tumblr", "Likes", 50, "likes"),
  free("Tumblr", "Reposts", 20, "reposts"),
  // Trovo (2)
  free("Trovo", "Followers", 25, "followers"),
  free("Trovo", "Live Views", 100, "views"),
  // Rumble (3)
  free("Rumble", "Subscribers", 15, "subscribers"),
  free("Rumble", "Views", 250, "views"),
  free("Rumble", "Likes", 50, "likes"),
  // Dailymotion (3)
  free("Dailymotion", "Followers", 25, "followers"),
  free("Dailymotion", "Views", 250, "views"),
  free("Dailymotion", "Likes", 50, "likes"),
  // VK (3)
  free("VK", "Followers", 25, "followers"),
  free("VK", "Likes", 50, "likes"),
  free("VK", "Views", 250, "views"),
  // Likee (3)
  free("Likee", "Followers", 25, "followers"),
  free("Likee", "Likes", 50, "likes"),
  free("Likee", "Views", 250, "views"),
  // Google (2)
  free("Google", "Reviews", 3, "reviews"),
  free("Google", "Page Reviews", 3, "reviews"),
  // Website Traffic (2)
  free("Website Traffic", "Website Traffic", 500, "visits"),
  free("Website Traffic", "Live Website Traffic", 500, "visits"),
];

export const PLATFORM_ORDER: Platform[] = [
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

export const PLATFORM_EMOJI: Record<Platform, string> = {
  Instagram: "📸",
  TikTok: "🎵",
  YouTube: "▶️",
  "X (Twitter)": "🐦",
  Facebook: "👥",
  Telegram: "✈️",
  Spotify: "🎧",
  Twitch: "🎮",
  Snapchat: "👻",
  Discord: "💬",
  Threads: "🧵",
  Kick: "🟢",
  LinkedIn: "💼",
  Pinterest: "📌",
  SoundCloud: "☁️",
  Reddit: "🤖",
  Tumblr: "📝",
  Trovo: "📺",
  Rumble: "📹",
  Dailymotion: "🎬",
  VK: "🔵",
  Likee: "❤️",
  Google: "🔍",
  "Website Traffic": "🌐",
};

export const allFreeServices: FreeCatalogService[] = FREE_SERVICE_CATALOG;

export function getFreeBySlug(slug: string): FreeCatalogService | undefined {
  return FREE_SERVICE_CATALOG.find((s) => s.slug === slug);
}

export function getFreeServicesByPlatform(
  platform: Platform,
): FreeCatalogService[] {
  return FREE_SERVICE_CATALOG.filter((s) => s.platform === platform);
}
