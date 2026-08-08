import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";

export function HomeSplitCta({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Link
        prefetch={false}
        href={localizedPath("/free-followers", locale)}
        className="group relative overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-8 backdrop-blur-md transition hover:bg-white/15"
      >
        <div className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 rounded-full bg-[#30d158]/30 blur-2xl" />
        <p className="mff-eyebrow bg-[#30d158]/20 text-[#86efac]">{t(locale, "nav.freeServices")}</p>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">
          {t(locale, "home.splitFreeTitle")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{t(locale, "home.splitFreeDesc")}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#86efac] transition group-hover:gap-2">
          {t(locale, "home.ctaTryFree")} →
        </span>
      </Link>

      <Link
        prefetch={false}
        href={localizedPath("/buy-followers", locale)}
        className="group relative overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-8 backdrop-blur-md transition hover:bg-white/15"
      >
        <div className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 rounded-full bg-[#5ac8fa]/30 blur-2xl" />
        <p className="mff-eyebrow bg-white/15 text-white/90">{t(locale, "nav.services")}</p>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">
          {t(locale, "home.splitPaidTitle")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{t(locale, "home.splitPaidDesc")}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white transition group-hover:gap-2">
          {t(locale, "home.ctaExploreServices")} →
        </span>
      </Link>
    </div>
  );
}
