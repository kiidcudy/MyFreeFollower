"use client";

import { useMemo } from "react";
import { PanelHeader } from "@/components/panel/PanelHeader";
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
    case "recheck":
      return t("dashboard.statusRecheck");
    default:
      return t("dashboard.proofPending");
  }
}

function statusClass(status: string) {
  switch (status) {
    case "approved":
      return "bg-accent-100 text-accent-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "needs_edit":
      return "bg-orange-100 text-orange-800";
    case "recheck":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-amber-100 text-amber-800";
  }
}

export default function DashboardProofsPage() {
  const { t } = useLocale();
  const { proofs } = useAuth();

  const summary = useMemo(
    () => ({
      total: proofs.length,
      approved: proofs.filter((p) => p.status === "approved").length,
      waiting: proofs.filter((p) => p.status === "pending" || p.status === "recheck").length,
    }),
    [proofs],
  );

  return (
    <div className="space-y-6">
      <PanelHeader title={t("dashboard.proofs")} subtitle={t("dashboard.proofsSummary")}>
        <div className="flex gap-4 text-sm font-bold">
          <span>{summary.total} {t("dashboard.proofsTotal")}</span>
          <span>{summary.approved} {t("dashboard.proofsApproved")}</span>
          <span>{summary.waiting} {t("dashboard.proofsWaiting")}</span>
        </div>
      </PanelHeader>

      {proofs.length === 0 ? (
        <div className="card border-dashed p-10 text-center text-sm text-slate-500">
          {t("dashboard.noActivity")}
        </div>
      ) : (
        <div className="space-y-3">
          {proofs.map((p) => (
            <article key={p.id} className="card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900">{p.taskTitle}</h2>
                  <p className="text-xs text-slate-500">
                    {p.platform} · {new Date(p.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge bg-amber-100 font-bold text-amber-700">
                    +{formatPoints(p.points)} 🪙
                  </span>
                  <span className={`badge ${statusClass(p.status)}`}>
                    {statusLabel(t, p.status)}
                  </span>
                </div>
              </div>
              {p.note && (
                <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{p.note}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
