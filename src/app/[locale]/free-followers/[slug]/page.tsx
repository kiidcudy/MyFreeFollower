import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceOrderForm } from "@/components/catalog/ServiceOrderForm";
import { RelatedServices } from "@/components/catalog/RelatedServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import {
  allFreeServices,
  computeFreePointsCost,
  getFreeBySlug,
  getPlatformEmoji,
} from "@/lib/catalog";
import {
  getLocalizedSeoContent,
  serviceCanonicalPath,
} from "@/lib/catalog/seo-content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getFreeServiceTitle } from "@/lib/i18n/catalog-labels";
import { t } from "@/lib/i18n/translations";
import { formatPoints } from "@/lib/site";
import {
  buildFAQSchema,
  buildProductSchema,
  createMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allFreeServices.map((service) => ({
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
  const service = getFreeBySlug(slug);
  if (!service) return {};

  const seo = getLocalizedSeoContent(locale, service);

  return createMetadata({
    title: seo.metaTitle,
    description: seo.description,
    path: `/free-followers/${slug}`,
    locale,
    keywords: [seo.focusKeyword, service.platform, service.type],
    absoluteTitle: true,
  });
}

export default async function FreeServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;
  const service = getFreeBySlug(slug);
  if (!service) notFound();

  const seo = getLocalizedSeoContent(locale, service);
  const pointsCost = computeFreePointsCost(service);
  const title = getFreeServiceTitle(locale, service.platform, service.type);
  const canonicalPath = serviceCanonicalPath(service, locale);

  return (
    <>
      <JsonLd
        id="jsonld-free-service"
        data={[
          buildProductSchema({
            name: title,
            description: seo.description,
            priceUsd: 0,
            path: canonicalPath,
            slug: service.slug,
            tier: "free",
          }),
          buildFAQSchema(seo.faq),
        ]}
      />

      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "nav.freeFollowers"), path: "/free-followers" },
          { label: title, path: `/free-followers/${slug}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <article>
          <div className="flex items-start gap-4">
            <span className="text-4xl" aria-hidden>
              {getPlatformEmoji(service.platform)}
            </span>
            <div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
                {t(locale, "catalog.tierFree")}
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-ink-700">
                {service.amount.toLocaleString()} {service.unit} ·{" "}
                {formatPoints(pointsCost)} {t(locale, "common.points")} ·{" "}
                {t(locale, "catalog.deliveryTime")}
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
