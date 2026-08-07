"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth, type ProofSubmission } from "@/lib/auth-store";
import { effectivePoints } from "@/lib/site";
import {
  getPlatformMeta,
  getTypeMeta,
  PLATFORM_FILTERS,
  taskGuidelines,
} from "@/lib/tasks/platform-meta";
import type { Task } from "@/lib/tasks/data";
import { extractUsername } from "@/lib/username";

const MAX_VIDEO_SEC = 3.5;
const MAX_FILE_MB = 8;

const statusMeta: Record<
  ProofSubmission["status"],
  { labelKey: string; cls: string }
> = {
  pending: { labelKey: "statusPending", cls: "bg-amber-100 text-amber-700" },
  approved: { labelKey: "statusApproved", cls: "bg-emerald-100 text-emerald-800" },
  rejected: { labelKey: "statusRejected", cls: "bg-red-100 text-red-700" },
  needs_edit: { labelKey: "statusNeedsEdit", cls: "bg-orange-100 text-orange-700" },
  recheck: { labelKey: "statusRecheck", cls: "bg-blue-100 text-blue-700" },
};

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

function matchPlatform(taskPlatform: string, filter: string): boolean {
  if (filter === "All") return true;
  if (filter === "Twitter") {
    return taskPlatform === "Twitter" || taskPlatform === "X (Twitter)";
  }
  return taskPlatform === filter;
}

export function TaskRunner() {
  const { t } = useLocale();
  const { tasks, proofs, submitProof, refreshTasks } = useAuth();
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<string | null>(null);
  const [media, setMedia] = useState<Record<string, { data: string; type: "image" | "video" }>>({});
  const [accountNames, setAccountNames] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    void refreshTasks();
  }, [refreshTasks]);

  const proofByTask = useMemo(() => {
    const m = new Map<string, ProofSubmission>();
    for (const p of proofs) if (!m.has(p.taskId)) m.set(p.taskId, p);
    return m;
  }, [proofs]);

  const list = useMemo(
    () => tasks.filter((t) => matchPlatform(t.platform, filter)),
    [tasks, filter],
  );

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 4000);
  };

  const onFile = async (taskId: string, file: File | undefined) => {
    if (!file) return;
    const isVideo = file.type.startsWith("video");
    if (!isVideo && !file.type.startsWith("image")) {
      showToast(t("dashboard.proofFileTypeError"));
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      showToast(t("dashboard.proofFileSizeError"));
      return;
    }
    if (isVideo) {
      const { ok, dur } = await checkVideoDuration(file);
      if (!ok) {
        showToast(t("dashboard.proofVideoLengthError").replace("{sec}", dur ? dur.toFixed(1) : "?"));
        return;
      }
    }
    try {
      const data = await fileToDataUrl(file);
      setMedia((m) => ({ ...m, [taskId]: { data, type: isVideo ? "video" : "image" } }));
    } catch {
      showToast(t("dashboard.proofFileReadError"));
    }
  };

  const handleSubmit = async (task: Task) => {
    const account = (accountNames[task.id] ?? "").trim();
    if (!account) {
      showToast(t("dashboard.proofAccountRequired"));
      return;
    }
    const m = media[task.id];
    if (!m) {
      showToast(t("dashboard.proofMediaRequired"));
      return;
    }
    setBusy(task.id);
    const res = await submitProof(task.id, {
      media: m.data,
      mediaType: m.type,
      accountName: account,
    });
    setBusy(null);
    if (res.ok) {
      showToast(t("toast.proofSubmitted"));
      setActive(null);
      setMedia((mm) => {
        const c = { ...mm };
        delete c[task.id];
        return c;
      });
      setAccountNames((a) => {
        const c = { ...a };
        delete c[task.id];
        return c;
      });
    } else {
      showToast(res.error ?? t("errors.generic"));
    }
  };

  const filterLabel = (f: string) =>
    f === "All" ? t("dashboard.filterAll") : f;

  return (
    <div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm">
        <div className="mb-1.5 font-bold text-amber-800">{t("dashboard.taskRulesTitle")}</div>
        <ul className="space-y-1.5 text-amber-800/90">
          {taskGuidelines.map((g, i) => (
            <li key={i} className="flex gap-2">
              <span>•</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {PLATFORM_FILTERS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setFilter(p)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              filter === p
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {filterLabel(p)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((task) => {
          const pm = getPlatformMeta(task.platform);
          const pr = proofByTask.get(task.id);
          const done = Boolean(pr);
          const isOpen = active === task.id && !done;
          const reward = effectivePoints(task.basePoints);

          return (
            <div
              key={task.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card"
            >
              <div className="flex flex-wrap items-center gap-4 p-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ background: pm.bg }}
                >
                  {pm.emoji}
                </span>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="font-display text-lg font-bold text-ink-900">{task.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 font-bold text-brand-800">
                      {task.platform}
                    </span>
                    <span>
                      {getTypeMeta(task.type).emoji} {task.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-xl font-bold text-brand-700">+{reward} 🪙</span>
                  {pr && (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusMeta[pr.status].cls}`}>
                      {t(`dashboard.${statusMeta[pr.status].labelKey}`)}
                    </span>
                  )}
                  {!done && (
                    <button
                      type="button"
                      onClick={() => setActive(isOpen ? null : task.id)}
                      className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      {isOpen ? t("dashboard.closeTask") : t("dashboard.startTask")}
                    </button>
                  )}
                </div>
              </div>

              {pr?.note && ["rejected", "needs_edit"].includes(pr.status) && (
                <div className="border-t border-slate-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  📝 <strong>{t("dashboard.adminNote")}:</strong> {pr.note}
                </div>
              )}

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50 p-4">
                  {(() => {
                    const username = extractUsername(task.url);
                    const isFollow =
                      /follow|takip|abone/i.test(task.type);
                    return username && isFollow ? (
                      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5 text-sm">
                        <span className="font-semibold text-ink-700">
                          👤 {t("dashboard.followAccount")}:
                        </span>
                        <a
                          href={task.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-700 hover:underline"
                        >
                          @{username}
                        </a>
                      </div>
                    ) : null;
                  })()}
                  <p className="mb-3 text-sm text-slate-600">
                    <strong>{t("dashboard.taskLabel")}:</strong> {task.instructions}
                  </p>

                  <div className="mb-3">
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      {t("dashboard.proofAccountLabel")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={accountNames[task.id] ?? ""}
                      onChange={(e) =>
                        setAccountNames((a) => ({ ...a, [task.id]: e.target.value }))
                      }
                      placeholder={t("dashboard.proofAccountPlaceholder")}
                      aria-label={t("dashboard.proofAccountLabel")}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={task.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-slate-50"
                    >
                      🔗 {t("dashboard.openTask")}
                    </a>
                    <label className="cursor-pointer rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-600 hover:border-brand-400">
                      📷{" "}
                      {media[task.id]
                        ? t("dashboard.proofSelected")
                        : t("dashboard.uploadProof")}
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => onFile(task.id, e.target.files?.[0])}
                      />
                    </label>
                    <button
                      type="button"
                      disabled={!media[task.id] || busy === task.id}
                      onClick={() => handleSubmit(task)}
                      className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                    >
                      {busy === task.id ? t("dashboard.submitting") : t("dashboard.submitProof")}
                    </button>
                  </div>
                  {media[task.id]?.type === "video" && (
                    <video
                      src={media[task.id].data}
                      controls
                      className="mt-3 max-h-48 rounded-lg border border-slate-200"
                    />
                  )}
                  <p className="mt-2 text-xs text-slate-400">{t("dashboard.proofReviewHint")}</p>
                </div>
              )}
            </div>
          );
        })}
        {list.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            {t("dashboard.noTasksInFilter")}
          </p>
        )}
      </div>
    </div>
  );
}
