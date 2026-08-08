import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFreeBySlug, getPlatformEmoji } from "@/lib/catalog";
import { getFreeServiceTitle } from "@/lib/i18n/catalog-labels";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";

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

export function PopularFreeServices({ locale }: { locale: Locale }) {
  const services = POPULAR_FREE_SLUGS.map((slug) => getFreeBySlug(slug)).filter(Boolean);

  return (
    <>
      <SectionHeader
        eyebrow={t(locale, "nav.freeServices")}
        title={t(locale, "home.popularFreeTitle")}
        subtitle={t(locale, "home.popularFreeSubtitle")}
        action={
          <Link
            prefetch={false}
            href={localizedPath("/free-followers", locale)}
            className="mff-link-arrow shrink-0"
          >
            {t(locale, "home.viewAllFree")} →
          </Link>
        }
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => {
          if (!service) return null;
          return (
            <Link
              key={service.slug}
              prefetch={false}
              href={localizedPath(`/free-followers/${service.slug}`, locale)}
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
                  <span className="mff-badge-free">{t(locale, "catalog.tierFree")}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
