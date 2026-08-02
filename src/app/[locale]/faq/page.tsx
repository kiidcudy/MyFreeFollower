import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/translations";
import { buildFAQSchema, createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  return createMetadata({
    title: t(locale, "meta.faqTitle"),
    description: t(locale, "meta.faqDescription"),
    path: "/faq",
    locale,
  });
}

const faqSections = [
  {
    titleKey: "faq.sectionGeneral",
    keys: [1, 2, 3, 4] as const,
  },
  {
    titleKey: "faq.sectionOrders",
    keys: [5, 6, 9, 10, 11, 12] as const,
  },
  {
    titleKey: "faq.sectionAccount",
    keys: [7, 13, 14, 15] as const,
  },
  {
    titleKey: "faq.sectionSupport",
    keys: [8, 16] as const,
  },
] as const;

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  const faqs = faqSections.flatMap((section) =>
    section.keys.map((n) => ({
      question: t(locale, `faq.q${n}`),
      answer: t(locale, `faq.a${n}`),
    })),
  );

  return (
    <>
      <JsonLd id="jsonld-faq" data={buildFAQSchema(faqs)} />

      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "nav.faq"), path: "/faq" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t(locale, "faq.title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t(locale, "faq.subtitle")}
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {faqSections.map((section) => (
          <section key={section.titleKey}>
            <h2 className="font-display text-xl font-bold text-ink-900">
              {t(locale, section.titleKey)}
            </h2>
            <dl className="mt-5 space-y-4">
              {section.keys.map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
                >
                  <dt className="font-display text-lg font-bold text-ink-900">
                    {t(locale, `faq.q${n}`)}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ink-700">
                    {t(locale, `faq.a${n}`)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}
