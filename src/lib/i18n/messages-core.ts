// Core (client-safe) translation layer.
//
// Only bundles that are actually rendered by client components live here.
// Page-scoped bundles (FAQ, About, legal, static pages) are merged in
// `translations.ts`, which is imported exclusively from server components —
// this keeps ~750 KB of translation data out of the browser bundle.

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

export type DeepPartial<T> = T extends string
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

/** Writable view of `Messages`, used while layering locale bundles on top. */
export type MutableMessages = { -readonly [K in keyof Messages]: Messages[K] };

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

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Merges a partial override onto a complete base tree. The override can only
 * replace leaves that already exist in `base`, so the result keeps `base`'s
 * shape — that is what lets the callers stay typed as `Messages`.
 */
export function deepMergeRecords<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>,
): T {
  const result: Record<string, unknown> = { ...base };

  for (const [key, overrideVal] of Object.entries(override)) {
    if (overrideVal === undefined) continue;
    const baseVal = result[key];

    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMergeRecords(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }

  return result as T;
}

/**
 * Messages needed by interactive (client) UI: nav, home, footer, catalog, auth.
 *
 * `en` is the complete message tree and is always the merge base, so the result
 * is a fully populated `Messages` no matter how sparse a locale bundle is — a
 * key can never be missing here, only untranslated.
 */
export function getCoreMessages(locale: Locale): Messages {
  const override = localeMessages[locale] ?? localeMessages[defaultLocale];
  const merged: MutableMessages = deepMergeRecords<Messages>(
    en,
    override as Record<string, unknown>,
  );

  const homeOverride = homeBundles[locale];
  if (homeOverride) {
    merged.home = deepMergeRecords(merged.home, homeOverride as Record<string, unknown>);
  }

  const homeExtra = homeExtraBundles[locale];
  if (homeExtra) {
    merged.home = deepMergeRecords(merged.home, homeExtra as Record<string, unknown>);
  }

  const guaranteeOverride = guaranteeBundles[locale];
  if (guaranteeOverride) {
    merged.home = deepMergeRecords(merged.home, guaranteeOverride as Record<string, unknown>);
  }

  const whyOverride = whyBundles[locale];
  if (whyOverride) {
    merged.home = deepMergeRecords(merged.home, whyOverride as Record<string, unknown>);
  }

  const heroOverride = heroBundles[locale];
  if (heroOverride) {
    merged.home = deepMergeRecords(merged.home, heroOverride as Record<string, unknown>);
  }

  const navOverride = navShellBundles[locale];
  if (navOverride) {
    merged.nav = deepMergeRecords(merged.nav, navOverride as Record<string, unknown>);
  }

  const footerOverride = footerShellBundles[locale];
  if (footerOverride) {
    merged.footer = deepMergeRecords(merged.footer, footerOverride as Record<string, unknown>);
  }

  const paymentsOverride = paymentsBundles[locale];
  if (paymentsOverride) {
    merged.payments = deepMergeRecords(
      merged.payments,
      paymentsOverride as Record<string, unknown>,
    );
  }

  const platformI18nOverride = platformI18nBundles[locale];
  if (platformI18nOverride) {
    merged.meta = deepMergeRecords(
      merged.meta,
      platformI18nOverride.meta as Record<string, unknown>,
    );
    merged.catalog = deepMergeRecords(
      merged.catalog,
      platformI18nOverride.catalog as Record<string, unknown>,
    );
    merged.common = deepMergeRecords(
      merged.common,
      platformI18nOverride.common as Record<string, unknown>,
    );
  }

  return merged;
}

/** Resolve a dotted message key against a merged message tree. */
export function resolveMessage(
  messages: Messages | Record<string, unknown>,
  key: string,
  params?: Record<string, string | number>,
): string {
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
    (str, [param, value]) =>
      str.replace(new RegExp(`\\{${param}\\}`, "g"), String(value)),
    current,
  );
}

export { en };
