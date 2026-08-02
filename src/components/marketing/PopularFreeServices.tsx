"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFreeBySlug, getPlatformEmoji } from "@/lib/catalog";
import { getFreeServiceTitle } from "@/lib/i18n/catalog-labels";

const POPULAR_FREE_SLUGS = [
  "free-instagram-followers",
  "free-instagram-likes",
  "free-instagram-reels-views",
  "free-tiktok-followers",
  "free-tiktok-likes",
  "free-tiktok-views",
  "free-youtube-subscribers",
  "free-youtube-views",
  "free-x-followers",
  "free-facebook-followers",
  "free-telegram-members",
  "free-spotify-followers",
] as const;

export function PopularFreeServices() {
  const { t, locale } = useLocale();
  const services = POPULAR_FREE_SLUGS.map((slug) => getFreeBySlug(slug)).filter(Boolean);

  return (
    <>
      <SectionHeader
        eyebrow={t("nav.freeServices")}
        title={t("home.popularFreeTitle")}
        subtitle={t("home.popularFreeSubtitle")}
        action={
          <LocalizedLink href="/free-followers" className="mff-link-arrow shrink-0">
            {t("home.viewAllFree")} →
          </LocalizedLink>
        }
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => {
          if (!service) return null;
          return (
            <LocalizedLink
              key={service.slug}
              href={`/free-followers/${service.slug}`}
              className="mff-card-hover group flex items-center gap-4 p-4"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#30d158]/15 to-[#86efac]/10 text-2xl">
                {getPlatformEmoji(service.platform)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1d1d1f] group-hover:text-[#248a3d]">
                  {getFreeServiceTitle(locale, service.platform, service.type)}
                </p>
                <p className="mt-1 text-xs font-medium text-[#6e6e73]">
                  {service.amount.toLocaleString()} {service.unit} ·{" "}
                  <span className="mff-badge-free">{t("catalog.tierFree")}</span>
                </p>
              </div>
            </LocalizedLink>
          );
        })}
      </div>
    </>
  );
}
