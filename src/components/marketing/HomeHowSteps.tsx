import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/translations";

const steps = [1, 2, 3, 4] as const;

export function HomeHowSteps({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  return (
    <>
      <SectionHeader title={t(locale, "home.howTitle")} light={dark} />

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
                dark ? "bg-white text-[#0066cc]" : "bg-[#0071e3] text-white"
              }`}
            >
              {step}
            </span>
            <h3
              className={`mt-4 font-display text-base font-semibold tracking-tight ${dark ? "text-white" : ""}`}
            >
              {t(locale, `home.howStep${step}Title`)}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-[#6e6e73]"}`}>
              {t(locale, `home.howStep${step}Desc`)}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
