import type { Metadata } from "next";
import { ServiceGrid } from "@/components/catalog/ServiceGrid";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import {
  PLATFORM_ORDER,
  getPaidServicesByPlatform,
  getPlatformEmoji,
} from "@/lib/catalog";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
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
    title: t(locale, "meta.buyFollowersTitle"),
    description: t(locale, "meta.buyFollowersDescription"),
    path: "/buy-followers",
    locale,
  });
}

export default async function BuyFollowersHubPage({
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
          { label: t(locale, "nav.buyFollowers"), path: "/buy-followers" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t(locale, "catalog.paidHubTitle")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t(locale, "catalog.paidHubDesc")}
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {PLATFORM_ORDER.map((platform) => {
          const services = getPaidServicesByPlatform(platform);
          if (services.length === 0) return null;

          return (
            <section key={platform}>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {getPlatformEmoji(platform)}
                </span>
                <h2 className="font-display text-xl font-bold text-ink-900">
                  {platform}
                </h2>
                <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-semibold text-accent-700">
                  {services.length} {t(locale, "common.paid")}
                </span>
              </div>
              <ServiceGrid services={services} columns={3} />
            </section>
          );
        })}
      </div>
    </>
  );
}
