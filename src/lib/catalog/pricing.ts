import type { PaidTier } from "./types";
import { siteConfig } from "../site";

/** Linear tier interpolation (GörevinizPara-style). */
export function priceFromTiers(amount: number, tiers: PaidTier[]): number {
  const sorted = [...tiers].sort((a, b) => a.quantity - b.quantity);
  if (sorted.length === 0 || amount <= 0) return 0;

  const first = sorted[0];
  if (amount <= first.quantity) {
    return (amount / first.quantity) * first.priceUSD;
  }

  for (let i = 0; i < sorted.length - 1; i++) {
    const low = sorted[i];
    const high = sorted[i + 1];
    if (amount >= low.quantity && amount <= high.quantity) {
      const span = high.quantity - low.quantity;
      if (span <= 0) return low.priceUSD;
      const ratio = (amount - low.quantity) / span;
      return low.priceUSD + ratio * (high.priceUSD - low.priceUSD);
    }
  }

  const last = sorted[sorted.length - 1];
  const prev = sorted[sorted.length - 2] ?? last;
  const span = last.quantity - prev.quantity;
  const slope = span > 0 ? (last.priceUSD - prev.priceUSD) / span : last.priceUSD / last.quantity;
  return last.priceUSD + slope * (amount - last.quantity);
}

/** Service shop: money reference (USD) → points at 200 pts = $1. */
export function pointsFromMoney(priceMoney: number): number {
  return Math.max(1, Math.round(priceMoney * siteConfig.servicePointToMoney));
}
