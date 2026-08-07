import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import {
  detectLocale,
  detectLocaleFromAcceptLanguage,
  detectLocaleFromCountry,
} from "@/lib/i18n/detect";
import { LOCALE_COOKIE, pathnameHasLocale } from "@/lib/i18n/navigation";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function setLocaleCookie(response: NextResponse, locale: Locale): void {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
  });
}

function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value ?? null;
  const country = request.headers.get("x-vercel-ip-country");
  const acceptLanguage = request.headers.get("accept-language");

  return detectLocale({ cookie, country, acceptLanguage });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/icon" ||
    pathname.startsWith("/icon?") ||
    pathname === "/apple-icon" ||
    pathname.startsWith("/apple-icon?") ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/sitemap/") ||
    pathname === "/robots.txt" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathnameHasLocale(pathname)) {
    const segment = pathname.split("/").filter(Boolean)[0];
    if (segment && isLocale(segment)) {
      const response = NextResponse.next();
      setLocaleCookie(response, segment);
      return response;
    }
  }

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  setLocaleCookie(response, locale);
  return response;
}

export const config = {
  // Extensionless metadata routes (/icon, /apple-icon) live at the root, not under
  // /[locale], so they must be excluded explicitly — the `.*\..*` clause only skips
  // paths that contain a dot, and redirecting them yields a 404.
  matcher: ["/((?!api|admin|_next|icon$|apple-icon$|.*\\..*).*)"],
};

export {
  detectLocale,
  detectLocaleFromAcceptLanguage,
  detectLocaleFromCountry,
};
