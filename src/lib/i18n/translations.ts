import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/messages/en";
import {
  footerShellBundles,
  homeBundles,
  navShellBundles,
} from "@/lib/i18n/home-bundles";
import { homeExtraBundles } from "@/lib/i18n/home-extra";
import { paymentsBundles } from "@/lib/i18n/payments-bundles";
import { guaranteeBundles } from "@/lib/i18n/guarantee-bundles";
import { whyBundles } from "@/lib/i18n/why-bundles";
import { heroBundles } from "@/lib/i18n/hero-bundles";
import { faqBundles } from "@/lib/i18n/faq-bundles";
import { legalBundles } from "@/lib/i18n/legal-bundles";
import { aboutBundles } from "@/lib/i18n/about-bundles";
import { staticPageBundles } from "@/lib/i18n/static-page-bundles";
import { platformI18nBundles } from "@/lib/i18n/platform-i18n-bundles";
import { de } from "@/lib/i18n/messages/de";
import { fr } from "@/lib/i18n/messages/fr";
import { es } from "@/lib/i18n/messages/es";
import { pt } from "@/lib/i18n/messages/pt";
import { ptBr } from "@/lib/i18n/messages/pt-br";
import { it } from "@/lib/i18n/messages/it";
import { nl } from "@/lib/i18n/messages/nl";
import { pl } from "@/lib/i18n/messages/pl";
import { ro } from "@/lib/i18n/messages/ro";
import { ru } from "@/lib/i18n/messages/ru";
import { uk } from "@/lib/i18n/messages/uk";
import { tr } from "@/lib/i18n/messages/tr";
import { ar } from "@/lib/i18n/messages/ar";
import { fa } from "@/lib/i18n/messages/fa";
import { zh } from "@/lib/i18n/messages/zh";
import { id } from "@/lib/i18n/messages/id";
import { bn } from "@/lib/i18n/messages/bn";
import { hi } from "@/lib/i18n/messages/hi";

type DeepPartial<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly U[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : never;

export type Messages = {
  [K in keyof typeof en]: (typeof en)[K] extends object
    ? { [P in keyof (typeof en)[K]]: string }
    : string;
};

const localeMessages: Record<Locale, DeepPartial<Messages>> = {
  en,
  de,
  fr,
  es,
  pt,
  "pt-br": ptBr,
  it,
  nl,
  pl,
  ro,
  ru,
  uk,
  tr,
  ar,
  fa,
  zh,
  id,
  bn,
  hi,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMergeRecords(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...base };

  for (const [key, overrideVal] of Object.entries(override)) {
    if (overrideVal === undefined) continue;
    const baseVal = result[key];

    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMergeRecords(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }

  return result;
}

export function getMessages(locale: Locale): Messages {
  const override = localeMessages[locale] ?? localeMessages[defaultLocale];
  let merged = deepMergeRecords(
    en as unknown as Record<string, unknown>,
    override as Record<string, unknown>,
  );

  const homeOverride = homeBundles[locale];
  if (homeOverride) {
    merged.home = deepMergeRecords(
      merged.home as Record<string, unknown>,
      homeOverride as unknown as Record<string, unknown>,
    );
  }

  const homeExtra = homeExtraBundles[locale];
  if (homeExtra) {
    merged.home = deepMergeRecords(
      merged.home as Record<string, unknown>,
      homeExtra as unknown as Record<string, unknown>,
    );
  }

  const guaranteeOverride = guaranteeBundles[locale];
  if (guaranteeOverride) {
    merged.home = deepMergeRecords(
      merged.home as Record<string, unknown>,
      guaranteeOverride as unknown as Record<string, unknown>,
    );
  }

  const whyOverride = whyBundles[locale];
  if (whyOverride) {
    merged.home = deepMergeRecords(
      merged.home as Record<string, unknown>,
      whyOverride as unknown as Record<string, unknown>,
    );
  }

  const heroOverride = heroBundles[locale];
  if (heroOverride) {
    merged.home = deepMergeRecords(
      merged.home as Record<string, unknown>,
      heroOverride as unknown as Record<string, unknown>,
    );
  }

  const navOverride = navShellBundles[locale];
  if (navOverride) {
    merged.nav = deepMergeRecords(
      merged.nav as Record<string, unknown>,
      navOverride as unknown as Record<string, unknown>,
    );
  }

  const footerOverride = footerShellBundles[locale];
  if (footerOverride) {
    merged.footer = deepMergeRecords(
      merged.footer as Record<string, unknown>,
      footerOverride as unknown as Record<string, unknown>,
    );
  }

  const paymentsOverride = paymentsBundles[locale];
  if (paymentsOverride) {
    merged.payments = deepMergeRecords(
      merged.payments as Record<string, unknown>,
      paymentsOverride as unknown as Record<string, unknown>,
    );
  }

  const faqOverride = faqBundles[locale];
  if (faqOverride) {
    merged.faq = deepMergeRecords(
      merged.faq as Record<string, unknown>,
      faqOverride as unknown as Record<string, unknown>,
    );
  }

  const legalOverride = legalBundles[locale];
  if (legalOverride) {
    merged.legal = deepMergeRecords(
      merged.legal as Record<string, unknown>,
      legalOverride as unknown as Record<string, unknown>,
    );
  }

  const aboutOverride = aboutBundles[locale];
  if (aboutOverride) {
    merged.about = deepMergeRecords(
      merged.about as Record<string, unknown>,
      aboutOverride as unknown as Record<string, unknown>,
    );
  }

  const staticPages = staticPageBundles[locale];
  if (staticPages) {
    if (staticPages.faq) {
      merged.faq = deepMergeRecords(
        merged.faq as Record<string, unknown>,
        staticPages.faq as unknown as Record<string, unknown>,
      );
    }
    if (staticPages.about) {
      merged.about = deepMergeRecords(
        merged.about as Record<string, unknown>,
        staticPages.about as unknown as Record<string, unknown>,
      );
    }
    if (staticPages.legal) {
      merged.legal = deepMergeRecords(
        merged.legal as Record<string, unknown>,
        staticPages.legal as unknown as Record<string, unknown>,
      );
    }
    if (staticPages.meta) {
      merged.meta = deepMergeRecords(
        merged.meta as Record<string, unknown>,
        staticPages.meta as unknown as Record<string, unknown>,
      );
    }
  }

  const platformI18nOverride = platformI18nBundles[locale];
  if (platformI18nOverride) {
    merged.meta = deepMergeRecords(
      merged.meta as Record<string, unknown>,
      platformI18nOverride.meta as unknown as Record<string, unknown>,
    );
    merged.catalog = deepMergeRecords(
      merged.catalog as Record<string, unknown>,
      platformI18nOverride.catalog as unknown as Record<string, unknown>,
    );
    merged.common = deepMergeRecords(
      merged.common as Record<string, unknown>,
      platformI18nOverride.common as unknown as Record<string, unknown>,
    );
  }

  return merged as Messages;
}

export function t(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>,
): string {
  const messages = getMessages(locale);
  const parts = key.split(".");
  let current: unknown = messages;

  for (const part of parts) {
    if (!isPlainObject(current) || !(part in current)) {
      return key;
    }
    current = current[part];
  }

  if (typeof current !== "string") return key;

  if (!params) return current;

  return Object.entries(params).reduce(
    (str, [param, value]) => str.replace(new RegExp(`\\{${param}\\}`, "g"), String(value)),
    current,
  );
}

export { en };
