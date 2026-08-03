"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatPoints, siteConfig } from "@/lib/site";

export default function DashboardPointsPage() {
  const { t } = useLocale();
  const { user, proofs, serviceOrders } = useAuth();

  const earned = useMemo(
    () => proofs.filter((p) => p.status === "approved").reduce((s, p) => s + p.points, 0),
    [proofs],
  );
  const spent = useMemo(
    () => serviceOrders.reduce((s, o) => s + o.points, 0),
    [serviceOrders],
  );

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t("dashboard.pointsHistory")}
        </h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.pointsSpendHint")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase text-ink-700">
            {t("dashboard.pointsBalance")}
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-brand-800">
            {formatPoints(user.points)}
          </p>
          <p className="mt-1 text-xs text-slate-500">{t("dashboard.pointsSpendHint")}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase text-ink-700">
            {t("dashboard.pointsEarned")}
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-ink-900">
            {formatPoints(earned)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {t("dashboard.todayLabel")}: {formatPoints(user.todayEarned)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase text-ink-700">
            {t("dashboard.pointsSpent")}
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-ink-900">
            {formatPoints(spent)}
          </p>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="font-display text-lg font-bold text-ink-900">{t("dashboard.pointsRates")}</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-700">
          <li>
            {t("dashboard.shopRate")}: {siteConfig.servicePointToMoney} {t("common.points")} = $1
          </li>
          <li>
            {t("dashboard.taskMultiplier")}: ×{siteConfig.pointsMultiplier}
          </li>
        </ul>
      </section>
    </div>
  );
}
