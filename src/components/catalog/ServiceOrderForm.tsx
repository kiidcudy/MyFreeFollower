"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PaidTierSelector } from "@/components/catalog/PaidTierSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import {
  computeFreePointsCost,
  isFreeService,
  isPaidService,
  type CatalogService,
  type PaidTier,
} from "@/lib/catalog";
import { localizedPath } from "@/lib/i18n/navigation";
import { getServiceDisplayTitle } from "@/lib/i18n/catalog-labels";
import { formatPoints } from "@/lib/site";

export function ServiceOrderForm({ service }: { service: CatalogService }) {
  const { t, locale } = useLocale();
  const { user, ready, spendPoints } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [selectedTier, setSelectedTier] = useState<PaidTier | null>(
    isPaidService(service) ? service.tiers[0] ?? null : null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"points" | "card" | "crypto">("points");

  const pointsCost = useMemo(() => {
    if (isFreeService(service)) return computeFreePointsCost(service);
    if (selectedTier) return selectedTier.points;
    return 0;
  }, [service, selectedTier]);

  const needsLink = ["Comments", "Video Views", "Reels Views", "Story Views", "Views"].includes(
    service.type,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError(t("auth.requiredField"));
      return;
    }

    if (!user) {
      router.push(localizedPath("/login", locale));
      return;
    }

    if (isPaidService(service) && !selectedTier) {
      setError(t("catalog.selectTier"));
      return;
    }

    const usePoints =
      isFreeService(service) || (isPaidService(service) && paymentMethod === "points");

    if (usePoints && pointsCost > (user?.points ?? 0)) {
      setError(t("catalog.insufficientPoints"));
      return;
    }

    setLoading(true);
    const result = await spendPoints({
      serviceSlug: service.slug,
      serviceTitle: getServiceDisplayTitle(locale, service),
      username: username.trim(),
      points: usePoints ? pointsCost : 0,
      quantity: isFreeService(service)
        ? service.amount
        : (selectedTier?.quantity ?? 0),
      tier: isFreeService(service) ? "free" : "paid",
      packageId: selectedTier ? String(selectedTier.quantity) : undefined,
    });
    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? t("errors.generic"));
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="mff-card border-[#30d158]/20 bg-[#30d158]/10 p-8 text-center">
        <p className="font-display text-lg font-semibold text-[#248a3d]">{t("toast.orderPlaced")}</p>
        <button
          type="button"
          onClick={() => router.push(localizedPath("/dashboard/orders", locale))}
          className="mff-btn-primary mt-5"
        >
          {t("nav.orders")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mff-card p-6 sm:p-8">
      <h2 className="mff-heading-md">{isFreeService(service) ? t("catalog.claimFree") : t("catalog.orderNow")}</h2>

      {isPaidService(service) && (
        <div className="mt-5">
          <PaidTierSelector
            tiers={service.tiers}
            unit={service.unit}
            selected={selectedTier}
            onSelect={setSelectedTier}
          />
        </div>
      )}

      <div className="mt-5">
        <label htmlFor="service-username" className="block text-sm font-semibold text-[#1d1d1f]">
          {needsLink ? t("catalog.linkLabel") : t("catalog.usernameLabel")}
        </label>
        <input
          id="service-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={
            needsLink ? t("catalog.linkPlaceholder") : t("catalog.usernamePlaceholder")
          }
          className="mff-input mt-2"
          required
        />
        <p className="mt-1.5 text-xs text-[#86868b]">{t("catalog.usernameHint")}</p>
      </div>

      {isPaidService(service) && user && (
        <div className="mt-5">
          <p className="text-sm font-semibold text-ink-800">{t("catalog.paymentMethod")}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["points", "card", "crypto"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`rounded-2xl border px-3 py-2.5 text-xs font-semibold transition ${
                  paymentMethod === method
                    ? "border-[#0077ed] bg-[#0077ed]/10 text-[#0077ed]"
                    : "border-black/[0.08] bg-white text-[#6e6e73] hover:border-[#0077ed]/30"
                }`}
              >
                {t(`catalog.payWith${method.charAt(0).toUpperCase()}${method.slice(1)}`)}
              </button>
            ))}
          </div>
          {(paymentMethod === "card" || paymentMethod === "crypto") && (
            <p className="mt-2 rounded-lg bg-accent-50 px-3 py-2 text-xs text-accent-800">
              {t("catalog.checkoutPlaceholder")}
            </p>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-[#f5f5f7] px-4 py-4">
        <div>
          <span className="block text-sm font-semibold text-[#6e6e73]">
            {isPaidService(service) && paymentMethod !== "points"
              ? t("catalog.totalDue")
              : t("catalog.pointsCost")}
          </span>
          {user && (isFreeService(service) || paymentMethod === "points") && (
            <span className="mt-1 block text-xs text-[#86868b]">
              {t("dashboard.pointsBalance")}: {formatPoints(user.points)} ·{" "}
              {t("dashboard.remainingBalance")}:{" "}
              {formatPoints(Math.max(0, user.points - pointsCost))}
            </span>
          )}
        </div>
        <span className="font-display text-lg font-semibold text-[#0077ed]">
          {!user
            ? t("catalog.signUpToClaim")
            : isPaidService(service) && paymentMethod !== "points" && selectedTier
              ? `$${selectedTier.priceUSD.toFixed(2)}`
              : `${formatPoints(pointsCost)} ${t("common.points")}`}
        </span>
      </div>

      {!user && (
        <p className="mt-4 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800">
          {t("auth.freeServiceRequiredMessage")}{" "}
          <button
            type="button"
            onClick={() => router.push(localizedPath("/register", locale))}
            className="font-bold underline"
          >
            {t("auth.freeServiceSignUp")}
          </button>
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mff-btn-primary mt-6 w-full disabled:opacity-60"
      >
        {loading
          ? t("common.loading")
          : isFreeService(service)
            ? t("catalog.claimFree")
            : t("catalog.buyNow")}
      </button>
    </form>
  );
}
