import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceOrderForm } from "@/components/catalog/ServiceOrderForm";
import { RelatedServices } from "@/components/catalog/RelatedServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import {
  allPaidServices,
  getPaidBySlug,
  getPlatformEmoji,
  getSmallestTierUnitPriceUSD,
} from "@/lib/catalog";
import {
  getLocalizedSeoContent,
  serviceCanonicalPath,
} from "@/lib/catalog/seo-content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getBuyServiceTitle } from "@/lib/i18n/catalog-labels";
import { t } from "@/lib/i18n/translations";
import { formatUSD } from "@/lib/site";
import {
  buildFAQSchema,
  buildProductSchema,
  createMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allPaidServices.map((service) => ({
      locale,
      slug: service.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;
  const service = getPaidBySlug(slug);
  if (!service) return {};

  const seo = getLocalizedSeoContent(locale, service);

  return createMetadata({
    title: seo.metaTitle,
    description: seo.description,
    path: `/buy-followers/${slug}`,
    locale,
    keywords: [seo.focusKeyword, service.platform, service.type],
    absoluteTitle: true,
  });
}

export default async function PaidServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;
  const service = getPaidBySlug(slug);
  if (!service) notFound();

  const seo = getLocalizedSeoContent(locale, service);
  const title = getBuyServiceTitle(locale, service.platform, service.type);
  const canonicalPath = serviceCanonicalPath(service, locale);
  const startTier = service.tiers[0];
  const startPrice = startTier?.priceUSD ?? getSmallestTierUnitPriceUSD(service) * 100;

  return (
    <>
      <JsonLd
        id="jsonld-paid-service"
        data={[
          buildProductSchema({
            name: title,
            description: seo.description,
            priceUsd: startPrice,
            path: canonicalPath,
            slug: service.slug,
            tier: "paid",
          }),
          buildFAQSchema(seo.faq),
        ]}
      />

      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "nav.buyFollowers"), path: "/buy-followers" },
          { label: title, path: `/buy-followers/${slug}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <article>
          <div className="flex items-start gap-4">
            <span className="text-4xl" aria-hidden>
              {getPlatformEmoji(service.platform)}
            </span>
            <div>
              <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-700">
                {t(locale, "catalog.tierPaid")}
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-ink-700">
                {t(locale, "common.from")} {formatUSD(startPrice)} ·{" "}
                {t(locale, "catalog.delivery")}: {service.delivery}
              </p>
            </div>
          </div>

          <p className="mt-6 text-base leading-relaxed text-ink-800">{seo.intro}</p>

          <div className="prose prose-slate mt-8 max-w-none">
            {seo.sections.map((section) => (
              <section key={section.heading} className="mt-8">
                <h2 className="font-display text-xl font-bold text-ink-900">
                  {section.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-ink-900">
              {t(locale, "catalog.faqTitle")}
            </h2>
            <dl className="mt-6 space-y-4">
              {seo.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <dt className="font-semibold text-ink-900">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-700">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ServiceOrderForm service={service} />
        </aside>
      </div>

      <RelatedServices slug={slug} />
    </>
  );
}
