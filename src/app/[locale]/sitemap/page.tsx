import type { Metadata } from "next";
import Link from "next/link";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { allFreeServices, allPaidServices } from "@/lib/catalog";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
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
    title: t(locale, "meta.sitemapTitle"),
    description: t(locale, "meta.sitemapDescription"),
    path: "/sitemap",
    locale,
  });
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  const mainPages = [
    { path: "/", label: t(locale, "nav.home") },
    { path: "/free-followers", label: t(locale, "nav.freeFollowers") },
    { path: "/buy-followers", label: t(locale, "nav.buyFollowers") },
    { path: "/how-it-works", label: t(locale, "nav.howItWorks") },
    { path: "/faq", label: t(locale, "nav.faq") },
    { path: "/about", label: t(locale, "nav.about") },
    { path: "/blog", label: t(locale, "nav.blog") },
    { path: "/contact", label: t(locale, "nav.contact") },
  ];

  const legalPages = [
    { path: "/privacy-policy", label: t(locale, "legal.privacyTitle") },
    { path: "/terms", label: t(locale, "legal.termsTitle") },
    { path: "/sitemap", label: t(locale, "sitemap.title") },
  ];

  const authPages = [
    { path: "/login", label: t(locale, "nav.login") },
    { path: "/register", label: t(locale, "nav.register") },
    { path: "/dashboard", label: t(locale, "nav.dashboard") },
  ];

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "sitemap.title"), path: "/sitemap" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t(locale, "sitemap.title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t(locale, "sitemap.subtitle")}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-lg font-bold text-ink-900">
            {t(locale, "sitemap.mainPages")}
          </h2>
          <ul className="mt-4 space-y-2">
            {mainPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={localizedPath(page.path, locale)}
                  className="text-sm text-brand-700 hover:underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink-900">
            {t(locale, "sitemap.legalPages")}
          </h2>
          <ul className="mt-4 space-y-2">
            {legalPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={localizedPath(page.path, locale)}
                  className="text-sm text-brand-700 hover:underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink-900">
            {t(locale, "sitemap.authPages")}
          </h2>
          <ul className="mt-4 space-y-2">
            {authPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={localizedPath(page.path, locale)}
                  className="text-sm text-brand-700 hover:underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink-900">
            {t(locale, "sitemap.freeServices")}
          </h2>
          <ul className="mt-4 max-h-80 space-y-1 overflow-y-auto text-sm">
            {allFreeServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={localizedPath(`/free-followers/${service.slug}`, locale)}
                  className="text-brand-700 hover:underline"
                >
                  {service.platform} {service.type}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-ink-900">
            {t(locale, "sitemap.paidServices")}
          </h2>
          <ul className="mt-4 columns-1 gap-x-8 space-y-1 text-sm sm:columns-2 lg:columns-3">
            {allPaidServices.map((service) => (
              <li key={service.slug} className="break-inside-avoid">
                <Link
                  href={localizedPath(`/buy-followers/${service.slug}`, locale)}
                  className="text-brand-700 hover:underline"
                >
                  {service.platform} {service.type}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
