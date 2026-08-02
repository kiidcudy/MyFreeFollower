"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchAllWithdrawals,
  reviewWithdrawal,
  type AdminWithdrawal,
} from "@/lib/admin-store";
import { formatMoney, formatPoints } from "@/lib/site";

export default function AdminWithdrawalsPage() {
  const [items, setItems] = useState<AdminWithdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending">("pending");
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllWithdrawals();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleReview = async (id: string, status: "approved" | "rejected") => {
    setBusy(id);
    await reviewWithdrawal(id, status);
    setBusy(null);
    load();
  };

  const filtered =
    filter === "all" ? items : items.filter((w) => w.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Withdrawals</h1>
          <p className="mt-1 text-sm text-slate-600">Approve or reject payout requests</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "pending")}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="pending">Pending only</option>
          <option value="all">All</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-slate-500">No withdrawals found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((w) => (
            <article
              key={w.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold text-ink-900">
                    {formatPoints(w.amountPoints)} points
                  </p>
                  <p className="text-sm text-slate-600">
                    {formatMoney(w.amountMoney ?? w.amountUSD ?? 0)} · {w.method}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">{w.email}</span> · @{w.username}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Destination: <code className="text-xs">{w.destination}</code>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(w.createdAt).toLocaleString()} ·{" "}
                    <span className="capitalize font-semibold">{w.status}</span>
                  </p>
                </div>

                {w.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busy === w.id}
                      onClick={() => handleReview(w.id, "approved")}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={busy === w.id}
                      onClick={() => handleReview(w.id, "rejected")}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
