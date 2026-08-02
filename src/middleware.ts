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
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};

export {
  detectLocale,
  detectLocaleFromAcceptLanguage,
  detectLocaleFromCountry,
};
