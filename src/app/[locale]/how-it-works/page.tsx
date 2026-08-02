import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";
import { buildHowToSchema, createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  return createMetadata({
    title: t(locale, "meta.howItWorksTitle"),
    description: t(locale, "meta.howItWorksDescription"),
    path: "/how-it-works",
    locale,
  });
}

const stepKeys = [1, 2, 3, 4] as const;

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  const steps = stepKeys.map((n) => ({
    name: t(locale, `home.howStep${n}Title`),
    text: t(locale, `home.howStep${n}Desc`),
  }));

  return (
    <>
      <JsonLd
        id="jsonld-howto"
        data={buildHowToSchema({
          name: t(locale, "howItWorks.schemaName"),
          description: t(locale, "howItWorks.schemaDescription"),
          totalTime: t(locale, "howItWorks.totalTime"),
          steps,
        })}
      />

      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "nav.howItWorks"), path: "/how-it-works" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t(locale, "howItWorks.title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t(locale, "howItWorks.subtitle")}
        </p>
      </header>

      <ol className="mt-10 grid gap-6 sm:grid-cols-2">
        {stepKeys.map((n) => (
          <li
            key={n}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display text-lg font-bold text-white">
              {n}
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-ink-900">
              {t(locale, `home.howStep${n}Title`)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {t(locale, `home.howStep${n}Desc`)}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={localizedPath("/register", locale)}
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700"
        >
          {t(locale, "howItWorks.ctaRegister")}
        </Link>
        <Link
          href={localizedPath("/free-followers", locale)}
          className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50"
        >
          {t(locale, "howItWorks.ctaBrowseFree")}
        </Link>
        <Link
          href={localizedPath("/buy-followers", locale)}
          className="rounded-full bg-accent-600 px-6 py-3 text-sm font-bold text-white hover:bg-accent-700"
        >
          {t(locale, "howItWorks.ctaBrowsePaid")}
        </Link>
      </div>
    </>
  );
}
