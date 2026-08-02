"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPaidBySlug, getPlatformEmoji } from "@/lib/catalog";
import { getBuyServiceTitle } from "@/lib/i18n/catalog-labels";
import { formatPrice } from "@/lib/i18n/currency";

const POPULAR_SLUGS = [
  "buy-instagram-followers",
  "buy-instagram-likes",
  "buy-instagram-reels-views",
  "buy-tiktok-followers",
  "buy-tiktok-likes",
  "buy-tiktok-views",
  "buy-youtube-subscribers",
  "buy-youtube-views",
  "buy-x-followers",
  "buy-facebook-followers",
  "buy-telegram-members",
  "buy-telegram-post-views",
] as const;

export function PopularServices() {
  const { t, locale } = useLocale();
  const services = POPULAR_SLUGS.map((slug) => getPaidBySlug(slug)).filter(Boolean);

  return (
    <>
      <SectionHeader
        eyebrow={t("nav.services")}
        title={t("home.popularTitle")}
        subtitle={t("home.popularSubtitle")}
        action={
          <LocalizedLink href="/buy-followers" className="mff-link-arrow shrink-0">
            {t("home.viewAllServices")} →
          </LocalizedLink>
        }
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => {
          if (!service) return null;
          const start = service.tiers[0];
          return (
            <LocalizedLink
              key={service.slug}
              href={`/buy-followers/${service.slug}`}
              className="mff-card-hover group flex items-center gap-4 p-4"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#0077ed]/15 to-[#5ac8fa]/10 text-2xl">
                {getPlatformEmoji(service.platform)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0077ed]">
                  {getBuyServiceTitle(locale, service.platform, service.type)}
                </p>
                {start && (
                  <p className="mt-1 text-xs font-medium text-[#6e6e73]">
                    {t("common.from")}{" "}
                    <span className="font-semibold text-[#0077ed]">{formatPrice(locale, start.priceUSD)}</span>
                  </p>
                )}
              </div>
            </LocalizedLink>
          );
        })}
      </div>
    </>
  );
}
