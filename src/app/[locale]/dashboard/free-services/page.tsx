"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import {
  allFreeServices,
  computeFreePointsCost,
  getPlatformEmoji,
} from "@/lib/catalog";
import { formatPoints } from "@/lib/site";

export default function DashboardFreeServicesPage() {
  const { t } = useLocale();
  const { user, spendPoints } = useAuth();
  const [username, setUsername] = useState("");
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleClaim = async (service: (typeof allFreeServices)[0]) => {
    if (!user) return;
    const target = username.trim();
    if (!target) {
      setMessage({ type: "err", text: t("catalog.usernameLabel") });
      return;
    }
    const points = computeFreePointsCost(service);
    if (user.points < points) {
      setMessage({ type: "err", text: t("catalog.insufficientPoints") });
      return;
    }

    setLoadingSlug(service.slug);
    setMessage(null);
    const title = `${service.amount} ${service.unit} — ${service.platform} ${service.type}`;
    const res = await spendPoints({
      serviceSlug: service.slug,
      serviceTitle: title,
      username: target,
      points,
      quantity: service.amount,
      tier: "free",
    });
    setLoadingSlug(null);
    if (res.ok) {
      setMessage({ type: "ok", text: t("toast.orderPlaced") });
    } else {
      setMessage({ type: "err", text: res.error ?? t("toast.orderFailed") });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t("dashboard.freeServices")}
        </h1>
        <p className="mt-1 text-sm text-ink-700">{t("catalog.freeHubDesc")}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-wrap gap-6 text-sm">
          <p>
            <span className="font-semibold text-ink-900">{t("dashboard.pointsBalance")}:</span>{" "}
            <span className="text-brand-800">{formatPoints(user?.points ?? 0)}</span>
          </p>
        </div>
        <label className="mt-4 block text-sm font-semibold text-ink-900">
          {t("catalog.usernameLabel")}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("catalog.usernamePlaceholder")}
            className="mt-2 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </label>
        <p className="mt-1 text-xs text-slate-500">{t("catalog.usernameHint")}</p>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "ok"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allFreeServices.slice(0, 24).map((service) => {
          const cost = computeFreePointsCost(service);
          const canAfford = (user?.points ?? 0) >= cost;
          return (
            <article
              key={service.slug}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{getPlatformEmoji(service.platform)}</span>
                <div>
                  <p className="text-xs font-semibold text-brand-700">{service.platform}</p>
                  <h2 className="font-display text-sm font-bold text-ink-900">
                    {service.type}
                  </h2>
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-ink-900">
                {service.amount}{" "}
                <span className="text-sm font-normal text-slate-500">{service.unit}</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-800">
                {t("catalog.pointsCost")}: {formatPoints(cost)} {t("common.points")}
              </p>
              {(user?.points ?? 0) < cost && (
                <p className="mt-1 text-xs text-red-600">{t("catalog.insufficientPoints")}</p>
              )}
              {(user?.points ?? 0) >= cost && (
                <p className="mt-1 text-xs text-slate-500">
                  {t("dashboard.remainingBalance")}: {formatPoints((user?.points ?? 0) - cost)}
                </p>
              )}
              <button
                type="button"
                disabled={!canAfford || loadingSlug === service.slug}
                onClick={() => handleClaim(service)}
                className="mt-auto pt-4"
              >
                <span
                  className={`block w-full rounded-lg py-2 text-center text-sm font-semibold ${
                    canAfford
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : "cursor-not-allowed bg-slate-100 text-slate-400"
                  }`}
                >
                  {loadingSlug === service.slug ? t("common.loading") : t("catalog.claimFree")}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
