"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { effectivePoints, formatPoints } from "@/lib/site";

export default function DashboardTasksPage() {
  const { t } = useLocale();
  const { tasks, proofs, submitProof } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const proofFor = (taskId: string) => proofs.find((p) => p.taskId === taskId);

  const handleSubmit = async (taskId: string) => {
    setLoading(true);
    setMessage(null);
    const res = await submitProof(taskId, {
      media: imageUrl.trim(),
      mediaType: "image",
      accountName: accountName.trim(),
    });
    setLoading(false);
    if (res.ok) {
      setMessage({ type: "ok", text: t("toast.proofSubmitted") });
      setSelectedId(null);
      setImageUrl("");
      setAccountName("");
    } else {
      setMessage({ type: "err", text: res.error ?? t("errors.generic") });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">{t("dashboard.tasks")}</h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.taskAvailable")}</p>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "ok"
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
              : "bg-red-50 text-red-800 ring-1 ring-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {tasks.map((task) => {
          const proof = proofFor(task.id);
          const points = effectivePoints(task.basePoints);
          const isOpen = selectedId === task.id;
          const blocked =
            proof && ["pending", "approved", "recheck"].includes(proof.status);

          return (
            <article
              key={task.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-800">
                      {task.platform}
                    </span>
                    <span className="text-xs text-slate-500">{task.type}</span>
                  </div>
                  <h2 className="mt-2 font-display text-lg font-bold text-ink-900">
                    {task.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-700">{task.instructions}</p>
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:underline"
                  >
                    Open task →
                  </a>
                </div>
                <div className="text-end">
                  <p className="font-display text-xl font-bold text-brand-700">
                    +{formatPoints(points)}
                  </p>
                  <p className="text-xs text-slate-500">{t("common.points")}</p>
                  {proof && (
                    <span
                      className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-bold capitalize ${
                        proof.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : proof.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : proof.status === "needs_edit"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {proof.status === "approved"
                        ? t("dashboard.proofApproved")
                        : proof.status === "rejected"
                          ? t("dashboard.proofRejected")
                          : proof.status === "needs_edit"
                            ? t("dashboard.proofNeedsEdit")
                            : t("dashboard.proofPending")}
                    </span>
                  )}
                </div>
              </div>

              {!blocked && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  {!isOpen ? (
                    <button
                      type="button"
                      onClick={() => setSelectedId(task.id)}
                      className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      {t("dashboard.taskSubmitProof")}
                    </button>
                  ) : (
                    <div className="space-y-3 rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-ink-700">
                        {t("dashboard.proofUploadHint")}
                      </p>
                      <label className="block text-sm font-medium text-ink-900">
                        Image URL (demo)
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://example.com/screenshot.png"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="block text-sm font-medium text-ink-900">
                        Account name
                        <input
                          type="text"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          placeholder="@yourusername"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={loading || !imageUrl.trim()}
                          onClick={() => handleSubmit(task.id)}
                          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                        >
                          {t("dashboard.proofSubmit")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedId(null)}
                          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-ink-700"
                        >
                          {t("common.cancel")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
