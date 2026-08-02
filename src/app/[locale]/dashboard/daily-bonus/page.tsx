"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { effectivePoints, formatPoints, siteConfig } from "@/lib/site";

export default function DashboardDailyBonusPage() {
  const { t } = useLocale();
  const { user, claimDailyBonus } = useAuth();
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const bonus = effectivePoints(siteConfig.dailyLoginBonusBase);
  const alreadyClaimed =
    user?.lastBonusClaim === new Date().toISOString().slice(0, 10);

  const handleClaim = () => {
    const res = claimDailyBonus();
    if (res.ok) {
      setMessage({
        type: "ok",
        text: t("dashboard.bonusClaimed") + " " + t("dashboard.bonusPoints", { points: bonus }),
      });
    } else {
      setMessage({
        type: "err",
        text: res.error ?? t("dashboard.bonusAlreadyClaimed"),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t("dashboard.dailyBonus")}
        </h1>
        <p className="mt-1 text-sm text-ink-700">
          {t("dashboard.bonusPoints", { points: bonus })}
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-2xl border border-brand-200 bg-brand-gradient p-8 text-center text-white shadow-soft">
        <p className="text-5xl" aria-hidden>
          ⭐
        </p>
        <p className="mt-4 font-display text-3xl font-bold">+{formatPoints(bonus)}</p>
        <p className="mt-1 text-sm text-white/90">{t("common.points")}</p>

        {message && (
          <p
            className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${
              message.type === "ok" ? "bg-white/20" : "bg-red-500/30"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="button"
          onClick={handleClaim}
          disabled={alreadyClaimed}
          className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-bold text-brand-800 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {alreadyClaimed ? t("dashboard.bonusAlreadyClaimed") : t("dashboard.claimBonus")}
        </button>
      </div>
    </div>
  );
}
