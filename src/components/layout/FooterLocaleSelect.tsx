"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { isLocale, localesForSelect } from "@/lib/i18n/config";

export function FooterLocaleSelect({ label }: { label: string }) {
  const { locale, setLocale } = useLocale();
  const [expanded, setExpanded] = useState(false);

  // The 19 native language names pull in the Cyrillic and Latin-Extended font
  // subsets (~107 KB) on every page, so only the selected one is in the DOM
  // until the visitor actually opens the picker.
  const current = localesForSelect.find((item) => item.code === locale);
  const options =
    expanded || !current ? localesForSelect : [current];

  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-[#6e6e73]">{label}</span>
      <select
        value={locale}
        onFocus={() => setExpanded(true)}
        onPointerDown={() => setExpanded(true)}
        onChange={(e) => {
          const value = e.target.value;
          if (isLocale(value)) setLocale(value);
        }}
        className="mff-input rounded-2xl py-2.5"
        aria-label={label}
      >
        {options.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
