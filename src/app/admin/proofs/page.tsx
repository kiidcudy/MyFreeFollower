"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchAllProofs,
  reviewProof,
  type AdminProof,
  type AdminProofStatus,
} from "@/lib/admin-store";
import { formatPoints } from "@/lib/site";

export default function AdminProofsPage() {
  const [proofs, setProofs] = useState<AdminProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AdminProofStatus | "all">("pending");
  const [note, setNote] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllProofs();
    setProofs(data.sort((a, b) => b.createdAt - a.createdAt));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleReview = async (id: string, status: AdminProofStatus) => {
    setBusy(id);
    await reviewProof(id, status, note[id]);
    setBusy(null);
    load();
  };

  const filtered =
    filter === "all" ? proofs : proofs.filter((p) => p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Proofs</h1>
          <p className="mt-1 text-sm text-slate-600">Review member task submissions</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as AdminProofStatus | "all")}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="needs_edit">Needs edit</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-slate-500">No proofs found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-teal-700">{p.platform}</p>
                  <h2 className="font-display text-lg font-bold text-ink-900">
                    {p.taskTitle}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {p.email} · @{p.username}
                    {p.accountName ? ` · ${p.accountName}` : ""}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-teal-800">
                    {formatPoints(p.points)} points
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(p.createdAt).toLocaleString()} ·{" "}
                    <span className="capitalize">{p.status}</span>
                  </p>
                </div>
                {p.media && (
                  <a
                    href={p.media}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block max-w-[200px] overflow-hidden rounded-lg border border-slate-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.media}
                      alt="Proof"
                      className="h-32 w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </a>
                )}
              </div>

              {p.status === "pending" && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <input
                    type="text"
                    placeholder="Note (optional)"
                    value={note[p.id] ?? ""}
                    onChange={(e) =>
                      setNote((n) => ({ ...n, [p.id]: e.target.value }))
                    }
                    className="mb-3 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busy === p.id}
                      onClick={() => handleReview(p.id, "approved")}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={busy === p.id}
                      onClick={() => handleReview(p.id, "rejected")}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      disabled={busy === p.id}
                      onClick={() => handleReview(p.id, "needs_edit")}
                      className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-400 disabled:opacity-50"
                    >
                      Needs edit
                    </button>
                  </div>
                </div>
              )}

              {p.note && (
                <p className="mt-2 text-sm text-amber-800">Note: {p.note}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
