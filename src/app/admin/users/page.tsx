"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  adminUserAction,
  fetchAllAccounts,
  fetchAllProofs,
  getAdminPassword,
  type AdminAccount,
} from "@/lib/admin-store";
import { formatMoney, formatPoints, moneyFromPoints } from "@/lib/site";

type SortKey = "email" | "points" | "createdAt";
type SortDir = "asc" | "desc";

export default function AdminUsersPage() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [proofCounts, setProofCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");
  const [menuEmail, setMenuEmail] = useState<string | null>(null);
  const [actionEmail, setActionEmail] = useState<string | null>(null);
  const [actionValue, setActionValue] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [accs, proofs] = await Promise.all([fetchAllAccounts(), fetchAllProofs()]);
    const counts: Record<string, number> = {};
    for (const p of proofs) counts[p.email] = (counts[p.email] ?? 0) + 1;
    setProofCounts(counts);
    setAccounts(accs);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "createdAt" ? "desc" : "asc");
    }
  };

  const sorted = useMemo(() => {
    let list = [...accounts];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.email.toLowerCase().includes(q) ||
          a.user?.username?.toLowerCase().includes(q) ||
          (a.ip ?? "").toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "email") cmp = a.email.localeCompare(b.email);
      else if (sortKey === "points") cmp = (a.user?.points ?? 0) - (b.user?.points ?? 0);
      else cmp = (a.user?.createdAt ?? 0) - (b.user?.createdAt ?? 0);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [accounts, sortKey, sortDir, search]);

  const runAction = async (
    email: string,
    action: "setPoints" | "addPoints" | "setPassword" | "ban" | "unban",
  ) => {
    const val = action === "ban" || action === "unban" ? undefined : actionValue;
    if (action !== "ban" && action !== "unban" && !val) return;
    await adminUserAction(email, action, val);
    setMenuEmail(null);
    setActionEmail(null);
    setActionValue("");
    load();
  };

  const SortBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <button type="button" onClick={() => toggleSort(col)} className="inline-flex items-center gap-1 font-semibold hover:text-teal-700">
      {label}
      {sortKey === col && <span>{sortDir === "asc" ? "↑" : "↓"}</span>}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Users</h1>
          <p className="mt-1 text-sm text-slate-600">{sorted.length} accounts</p>
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username, email, IP…"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
          <table className="w-full min-w-[1000px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-ink-700">
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3"><SortBtn col="email" label="Email" /></th>
                <th className="px-4 py-3"><SortBtn col="createdAt" label="Registered" /></th>
                <th className="px-4 py-3"><SortBtn col="points" label="Points" /></th>
                <th className="px-4 py-3">Money</th>
                <th className="px-4 py-3">Proofs</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">⋮</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((a) => (
                <tr key={a.email} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${encodeURIComponent(a.email)}`} className="font-semibold text-teal-800 hover:underline">
                      {a.user?.username ?? "—"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{a.email}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {a.user?.createdAt ? new Date(a.user.createdAt).toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-teal-800">{formatPoints(a.user?.points ?? 0)}</td>
                  <td className="px-4 py-3 text-xs">{formatMoney(moneyFromPoints(a.user?.points ?? 0))}</td>
                  <td className="px-4 py-3">{proofCounts[a.email] ?? 0}</td>
                  <td className="px-4 py-3 font-mono text-xs">{a.ip || "—"}</td>
                  <td className="px-4 py-3">
                    {a.banned ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-800">Banned</span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">Active</span>
                    )}
                  </td>
                  <td className="relative px-4 py-3">
                    <button type="button" onClick={() => setMenuEmail(menuEmail === a.email ? null : a.email)} className="rounded px-2 py-1 hover:bg-slate-100">⋮</button>
                    {menuEmail === a.email && (
                      <div className="absolute end-0 z-10 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                        <button type="button" className="block w-full px-3 py-2 text-start text-xs hover:bg-slate-50" onClick={() => { setActionEmail(a.email); setActionValue(String(a.user?.points ?? 0)); }}>Set points</button>
                        <button type="button" className="block w-full px-3 py-2 text-start text-xs hover:bg-slate-50" onClick={() => { setActionEmail(a.email + ":add"); setActionValue("100"); }}>Add/subtract points</button>
                        <button type="button" className="block w-full px-3 py-2 text-start text-xs hover:bg-slate-50" onClick={() => { setActionEmail(a.email + ":pw"); setActionValue(""); }}>Change password</button>
                        <button type="button" className="block w-full px-3 py-2 text-start text-xs hover:bg-slate-50" onClick={() => navigator.clipboard.writeText(a.ip ?? "")}>Copy IP</button>
                        <button type="button" className="block w-full px-3 py-2 text-start text-xs hover:bg-slate-50" onClick={() => runAction(a.email, a.banned ? "unban" : "ban")}>{a.banned ? "Unban" : "Ban"}</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {actionEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3 className="font-bold text-ink-900">User action</h3>
            <input value={actionValue} onChange={(e) => setActionValue(e.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder={actionEmail.includes(":pw") ? "New password (min 6)" : "Value"} />
            <div className="mt-4 flex gap-2">
              <button type="button" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white" onClick={() => {
                const email = actionEmail.split(":")[0];
                if (actionEmail.includes(":add")) runAction(email, "addPoints");
                else if (actionEmail.includes(":pw")) runAction(email, "setPassword");
                else runAction(email, "setPoints");
              }}>Apply</button>
              <button type="button" className="rounded-lg border px-4 py-2 text-sm" onClick={() => setActionEmail(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {!getAdminPassword() && <p className="text-xs text-amber-700">Admin session may have expired.</p>}
    </div>
  );
}
