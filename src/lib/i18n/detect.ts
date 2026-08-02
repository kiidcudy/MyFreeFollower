import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

const languageToLocale: Record<string, Locale> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt",
  "pt-br": "pt-br",
  "pt-pt": "pt",
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
  "zh-cn": "zh",
  "zh-tw": "zh",
  id: "id",
  bn: "bn",
  hi: "hi",
};

/** ISO 3166-1 alpha-2 country → locale (IP-based detection) */
const countryToLocale: Record<string, Locale> = {
  TR: "tr",
  BR: "pt-br",
  PT: "pt",
  ID: "id",
  BD: "bn",
  IN: "hi",
  DE: "de",
  AT: "de",
  CH: "de",
  FR: "fr",
  BE: "fr",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  PL: "pl",
  RO: "ro",
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  UA: "uk",
  SA: "ar",
  AE: "ar",
  EG: "ar",
  QA: "ar",
  KW: "ar",
  BH: "ar",
  OM: "ar",
  JO: "ar",
  LB: "ar",
  MA: "ar",
  DZ: "ar",
  TN: "ar",
  IR: "fa",
  CN: "zh",
  TW: "zh",
  HK: "zh",
  SG: "zh",
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  ZA: "en",
  NG: "en",
  PH: "en",
  IT: "it",
  NL: "nl",
  LU: "fr",
  SE: "en",
  NO: "en",
  DK: "en",
  FI: "en",
  CZ: "en",
  SK: "en",
  HU: "ro",
  BG: "en",
  GR: "en",
  HR: "en",
  RS: "en",
  PK: "en",
  MY: "en",
  TH: "en",
  VN: "en",
  JP: "en",
  KR: "en",
};

export function detectLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferences = header
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";q=");
      return { lang: lang.toLowerCase(), q: qPart ? Number(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferences) {
    if (languageToLocale[lang]) return languageToLocale[lang];
    const base = lang.split("-")[0];
    if (languageToLocale[base]) return languageToLocale[base];
    if (lang.startsWith("pt") && lang.includes("br")) return "pt-br";
  }

  return defaultLocale;
}

export function detectLocaleFromCountry(countryCode: string | null): Locale {
  if (!countryCode) return defaultLocale;
  const upper = countryCode.toUpperCase();
  return countryToLocale[upper] ?? defaultLocale;
}

export function detectLocale(options: {
  cookie?: string | null;
  country?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  const { cookie, country, acceptLanguage } = options;

  if (cookie && isLocale(cookie)) {
    return cookie;
  }

  if (country) {
    const fromCountry = detectLocaleFromCountry(country);
    if (fromCountry !== defaultLocale) return fromCountry;
  }

  return detectLocaleFromAcceptLanguage(acceptLanguage ?? null);
}
