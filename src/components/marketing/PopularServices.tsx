import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPaidBySlug, getPlatformEmoji } from "@/lib/catalog";
import { getBuyServiceTitle } from "@/lib/i18n/catalog-labels";
import { formatPrice } from "@/lib/i18n/currency";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";

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

export function PopularServices({ locale }: { locale: Locale }) {
  const services = POPULAR_SLUGS.map((slug) => getPaidBySlug(slug)).filter(Boolean);

  return (
    <>
      <SectionHeader
        eyebrow={t(locale, "nav.services")}
        title={t(locale, "home.popularTitle")}
        subtitle={t(locale, "home.popularSubtitle")}
        action={
          <Link
            prefetch={false}
            href={localizedPath("/buy-followers", locale)}
            className="mff-link-arrow shrink-0"
          >
            {t(locale, "home.viewAllServices")} →
          </Link>
        }
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => {
          if (!service) return null;
          const start = service.tiers[0];
          return (
            <Link
              key={service.slug}
              prefetch={false}
              href={localizedPath(`/buy-followers/${service.slug}`, locale)}
              className="mff-card-hover group flex items-center gap-4 p-4"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#0077ed]/15 to-[#5ac8fa]/10 text-2xl">
                {getPlatformEmoji(service.platform)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0066cc]">
                  {getBuyServiceTitle(locale, service.platform, service.type)}
                </p>
                {start && (
                  <p className="mt-1 text-xs font-medium text-[#6e6e73]">
                    {t(locale, "common.from")}{" "}
                    <span className="font-semibold text-[#0066cc]">
                      {formatPrice(locale, start.priceUSD)}
                    </span>
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
