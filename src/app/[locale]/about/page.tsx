import type { Metadata } from "next";
import Link from "next/link";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { aboutSections } from "@/lib/i18n/page-sections";
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
    title: t(locale, "meta.aboutTitle"),
    description: t(locale, "meta.aboutDescription"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage({
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
          { label: t(locale, "nav.about"), path: "/about" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t(locale, "about.title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t(locale, "about.subtitle")}
        </p>
      </header>

      <div className="mt-10 max-w-3xl space-y-10">
        {aboutSections.map((section) => (
          <section key={section.titleKey}>
            <h2 className="font-display text-xl font-bold text-ink-900">
              {t(locale, section.titleKey)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {t(locale, section.bodyKey)}
            </p>
          </section>
        ))}

        <section className="rounded-2xl bg-brand-gradient px-6 py-8 text-white">
          <h2 className="font-display text-2xl font-bold">{t(locale, "about.ctaTitle")}</h2>
          <p className="mt-3 text-sm text-white/90">{t(locale, "about.ctaBody")}</p>
          <Link
            href={localizedPath("/register", locale)}
            className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 hover:bg-brand-50"
          >
            {t(locale, "about.ctaButton")}
          </Link>
        </section>
      </div>
    </>
  );
}
