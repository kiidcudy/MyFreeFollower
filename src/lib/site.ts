// Central site configuration — brand, SEO, points economy, and support constants.

export const siteConfig = {
  name: "MyFreeFollower",
  shortName: "MFF",
  url: "https://www.myfreefollower.com",
  company: "MyFreeFollower",
  locale: "en_US",

  /** Reference value: 100 points = 1 ₺ (display only) */
  pointToMoney: 100,
  /** Service shop: 200 points = 1 USD reference unit */
  servicePointToMoney: 200,
  /** Task reward shown/awarded = basePoints × multiplier */
  pointsMultiplier: 2,
  /** Daily login bonus — awarded once per calendar day (no multiplier) */
  dailyBonusPoints: 200,
  /** Referral commission on invitee earnings (0.10 = 10%) */
  referralCommissionRate: 0.1,

  /** Convert scraped EUR prices to USD for catalog reference */
  eurToUsdRate: 1.08,
  /** Applied to all catalog EUR base prices before USD conversion */
  priceMarkup: 1.02,

  slogan: "Free Followers. Real Growth.",
  tagline: "Free Social Media Growth — Instagram, TikTok, YouTube & More",
  description:
    "Get free Instagram, TikTok, and YouTube followers, likes, and views. Buy cheap SMM packages with secure checkout — no password required, 24/7 support.",
  keywords: [
    "free followers",
    "free instagram followers",
    "free tiktok likes",
    "free tiktok views",
    "buy followers cheap",
    "buy instagram followers",
    "free social media growth",
    "smm panel",
    "free youtube subscribers",
  ],
  email: "support@myfreefollower.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447544368792",
  whatsappDisplay: "+44 7544 368792",
  telegramHandle: "buycheapfollowerr",
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  tawkPropertyId:
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "6a6f3ea98cda6f1d4902347a",
  tawkWidgetId: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "1jv18phrn",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  paymentMethods: [
    "Cryptomus",
    "Binance Pay",
    "PayPal",
    "Skrill",
    "Revolut",
    "Credit Card",
    "Bank Transfer",
    "Payoneer",
  ],
  social: {
    instagram: "https://instagram.com/myfreefollower",
    twitter: "https://twitter.com/myfreefollower",
    telegram: "https://t.me/buycheapfollowerr",
    youtube: "https://youtube.com/@myfreefollower",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Withdrawal conversion: points → fiat (₺ at 100:1). */
export function moneyFromPoints(points: number): number {
  return points / siteConfig.pointToMoney;
}

/** Service shop: reference money → points (200:1). */
export function servicePointsFromMoney(priceMoney: number): number {
  return Math.max(1, Math.round(priceMoney * siteConfig.servicePointToMoney));
}

/** Task base points with display/award multiplier applied. */
export function effectivePoints(base: number): number {
  return base * siteConfig.pointsMultiplier;
}

/** EUR → USD using configured rate */
export function eurToUsd(eur: number): number {
  return Math.round(eur * siteConfig.eurToUsdRate * 100) / 100;
}

/** @deprecated Use moneyFromPoints */
export const pointsToUSD = moneyFromPoints;

/** @deprecated Use servicePointsFromMoney */
export const priceUsdToPoints = servicePointsFromMoney;

/** @deprecated Use moneyFromPoints */
export const servicePointsToUSD = (points: number) =>
  points / siteConfig.servicePointToMoney;

export function formatMoney(value: number, currency = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/** @deprecated Use formatMoney for withdrawal display */
export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatPoints(points: number): string {
  return new Intl.NumberFormat("en-US").format(points);
}

export function referralCommissionPercent(): number {
  return Math.round(siteConfig.referralCommissionRate * 100);
}

export function whatsappLink(message?: string): string {
  const text = message ?? "Hello, I need support with MyFreeFollower.";
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telegramLink(): string {
  return `https://t.me/${siteConfig.telegramHandle}`;
}
