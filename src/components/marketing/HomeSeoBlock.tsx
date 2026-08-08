import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/translations";

export function HomeSeoBlock({ locale }: { locale: Locale }) {
  const asideItems = [
    t(locale, "home.trustNoPassword"),
    t(locale, "home.trustSupport"),
    t(locale, "home.trustSecure"),
    t(locale, "home.why6Title"),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      <div className="mff-card p-8 sm:p-10">
        <h2 className="mff-heading-md">{t(locale, "home.seoBlockTitle")}</h2>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-[#6e6e73]">
          <p>{t(locale, "home.seoParagraph1")}</p>
          <p>{t(locale, "home.seoParagraph2")}</p>
          <p>{t(locale, "home.seoParagraph3")}</p>
        </div>
      </div>

      <aside className="hero-banner relative overflow-hidden rounded-[28px] p-7 text-white shadow-glow">
        <div className="relative z-10">
          <p className="mff-eyebrow bg-white/15 text-white/90">{t(locale, "home.seoAsideLabel")}</p>
          <ul className="mt-5 space-y-4 text-sm font-medium">
            {asideItems.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a7f37] text-[10px] text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
