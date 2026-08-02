"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchAllAccounts,
  fetchAllProofs,
  fetchAllServiceOrders,
  fetchAllWithdrawals,
} from "@/lib/admin-store";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    pendingProofs: 0,
    pendingOrders: 0,
    pendingWithdrawals: 0,
  });

  useEffect(() => {
    Promise.all([
      fetchAllAccounts(),
      fetchAllProofs(),
      fetchAllServiceOrders(),
      fetchAllWithdrawals(),
    ]).then(([accounts, proofs, orders, withdrawals]) => {
      setStats({
        users: accounts.length,
        pendingProofs: proofs.filter((p) => p.status === "pending").length,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        pendingWithdrawals: withdrawals.filter((w) => w.status === "pending").length,
      });
    });
  }, []);

  const cards = [
    { label: "Total users", value: stats.users, href: "/admin/users", color: "text-teal-700" },
    {
      label: "Pending proofs",
      value: stats.pendingProofs,
      href: "/admin/proofs",
      color: "text-amber-700",
    },
    {
      label: "Pending orders",
      value: stats.pendingOrders,
      href: "/admin/orders",
      color: "text-blue-700",
    },
    {
      label: "Pending withdrawals",
      value: stats.pendingWithdrawals,
      href: "/admin/withdrawals",
      color: "text-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Overview</h1>
        <p className="mt-1 text-sm text-slate-600">Admin dashboard statistics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-teal-300 hover:shadow-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className={`mt-2 font-display text-3xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-bold text-ink-900">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/admin/proofs"
            className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-200"
          >
            Review proofs
          </Link>
          <Link
            href="/admin/withdrawals"
            className="rounded-lg bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-900 hover:bg-purple-200"
          >
            Review withdrawals
          </Link>
          <Link
            href="/admin/orders"
            className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-200"
          >
            Manage orders
          </Link>
        </div>
      </div>
    </div>
  );
}
