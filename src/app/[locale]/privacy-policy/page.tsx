import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { privacySections } from "@/lib/i18n/page-sections";
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
    title: t(locale, "meta.privacyTitle"),
    description: t(locale, "meta.privacyDescription"),
    path: "/privacy-policy",
    locale,
  });
}

const privacySectionsList = privacySections;

export default async function PrivacyPolicyPage({
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
          { label: t(locale, "legal.privacyTitle"), path: "/privacy-policy" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t(locale, "legal.privacyTitle")}
        </h1>
        <p className="mt-2 text-sm text-ink-700">
          {t(locale, "legal.lastUpdated")}: {t(locale, "legal.lastUpdatedDate")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t(locale, "legal.privacyIntro")}
        </p>
      </header>

      <div className="prose prose-slate mt-10 max-w-3xl">
        {privacySectionsList.map((n) => (
          <section key={n} className="mt-8">
            <h2 className="font-display text-xl font-bold text-ink-900">
              {t(locale, `legal.privacySection${n}Title`)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {t(locale, `legal.privacySection${n}Body`)}
            </p>
          </section>
        ))}
      </div>
    </>
  );
}
