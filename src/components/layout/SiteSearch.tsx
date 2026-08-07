"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { searchCatalog } from "@/lib/catalog/search";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n/navigation";

export function SiteSearch({ variant = "hero" }: { variant?: "hero" | "header" }) {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => searchCatalog(query, locale), [query, locale]);

  function go(href: string) {
    router.push(localizedPath(href, locale));
    setQuery("");
    setOpen(false);
  }

  const isHero = variant === "hero";

  return (
    <div className={`relative ${isHero ? "mx-auto w-full max-w-xl" : "w-full max-w-md"}`}>
      <div className="relative">
        <svg
          className={`pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 ${isHero ? "text-[#6e6e73]" : "text-[#6e6e73]"}`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
          placeholder={t("search.placeholder")}
          className={`w-full rounded-full border ps-12 pe-5 text-sm font-medium outline-none transition ${
            isHero
              ? "border-white/25 bg-white/95 py-4 text-[#1d1d1f] shadow-[0_8px_40px_rgba(0,0,0,0.15)] focus:border-[#0077ed]/40 focus:ring-4 focus:ring-[#0077ed]/15"
              : "mff-input rounded-full py-2.5"
          }`}
          aria-label={t("search.placeholder")}
        />
      </div>

      {open && query.length >= 2 && (
        <ul className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-[24px] border border-black/[0.06] bg-white/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-[#6e6e73]">{t("search.noResults")}</li>
          ) : (
            results.map((r) => (
              <li key={r.href}>
                <button
                  type="button"
                  onMouseDown={() => go(r.href)}
                  className="flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3 text-start text-sm transition hover:bg-black/[0.04]"
                >
                  <span className="font-semibold text-[#1d1d1f]">{r.label}</span>
                  <span className="mff-badge-paid shrink-0">
                    {r.service.tier === "free" ? t("nav.freeServices") : t("nav.services")}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
