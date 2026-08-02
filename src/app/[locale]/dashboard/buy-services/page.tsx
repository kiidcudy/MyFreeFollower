"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { allPaidServices, getPlatformEmoji } from "@/lib/catalog";
import { formatPoints, formatUSD } from "@/lib/site";

export default function DashboardBuyServicesPage() {
  const { t } = useLocale();
  const { user, spendPoints } = useAuth();
  const [username, setUsername] = useState("");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleOrder = async (slug: string) => {
    if (!user) return;
    const target = username.trim();
    if (!target) {
      setMessage({ type: "err", text: t("catalog.usernameLabel") });
      return;
    }

    const service = allPaidServices.find((s) => s.slug === slug);
    if (!service) return;
    const tierIdx = selected[slug] ?? 0;
    const tier = service.tiers[tierIdx];
    if (!tier) return;

    if (user.points < tier.points) {
      setMessage({ type: "err", text: t("catalog.insufficientPoints") });
      return;
    }

    setLoading(slug);
    setMessage(null);
    const title = `${tier.quantity} ${service.unit} — ${service.platform} ${service.type}`;
    const res = await spendPoints({
      serviceSlug: slug,
      serviceTitle: title,
      username: target,
      points: tier.points,
      quantity: tier.quantity,
      tier: "paid",
      packageId: String(tier.quantity),
    });
    setLoading(null);
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
          {t("dashboard.buyServices")}
        </h1>
        <p className="mt-1 text-sm text-ink-700">{t("catalog.paidHubDesc")}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <label className="block text-sm font-semibold text-ink-900">
          {t("catalog.usernameLabel")}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("catalog.usernamePlaceholder")}
            className="mt-2 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </label>
        {user && (
          <p className="mt-2 text-sm text-brand-800">
            {t("dashboard.pointsBalance")}: {formatPoints(user.points)} {t("common.points")}
          </p>
        )}
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

      <div className="space-y-4">
        {allPaidServices.slice(0, 18).map((service) => {
          const tierIdx = selected[service.slug] ?? 0;
          const tier = service.tiers[tierIdx] ?? service.tiers[0];
          const canAfford = (user?.points ?? 0) >= (tier?.points ?? 0);

          return (
            <article
              key={service.slug}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getPlatformEmoji(service.platform)}</span>
                  <div>
                    <p className="text-xs font-semibold text-brand-700">{service.platform}</p>
                    <h2 className="font-display text-lg font-bold text-ink-900">
                      {service.type}
                    </h2>
                  </div>
                </div>
                <div className="text-end text-sm">
                  <p className="font-bold text-brand-800">
                    {formatPoints(tier.points)} {t("common.points")}
                  </p>
                  <p className="text-xs text-slate-500">{formatUSD(tier.priceUSD)}</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold text-ink-700">
                  {t("catalog.selectTier")}
                </label>
                <select
                  value={tierIdx}
                  onChange={(e) =>
                    setSelected((s) => ({ ...s, [service.slug]: Number(e.target.value) }))
                  }
                  className="mt-1 block w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {service.tiers.map((tr, i) => (
                    <option key={i} value={i}>
                      {tr.quantity} {service.unit} — {formatPoints(tr.points)} pts (
                      {formatUSD(tr.priceUSD)})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                disabled={!canAfford || loading === service.slug}
                onClick={() => handleOrder(service.slug)}
                className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold ${
                  canAfford
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                {loading === service.slug ? t("common.loading") : t("catalog.orderNow")}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
