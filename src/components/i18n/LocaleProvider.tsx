"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { isRtl, localeHreflang, type Locale } from "@/lib/i18n/config";
import {
  getLocaleFromPathname,
  LOCALE_COOKIE,
  switchLocalePath,
} from "@/lib/i18n/navigation";
import {
  getCoreMessages,
  resolveMessage,
  type Messages,
} from "@/lib/i18n/messages-core";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const pathnameLocale = getLocaleFromPathname(pathname);
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocaleState(pathnameLocale);
  }, [pathnameLocale]);

  useEffect(() => {
    document.documentElement.lang = localeHreflang[locale] ?? locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
    setLocaleCookie(locale);
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      const current = getLocaleFromPathname(pathname);
      if (next === current) return;
      setLocaleCookie(next);
      router.replace(switchLocalePath(pathname, next));
    },
    [pathname, router],
  );

  const messages = useMemo(() => getCoreMessages(locale), [locale]);

  const translate = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      resolveMessage(messages, key, params),
    [messages],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages,
      t: translate,
    }),
    [locale, setLocale, messages, translate],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useMessages() {
  return useLocale().messages;
}
