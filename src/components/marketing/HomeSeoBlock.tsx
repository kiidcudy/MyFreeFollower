"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function HomeSeoBlock() {
  const { t } = useLocale();

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      <div className="mff-card p-8 sm:p-10">
        <h2 className="mff-heading-md">{t("home.seoBlockTitle")}</h2>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-[#6e6e73]">
          <p>{t("home.seoParagraph1")}</p>
          <p>{t("home.seoParagraph2")}</p>
          <p>{t("home.seoParagraph3")}</p>
        </div>
      </div>

      <aside className="hero-banner relative overflow-hidden rounded-[28px] p-7 text-white shadow-glow">
        <div className="relative z-10">
          <p className="mff-eyebrow bg-white/15 text-white/90">{t("home.seoAsideLabel")}</p>
          <ul className="mt-5 space-y-4 text-sm font-medium">
            {[t("home.trustNoPassword"), t("home.trustSupport"), t("home.trustSecure"), t("home.why6Title")].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a7f37] text-[10px] text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}
