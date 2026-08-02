"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatPoints } from "@/lib/site";

function statusLabel(t: (k: string) => string, status: string) {
  switch (status) {
    case "approved":
      return t("dashboard.proofApproved");
    case "rejected":
      return t("dashboard.proofRejected");
    case "needs_edit":
      return t("dashboard.proofNeedsEdit");
    default:
      return t("dashboard.proofPending");
  }
}

function statusClass(status: string) {
  switch (status) {
    case "approved":
      return "bg-emerald-100 text-emerald-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "needs_edit":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function DashboardProofsPage() {
  const { t } = useLocale();
  const { proofs } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">{t("dashboard.proofs")}</h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.orderHistory")}</p>
      </div>

      {proofs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">{t("dashboard.noActivity")}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
          <table className="w-full min-w-[640px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-ink-700">
                <th className="px-4 py-3 font-semibold">Task</th>
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">{t("common.points")}</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {proofs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink-900">{p.taskTitle}</p>
                    {p.note && (
                      <p className="mt-0.5 text-xs text-amber-700">{p.note}</p>
                    )}
                    {p.media && (
                      <a
                        href={p.media}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-brand-700 hover:underline"
                      >
                        View proof
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-700">{p.platform}</td>
                  <td className="px-4 py-3 font-semibold text-brand-800">
                    {formatPoints(p.points)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${statusClass(p.status)}`}
                    >
                      {statusLabel(t, p.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(p.createdAt).toLocaleString()}
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
