"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { formatPrice } from "@/lib/i18n/currency";
import type { PaidTier } from "@/lib/catalog";

export function PaidTierSelector({
  tiers,
  unit,
  selected,
  onSelect,
}: {
  tiers: PaidTier[];
  unit: string;
  selected: PaidTier | null;
  onSelect: (tier: PaidTier) => void;
}) {
  const { locale } = useLocale();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {tiers.map((tier) => {
        const active = selected?.quantity === tier.quantity;
        return (
          <button
            key={tier.quantity}
            type="button"
            onClick={() => onSelect(tier)}
            className={`rounded-2xl border px-3 py-3 text-center transition ${
              active
                ? "border-[#0077ed] bg-[#0077ed]/10 ring-2 ring-[#0077ed]/20"
                : "border-black/[0.08] bg-white hover:border-[#0077ed]/30"
            }`}
          >
            <span className="block font-display text-base font-semibold tracking-tight text-[#1d1d1f]">
              {tier.quantity.toLocaleString()}
            </span>
            <span className="mt-1 block text-sm font-semibold text-[#0066cc]">
              {formatPrice(locale, tier.priceUSD)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
