import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPlatformEmoji } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";

const FEATURED_PLATFORMS = [
  {
    platform: "Instagram",
    descKey: "home.featuredInstagramDesc",
    freeSlug: "free-instagram-followers",
    paidSlug: "buy-instagram-followers",
    gradient: "from-[#f09433]/20 via-[#e6683c]/10 to-[#bc1888]/15",
  },
  {
    platform: "TikTok",
    descKey: "home.featuredTiktokDesc",
    freeSlug: "free-tiktok-followers",
    paidSlug: "buy-tiktok-followers",
    gradient: "from-[#1d1d1f]/10 via-[#2c2c2e]/5 to-white",
  },
  {
    platform: "YouTube",
    descKey: "home.featuredYoutubeDesc",
    freeSlug: "free-youtube-subscribers",
    paidSlug: "buy-youtube-subscribers",
    gradient: "from-[#ff0000]/10 via-[#cc0000]/5 to-white",
  },
  {
    platform: "X (Twitter)",
    descKey: "home.featuredXDesc",
    freeSlug: "free-x-followers",
    paidSlug: "buy-x-followers",
    gradient: "from-[#1d9bf0]/15 to-white",
  },
  {
    platform: "Facebook",
    descKey: "home.featuredFacebookDesc",
    freeSlug: "free-facebook-followers",
    paidSlug: "buy-facebook-followers",
    gradient: "from-[#1877f2]/12 to-white",
  },
  {
    platform: "Telegram",
    descKey: "home.featuredTelegramDesc",
    freeSlug: "free-telegram-members",
    paidSlug: "buy-telegram-members",
    gradient: "from-[#0088cc]/12 to-white",
  },
] as const;

export function HomeFeaturedPlatforms({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionHeader
        title={t(locale, "home.featuredTitle")}
        subtitle={t(locale, "home.featuredSubtitle")}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PLATFORMS.map((item) => (
          <article
            key={item.platform}
            className={`mff-card-hover flex flex-col bg-gradient-to-br ${item.gradient} p-6`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white text-2xl shadow-inner-soft">
                {getPlatformEmoji(item.platform)}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">{item.platform}</h3>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-[#6e6e73]">
              {t(locale, item.descKey)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                prefetch={false}
                href={localizedPath(`/free-followers/${item.freeSlug}`, locale)}
                className="mff-btn bg-[#1a7f37] px-4 py-2 text-xs text-white hover:bg-[#166534]"
              >
                {t(locale, "home.featuredFreeLabel")}
              </Link>
              <Link
                prefetch={false}
                href={localizedPath(`/buy-followers/${item.paidSlug}`, locale)}
                className="mff-btn-ghost px-4 py-2 text-xs"
              >
                {t(locale, "home.featuredBuyLabel")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
