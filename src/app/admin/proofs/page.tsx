"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  fetchAllProofs,
  reviewProof,
  type AdminProof,
  type AdminProofStatus,
} from "@/lib/admin-store";
import { formatPoints } from "@/lib/site";

type Tab = "pending" | "recheck" | "grouped" | "all";

export default function AdminProofsPage() {
  const [proofs, setProofs] = useState<AdminProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pending");
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

  const filtered = useMemo(() => {
    if (tab === "all") return proofs;
    if (tab === "pending") return proofs.filter((p) => p.status === "pending");
    if (tab === "recheck") return proofs.filter((p) => p.status === "recheck");
    return proofs;
  }, [proofs, tab]);

  const grouped = useMemo(() => {
    const map = new Map<string, AdminProof[]>();
    for (const p of proofs) {
      const key = `${p.taskId} — ${p.taskTitle}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [proofs]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "pending", label: "Pending", count: proofs.filter((p) => p.status === "pending").length },
    { id: "recheck", label: "Recheck", count: proofs.filter((p) => p.status === "recheck").length },
    { id: "grouped", label: "By Task", count: grouped.length },
    { id: "all", label: "All", count: proofs.length },
  ];

  const ProofCard = ({ p }: { p: AdminProof }) => (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-teal-700">
            #{p.taskId} · {p.platform} · {p.type}
          </p>
          <h2 className="font-display text-lg font-bold text-ink-900">{p.taskTitle}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {p.email} · @{p.username}
            {p.accountName ? ` · handle: ${p.accountName}` : ""}
          </p>
          <p className="mt-1 text-sm font-semibold text-teal-800">
            Award: {formatPoints(p.points)} points
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {new Date(p.createdAt).toLocaleString()} ·{" "}
            <span className="capitalize font-semibold">{p.status}</span>
          </p>
        </div>
        {p.media && (
          <a href={p.media} target="_blank" rel="noopener noreferrer" className="block max-w-[220px] overflow-hidden rounded-lg border border-slate-200">
            {p.mediaType === "video" ? (
              <video src={p.media} className="h-32 w-full object-cover" controls />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={p.media} alt="Proof" className="h-32 w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}
          </a>
        )}
      </div>

      {["pending", "recheck"].includes(p.status) && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <input
            type="text"
            placeholder="Admin note (optional)"
            value={note[p.id] ?? ""}
            onChange={(e) => setNote((n) => ({ ...n, [p.id]: e.target.value }))}
            className="mb-3 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={busy === p.id} onClick={() => handleReview(p.id, "approved")} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50">Approve</button>
            <button type="button" disabled={busy === p.id} onClick={() => handleReview(p.id, "rejected")} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50">Reject</button>
            <button type="button" disabled={busy === p.id} onClick={() => handleReview(p.id, "needs_edit")} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50">Needs edit</button>
            <button type="button" disabled={busy === p.id} onClick={() => handleReview(p.id, "recheck")} className="rounded-lg bg-slate-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50">Recheck</button>
          </div>
        </div>
      )}

      {p.note && <p className="mt-2 text-sm text-amber-800">Note: {p.note}</p>}
    </article>
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Task Proofs"
        subtitle="Review user proofs. Approved proofs credit points automatically."
      >
        <button type="button" onClick={load} className="btn-ghost border-white/30 bg-white/10 text-white hover:bg-white/20">
          Refresh
        </button>
      </AdminPageHeader>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              tab === t.id ? "bg-accent-600 text-white" : "bg-white text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : tab === "grouped" ? (
        <div className="space-y-8">
          {grouped.map(([taskKey, items]) => (
            <section key={taskKey}>
              <h2 className="font-display text-base font-bold text-ink-900">
                {taskKey} <span className="text-slate-500">({items.length})</span>
              </h2>
              <div className="mt-3 space-y-4">
                {items.slice(0, 10).map((p) => (
                  <ProofCard key={p.id} p={p} />
                ))}
              </div>
            </section>
          ))}
          {grouped.length === 0 && <p className="text-sm text-slate-500">No proofs.</p>}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-slate-500">No proofs in this tab.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => (
            <ProofCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
