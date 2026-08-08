import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";

export function CtaSection({ locale }: { locale: Locale }) {
  return (
    <section className="hero-banner relative overflow-hidden rounded-[36px] px-6 py-16 text-center sm:px-12 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(90,200,250,0.35),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="mff-heading-lg text-white">{t(locale, "home.ctaFinalTitle")}</h2>
        <p className="mx-auto mt-5 text-base leading-relaxed text-white/80">
          {t(locale, "home.ctaFinalDesc")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            prefetch={false}
            href={localizedPath("/free-followers", locale)}
            className="mff-btn bg-white text-[#0066cc] hover:bg-white/95"
          >
            {t(locale, "home.ctaTryFree")}
          </Link>
          <Link
            prefetch={false}
            href={localizedPath("/register", locale)}
            className="mff-btn bg-[#1a7f37] text-white hover:bg-[#166534]"
          >
            {t(locale, "home.ctaSignUp")}
          </Link>
          <Link
            prefetch={false}
            href={localizedPath("/buy-followers", locale)}
            className="mff-btn-outline-light"
          >
            {t(locale, "home.ctaExploreServices")}
          </Link>
        </div>
      </div>
    </section>
  );
}
