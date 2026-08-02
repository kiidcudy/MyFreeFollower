// Central site configuration — brand, SEO, points economy, and support constants.

export const siteConfig = {
  name: "MyFreeFollower",
  shortName: "MFF",
  url: "https://www.myfreefollower.com",
  company: "MyFreeFollower",
  locale: "en_US",
  /** Withdrawal: 100 points = $1 USD */
  pointToUSD: 100,
  /** Service shop: 200 points = $1 USD */
  servicePointToUSD: 200,
  /** Task points shown to users = basePoints * multiplier */
  pointsMultiplier: 2,
  minWithdrawPoints: 20000,
  /** Convert scraped EUR prices to USD */
  eurToUsdRate: 1.08,
  /** Applied to all catalog EUR base prices before USD conversion */
  priceMarkup: 1.02,
  referralCommissionPercent: 5,
  dailyLoginBonusBase: 10,
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

/** Withdrawal conversion: points → USD */
export function pointsToUSD(points: number): number {
  return points / siteConfig.pointToUSD;
}

/** Service shop conversion: points → USD */
export function servicePointsToUSD(points: number): number {
  return points / siteConfig.servicePointToUSD;
}

/** Task base points with display multiplier applied */
export function effectivePoints(base: number): number {
  return base * siteConfig.pointsMultiplier;
}

/** EUR → USD using configured rate */
export function eurToUsd(eur: number): number {
  return Math.round(eur * siteConfig.eurToUsdRate * 100) / 100;
}

/** USD price → service shop points (200 pts = $1) */
export function priceUsdToPoints(priceUsd: number): number {
  return Math.max(1, Math.round(priceUsd * siteConfig.servicePointToUSD));
}

export function whatsappLink(message?: string): string {
  const text =
    message ?? "Hello, I need support with MyFreeFollower.";
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telegramLink(): string {
  return `https://t.me/${siteConfig.telegramHandle}`;
}

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
