"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatPoints } from "@/lib/site";

export default function DashboardOrdersPage() {
  const { t } = useLocale();
  const { serviceOrders } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t("dashboard.orderHistory")}
        </h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.orders")}</p>
      </div>

      {serviceOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">{t("dashboard.noOrders")}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
          <table className="w-full min-w-[640px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-ink-700">
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">{t("common.points")}</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {serviceOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-ink-900">{o.serviceTitle}</td>
                  <td className="px-4 py-3 text-ink-700">{o.username}</td>
                  <td className="px-4 py-3 capitalize text-slate-500">{o.tier}</td>
                  <td className="px-4 py-3 font-semibold text-brand-800">
                    {formatPoints(o.points)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold capitalize text-slate-700">
                      {o.status}
                    </span>
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
