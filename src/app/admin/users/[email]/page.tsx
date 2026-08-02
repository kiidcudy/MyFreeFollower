"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  adminUserAction,
  fetchAccountByEmail,
  fetchAllProofs,
  reviewProof,
  type AdminAccount,
  type AdminProof,
  type AdminProofStatus,
} from "@/lib/admin-store";
import { formatMoney, formatPoints, moneyFromPoints } from "@/lib/site";

export default function AdminUserDetailPage() {
  const params = useParams();
  const email = decodeURIComponent(String(params.email ?? ""));
  const [account, setAccount] = useState<AdminAccount | null>(null);
  const [proofs, setProofs] = useState<AdminProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    const [acc, allProofs] = await Promise.all([
      fetchAccountByEmail(email),
      fetchAllProofs(),
    ]);
    setAccount(acc);
    setProofs(allProofs.filter((p) => p.email === email));
    setLoading(false);
  }, [email]);

  useEffect(() => {
    load();
  }, [load]);

  const handleReview = async (id: string, status: AdminProofStatus) => {
    setBusy(id);
    await reviewProof(id, status, note[id]);
    setBusy(null);
    load();
  };

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!account) {
    return (
      <div>
        <p className="text-red-700">User not found.</p>
        <Link href="/admin/users" className="text-teal-700 hover:underline">← Back to users</Link>
      </div>
    );
  }

  const u = account.user;
  const approved = proofs.filter((p) => p.status === "approved").length;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/users" className="text-sm text-teal-700 hover:underline">← Users</Link>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink-900">{u?.username ?? email}</h1>
        <p className="text-sm text-slate-600">{email}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-4 shadow-card">
          <p className="text-xs text-slate-500">Points</p>
          <p className="text-xl font-bold text-teal-800">{formatPoints(u?.points ?? 0)}</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-card">
          <p className="text-xs text-slate-500">Money (÷100)</p>
          <p className="text-xl font-bold">{formatMoney(moneyFromPoints(u?.points ?? 0))}</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-card">
          <p className="text-xs text-slate-500">Proofs</p>
          <p className="text-xl font-bold">{proofs.length} ({approved} approved)</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-card">
          <p className="text-xs text-slate-500">Ref code</p>
          <p className="font-mono text-sm">{u?.refCode ?? "—"}</p>
        </div>
      </div>

      <section className="rounded-xl border bg-white p-5 shadow-card">
        <h2 className="font-display text-lg font-bold">Account</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div><dt className="text-slate-500">Registered</dt><dd>{u?.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}</dd></div>
          <div><dt className="text-slate-500">IP</dt><dd className="font-mono">{account.ip || "—"}</dd></div>
          <div><dt className="text-slate-500">Status</dt><dd>{account.banned ? "Banned" : "Active"}</dd></div>
          <div><dt className="text-slate-500">Invited by</dt><dd>{u?.invitedBy ?? "—"}</dd></div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => adminUserAction(email, account.banned ? "unban" : "ban").then(load)} className="rounded-lg border px-3 py-1.5 text-xs font-semibold">
            {account.banned ? "Unban" : "Ban"}
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold">Proofs ({proofs.length})</h2>
        {proofs.length === 0 ? (
          <p className="text-sm text-slate-500">No proofs submitted.</p>
        ) : (
          proofs.map((p) => (
            <article key={p.id} className="rounded-xl border bg-white p-5 shadow-card">
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-xs text-teal-700">{p.platform} · {p.type}</p>
                  <h3 className="font-bold">{p.taskTitle}</h3>
                  <p className="text-sm text-slate-600">Account: {p.accountName ?? "—"}</p>
                  <p className="text-sm font-semibold text-teal-800">{formatPoints(p.points)} pts</p>
                  <p className="text-xs capitalize text-slate-500">{p.status} · {new Date(p.createdAt).toLocaleString()}</p>
                </div>
                {p.media && (
                  <a href={p.media} target="_blank" rel="noopener noreferrer" className="block max-w-[180px] overflow-hidden rounded-lg border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.media} alt="Proof" className="h-28 w-full object-cover" />
                  </a>
                )}
              </div>
              {["pending", "recheck"].includes(p.status) && (
                <div className="mt-4 border-t pt-4">
                  <input type="text" placeholder="Admin note" value={note[p.id] ?? ""} onChange={(e) => setNote((n) => ({ ...n, [p.id]: e.target.value }))} className="mb-2 w-full max-w-md rounded-lg border px-3 py-2 text-sm" />
                  <div className="flex flex-wrap gap-2">
                    {(["approved", "rejected", "needs_edit", "recheck"] as AdminProofStatus[]).map((st) => (
                      <button key={st} type="button" disabled={busy === p.id} onClick={() => handleReview(p.id, st)} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold capitalize text-white disabled:opacity-50">
                        {st.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
}
