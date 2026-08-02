import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import {
  PLATFORM_ORDER,
  getFreeServicesByPlatform,
  getPaidServicesByPlatform,
  getPlatformEmoji,
  type Platform,
} from "@/lib/catalog";
import { platformFromSlug, platformToSlug } from "@/lib/catalog/slug-utils";
import { localizePlatform } from "@/lib/i18n/catalog-labels";
import { ServiceGrid } from "@/components/catalog/ServiceGrid";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultLocale, isLocale, type Locale as AppLocale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/translations";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Tier = "free" | "paid";

function resolvePlatform(platformSlug: string): Platform | undefined {
  return platformFromSlug(platformSlug);
}

export function platformStaticParams() {
  return locales.flatMap((locale) =>
    PLATFORM_ORDER.map((platform) => {
      const slug = platformToSlug(platform);
      return { locale, platform: slug };
    }),
  );
}

export async function platformMetadata(
  tier: Tier,
  locale: AppLocale,
  platformSlug: string,
): Promise<Metadata> {
  const platform = resolvePlatform(platformSlug);
  if (!platform) {
    return createMetadata({ title: "Not found", noIndex: true, path: "/", locale });
  }

  const name = localizePlatform(locale, platform);
  const path =
    tier === "free"
      ? `/free-followers/platform/${platformSlug}`
      : `/buy-followers/platform/${platformSlug}`;

  return createMetadata({
    title:
      tier === "free"
        ? t(locale, "meta.platformFreeTitle", { platform: name })
        : t(locale, "meta.platformPaidTitle", { platform: name }),
    description:
      tier === "free"
        ? t(locale, "meta.platformFreeDescription", { platform: name })
        : t(locale, "meta.platformPaidDescription", { platform: name }),
    path,
    locale,
  });
}

export function PlatformServicesPage({
  locale,
  platformSlug,
  tier,
}: {
  locale: AppLocale;
  platformSlug: string;
  tier: Tier;
}) {
  const platform = resolvePlatform(platformSlug);
  if (!platform) notFound();

  const services =
    tier === "free"
      ? getFreeServicesByPlatform(platform)
      : getPaidServicesByPlatform(platform);

  if (services.length === 0) notFound();

  const hubPath = tier === "free" ? "/free-followers" : "/buy-followers";
  const hubLabel =
    tier === "free" ? t(locale, "nav.freeFollowers") : t(locale, "nav.buyFollowers");
  const platformName = localizePlatform(locale, platform);

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: hubLabel, path: hubPath },
          {
            label: platformName,
            path: `${hubPath}/platform/${platformSlug}`,
            href: false,
          },
        ]}
      />

      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {getPlatformEmoji(platform)}
          </span>
          <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            {tier === "free"
              ? t(locale, "catalog.platformFreeHeading", { platform: platformName })
              : t(locale, "catalog.platformPaidHeading", { platform: platformName })}
          </h1>
        </div>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {tier === "free"
            ? t(locale, "catalog.platformFreeDesc", { platform: platformName })
            : t(locale, "catalog.platformPaidDesc", { platform: platformName })}
        </p>
      </header>

      <div className="mt-10">
        <ServiceGrid services={services} columns={3} />
      </div>
    </>
  );
}

export function parseLocale(raw: string): AppLocale {
  return (isLocale(raw) ? raw : defaultLocale) as AppLocale;
}
