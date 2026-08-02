export const locales = [
  "en",
  "de",
  "fr",
  "es",
  "pt",
  "pt-br",
  "it",
  "nl",
  "pl",
  "ro",
  "ru",
  "uk",
  "tr",
  "ar",
  "fa",
  "zh",
  "id",
  "bn",
  "hi",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
  "pt-br": "Português (Brasil)",
  it: "Italiano",
  nl: "Nederlands",
  pl: "Polski",
  ro: "Română",
  ru: "Русский",
  uk: "Українська",
  tr: "Türkçe",
  ar: "العربية",
  fa: "فارسی",
  zh: "中文",
  id: "Bahasa Indonesia",
  bn: "বাংলা",
  hi: "हिन्दी",
};

/** Short codes for language switcher UI */
export const localeFlags: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  fr: "FR",
  es: "ES",
  pt: "PT",
  "pt-br": "BR",
  it: "IT",
  nl: "NL",
  pl: "PL",
  ro: "RO",
  ru: "RU",
  uk: "UA",
  tr: "TR",
  ar: "AR",
  fa: "FA",
  zh: "ZH",
  id: "ID",
  bn: "BN",
  hi: "HI",
};

/** BCP 47 tags for hreflang / metadata */
export const localeHreflang: Record<Locale, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt",
  "pt-br": "pt-BR",
  it: "it",
  nl: "nl",
  pl: "pl",
  ro: "ro",
  ru: "ru",
  uk: "uk",
  tr: "tr",
  ar: "ar",
  fa: "fa",
  zh: "zh",
  id: "id",
  bn: "bn",
  hi: "hi",
};

export const rtlLocales: Locale[] = ["ar", "fa"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const localesForSelect = locales.map((code) => ({
  code,
  label: localeLabels[code],
  flag: localeFlags[code],
}));
