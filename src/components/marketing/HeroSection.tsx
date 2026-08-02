"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { HomeStats } from "@/components/marketing/HomeStats";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function HeroSection({ fullBleed = false }: { fullBleed?: boolean }) {
  const { t } = useLocale();

  return (
    <section
      className={`hero-banner relative overflow-hidden px-6 py-16 sm:px-12 sm:py-24 lg:py-28 ${
        fullBleed ? "rounded-none" : "rounded-[36px]"
      }`}
    >
      <div className="pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-[#5ac8fa]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -start-16 h-64 w-64 rounded-full bg-[#30d158]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mff-eyebrow bg-white/15 text-white/95 backdrop-blur-md">
          {t("home.heroBadge")}
        </p>

        <h1 className="mt-8 mff-heading-xl text-white">{t("home.heroTitle")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">
          {t("home.heroSubtitle")}
        </p>

        <div className="mt-10">
          <SiteSearch variant="hero" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <LocalizedLink href="/buy-followers" className="mff-btn bg-white text-[#0077ed] hover:bg-white/95">
            {t("home.ctaExploreServices")}
          </LocalizedLink>
          <LocalizedLink href="/free-followers" className="mff-btn bg-[#30d158] text-white hover:bg-[#248a3d]">
            {t("home.ctaTryFree")}
          </LocalizedLink>
          <LocalizedLink href="/register" className="mff-btn-outline-light">
            {t("home.ctaSignUp")}
          </LocalizedLink>
        </div>

        <HomeStats />
      </div>
    </section>
  );
}
