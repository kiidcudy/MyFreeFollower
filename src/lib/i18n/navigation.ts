import {
  defaultLocale,
  isLocale,
  localeHreflang,
  type Locale,
  locales,
} from "@/lib/i18n/config";

export const LOCALE_COOKIE = "MFF_LOCALE";

export function stripLocale(pathname: string): { locale: Locale; pathname: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) {
    const rest = "/" + segments.slice(1).join("/");
    return { locale: first, pathname: rest === "/" ? "/" : rest };
  }

  return { locale: defaultLocale, pathname: pathname || "/" };
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  return stripLocale(pathname).locale;
}

export function pathnameHasLocale(pathname: string): boolean {
  const first = pathname.split("/").filter(Boolean)[0];
  return Boolean(first && isLocale(first));
}

export function buildAlternateLanguages(
  path: string,
  siteUrl: string,
): Record<string, string> {
  const { pathname } = stripLocale(path);
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[localeHreflang[locale]] = `${siteUrl}${localizedPath(pathname, locale)}`;
  }

  languages["x-default"] = `${siteUrl}${localizedPath(pathname, defaultLocale)}`;
  return languages;
}

export function switchLocalePath(currentPathname: string, nextLocale: Locale): string {
  const { pathname } = stripLocale(currentPathname);
  return localizedPath(pathname, nextLocale);
}
