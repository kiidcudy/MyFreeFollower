"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";

export default function DashboardProfilePage() {
  const { t } = useLocale();
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const res = updateProfile({ fullName });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t("dashboard.profile")}
        </h1>
        <p className="mt-1 text-sm text-ink-700">{t("dashboard.editProfile")}</p>
      </div>

      <form
        onSubmit={handleSave}
        className="max-w-lg space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-card"
      >
        <label className="block text-sm font-semibold text-ink-900">
          {t("auth.username")}
          <input
            type="text"
            value={user.username}
            readOnly
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
          />
        </label>

        <label className="block text-sm font-semibold text-ink-900">
          Full name
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-sm font-semibold text-ink-900">
          {t("auth.email")}
          <input
            type="email"
            value={user.email}
            readOnly
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
          />
        </label>

        <p className="text-xs text-slate-500">
          {t("dashboard.memberSince")}{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {t("dashboard.saveChanges")}
        </button>

        {saved && (
          <p className="text-sm font-medium text-emerald-700">{t("toast.profileUpdated")}</p>
        )}
      </form>
    </div>
  );
}
