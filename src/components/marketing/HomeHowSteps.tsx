"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [1, 2, 3, 4] as const;

export function HomeHowSteps({ dark = false }: { dark?: boolean }) {
  const { t } = useLocale();

  return (
    <>
      <SectionHeader title={t("home.howTitle")} light={dark} />

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step}
            className={`rounded-[28px] p-6 ${
              dark
                ? "border border-white/10 bg-white/[0.06] backdrop-blur-md"
                : "mff-card"
            }`}
          >
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold ${
                dark ? "bg-white text-[#0077ed]" : "bg-[#0077ed] text-white"
              }`}
            >
              {step}
            </span>
            <h3
              className={`mt-4 font-display text-base font-semibold tracking-tight ${dark ? "text-white" : ""}`}
            >
              {t(`home.howStep${step}Title`)}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-[#6e6e73]"}`}>
              {t(`home.howStep${step}Desc`)}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
