// Full translation layer (server components only).
//
// Adds the page-scoped bundles on top of the client-safe core. Importing this
// module from a client component would pull every locale's FAQ/legal/static
// page copy into the browser bundle — use `useLocale()` there instead.

import { type Locale } from "@/lib/i18n/config";
import {
  deepMergeRecords,
  en,
  getCoreMessages,
  resolveMessage,
  type Messages,
  type MutableMessages,
} from "@/lib/i18n/messages-core";
import { faqBundles } from "@/lib/i18n/faq-bundles";
import { legalBundles } from "@/lib/i18n/legal-bundles";
import { aboutBundles } from "@/lib/i18n/about-bundles";
import { staticPageBundles } from "@/lib/i18n/static-page-bundles";

export type { Messages } from "@/lib/i18n/messages-core";

// `t()` is called hundreds of times per page across 5k prerendered pages, so the
// merged tree is built once per locale instead of once per lookup.
const mergedCache = new Map<Locale, Messages>();

export function getMessages(locale: Locale): Messages {
  const cached = mergedCache.get(locale);
  if (cached) return cached;

  const merged: MutableMessages = getCoreMessages(locale);

  const faqOverride = faqBundles[locale];
  if (faqOverride) {
    merged.faq = deepMergeRecords(merged.faq, faqOverride as Record<string, unknown>);
  }

  const legalOverride = legalBundles[locale];
  if (legalOverride) {
    merged.legal = deepMergeRecords(merged.legal, legalOverride as Record<string, unknown>);
  }

  const aboutOverride = aboutBundles[locale];
  if (aboutOverride) {
    merged.about = deepMergeRecords(merged.about, aboutOverride as Record<string, unknown>);
  }

  const staticPages = staticPageBundles[locale];
  if (staticPages) {
    if (staticPages.faq) {
      merged.faq = deepMergeRecords(merged.faq, staticPages.faq as Record<string, unknown>);
    }
    if (staticPages.about) {
      merged.about = deepMergeRecords(merged.about, staticPages.about as Record<string, unknown>);
    }
    if (staticPages.legal) {
      merged.legal = deepMergeRecords(merged.legal, staticPages.legal as Record<string, unknown>);
    }
    if (staticPages.meta) {
      merged.meta = deepMergeRecords(merged.meta, staticPages.meta as Record<string, unknown>);
    }
  }

  mergedCache.set(locale, merged);
  return merged;
}

export function t(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>,
): string {
  return resolveMessage(getMessages(locale), key, params);
}

export { en };
