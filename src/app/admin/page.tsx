"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatGrid } from "@/components/admin/AdminStatGrid";
import {
  fetchAllAccounts,
  fetchAllProofs,
  fetchAdminTasks,
  fetchAllServiceOrders,
  fetchAllWithdrawals,
} from "@/lib/admin-store";
import { formatMoney, formatPoints, moneyFromPoints } from "@/lib/site";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    totalPoints: 0,
    totalProofs: 0,
    activeTasks: 0,
    pendingWithdrawals: 0,
  });
  const [topUsers, setTopUsers] = useState<
    { username: string; email: string; points: number }[]
  >([]);

  useEffect(() => {
    Promise.all([
      fetchAllAccounts(),
      fetchAllProofs(),
      fetchAdminTasks(),
      fetchAllServiceOrders(),
      fetchAllWithdrawals(),
    ]).then(([accounts, proofs, tasks, _orders, withdrawals]) => {
      const totalPoints = accounts.reduce((s, a) => s + (a.user?.points ?? 0), 0);
      setStats({
        users: accounts.length,
        totalPoints,
        totalProofs: proofs.length,
        activeTasks: tasks.length,
        pendingWithdrawals: withdrawals.filter((w) => w.status === "pending").length,
      });
      setTopUsers(
        accounts
          .map((a) => ({
            username: a.user?.username ?? a.email,
            email: a.email,
            points: a.user?.points ?? 0,
          }))
          .sort((a, b) => b.points - a.points)
          .slice(0, 5),
      );
    });
  }, []);

  const statCards = useMemo(
    () => [
      { label: "Total Users", value: stats.users.toLocaleString(), icon: "👥" },
      { label: "Points Distributed", value: formatPoints(stats.totalPoints), icon: "🪙" },
      { label: "Money Equivalent", value: formatMoney(moneyFromPoints(stats.totalPoints)), icon: "💰" },
      { label: "Total Proofs", value: stats.totalProofs.toLocaleString(), icon: "🧾" },
      { label: "Active Tasks", value: stats.activeTasks.toLocaleString(), icon: "📝" },
      { label: "Pending Withdrawals", value: stats.pendingWithdrawals.toLocaleString(), icon: "💸" },
    ],
    [stats],
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Overview"
        subtitle="Live system status and summary statistics."
      />

      <AdminStatGrid stats={statCards} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 font-bold text-slate-900">🏆 Top earners</h2>
          {topUsers.length === 0 ? (
            <p className="text-sm text-slate-500">No users yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {topUsers.map((u, i) => (
                <li key={u.email} className="flex items-center justify-between py-2.5 text-sm">
                  <Link
                    href={`/admin/users/${encodeURIComponent(u.email)}`}
                    className="font-medium text-accent-700 hover:underline"
                  >
                    {i + 1}. {u.username}
                  </Link>
                  <span className="font-bold text-accent-700">
                    {formatPoints(u.points)} 🪙
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-3 font-bold text-slate-900">⚡ Quick actions</h2>
          <div className="grid gap-3">
            <Link href="/admin/tasks" className="btn-primary justify-start">
              📝 Add new task
            </Link>
            <Link href="/admin/users" className="btn-ghost justify-start">
              👥 View users
            </Link>
            <Link href="/admin/proofs" className="btn-ghost justify-start">
              🧾 Review proofs
            </Link>
            <Link href="/admin/withdrawals" className="btn-ghost justify-start">
              💸 Withdrawals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
