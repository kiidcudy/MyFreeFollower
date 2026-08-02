"use client";

import { useEffect, useState } from "react";
import { getAdminPassword } from "@/lib/admin-store";
import { effectivePoints, formatPoints } from "@/lib/site";
import type { Task } from "@/lib/tasks/data";

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks", {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data: { tasks?: Task[] }) => {
        setTasks(data.tasks ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Tasks</h1>
        <p className="mt-1 text-sm text-slate-600">Available member tasks</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-slate-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
          <table className="w-full min-w-[720px] text-start text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-ink-700">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Points</th>
                <th className="px-4 py-3 font-semibold">Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-xs">{task.id}</td>
                  <td className="px-4 py-3">{task.platform}</td>
                  <td className="px-4 py-3 text-slate-600">{task.type}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{task.title}</td>
                  <td className="px-4 py-3 font-semibold text-teal-800">
                    {formatPoints(effectivePoints(task.basePoints))}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {task.limit ?? "—"}
                    {typeof task.count === "number" ? ` (${task.count} used)` : ""}
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
