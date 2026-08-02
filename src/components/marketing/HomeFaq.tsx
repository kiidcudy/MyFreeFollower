"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFAQSchema, type FaqItem } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/navigation";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function HomeFaq() {
  const { t, locale } = useLocale();

  const faq: FaqItem[] = FAQ_KEYS.map((n) => ({
    question: t(`home.faqQ${n}`),
    answer: t(`home.faqA${n}`),
  }));

  return (
    <>
      <JsonLd data={buildFAQSchema(faq)} />
      <SectionHeader title={t("home.faqTitle")} subtitle={t("home.faqSubtitle")} />

      <dl className="mt-12 grid gap-3 lg:grid-cols-2">
        {faq.map((item) => (
          <div key={item.question} className="mff-card p-6 transition hover:shadow-soft">
            <dt className="font-display text-base font-semibold tracking-tight">{item.question}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-[#6e6e73]">{item.answer}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-center">
        <Link href={localizedPath("/faq", locale)} className="mff-btn-primary">
          {t("home.viewAllFaq")} →
        </Link>
      </p>
    </>
  );
}
