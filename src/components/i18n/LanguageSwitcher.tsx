"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { isLocale, localeHreflang, localesForSelect } from "@/lib/i18n/config";
import { currencyCode } from "@/lib/i18n/currency";

type LanguageSwitcherProps = {
  variant?: "header" | "compact";
};

export function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = localesForSelect.find((l) => l.code === locale);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  if (variant === "compact") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {t("nav.language")}
        </span>
        <select
          value={locale}
          onChange={(e) => {
            const value = e.target.value;
            if (isLocale(value)) setLocale(value);
          }}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-ink-800"
          aria-label={t("nav.language")}
        >
          {localesForSelect.map((item) => (
            <option key={item.code} value={item.code}>
              {item.flag} {item.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div ref={rootRef} className="relative z-[100]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-semibold text-[#1d1d1f] transition hover:bg-black/[0.07]"
        aria-expanded={open}
        aria-label={t("nav.language")}
      >
        <span>{current?.flag ?? locale.toUpperCase()}</span>
        <span className="hidden sm:inline">{current?.label}</span>
        <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-bold text-[#0066cc]">
          {currencyCode(locale)}
        </span>
      </button>
      {open && (
        <ul className="absolute end-0 z-[100] mt-2 max-h-64 w-48 overflow-y-auto rounded-2xl border border-black/[0.06] bg-white/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">
          {localesForSelect.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                lang={localeHreflang[item.code]}
                aria-current={item.code === locale ? "true" : undefined}
                onClick={() => {
                  setLocale(item.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-start text-sm transition ${
                  item.code === locale
                    ? "bg-[#0077ed]/10 font-semibold text-[#0066cc]"
                    : "text-[#1d1d1f] hover:bg-black/[0.04]"
                }`}
              >
                <span className="text-xs">{item.flag}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
