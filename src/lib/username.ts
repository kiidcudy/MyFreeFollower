export function extractUsername(url: string): string | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    if (!parts.length) return null;
    const last = parts[parts.length - 1].replace(/^@/, "");
    if (["p", "reel", "stories", "watch", "video"].includes(last)) return null;
    return last || null;
  } catch {
    return null;
  }
}
