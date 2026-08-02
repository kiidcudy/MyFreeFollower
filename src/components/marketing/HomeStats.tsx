"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

const stats = [
  { value: "2.4M+", key: "home.statsOrders", accent: "from-[#0077ed]/20 to-[#5ac8fa]/10" },
  { value: "120K+", key: "home.statsUsers", accent: "from-[#30d158]/20 to-[#86efac]/10" },
  { value: "24+", key: "home.statsPlatforms", accent: "from-[#bf5af2]/20 to-[#e9d5ff]/10" },
  { value: "24/7", key: "home.statsSupport", accent: "from-[#ff9f0a]/20 to-[#fde68a]/10" },
] as const;

export function HomeStats() {
  const { t } = useLocale();

  return (
    <section className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((item) => (
        <div
          key={item.key}
          className={`rounded-[24px] border border-white/20 bg-gradient-to-br ${item.accent} px-4 py-5 text-center backdrop-blur-md`}
        >
          <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {item.value}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
            {t(item.key)}
          </p>
        </div>
      ))}
    </section>
  );
}
