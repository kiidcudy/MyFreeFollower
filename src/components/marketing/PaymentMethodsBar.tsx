"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/lib/site";

export function PaymentMethodsBar({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();

  if (compact) {
    return (
      <>
        <div className="flex flex-wrap gap-2">
          {siteConfig.paymentMethods.map((method) => (
            <span
              key={method}
              className="rounded-full bg-black/[0.04] px-3.5 py-1.5 text-xs font-semibold text-[#1d1d1f]"
            >
              {method}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[#86868b]">{t("payments.note")}</p>
      </>
    );
  }

  return (
    <div className="mff-card p-8 sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="mff-heading-md">{t("payments.title")}</h2>
          <p className="mt-3 mff-subtitle">{t("payments.description")}</p>
        </div>
        <span className="mff-badge-paid shrink-0 px-3 py-1">{t("payments.secureBadge")}</span>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {siteConfig.paymentMethods.map((method) => (
          <span
            key={method}
            className="rounded-2xl bg-[#f5f5f7] px-2 py-3.5 text-center text-[11px] font-semibold leading-tight text-[#1d1d1f] transition hover:bg-[#0077ed]/10 hover:text-[#0077ed]"
          >
            {method}
          </span>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-[#86868b]">{t("payments.note")}</p>
    </div>
  );
}
