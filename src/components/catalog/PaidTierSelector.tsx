"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { formatPrice } from "@/lib/i18n/currency";
import { formatPoints } from "@/lib/site";
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
  const { t, locale } = useLocale();

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-[#1d1d1f]">{t("catalog.selectTier")}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {tiers.map((tier) => {
          const active = selected?.quantity === tier.quantity;
          return (
            <button
              key={tier.quantity}
              type="button"
              onClick={() => onSelect(tier)}
              className={`rounded-[20px] border px-4 py-3.5 text-start transition ${
                active
                  ? "border-[#0077ed] bg-[#0077ed]/10 ring-2 ring-[#0077ed]/20"
                  : "border-black/[0.08] bg-white hover:border-[#0077ed]/30"
              }`}
            >
              <span className="block font-display text-base font-semibold tracking-tight">
                {tier.quantity.toLocaleString()} {unit}
              </span>
              <span className="mt-1 block text-sm text-[#6e6e73]">
                {formatPrice(locale, tier.priceUSD)} · {formatPoints(tier.points)} {t("common.points")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
