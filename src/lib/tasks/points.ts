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
  Retweet: 28,
  "Story View": 22,
  "Story Views": 22,
  "Poll Vote": 24,
  "Special Comment": 40,
  "Explore Pack": 55,
  "Comment+Like+Save": 55,
  "Video Watch": 24,
  "App Install": 45,
  Survey: 50,
  "Share Post": 28,
};

/** Platform-specific overrides for base points. */
const platformOverrides: Record<string, Record<string, number>> = {
  "X (Twitter)": { Follow: 57, Followers: 57 },
  Facebook: { Follow: 35, Followers: 35 },
};

export function resolveTaskBasePoints(type: string, platform?: string): number {
  if (platform) {
    const override = platformOverrides[platform]?.[type];
    if (override !== undefined) return override;
  }
  return basePointsByType[type] ?? 24;
}
