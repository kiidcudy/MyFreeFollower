"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  clearAllTasks,
  fetchAdminTasks,
  removeTask,
  saveTask,
} from "@/lib/admin-store";
import { formatPoints, siteConfig } from "@/lib/site";
import type { Task } from "@/lib/tasks/data";
import {
  ADMIN_PLATFORM_OPTIONS,
  ADMIN_TASK_PLATFORMS,
  DEFAULT_TASK_INSTRUCTIONS,
  defaultTaskTitle,
  resolveTaskBasePoints,
  userTaskPoints,
} from "@/lib/tasks/points";

const emptyForm = (): Partial<Task> => ({
  platform: "Instagram",
  type: "Follow",
  title: defaultTaskTitle("Instagram", "Follow"),
  basePoints: resolveTaskBasePoints("Follow", "Instagram"),
  url: "",
  instructions: DEFAULT_TASK_INSTRUCTIONS,
  limit: 0,
});

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Partial<Task>>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customPlatform, setCustomPlatform] = useState("");
  const [customType, setCustomType] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setTasks(await fetchAdminTasks());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const platform = form.platform === "Other" ? customPlatform : (form.platform ?? "");
  const type =
    form.platform === "Other" || !ADMIN_TASK_PLATFORMS[form.platform ?? ""]
      ? customType || form.type || ""
      : (form.type ?? "");

  const applyPlatformType = (nextPlatform: string, nextType: string) => {
    const base = resolveTaskBasePoints(nextType, nextPlatform);
    setForm((f) => ({
      ...f,
      platform: nextPlatform,
      type: nextType,
      title: defaultTaskTitle(nextPlatform, nextType),
      basePoints: base,
    }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setCustomPlatform("");
    setCustomType("");
    setFormOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingId(task.id);
    setForm({ ...task });
    if (!ADMIN_TASK_PLATFORMS[task.platform]) {
      setCustomPlatform(task.platform);
      setCustomType(task.type);
      setForm((f) => ({ ...f, platform: "Other" }));
    }
    setFormOpen(true);
  };

  const handleSave = async () => {
    const payload: Partial<Task> & { update?: boolean } = {
      ...form,
      platform,
      type,
      title: form.title || defaultTaskTitle(platform, type),
      basePoints: Number(form.basePoints) || resolveTaskBasePoints(type, platform),
      url: form.url?.trim() ?? "",
      instructions: form.instructions?.trim() || DEFAULT_TASK_INSTRUCTIONS,
      limit: Number(form.limit) || 0,
      update: Boolean(editingId),
      ...(editingId ? { id: editingId } : {}),
    };
    if (!payload.url) {
      setMessage("Task URL is required.");
      return;
    }
    const res = await saveTask(payload);
    if (res.ok) {
      if (res.tasks?.length) {
        setTasks(res.tasks);
      } else {
        await load();
      }
      setFormOpen(false);
      setMessage(`Task saved. ${res.tasks?.length ?? 0} task(s) live.`);
    } else {
      setMessage(res.error ?? "Save failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await removeTask(id);
    load();
  };

  const handleClearAll = async () => {
    if (!confirm("Delete ALL tasks? This cannot be undone.")) return;
    await clearAllTasks();
    load();
  };

  const typeOptions =
    form.platform && ADMIN_TASK_PLATFORMS[form.platform]
      ? ADMIN_TASK_PLATFORMS[form.platform]
      : [];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Task Management"
        subtitle={`Base points × ${siteConfig.pointsMultiplier} awarded on proof approval`}
      >
        <div className="flex gap-2">
          <button type="button" onClick={openCreate} className="btn-primary px-4 py-2 text-sm">
            + New Task
          </button>
          <button type="button" onClick={handleClearAll} className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-100">
            Clear All
          </button>
        </div>
      </AdminPageHeader>

      {message && (
        <p
          className={`rounded-lg px-4 py-2 text-sm ${
            message.includes("saved") || message.includes("Saved")
              ? "bg-accent-50 text-accent-900"
              : "bg-amber-50 text-amber-900"
          }`}
        >
          {message}
        </p>
      )}

      {formOpen && (
        <div className="card p-6">
          <h2 className="font-display text-lg font-bold">+ {editingId ? "Edit Task" : "New Task"}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Platform
              <select
                value={form.platform}
                onChange={(e) => {
                  const p = e.target.value;
                  const types = ADMIN_TASK_PLATFORMS[p];
                  const t = types?.[0] ?? "";
                  if (p === "Other") {
                    setForm((f) => ({ ...f, platform: "Other" }));
                  } else if (t) {
                    applyPlatformType(p, t);
                  } else {
                    setForm((f) => ({ ...f, platform: p }));
                  }
                }}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                {ADMIN_PLATFORM_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>

            {form.platform === "Other" ? (
              <>
                <label className="block text-sm font-semibold">
                  Custom platform
                  <input value={customPlatform} onChange={(e) => { setCustomPlatform(e.target.value); applyPlatformType(e.target.value, customType || "Like"); }} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                </label>
                <label className="block text-sm font-semibold">
                  Custom type
                  <input value={customType} onChange={(e) => { setCustomType(e.target.value); applyPlatformType(customPlatform, e.target.value); }} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                </label>
              </>
            ) : (
              <label className="block text-sm font-semibold">
                Type
                <select
                  value={form.type}
                  onChange={(e) => applyPlatformType(form.platform!, e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            )}

            <label className="block text-sm font-semibold sm:col-span-2">
              Title
              <input value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </label>

            <label className="block text-sm font-semibold">
              Base points
              <input type="number" value={form.basePoints ?? 0} onChange={(e) => setForm((f) => ({ ...f, basePoints: Number(e.target.value) }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <span className="mt-1 block text-xs text-slate-500">
                User receives: {userTaskPoints(form.basePoints ?? 0)} pts
              </span>
            </label>

            <label className="block text-sm font-semibold">
              Limit (0 = unlimited)
              <input type="number" value={form.limit ?? 0} onChange={(e) => setForm((f) => ({ ...f, limit: Number(e.target.value) }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </label>

            <label className="block text-sm font-semibold sm:col-span-2">
              URL *
              <input value={form.url ?? ""} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" required />
            </label>

            <label className="block text-sm font-semibold sm:col-span-2">
              Instructions
              <textarea value={form.instructions ?? ""} onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))} rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={handleSave} className="btn-primary px-4 py-2 text-sm">Publish Task</button>
            <button type="button" onClick={() => setFormOpen(false)} className="btn-ghost px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-slate-500">No tasks. Click Add Task to create one.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[960px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-ink-700">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Base</th>
                <th className="px-4 py-3">User gets</th>
                <th className="px-4 py-3">Limit / Count</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-xs">{task.id}</td>
                  <td className="px-4 py-3">{task.platform}</td>
                  <td className="px-4 py-3">{task.type}</td>
                  <td className="px-4 py-3 font-medium">{task.title}</td>
                  <td className="px-4 py-3">{task.basePoints}</td>
                  <td className="px-4 py-3 font-semibold text-teal-800">
                    {formatPoints(userTaskPoints(task.basePoints))}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {task.limit ?? 0} / {task.count ?? 0}
                  </td>
                  <td className="px-4 py-3 max-w-[120px] truncate">
                    <a href={task.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{task.url}</a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button type="button" onClick={() => openEdit(task)} className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold hover:bg-slate-200">Edit</button>
                      <button type="button" onClick={() => handleDelete(task.id)} className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-200">Del</button>
                    </div>
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
