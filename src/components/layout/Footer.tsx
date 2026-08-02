"use client";

import { Logo } from "@/components/brand/Logo";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { PaymentMethodsBar } from "@/components/marketing/PaymentMethodsBar";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  PLATFORM_ORDER,
  getFreeServicesByPlatform,
  getPaidServicesByPlatform,
  getPlatformEmoji,
} from "@/lib/catalog";
import { isLocale, localesForSelect } from "@/lib/i18n/config";
import { currencyCode } from "@/lib/i18n/currency";
import { getServiceDisplayTitle } from "@/lib/i18n/catalog-labels";
import { siteConfig, whatsappLink } from "@/lib/site";

function FooterLanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-[#86868b]">{t("nav.language")}</span>
      <select
        value={locale}
        onChange={(e) => {
          const value = e.target.value;
          if (isLocale(value)) setLocale(value);
        }}
        className="mff-input rounded-2xl py-2.5"
        aria-label={t("nav.language")}
      >
        {localesForSelect.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Footer() {
  const { t, locale } = useLocale();
  const year = new Date().getFullYear();
  const topFreePlatforms = PLATFORM_ORDER.slice(0, 8);
  const topPaidPlatforms = PLATFORM_ORDER.slice(0, 8);

  const legalLinks = [
    { href: "/privacy-policy", label: t("footer.privacyPolicy") },
    { href: "/terms", label: t("footer.terms") },
    { href: "/refund-policy", label: t("footer.refundPolicy") },
  ];

  const companyLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
  ];

  const bottomLinks = [
    { href: "/faq", label: t("nav.faq") },
    ...legalLinks,
  ];

  return (
    <footer className="mt-auto border-t border-black/[0.06] bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo locale={locale} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6e6e73]">{t("footer.tagline")}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[t("home.trustNoPassword"), t("home.trustSupport"), t("home.trustSecure")].map((item) => (
                <span key={item} className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-semibold text-[#1d1d1f]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">{t("nav.freeServices")}</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <LocalizedLink href="/free-followers" className="text-sm font-semibold text-[#0077ed] hover:underline">
                  {t("footer.allFreeServices")}
                </LocalizedLink>
              </li>
              {topFreePlatforms.map((platform) => {
                const first = getFreeServicesByPlatform(platform)[0];
                if (!first) return null;
                return (
                  <li key={platform}>
                    <LocalizedLink
                      href={`/free-followers/${first.slug}`}
                      className="text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]"
                    >
                      {getPlatformEmoji(platform)} {getServiceDisplayTitle(locale, first)}
                    </LocalizedLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">{t("nav.services")}</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <LocalizedLink href="/buy-followers" className="text-sm font-semibold text-[#0077ed] hover:underline">
                  {t("footer.allServices")}
                </LocalizedLink>
              </li>
              {topPaidPlatforms.map((platform) => {
                const first = getPaidServicesByPlatform(platform)[0];
                if (!first) return null;
                return (
                  <li key={platform}>
                    <LocalizedLink
                      href={`/buy-followers/${first.slug}`}
                      className="text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]"
                    >
                      {getPlatformEmoji(platform)} {getServiceDisplayTitle(locale, first)}
                    </LocalizedLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">{t("footer.company")}</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <LocalizedLink href={link.href} className="text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]">
                    {link.label}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">{t("footer.support")}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#6e6e73]">
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077ed]">
                    WhatsApp: {siteConfig.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-[#0077ed]">
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
            <FooterLanguageSwitcher />
            <p className="text-xs text-[#86868b]">
              {t("common.currency")}:{" "}
              <span className="font-semibold text-[#1d1d1f]">{currencyCode(locale)}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <PaymentMethodsBar compact />
          <div className="mt-8 flex flex-col gap-4 border-t border-black/[0.06] pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-[#86868b]">{t("footer.copyright", { year })}</p>
            <ul className="flex flex-wrap gap-4">
              {bottomLinks.map((link) => (
                <li key={link.href}>
                  <LocalizedLink href={link.href} className="text-xs font-medium text-[#6e6e73] hover:text-[#0077ed]">
                    {link.label}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#86868b]">{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
