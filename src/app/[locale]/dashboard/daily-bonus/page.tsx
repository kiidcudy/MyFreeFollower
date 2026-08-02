"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatPoints, siteConfig } from "@/lib/site";

export default function DashboardDailyBonusPage() {
  const { t } = useLocale();
  const { user, claimDailyBonus } = useAuth();
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const bonus = siteConfig.dailyBonusPoints;
  const alreadyClaimed = user?.lastBonusClaim === new Date().toISOString().slice(0, 10);

  const handleClaim = () => {
    const res = claimDailyBonus();
    if (res.ok) {
      setMessage({
        type: "ok",
        text: t("dashboard.bonusClaimed") + " " + t("dashboard.bonusPoints", { points: bonus }),
      });
    } else {
      setMessage({ type: "err", text: res.error ?? t("errors.generic") });
    }
  };

  if (!user) return null;

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

      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-card">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
          {t("dashboard.dailyBonus")}
        </p>
        <p className="mt-4 font-display text-3xl font-bold">+{formatPoints(bonus)}</p>
        <p className="mt-1 text-sm text-white/90">{t("common.points")}</p>
        <button
          type="button"
          onClick={handleClaim}
          disabled={alreadyClaimed}
          className="mt-6 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-brand-800 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {alreadyClaimed ? t("dashboard.bonusAlreadyClaimed") : t("dashboard.bonusClaim")}
        </button>
      </section>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
