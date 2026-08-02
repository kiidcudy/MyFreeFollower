"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import {
  computeFreePointsCost,
  getPlatformEmoji,
  isFreeService,
  isPaidService,
  type CatalogService,
} from "@/lib/catalog";
import { getServiceDisplayTitle } from "@/lib/i18n/catalog-labels";
import { formatPoints, formatUSD } from "@/lib/site";

export function ServiceCard({ service }: { service: CatalogService }) {
  const { t, locale } = useLocale();
  const { user, ready } = useAuth();
  const emoji = getPlatformEmoji(service.platform);
  const hub = isFreeService(service) ? "/free-followers" : "/buy-followers";
  const href = `${hub}/${service.slug}`;
  const title = getServiceDisplayTitle(locale, service);
  const badge = isFreeService(service) ? t("catalog.tierFree") : t("catalog.tierPaid");

  let subtitle = "";
  if (isFreeService(service)) {
    subtitle = ready && user
      ? `${service.amount.toLocaleString()} ${service.unit} · ${formatPoints(computeFreePointsCost(service))} ${t("common.points")}`
      : `${service.amount.toLocaleString()} ${service.unit} · ${t("catalog.signUpToClaim")}`;
  } else if (isPaidService(service)) {
    const start = service.tiers[0];
    subtitle = start
      ? `${t("common.from")} ${formatUSD(start.priceUSD)} · ${service.delivery}`
      : service.delivery;
  }

  return (
    <LocalizedLink href={href} className="mff-card-hover group flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-shimmer text-2xl">
          {emoji}
        </span>
        <span className={isFreeService(service) ? "mff-badge-free" : "mff-badge-paid"}>{badge}</span>
      </div>
      <h3 className="mt-4 font-display text-base font-semibold tracking-tight group-hover:text-[#0077ed]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[#6e6e73]">{subtitle}</p>
      <span className="mff-link-arrow mt-5">
        {isFreeService(service) ? t("catalog.claimFree") : t("catalog.buyNow")} →
      </span>
    </LocalizedLink>
  );
}
