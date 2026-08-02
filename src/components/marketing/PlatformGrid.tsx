"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPlatformEmoji, getPlatformsWithServices } from "@/lib/catalog";
import { platformToSlug } from "@/lib/catalog/slug-utils";

export function PlatformGrid() {
  const { t } = useLocale();
  const platforms = getPlatformsWithServices();

  return (
    <>
      <SectionHeader title={t("home.platformsTitle")} subtitle={t("home.platformsSubtitle")} />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {platforms.map((platform) => (
          <LocalizedLink
            key={platform}
            href={`/free-followers/platform/${platformToSlug(platform)}`}
            className="group flex flex-col items-center rounded-[24px] border border-black/[0.05] bg-white/80 px-3 py-5 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:border-[#0077ed]/20 hover:shadow-glow"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-shimmer text-2xl transition group-hover:scale-110">
              {getPlatformEmoji(platform)}
            </span>
            <span className="mt-3 text-xs font-semibold text-[#1d1d1f] sm:text-sm">{platform}</span>
          </LocalizedLink>
        ))}
      </div>
    </>
  );
}
