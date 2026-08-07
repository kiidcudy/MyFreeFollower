"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function CtaSection() {
  const { t } = useLocale();

  return (
    <section className="hero-banner relative overflow-hidden rounded-[36px] px-6 py-16 text-center sm:px-12 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(90,200,250,0.35),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="mff-heading-lg text-white">{t("home.ctaFinalTitle")}</h2>
        <p className="mx-auto mt-5 text-base leading-relaxed text-white/80">{t("home.ctaFinalDesc")}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <LocalizedLink href="/free-followers" className="mff-btn bg-white text-[#0066cc] hover:bg-white/95">
            {t("home.ctaTryFree")}
          </LocalizedLink>
          <LocalizedLink href="/register" className="mff-btn bg-[#1a7f37] text-white hover:bg-[#166534]">
            {t("home.ctaSignUp")}
          </LocalizedLink>
          <LocalizedLink href="/buy-followers" className="mff-btn-outline-light">
            {t("home.ctaExploreServices")}
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
}
