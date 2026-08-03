/**
 * Localized catalog unit and delivery labels.
 * Run `npm run translate` to refresh all locales from scripts/sources/catalog-strings-en.json.
 */
import type { Locale } from "@/lib/i18n/config";

const EN_UNITS: Record<string, string> = {
  followers: "followers",
  likes: "likes",
  views: "views",
  comments: "comments",
  shares: "shares",
  saves: "saves",
  members: "members",
  plays: "plays",
  reposts: "reposts",
  upvotes: "upvotes",
  reactions: "reactions",
  reviews: "reviews",
  visits: "visits",
  subscribers: "subscribers",
  hours: "hours",
  listeners: "listeners",
};

const EN_DELIVERY: Record<string, string> = {
  "0–60 min": "0–60 min",
  Gradual: "Gradual",
  "1–3 days": "1–3 days",
  "1–24 hours": "1–24 hours",
  "2–5 days": "2–5 days",
};

const TR_UNITS: Record<string, string> = {
  followers: "takipçi",
  likes: "beğeni",
  views: "görüntülenme",
  comments: "yorum",
  shares: "paylaşım",
  saves: "kayıt",
  members: "üye",
  plays: "dinlenme",
  reposts: "repost",
  upvotes: "upvote",
  reactions: "tepki",
  reviews: "yorum",
  visits: "ziyaret",
  subscribers: "abone",
  hours: "saat",
  listeners: "dinleyici",
};

const TR_DELIVERY: Record<string, string> = {
  "0–60 min": "0–60 dk",
  Gradual: "Kademeli",
  "1–3 days": "1–3 gün",
  "1–24 hours": "1–24 saat",
  "2–5 days": "2–5 gün",
};

const LOCALE_UNITS: Partial<Record<Locale, Record<string, string>>> = {
  tr: TR_UNITS,
};

const LOCALE_DELIVERY: Partial<Record<Locale, Record<string, string>>> = {
  tr: TR_DELIVERY,
};

export function localizeUnitLabel(locale: Locale, unit: string): string {
  return LOCALE_UNITS[locale]?.[unit] ?? EN_UNITS[unit] ?? unit;
}

export function localizeDeliveryLabel(locale: Locale, delivery: string): string {
  return LOCALE_DELIVERY[locale]?.[delivery] ?? EN_DELIVERY[delivery] ?? delivery;
}
