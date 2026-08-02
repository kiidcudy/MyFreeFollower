"use client";

import { useState } from "react";
import { PanelHeader } from "@/components/panel/PanelHeader";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatPoints, siteConfig } from "@/lib/site";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardDailyBonusPage() {
  const { t } = useLocale();
  const { user, claimDailyBonus } = useAuth();
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const bonus = siteConfig.dailyBonusPoints;
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  const alreadyClaimed = user?.lastBonusClaim === new Date().toISOString().slice(0, 10);

  const handleClaim = () => {
    const res = claimDailyBonus();
    if (res.ok) {
      setMessage({
        type: "ok",
        text: `${t("dashboard.bonusClaimed")} ${t("dashboard.bonusPoints", { points: bonus })}`,
      });
    } else {
      setMessage({ type: "err", text: res.error ?? t("errors.generic") });
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <PanelHeader
        title={t("dashboard.dailyBonus")}
        subtitle={t("dashboard.bonusPoints", { points: bonus })}
      />

      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="text-sm text-slate-500">{t("dashboard.todayLabel")}</p>
        <p className="mt-2 font-display text-4xl font-black text-slate-900">
          {formatPoints(bonus)} 🪙
        </p>
        <button
          type="button"
          onClick={handleClaim}
          disabled={alreadyClaimed}
          className="btn-accent mt-6 px-8 disabled:opacity-50"
        >
          🎁 {alreadyClaimed ? t("dashboard.bonusAlreadyClaimed") : t("dashboard.bonusClaim")}
        </button>
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
          {t("dashboard.weeklyBonusCalendar")}
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map((day, i) => (
            <div
              key={day}
              className={`rounded-xl border p-3 text-center ${
                i === todayIdx
                  ? "border-accent-400 bg-accent-50 ring-2 ring-accent-200"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="text-xs font-semibold text-slate-500">{day}</div>
              <div className="mt-1 text-sm font-black text-slate-900">{formatPoints(bonus)}</div>
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "ok" ? "bg-accent-50 text-accent-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
