import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/translations";

const items = [
  { titleKey: "home.guarantee1Title", descKey: "home.guarantee1Desc", icon: "↻" },
  { titleKey: "home.guarantee2Title", descKey: "home.guarantee2Desc", icon: "💬" },
  { titleKey: "home.guarantee3Title", descKey: "home.guarantee3Desc", icon: "🔒" },
  { titleKey: "home.guarantee4Title", descKey: "home.guarantee4Desc", icon: "⚡" },
] as const;

export function HomeGuaranteeBand({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionHeader
        title={t(locale, "home.guaranteeTitle")}
        subtitle={t(locale, "home.guaranteeSubtitle")}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.titleKey} className="mff-card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0077ed]/10 text-lg text-[#0066cc]">
              {item.icon}
            </span>
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
              {t(locale, item.titleKey)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{t(locale, item.descKey)}</p>
          </div>
        ))}
      </div>
    </>
  );
}
