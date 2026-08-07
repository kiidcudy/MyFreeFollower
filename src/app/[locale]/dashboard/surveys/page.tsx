"use client";

import { useEffect, useState } from "react";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { formatPoints } from "@/lib/site";

const SURVEYS = [
  { id: "survey-short", titleKey: "dashboard.surveyShort", points: 100 },
  { id: "survey-brand", titleKey: "dashboard.surveyBrand", points: 120 },
  { id: "survey-product", titleKey: "dashboard.surveyProduct", points: 150 },
  { id: "survey-deep", titleKey: "dashboard.surveyDeep", points: 200 },
] as const;

export default function DashboardSurveysPage() {
  const { t } = useLocale();
  const { user, reward } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mff-surveys-v1");
      if (raw) setCompleted(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore */
    }
  }, []);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const markComplete = (id: string, points: number) => {
    if (completed.has(id)) {
      setMessage({ type: "err", text: t("dashboard.surveyAlreadyDone") });
      return;
    }
    const res = reward(points);
    if (!res.ok) {
      setMessage({ type: "err", text: res.error ?? t("errors.generic") });
      return;
    }
    const next = new Set(completed);
    next.add(id);
    setCompleted(next);
    localStorage.setItem("mff-surveys-v1", JSON.stringify([...next]));
    setMessage({
      type: "ok",
      text: t("dashboard.surveyCompleted", { points: formatPoints(points) }),
    });
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">{t("dashboard.surveys")}</h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.surveysDesc")}</p>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {SURVEYS.map((survey) => {
          const done = completed.has(survey.id);
          return (
            <article
              key={survey.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <h2 className="font-display text-base font-bold text-ink-900">
                {t(survey.titleKey)}
              </h2>
              <p className="mt-2 text-sm font-semibold text-brand-800">
                +{formatPoints(survey.points)} {t("common.points")}
              </p>
              <p className="mt-2 text-xs text-slate-500">{t("dashboard.surveyNoMultiplier")}</p>
              <button
                type="button"
                disabled={done}
                onClick={() => markComplete(survey.id, survey.points)}
                className={`mt-4 rounded-lg py-2 text-sm font-semibold ${
                  done
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                }`}
              >
                {done ? t("dashboard.surveyDone") : t("dashboard.surveyStart")}
              </button>
            </article>
          );
        })}
      </div>

      <p className="text-sm text-slate-600">
        {t("dashboard.needMorePoints")}{" "}
        <LocalizedLink href="/dashboard/tasks" className="font-semibold text-brand-700 hover:underline">
          {t("dashboard.tasks")}
        </LocalizedLink>
      </p>
    </div>
  );
}
