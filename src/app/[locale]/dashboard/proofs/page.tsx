"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth, type ProofSubmission } from "@/lib/auth-store";
import { formatPoints } from "@/lib/site";

const MAX_VIDEO_SEC = 3.5;
const MAX_FILE_MB = 8;

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

function checkVideoDuration(file: File): Promise<{ ok: boolean; dur: number }> {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      const dur = v.duration || 0;
      URL.revokeObjectURL(v.src);
      resolve({ ok: dur <= MAX_VIDEO_SEC, dur });
    };
    v.onerror = () => resolve({ ok: false, dur: 0 });
    v.src = URL.createObjectURL(file);
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function ProofResubmitForm({ proof }: { proof: ProofSubmission }) {
  const { t } = useLocale();
  const { resubmitProof } = useAuth();
  const [accountName, setAccountName] = useState(proof.accountName ?? "");
  const [media, setMedia] = useState<{ data: string; type: "image" | "video" } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    const isVideo = file.type.startsWith("video");
    if (!isVideo && !file.type.startsWith("image")) {
      setError(t("dashboard.proofFileTypeError"));
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(t("dashboard.proofFileSizeError"));
      return;
    }
    if (isVideo) {
      const { ok, dur } = await checkVideoDuration(file);
      if (!ok) {
        setError(t("dashboard.proofVideoLengthError").replace("{sec}", dur.toFixed(1)));
        return;
      }
    }
    try {
      const data = await fileToDataUrl(file);
      setMedia({ data, type: isVideo ? "video" : "image" });
    } catch {
      setError(t("dashboard.proofFileReadError"));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!accountName.trim()) {
      setError(t("dashboard.proofAccountRequired"));
      return;
    }
    if (!media) {
      setError(t("dashboard.proofMediaRequired"));
      return;
    }
    setBusy(true);
    const res = await resubmitProof(proof.id, {
      media: media.data,
      mediaType: media.type,
      accountName: accountName.trim(),
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? t("errors.generic"));
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
        {t("toast.proofSubmitted")}
      </p>
    );
  }

  return (
    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
      <p className="text-xs font-semibold text-amber-900">{t("dashboard.resubmitProofHint")}</p>
      {proof.note && (
        <p className="mt-1 text-xs text-amber-800">
          <strong>{t("dashboard.adminNote")}:</strong> {proof.note}
        </p>
      )}
      <div className="mt-3 space-y-2">
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder={t("dashboard.proofAccountPlaceholder")}
          aria-label={t("dashboard.proofAccountPlaceholder")}
          className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer rounded-lg border border-dashed border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-900 hover:border-amber-400">
            {media ? t("dashboard.proofSelected") : t("dashboard.uploadProof")}
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
          <button
            type="button"
            disabled={busy}
            onClick={handleSubmit}
            className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {busy ? t("dashboard.submitting") : t("dashboard.resubmitProof")}
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function DashboardProofsPage() {
  const { t } = useLocale();
  const { proofs } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">{t("dashboard.proofs")}</h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.proofsSummary")}</p>
      </div>

      {proofs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">{t("dashboard.noActivity")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {proofs.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-bold text-ink-900">{p.taskTitle}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {p.platform} · {formatPoints(p.points)} {t("common.points")} ·{" "}
                    {new Date(p.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${statusClass(p.status)}`}
                >
                  {statusLabel(t, p.status)}
                </span>
              </div>

              {p.media && p.status !== "needs_edit" && (
                <a
                  href={p.media}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-brand-700 hover:underline"
                >
                  View proof
                </a>
              )}

              {p.status === "needs_edit" && <ProofResubmitForm proof={p} />}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
