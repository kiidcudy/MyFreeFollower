"use client";

import { useMemo, useState } from "react";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { PanelHeader } from "@/components/panel/PanelHeader";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatMoney, formatPoints, moneyFromPoints } from "@/lib/site";

export default function DashboardProfilePage() {
  const { t } = useLocale();
  const { user, proofs, withdrawals, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [saved, setSaved] = useState(false);

  const stats = useMemo(() => {
    const approved = proofs.filter((p) => p.status === "approved").length;
    const pending = proofs.filter((p) => p.status === "pending" || p.status === "recheck").length;
    return { approved, pending, withdrawals: withdrawals.length };
  }, [proofs, withdrawals]);

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const res = updateProfile({ fullName });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const initial = (user.fullName || user.username || "?").charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <div className="panel-header">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-black">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black">{user.fullName || user.username}</h1>
            <p className="text-white/85">@{user.username} · {user.email}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: t("dashboard.profileBannerBalance"), value: `${formatPoints(user.points)} 🪙` },
            { label: t("dashboard.profileBannerMoney"), value: formatMoney(moneyFromPoints(user.points)) },
            { label: t("dashboard.profileApprovedTasks"), value: String(stats.approved) },
            { label: t("dashboard.profilePendingProofs"), value: String(stats.pending) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white/15 px-3 py-2 text-center ring-1 ring-inset ring-white/20">
              <div className="text-lg font-black">{s.value}</div>
              <div className="text-xs text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSave} className="card space-y-4 p-5 lg:col-span-2">
          <h2 className="font-bold text-slate-900">{t("dashboard.accountInfo")}</h2>
          <label className="block text-sm font-semibold text-slate-700">
            {t("auth.username")}
            <input
              type="text"
              value={user.username}
              readOnly
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            {t("auth.fullName")}
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            {t("auth.email")}
            <input
              type="email"
              value={user.email}
              readOnly
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            />
          </label>
          <p className="text-xs text-slate-500">
            {t("dashboard.referralLink")}: {user.refCode}
          </p>
          <p className="text-xs text-slate-500">
            {t("dashboard.memberSince")} {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <button type="submit" className="btn-primary">
            {t("dashboard.saveChanges")}
          </button>
          {saved && <p className="text-sm font-medium text-accent-700">{t("toast.profileUpdated")}</p>}
        </form>

        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-bold text-slate-900">{t("dashboard.summary")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>{t("dashboard.todayLabel")}: {formatPoints(user.todayEarned)}</li>
              <li>{t("dashboard.proofsTotal")}: {proofs.length}</li>
              <li>{t("dashboard.withdrawHistory")}: {stats.withdrawals}</li>
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="mb-3 font-bold text-slate-900">{t("dashboard.quickActions")}</h2>
            <div className="grid gap-2">
              <LocalizedLink href="/dashboard/tasks" className="btn-primary justify-start">
                🏠 {t("dashboard.goToTasks")}
              </LocalizedLink>
              <LocalizedLink href="/dashboard/proofs" className="btn-ghost justify-start">
                💙 {t("dashboard.myProofs")}
              </LocalizedLink>
              <LocalizedLink href="/dashboard/withdraw" className="btn-ghost justify-start">
                💸 {t("dashboard.paymentRequest")}
              </LocalizedLink>
              <LocalizedLink href="/dashboard/referrals" className="btn-ghost justify-start">
                🌐 {t("dashboard.referrals")}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
