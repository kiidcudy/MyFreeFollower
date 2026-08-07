import type { PaidTier } from "./types";
import { siteConfig } from "../site";

/** Minimum EUR at 1,000 units — lower tiers scale proportionally; higher tiers keep volume discounts. */
export const MIN_EUR_PER_1000 = 0.55;

/** Same volume curve as buycheapfollower.com */
export function volumeDiscountFactor(qty: number): number {
  const decades = Math.log10(Math.max(qty, 1)) - 3;
  const f = 1 - 0.12 * decades;
  return Math.min(1.15, Math.max(0.78, f));
}

export function priceScaleAt1000(rawEurAt1000: number): number {
  if (rawEurAt1000 <= 0) return 1;
  return rawEurAt1000 < MIN_EUR_PER_1000 ? MIN_EUR_PER_1000 / rawEurAt1000 : 1;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

/** Apply 1k-anchor floor to preset tiers (scales whole curve when 1k tier is below minimum). */
export function applyTierPriceFloor(tiers: PaidTier[]): PaidTier[] {
  const tier1000 = tiers.find((t) => t.quantity === 1000);
  const rawAt1000 = tier1000?.priceEUR ?? 0;
  const scale = priceScaleAt1000(rawAt1000);
  if (scale === 1) return tiers;

  let prevEur = 0;
  return tiers.map((tier) => {
    let priceEUR = round2(tier.priceEUR * scale);
    if (priceEUR <= prevEur) priceEUR = round2(prevEur + 0.01);
    prevEur = priceEUR;
    const priceUSD = round2(priceEUR * siteConfig.eurToUsdRate);
    return {
      ...tier,
      priceEUR,
      priceUSD,
      points: Math.max(1, Math.round(priceUSD * siteConfig.servicePointToMoney)),
    };
  });
}

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
