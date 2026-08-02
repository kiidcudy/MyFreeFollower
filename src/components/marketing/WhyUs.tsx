"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";

const items = [
  { icon: "01", titleKey: "home.why1Title", descKey: "home.why1Desc", tint: "from-[#0077ed]/12" },
  { icon: "02", titleKey: "home.why2Title", descKey: "home.why2Desc", tint: "from-[#30d158]/12" },
  { icon: "03", titleKey: "home.why3Title", descKey: "home.why3Desc", tint: "from-[#bf5af2]/12" },
  { icon: "04", titleKey: "home.why4Title", descKey: "home.why4Desc", tint: "from-[#ff9f0a]/12" },
  { icon: "05", titleKey: "home.why5Title", descKey: "home.why5Desc", tint: "from-[#5ac8fa]/12" },
  { icon: "06", titleKey: "home.why6Title", descKey: "home.why6Desc", tint: "from-[#0077ed]/12" },
] as const;

export function WhyUs() {
  const { t } = useLocale();

  return (
    <>
      <SectionHeader title={t("home.whyTitle")} subtitle={t("home.whySubtitle")} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.titleKey}
            className={`mff-card bg-gradient-to-br ${item.tint} to-white p-6`}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#1d1d1f] text-[11px] font-bold text-white">
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
