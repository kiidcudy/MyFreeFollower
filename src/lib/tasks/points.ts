import { effectivePoints } from "@/lib/site";

/** Default base task points by type (before ×2 multiplier). */
export const basePointsByType: Record<string, number> = {
  Like: 22,
  Follow: 32,
  Comment: 40,
  View: 24,
  Views: 24,
  Subscribe: 37,
  Subscribers: 37,
  Share: 24,
  Save: 24,
  Saves: 24,
  Repost: 28,
  Reposts: 28,
  Reshare: 28,
  Retweet: 28,
  "Send to Friend": 30,
  "Story View": 22,
  "Story Views": 22,
  "Poll Vote": 24,
  "Special Comment": 40,
  "Male Comment": 38,
  "Emoji Comment": 40,
  "Explore Pack": 55,
  "Comment+Like+Save": 55,
  "Video Watch": 24,
  "App Install": 45,
  Survey: 50,
  "Share Post": 28,
  Followers: 32,
  Members: 32,
  "Page Likes": 22,
  "Post Likes": 22,
  "Video Views": 24,
  "Channel Views": 24,
  "Live Views": 24,
  Plays: 24,
  "Monthly Listeners": 37,
  Upvotes: 28,
  Reactions: 28,
  "Profile Visits": 24,
  "Auto Likes": 22,
  "Auto Views": 24,
  Reviews: 40,
  "Page Reviews": 40,
  "Website Traffic": 24,
  "Live Website Traffic": 24,
  "Online Members": 32,
};

/** Platform + type overrides (base points). */
const platformTypeOverrides: Record<string, Record<string, number>> = {
  "X (Twitter)": { Follow: 57, Followers: 57 },
  Facebook: { Follow: 35, Followers: 35 },
};

/** Admin task platform → allowed types. */
export const ADMIN_TASK_PLATFORMS: Record<string, string[]> = {
  Instagram: [
    "Follow",
    "Like",
    "Comment",
    "View",
    "Save",
    "Repost",
    "Send to Friend",
    "Story View",
  ],
  TikTok: ["Follow", "Like", "Comment", "View", "Reshare", "Save", "Send to Friend"],
  "X (Twitter)": ["Follow", "Like", "Comment", "View", "Retweet", "Send to Friend"],
  YouTube: ["Subscribe", "Like", "Comment", "View"],
  Facebook: ["Follow", "Like", "Comment", "View", "Share", "Save"],
  Threads: ["Follow", "Like", "Comment", "View", "Repost"],
};

export const ADMIN_PLATFORM_OPTIONS = [
  ...Object.keys(ADMIN_TASK_PLATFORMS),
  "Other",
];

const TYPE_ALIASES: Record<string, string> = {
  Followers: "Follow",
  Subscribers: "Subscribe",
  Reposts: "Repost",
  Shares: "Share",
  Retweet: "Retweet",
  Reshare: "Repost",
};

function normalizeType(type: string): string {
  return TYPE_ALIASES[type] ?? type;
}

export function resolveTaskBasePoints(type: string, platform?: string): number {
  const normalized = normalizeType(type);
  if (platform) {
    const byPlatform = platformTypeOverrides[platform];
    if (byPlatform?.[type] !== undefined) return byPlatform[type];
    if (byPlatform?.[normalized] !== undefined) return byPlatform[normalized];
  }
  if (basePointsByType[type] !== undefined) return basePointsByType[type];
  if (basePointsByType[normalized] !== undefined) return basePointsByType[normalized];
  return 25;
}

export function userTaskPoints(base: number): number {
  return effectivePoints(base);
}

export function defaultTaskTitle(platform: string, type: string): string {
  return `${platform} ${type}`;
}

export const DEFAULT_TASK_INSTRUCTIONS =
  "Complete the task on the platform, then upload a clear screenshot or screen recording as proof.";
