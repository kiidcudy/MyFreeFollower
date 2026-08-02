"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth, type Withdrawal } from "@/lib/auth-store";
import { formatPoints, pointsToUSD, siteConfig } from "@/lib/site";

const METHODS: Withdrawal["method"][] = [
  "PayPal",
  "Crypto",
  "Bank Transfer",
  "Gift Card",
];

export default function DashboardWithdrawPage() {
  const { t } = useLocale();
  const { user, withdrawals, requestWithdraw } = useAuth();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<Withdrawal["method"]>("PayPal");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const minUsd = pointsToUSD(siteConfig.minWithdrawPoints);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMessage(null);
    const amountPoints = parseInt(amount.replace(/\D/g, ""), 10) || 0;
    const res = await requestWithdraw({
      method,
      amountPoints,
      destination: destination.trim(),
    });
    setLoading(false);
    if (res.ok) {
      setMessage({ type: "ok", text: t("dashboard.withdrawPending") });
      setAmount("");
      setDestination("");
    } else {
      setMessage({
        type: "err",
        text: res.error ?? t("dashboard.withdrawInsufficient"),
      });
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t("dashboard.withdrawTitle")}
        </h1>
        <p className="mt-1 text-sm text-ink-700">
          {t("dashboard.withdrawDesc", {
            min: formatPoints(siteConfig.minWithdrawPoints),
            usd: minUsd.toFixed(0),
          })}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <p className="text-sm text-ink-700">
          {t("dashboard.pointsBalance")}:{" "}
          <strong className="text-brand-800">
            {formatPoints(user.points)} {t("common.points")}
          </strong>
        </p>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-card"
      >
        <label className="block text-sm font-semibold text-ink-900">
          {t("dashboard.withdrawAmount")}
          <input
            type="number"
            min={siteConfig.minWithdrawPoints}
            max={user.points}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={String(siteConfig.minWithdrawPoints)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-ink-900">
          Method
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Withdrawal["method"])}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-ink-900">
          Destination (email / wallet / account)
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="your@email.com"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? t("common.loading") : t("dashboard.withdrawSubmit")}
        </button>
      </form>

      {withdrawals.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink-900">History</h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {withdrawals.map((w) => (
              <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <span>
                  {formatPoints(w.amountPoints)} pts → {w.method}
                </span>
                <span className="capitalize text-slate-500">{w.status}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
