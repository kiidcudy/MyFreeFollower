"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminUserAction,
  fetchAllAccounts,
  getAdminPassword,
  type AdminAccount,
} from "@/lib/admin-store";
import { formatPoints } from "@/lib/site";

type SortKey = "email" | "points" | "banned" | "ip" | "createdAt";
type SortDir = "asc" | "desc";

export default function AdminUsersPage() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllAccounts();
    setAccounts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    let list = [...accounts];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.email.toLowerCase().includes(q) ||
          a.user?.username?.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "email":
          cmp = a.email.localeCompare(b.email);
          break;
        case "points":
          cmp = (a.user?.points ?? 0) - (b.user?.points ?? 0);
          break;
        case "banned":
          cmp = Number(a.banned ?? false) - Number(b.banned ?? false);
          break;
        case "ip":
          cmp = (a.ip ?? "").localeCompare(b.ip ?? "");
          break;
        case "createdAt":
          cmp = (a.user?.createdAt ?? 0) - (b.user?.createdAt ?? 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [accounts, sortKey, sortDir, search]);

  const handleBan = async (email: string, banned: boolean) => {
    await adminUserAction(email, banned ? "ban" : "unban");
    load();
  };

  const SortBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <button
      type="button"
      onClick={() => toggleSort(col)}
      className="inline-flex items-center gap-1 font-semibold hover:text-teal-700"
    >
      {label}
      {sortKey === col && (
        <span className="text-teal-600">{sortDir === "asc" ? "↑" : "↓"}</span>
      )}
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
          placeholder="Search email or username…"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
          <table className="w-full min-w-[800px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-ink-700">
                <th className="px-4 py-3">
                  <SortBtn col="email" label="Email" />
                </th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">
                  <SortBtn col="points" label="Points" />
                </th>
                <th className="px-4 py-3">
                  <SortBtn col="banned" label="Banned" />
                </th>
                <th className="px-4 py-3">
                  <SortBtn col="ip" label="IP" />
                </th>
                <th className="px-4 py-3">
                  <SortBtn col="createdAt" label="Registered" />
                </th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((a) => (
                <tr key={a.email} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-ink-900">{a.email}</td>
                  <td className="px-4 py-3 text-slate-600">{a.user?.username ?? "—"}</td>
                  <td className="px-4 py-3 font-semibold text-teal-800">
                    {formatPoints(a.user?.points ?? 0)}
                  </td>
                  <td className="px-4 py-3">
                    {a.banned ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-800">
                        Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {a.ip || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {a.user?.createdAt
                      ? new Date(a.user.createdAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleBan(a.email, !a.banned)}
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        a.banned
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {a.banned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!getAdminPassword() && (
        <p className="text-xs text-amber-700">Admin session may have expired.</p>
      )}
    </div>
  );
}
