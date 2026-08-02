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
import { isRtl, type Locale } from "@/lib/i18n/config";
import {
  LOCALE_COOKIE,
  switchLocalePath,
} from "@/lib/i18n/navigation";
import { getMessages, t, type Messages } from "@/lib/i18n/translations";

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
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
    setLocaleCookie(locale);
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      const target = switchLocalePath(pathname, next);
      setLocaleState(next);
      router.push(target);
      router.refresh();
    },
    [locale, pathname, router],
  );

  const messages = useMemo(() => getMessages(locale), [locale]);

  const translate = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      t(locale, key, params),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, messages, t: translate }),
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
