import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FooterLocaleSelect } from "@/components/layout/FooterLocaleSelect";
import { PaymentMethodsBar } from "@/components/marketing/PaymentMethodsBar";
import {
  PLATFORM_ORDER,
  getFreeServicesByPlatform,
  getPaidServicesByPlatform,
  getPlatformEmoji,
} from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/config";
import { currencyCode } from "@/lib/i18n/currency";
import { getServiceDisplayTitle } from "@/lib/i18n/catalog-labels";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";
import { siteConfig, whatsappLink } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const topFreePlatforms = PLATFORM_ORDER.slice(0, 8);
  const topPaidPlatforms = PLATFORM_ORDER.slice(0, 8);

  const legalLinks = [
    { href: "/privacy-policy", label: t(locale, "footer.privacyPolicy") },
    { href: "/terms", label: t(locale, "footer.terms") },
    { href: "/refund-policy", label: t(locale, "footer.refundPolicy") },
  ];

  const companyLinks = [
    { href: "/about", label: t(locale, "nav.about") },
    { href: "/blog", label: t(locale, "nav.blog") },
    { href: "/contact", label: t(locale, "nav.contact") },
    { href: "/how-it-works", label: t(locale, "nav.howItWorks") },
  ];

  const bottomLinks = [{ href: "/faq", label: t(locale, "nav.faq") }, ...legalLinks];

  const trustChips = [
    t(locale, "home.trustNoPassword"),
    t(locale, "home.trustSupport"),
    t(locale, "home.trustSecure"),
  ];

  return (
    <footer className="defer-render mt-auto border-t border-black/[0.06] bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo locale={locale} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6e6e73]">
              {t(locale, "footer.tagline")}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {trustChips.map((item) => (
                <span key={item} className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-semibold text-[#1d1d1f]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">{t(locale, "nav.freeServices")}</h2>
            <ul className="mt-4">
              <li>
                <Link
                  prefetch={false}
                  href={localizedPath("/free-followers", locale)}
                  className="block py-1.5 text-sm font-semibold text-[#0066cc] hover:underline"
                >
                  {t(locale, "footer.allFreeServices")}
                </Link>
              </li>
              {topFreePlatforms.map((platform) => {
                const first = getFreeServicesByPlatform(platform)[0];
                if (!first) return null;
                return (
                  <li key={platform}>
                    <Link
                      prefetch={false}
                      href={localizedPath(`/free-followers/${first.slug}`, locale)}
                      className="block py-1.5 text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]"
                    >
                      {getPlatformEmoji(platform)} {getServiceDisplayTitle(locale, first)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">{t(locale, "nav.services")}</h2>
            <ul className="mt-4">
              <li>
                <Link
                  prefetch={false}
                  href={localizedPath("/buy-followers", locale)}
                  className="block py-1.5 text-sm font-semibold text-[#0066cc] hover:underline"
                >
                  {t(locale, "footer.allServices")}
                </Link>
              </li>
              {topPaidPlatforms.map((platform) => {
                const first = getPaidServicesByPlatform(platform)[0];
                if (!first) return null;
                return (
                  <li key={platform}>
                    <Link
                      prefetch={false}
                      href={localizedPath(`/buy-followers/${first.slug}`, locale)}
                      className="block py-1.5 text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]"
                    >
                      {getPlatformEmoji(platform)} {getServiceDisplayTitle(locale, first)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">{t(locale, "footer.company")}</h2>
            <ul className="mt-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    prefetch={false}
                    href={localizedPath(link.href, locale)}
                    className="block py-1.5 text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">{t(locale, "footer.support")}</h2>
              <ul className="mt-4 text-sm text-[#6e6e73]">
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1.5 hover:text-[#0066cc]"
                  >
                    WhatsApp: {siteConfig.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="block py-1.5 hover:text-[#0066cc]">
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
            <FooterLocaleSelect label={t(locale, "nav.language")} />
            <p className="text-xs text-[#6e6e73]">
              {t(locale, "common.currency")}:{" "}
              <span className="font-semibold text-[#1d1d1f]">{currencyCode(locale)}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <PaymentMethodsBar locale={locale} compact />
          <div className="mt-8 flex flex-col gap-4 border-t border-black/[0.06] pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-[#6e6e73]">{t(locale, "footer.copyright", { year })}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {bottomLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    prefetch={false}
                    href={localizedPath(link.href, locale)}
                    className="block py-1.5 text-xs font-medium text-[#6e6e73] hover:text-[#0066cc]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#6e6e73]">{t(locale, "footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
