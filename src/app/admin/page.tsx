"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  fetchAllAccounts,
  fetchAllProofs,
  fetchAdminTasks,
  fetchAllServiceOrders,
} from "@/lib/admin-store";
import { formatPoints } from "@/lib/site";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    totalPoints: 0,
    totalProofs: 0,
    activeTasks: 0,
    pendingProofs: 0,
    pendingOrders: 0,
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
    ]).then(([accounts, proofs, tasks, orders]) => {
      const totalPoints = accounts.reduce((s, a) => s + (a.user?.points ?? 0), 0);
      setStats({
        users: accounts.length,
        totalPoints,
        totalProofs: proofs.length,
        activeTasks: tasks.length,
        pendingProofs: proofs.filter((p) => p.status === "pending").length,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
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

  const cards = useMemo(
    () => [
      { label: "Total Users", value: stats.users, href: "/admin/users" },
      {
        label: "Total Points (balances)",
        value: formatPoints(stats.totalPoints),
        href: "/admin/users",
      },
      { label: "Total Proofs", value: stats.totalProofs, href: "/admin/proofs" },
      { label: "Active Tasks", value: stats.activeTasks, href: "/admin/tasks" },
      { label: "Pending Proofs", value: stats.pendingProofs, href: "/admin/proofs" },
      { label: "Pending Orders", value: stats.pendingOrders, href: "/admin/orders" },
    ],
    [stats],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Overview</h1>
        <p className="mt-1 text-sm text-slate-600">
          Live stats · {stats.pendingProofs} pending proofs · {stats.pendingOrders} pending orders
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-teal-300"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-teal-800">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink-900">Top 5 users by points</h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {topUsers.map((u) => (
              <li key={u.email} className="flex items-center justify-between py-2 text-sm">
                <Link href={`/admin/users/${encodeURIComponent(u.email)}`} className="font-medium text-teal-800 hover:underline">
                  {u.username}
                </Link>
                <span className="font-semibold">{formatPoints(u.points)}</span>
              </li>
            ))}
            {topUsers.length === 0 && (
              <li className="py-4 text-sm text-slate-500">No users yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink-900">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/admin/tasks" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500">
              Add Task
            </Link>
            <Link href="/admin/users" className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-ink-800 hover:bg-slate-300">
              View Users
            </Link>
            <Link href="/admin/proofs" className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-200">
              Review Proofs
            </Link>
            <Link href="/admin/orders" className="rounded-lg bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-900 hover:bg-purple-200">
              Orders
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
