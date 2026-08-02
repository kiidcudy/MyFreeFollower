"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

const trustItems = [
  { key: "home.trustNoPassword", icon: "🔐" },
  { key: "home.trustSupport", icon: "💬" },
  { key: "home.trustSecure", icon: "✦" },
] as const;

export function TrustBar() {
  const { t } = useLocale();

  return (
    <div
      className="relative z-20 -mt-8 rounded-[28px] border border-black/[0.06] bg-white/90 px-5 py-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:-mt-10"
      aria-label="Trust signals"
    >
      <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {trustItems.map((item) => (
          <li key={item.key} className="flex items-center gap-3 text-sm font-semibold text-[#1d1d1f]">
            <span className="mff-icon-wrap text-base" aria-hidden>
              {item.icon}
            </span>
            {t(item.key)}
          </li>
        ))}
      </ul>
    </div>
  );
}
