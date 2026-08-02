import type { Metadata } from "next";
import { ServiceGrid } from "@/components/catalog/ServiceGrid";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import {
  PLATFORM_ORDER,
  getFreeServicesByPlatform,
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
    title: t(locale, "meta.freeFollowersTitle"),
    description: t(locale, "meta.freeFollowersDescription"),
    path: "/free-followers",
    locale,
  });
}

export default async function FreeFollowersHubPage({
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
          { label: t(locale, "nav.freeFollowers"), path: "/free-followers" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t(locale, "catalog.freeHubTitle")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t(locale, "catalog.freeHubDesc")}
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {PLATFORM_ORDER.map((platform) => {
          const services = getFreeServicesByPlatform(platform);
          if (services.length === 0) return null;

          return (
            <section key={platform} id={platform.toLowerCase().replace(/\s+/g, "-")}>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {getPlatformEmoji(platform)}
                </span>
                <h2 className="font-display text-xl font-bold text-ink-900">
                  {platform}
                </h2>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  {services.length} {t(locale, "common.free")}
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
