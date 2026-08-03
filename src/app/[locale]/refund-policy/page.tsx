import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { refundSections } from "@/lib/i18n/page-sections";
import { t } from "@/lib/i18n/translations";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  return createMetadata({
    title: t(locale, "legal.refundTitle"),
    description: t(locale, "legal.refundDescription"),
    path: "/refund-policy",
    locale,
  });
}

const sections = refundSections;

export default async function RefundPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "legal.refundTitle"), path: "/refund-policy" },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900">
          {t(locale, "legal.refundTitle")}
        </h1>
        <p className="mt-2 text-sm text-ink-700">
          {t(locale, "legal.lastUpdated")}: {t(locale, "legal.lastUpdatedDate")}
        </p>
        <p className="mt-6 leading-relaxed text-ink-700">{t(locale, "legal.refundIntro")}</p>

        {sections.map((n) => (
          <section key={n} className="mt-8">
            <h2 className="font-display text-xl font-bold text-ink-900">
              {t(locale, `legal.refundSection${n}Title`)}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              {t(locale, `legal.refundSection${n}Body`)}
            </p>
          </section>
        ))}
      </article>
    </>
  );
}
