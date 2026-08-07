"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";

const items = [
  { titleKey: "home.guarantee1Title", descKey: "home.guarantee1Desc", icon: "↻" },
  { titleKey: "home.guarantee2Title", descKey: "home.guarantee2Desc", icon: "💬" },
  { titleKey: "home.guarantee3Title", descKey: "home.guarantee3Desc", icon: "🔒" },
  { titleKey: "home.guarantee4Title", descKey: "home.guarantee4Desc", icon: "⚡" },
] as const;

export function HomeGuaranteeBand() {
  const { t } = useLocale();

  return (
    <>
      <SectionHeader title={t("home.guaranteeTitle")} subtitle={t("home.guaranteeSubtitle")} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.titleKey} className="mff-card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0077ed]/10 text-lg text-[#0066cc]">
              {item.icon}
            </span>
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
              {t(item.titleKey)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{t(item.descKey)}</p>
          </div>
        ))}
      </div>
    </>
  );
}
