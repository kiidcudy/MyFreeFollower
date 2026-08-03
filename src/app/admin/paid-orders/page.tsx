"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchAllServiceOrders,
  updateServiceOrder,
  type AdminServiceOrder,
} from "@/lib/admin-store";

type DeliveryStatus = "pending" | "processing" | "completed";
type PaymentStatus = "pending" | "paid" | "failed";

function StatusPill({ label, tone }: { label: string; tone: "amber" | "green" | "blue" | "red" | "slate" }) {
  const tones = {
    amber: "bg-amber-100 text-amber-900",
    green: "bg-emerald-100 text-emerald-800",
    blue: "bg-sky-100 text-sky-800",
    red: "bg-red-100 text-red-800",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${tones[tone]}`}>
      {label}
    </span>
  );
}

function paymentTone(s: PaymentStatus | undefined): "amber" | "green" | "red" | "slate" {
  if (s === "paid") return "green";
  if (s === "failed") return "red";
  if (s === "pending") return "amber";
  return "slate";
}

function deliveryTone(s: DeliveryStatus): "amber" | "green" | "blue" | "slate" {
  if (s === "completed") return "green";
  if (s === "processing") return "blue";
  return "amber";
}

function formatCharge(o: AdminServiceOrder): string {
  if (o.chargeEUR != null && o.chargeEUR > 0) {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(o.chargeEUR);
  }
  if (o.chargeUSD != null && o.chargeUSD > 0) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(o.chargeUSD);
  }
  return "—";
}

export default function AdminPaidOrdersPage() {
  const [orders, setOrders] = useState<AdminServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllServiceOrders();
    setOrders(data.filter((o) => o.tier === "paid"));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(
    () => ({
      total: orders.length,
      pendingPayment: orders.filter((o) => (o.paymentStatus ?? "pending") === "pending").length,
      pendingDelivery: orders.filter((o) => o.status === "pending" || o.status === "processing").length,
    }),
    [orders],
  );

  const patchOrder = async (id: string, patch: Partial<AdminServiceOrder>) => {
    setBusy(id);
    await updateServiceOrder(id, patch);
    setBusy(null);
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Paid Orders</h1>
        <p className="mt-1 text-sm text-slate-600">
          Card and crypto checkout orders · {stats.total} total · {stats.pendingPayment} pending payment ·{" "}
          {stats.pendingDelivery} in delivery
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-slate-500">No paid orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
          <table className="w-full min-w-[1100px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-600">
                <th className="px-4 py-3 font-semibold">Order #</th>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">Qty</th>
                <th className="px-4 py-3 font-semibold">Charge</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Delivery</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => {
                const paymentStatus = (o.paymentStatus ?? "pending") as PaymentStatus;
                return (
                  <tr key={o.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{o.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink-900">{o.email}</p>
                      <p className="text-xs text-slate-500">{o.memberUsername}</p>
                    </td>
                    <td className="px-4 py-3 font-medium text-ink-900">{o.serviceTitle}</td>
                    <td className="max-w-[140px] truncate px-4 py-3 text-slate-600" title={o.username}>
                      {o.username}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-800">{o.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 font-semibold text-ink-900">{formatCharge(o)}</td>
                    <td className="px-4 py-3">
                      <StatusPill label={paymentStatus} tone={paymentTone(paymentStatus)} />
                      <p className="mt-1 text-[10px] uppercase text-slate-400">{o.paymentMethod ?? "—"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill label={o.status} tone={deliveryTone(o.status)} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        <select
                          value={o.status}
                          disabled={busy === o.id}
                          onChange={(e) =>
                            patchOrder(o.id, { status: e.target.value as DeliveryStatus })
                          }
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold"
                          aria-label="Change delivery"
                        >
                          <option value="pending">Change delivery: Pending</option>
                          <option value="processing">Change delivery: Processing</option>
                          <option value="completed">Change delivery: Completed</option>
                        </select>
                        <select
                          value={paymentStatus}
                          disabled={busy === o.id}
                          onChange={(e) =>
                            patchOrder(o.id, { paymentStatus: e.target.value as PaymentStatus })
                          }
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold"
                          aria-label="Change payment"
                        >
                          <option value="pending">Payment: Pending</option>
                          <option value="paid">Payment: Paid</option>
                          <option value="failed">Payment: Failed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
