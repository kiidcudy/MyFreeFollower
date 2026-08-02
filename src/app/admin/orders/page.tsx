"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchAllServiceOrders,
  updateServiceOrderStatus,
  type AdminServiceOrder,
} from "@/lib/admin-store";
import { formatPoints } from "@/lib/site";

type OrderStatus = "pending" | "processing" | "completed";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllServiceOrders();
    setOrders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    setBusy(id);
    await updateServiceOrderStatus(id, status);
    setBusy(null);
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Orders</h1>
        <p className="mt-1 text-sm text-slate-600">Free and paid service orders</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-slate-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
          <table className="w-full min-w-[900px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-ink-700">
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Member</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Points</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink-900">{o.serviceTitle}</p>
                    <p className="text-xs text-slate-500">{o.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-ink-900">{o.memberUsername}</p>
                    <p className="text-xs text-slate-500">{o.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.username}</td>
                  <td className="px-4 py-3 capitalize">{o.tier}</td>
                  <td className="px-4 py-3 font-semibold text-teal-800">
                    {formatPoints(o.points)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      disabled={busy === o.id}
                      onChange={(e) =>
                        handleStatusChange(o.id, e.target.value as OrderStatus)
                      }
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold capitalize"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
