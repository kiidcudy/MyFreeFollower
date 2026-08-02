"use client";

import { PanelHeader } from "@/components/panel/PanelHeader";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { taskGuidelines } from "@/lib/tasks/platform-meta";

export default function DashboardRulesPage() {
  const { t } = useLocale();

  const cards = [
    { icon: "✅", title: t("dashboard.taskRulesTitle"), desc: taskGuidelines[0] },
    { icon: "📷", title: t("dashboard.uploadProof"), desc: taskGuidelines[1] },
    { icon: "🔒", title: t("dashboard.rules"), desc: t("dashboard.referralWarning") },
  ];

  return (
    <div className="space-y-6">
      <PanelHeader title={t("dashboard.rules")} subtitle={t("dashboard.rulesIntro")} />

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="card p-5">
            <div className="text-2xl">{c.icon}</div>
            <h2 className="mt-2 font-bold text-slate-900">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
