import type { Locale } from "@/lib/i18n/config";

export interface LocaleCurrency {
  code: string;
  usdRate: number;
  intlLocale: string;
}

/** Display currency per site locale (USD is the internal catalog base). */
export const localeCurrencies: Record<Locale, LocaleCurrency> = {
  en: { code: "USD", usdRate: 1, intlLocale: "en-US" },
  de: { code: "EUR", usdRate: 0.92, intlLocale: "de-DE" },
  fr: { code: "EUR", usdRate: 0.92, intlLocale: "fr-FR" },
  es: { code: "EUR", usdRate: 0.92, intlLocale: "es-ES" },
  pt: { code: "EUR", usdRate: 0.92, intlLocale: "pt-PT" },
  "pt-br": { code: "BRL", usdRate: 5.05, intlLocale: "pt-BR" },
  it: { code: "EUR", usdRate: 0.92, intlLocale: "it-IT" },
  nl: { code: "EUR", usdRate: 0.92, intlLocale: "nl-NL" },
  pl: { code: "PLN", usdRate: 3.95, intlLocale: "pl-PL" },
  ro: { code: "RON", usdRate: 4.55, intlLocale: "ro-RO" },
  ru: { code: "RUB", usdRate: 92, intlLocale: "ru-RU" },
  uk: { code: "UAH", usdRate: 41, intlLocale: "uk-UA" },
  tr: { code: "TRY", usdRate: 34.5, intlLocale: "tr-TR" },
  ar: { code: "SAR", usdRate: 3.75, intlLocale: "ar-SA" },
  fa: { code: "USD", usdRate: 1, intlLocale: "fa-IR" },
  zh: { code: "CNY", usdRate: 7.25, intlLocale: "zh-CN" },
  id: { code: "IDR", usdRate: 15800, intlLocale: "id-ID" },
  bn: { code: "BDT", usdRate: 110, intlLocale: "bn-BD" },
  hi: { code: "INR", usdRate: 83, intlLocale: "hi-IN" },
};

export function getLocaleCurrency(locale: Locale): LocaleCurrency {
  return localeCurrencies[locale] ?? localeCurrencies.en;
}

export function formatPrice(locale: Locale, usdAmount: number): string {
  const { code, usdRate, intlLocale } = getLocaleCurrency(locale);
  const amount = usdAmount * usdRate;

  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: code === "IDR" || code === "KRW" ? 0 : 2,
    maximumFractionDigits: code === "IDR" || code === "KRW" ? 0 : 2,
  }).format(amount);
}

export function currencyCode(locale: Locale): string {
  return getLocaleCurrency(locale).code;
}
