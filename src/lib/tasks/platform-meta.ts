export const taskGuidelines = [
  "Your account must have a profile photo and bio before completing tasks.",
  "Keep actions for at least 7 days. Unfollowing early may remove your task points.",
];

export const platformMeta: Record<string, { color: string; bg: string; emoji: string }> = {
  Instagram: { color: "#E1306C", bg: "#FCE7F0", emoji: "📸" },
  TikTok: { color: "#010101", bg: "#E7E7E7", emoji: "🎵" },
  Twitter: { color: "#1DA1F2", bg: "#E5F4FD", emoji: "🐦" },
  "X (Twitter)": { color: "#1DA1F2", bg: "#E5F4FD", emoji: "🐦" },
  Facebook: { color: "#1877F2", bg: "#E7F0FE", emoji: "👍" },
  YouTube: { color: "#FF0000", bg: "#FDE7E7", emoji: "▶️" },
  Threads: { color: "#000000", bg: "#ECECEC", emoji: "🧵" },
  Google: { color: "#4285F4", bg: "#E8F0FE", emoji: "🔍" },
  Other: { color: "#248a3d", bg: "#ECFDF7", emoji: "⭐" },
};

export const typeMeta: Record<string, { emoji: string }> = {
  Follow: { emoji: "👥" },
  Like: { emoji: "❤️" },
  Comment: { emoji: "💬" },
  "Video Watch": { emoji: "👁️" },
  Share: { emoji: "🔁" },
  Survey: { emoji: "🗳️" },
  "App Install": { emoji: "📱" },
  Takip: { emoji: "👥" },
  Beğeni: { emoji: "❤️" },
  Yorum: { emoji: "💬" },
  İzlenme: { emoji: "👁️" },
  Repost: { emoji: "🔁" },
  "Arkadaşına Gönder": { emoji: "📩" },
};

export function getPlatformMeta(p: string) {
  return platformMeta[p] ?? { color: "#248a3d", bg: "#ECFDF7", emoji: "⭐" };
}

export function getTypeMeta(t: string) {
  return typeMeta[t] ?? { emoji: "⭐" };
}

export const PLATFORM_FILTERS = [
  "All",
  "Instagram",
  "TikTok",
  "Twitter",
  "Facebook",
  "YouTube",
  "Threads",
] as const;
