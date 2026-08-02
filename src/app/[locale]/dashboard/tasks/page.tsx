"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { TaskRunner } from "@/components/dashboard/TaskRunner";

export default function DashboardTasksPage() {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">{t("dashboard.tasks")}</h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.taskAvailable")}</p>
      </div>
      <TaskRunner />
    </div>
  );
}
