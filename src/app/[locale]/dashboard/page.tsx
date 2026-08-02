"use client";

import { useMemo } from "react";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatMoney, formatPoints, moneyFromPoints } from "@/lib/site";

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-700">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-ink-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export default function DashboardOverviewPage() {
  const { t } = useLocale();
  const { user, proofs, serviceOrders, withdrawals } = useAuth();

  const stats = useMemo(() => {
    const pendingProofs = proofs.filter((p) => p.status === "pending").length;
    const approvedProofs = proofs.filter((p) => p.status === "approved").length;
    const pendingOrders = serviceOrders.filter((o) => o.status === "pending").length;
    const pointsSpent = serviceOrders.reduce((s, o) => s + o.points, 0);
    return { pendingProofs, approvedProofs, pendingOrders, pointsSpent };
  }, [proofs, serviceOrders]);

  const recent = useMemo(() => {
    const items: { type: string; label: string; date: number; status?: string }[] = [];
    for (const p of proofs.slice(0, 5)) {
      items.push({
        type: "proof",
        label: p.taskTitle,
        date: p.createdAt,
        status: p.status,
      });
    }
    for (const o of serviceOrders.slice(0, 5)) {
      items.push({
        type: "order",
        label: o.serviceTitle,
        date: o.createdAt,
        status: o.status,
      });
    }
    for (const w of withdrawals.slice(0, 3)) {
      items.push({
        type: "withdraw",
        label: `${formatPoints(w.amountPoints)} pts → ${w.method}`,
        date: w.createdAt,
        status: w.status,
      });
    }
    return items.sort((a, b) => b.date - a.date).slice(0, 8);
  }, [proofs, serviceOrders, withdrawals]);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t("dashboard.welcome")}, {user.fullName || user.username}
        </h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.overview")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={t("dashboard.pointsBalance")}
          value={formatPoints(user.points)}
          sub={`≈ ${formatMoney(moneyFromPoints(user.points))}`}
        />
        <StatCard
          label={t("dashboard.pointsEarned")}
          value={formatPoints(user.todayEarned)}
          sub={t("dashboard.todayLabel")}
        />
        <StatCard
          label={t("dashboard.proofs")}
          value={String(stats.pendingProofs)}
          sub={`${stats.approvedProofs} ${t("dashboard.proofApproved").toLowerCase()}`}
        />
        <StatCard
          label={t("dashboard.orders")}
          value={String(stats.pendingOrders)}
          sub={`${formatPoints(stats.pointsSpent)} ${t("dashboard.pointsSpent").toLowerCase()}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink-900">
              {t("dashboard.recentActivity")}
            </h2>
            <LocalizedLink
              href="/dashboard/proofs"
              className="text-xs font-semibold text-brand-700 hover:underline"
            >
              {t("dashboard.viewAll")}
            </LocalizedLink>
          </div>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">{t("dashboard.noActivity")}</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {recent.map((item, i) => (
                <li key={i} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium text-ink-900">{item.label}</span>
                  <span className="text-xs capitalize text-slate-500">{item.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink-900">
            {t("dashboard.quickLinks")}
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/dashboard/tasks", label: t("dashboard.tasks") },
              { href: "/dashboard/daily-bonus", label: t("dashboard.dailyBonus") },
              { href: "/dashboard/free-services", label: t("dashboard.freeServices") },
              { href: "/dashboard/referrals", label: t("dashboard.referrals") },
            ].map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50"
              >
                {link.label}
              </LocalizedLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
