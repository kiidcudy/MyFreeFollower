"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import {
  formatPoints,
  pointsToUSD,
  servicePointsToUSD,
  siteConfig,
} from "@/lib/site";

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
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.pointsBalance")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 shadow-card">
          <p className="text-xs font-semibold uppercase text-brand-800">
            {t("dashboard.pointsBalance")}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-900">
            {formatPoints(user.points)}
          </p>
          <p className="mt-1 text-sm text-brand-700">
            ≈ ${pointsToUSD(user.points).toFixed(2)} {t("common.usd")} (withdraw)
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase text-ink-700">
            {t("dashboard.pointsEarned")}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-ink-900">
            {formatPoints(earned)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Today: {formatPoints(user.todayEarned)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase text-ink-700">
            {t("dashboard.pointsSpent")}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-ink-900">
            {formatPoints(spent)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            ≈ ${servicePointsToUSD(spent).toFixed(2)} shop value
          </p>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-bold text-ink-900">Conversion rates</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-700">
          <li>
            Withdraw: {siteConfig.pointToUSD} {t("common.points")} = $1 USD
          </li>
          <li>
            Shop: {siteConfig.servicePointToUSD} {t("common.points")} = $1 USD
          </li>
          <li>
            Task multiplier: ×{siteConfig.pointsMultiplier} on base task rewards
          </li>
          <li>
            Min withdrawal: {formatPoints(siteConfig.minWithdrawPoints)} {t("common.points")}
          </li>
        </ul>
      </section>
    </div>
  );
}
