"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PaidTierSelector } from "@/components/catalog/PaidTierSelector";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { useCart } from "@/lib/cart-store";
import {
  computeFreePointsCost,
  isFreeService,
  isPaidService,
  priceFromTiers,
  type CatalogService,
  type PaidCatalogService,
  type PaidTier,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/i18n/currency";
import { localizedPath } from "@/lib/i18n/navigation";
import { getServiceDisplayTitle } from "@/lib/i18n/catalog-labels";
import { formatPoints } from "@/lib/site";

const MIN_CUSTOM = 100;
const MAX_CUSTOM = 10_000_000;

function isValidTarget(value: string): boolean {
  const v = value.trim();
  if (v.length < 2) return false;
  if (/^https?:\/\//i.test(v)) return true;
  if (v.startsWith("@")) return v.length > 2;
  return /^[\w.@/-]+$/.test(v);
}

function priceForQuantity(
  quantity: number,
  tiers: PaidTier[],
): { priceUSD: number; priceEUR: number } {
  const priceUSD = priceFromTiers(quantity, tiers);
  const ref = tiers[0];
  const priceEUR = ref
    ? Math.round(((priceUSD / ref.priceUSD) * ref.priceEUR) * 100) / 100
    : priceUSD;
  return { priceUSD, priceEUR };
}

function formatUnitPrice(locale: Parameters<typeof formatPrice>[0], usd: number, qty: number): string {
  if (qty <= 0) return "";
  return formatPrice(locale, usd / qty);
}

export function ServiceOrderForm({ service }: { service: CatalogService }) {
  const { t, locale } = useLocale();
  const { user, ready, spendPoints } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [linkChecked, setLinkChecked] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PaidTier | null>(
    isPaidService(service) ? service.tiers[0] ?? null : null,
  );
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const pointsCost = useMemo(() => {
    if (isFreeService(service)) return computeFreePointsCost(service);
    return 0;
  }, [service]);

  const needsLink = ["Comments", "Video Views", "Reels Views", "Story Views", "Views"].includes(
    service.type,
  );

  const paidQuantity = useMemo(() => {
    if (!isPaidService(service)) return 0;
    const custom = parseInt(customAmount.replace(/\D/g, ""), 10);
    if (customAmount.trim() && !Number.isNaN(custom) && custom >= MIN_CUSTOM) return custom;
    return selectedTier?.quantity ?? 0;
  }, [service, customAmount, selectedTier]);

  const paidPricing = useMemo(() => {
    if (!isPaidService(service) || paidQuantity <= 0) return null;
    return priceForQuantity(paidQuantity, service.tiers);
  }, [service, paidQuantity]);

  function handleTierSelect(tier: PaidTier) {
    setSelectedTier(tier);
    setCustomAmount("");
  }

  function handleCustomChange(value: string) {
    setCustomAmount(value);
    if (value.trim()) setSelectedTier(null);
  }

  function handleCheckLink() {
    setError(null);
    if (!isValidTarget(username)) {
      setLinkChecked(false);
      setError(t("catalog.linkCheckFailed"));
      return;
    }
    setLinkChecked(true);
  }

  function buildOrderPayload() {
    const quantity = isFreeService(service)
      ? service.amount
      : paidQuantity;
    const pricing = isPaidService(service)
      ? priceForQuantity(quantity, service.tiers)
      : null;

    return {
      serviceSlug: service.slug,
      serviceTitle: getServiceDisplayTitle(locale, service),
      username: username.trim(),
      points: isFreeService(service) ? pointsCost : 0,
      quantity,
      tier: isFreeService(service) ? ("free" as const) : ("paid" as const),
      packageId: isPaidService(service) ? String(quantity) : undefined,
      paymentMethod: isPaidService(service) ? ("crypto" as const) : ("points" as const),
      paymentStatus: isPaidService(service) ? ("pending" as const) : undefined,
      chargeUSD: pricing?.priceUSD,
      chargeEUR: pricing?.priceEUR,
    };
  }

  function validateBeforeSubmit(): boolean {
    setError(null);
    if (!username.trim() || !isValidTarget(username)) {
      setError(t("catalog.linkCheckFailed"));
      return false;
    }
    if (isPaidService(service) && !linkChecked) {
      setError(t("catalog.linkCheckFailed"));
      return false;
    }
    if (isPaidService(service)) {
      if (paidQuantity < MIN_CUSTOM || paidQuantity > MAX_CUSTOM) {
        setError(
          t("catalog.customAmountRange")
            .replace("{min}", MIN_CUSTOM.toLocaleString())
            .replace("{max}", MAX_CUSTOM.toLocaleString()),
        );
        return false;
      }
    }
    if (!user) {
      router.push(localizedPath("/register", locale));
      return false;
    }
    if (isFreeService(service) && pointsCost > (user?.points ?? 0)) {
      setError(t("catalog.insufficientPoints"));
      return false;
    }
    return true;
  }

  function buildCartItem() {
    const quantity = isFreeService(service) ? service.amount : paidQuantity;
    const pricing = isPaidService(service) ? priceForQuantity(quantity, service.tiers) : null;
    if (!isPaidService(service) || !pricing) return null;

    return {
      serviceSlug: service.slug,
      serviceTitle: getServiceDisplayTitle(locale, service),
      platform: service.platform,
      quantity,
      priceUSD: pricing.priceUSD,
      priceEUR: pricing.priceEUR,
      username: username.trim(),
    };
  }

  async function handleBuyNow(e?: React.FormEvent) {
    e?.preventDefault();
    if (isPaidService(service)) {
      setError(null);
      setCartNotice(null);
      if (!username.trim() || !isValidTarget(username)) {
        setError(t("catalog.linkCheckFailed"));
        return;
      }
      if (!linkChecked) {
        setError(t("catalog.linkCheckFailed"));
        return;
      }
      if (paidQuantity < MIN_CUSTOM || paidQuantity > MAX_CUSTOM) {
        setError(
          t("catalog.customAmountRange")
            .replace("{min}", MIN_CUSTOM.toLocaleString())
            .replace("{max}", MAX_CUSTOM.toLocaleString()),
        );
        return;
      }
      const item = buildCartItem();
      if (!item) return;
      addToCart(item);
      router.push(localizedPath("/cart", locale));
      return;
    }

    if (!validateBeforeSubmit()) return;

    setLoading(true);
    const result = await spendPoints(buildOrderPayload());
    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? t("errors.generic"));
      return;
    }
    setSuccess(true);
  }

  function handleAddToCart() {
    setError(null);
    setCartNotice(null);
    if (!username.trim() || !isValidTarget(username)) {
      setError(t("catalog.linkCheckFailed"));
      return;
    }
    if (isPaidService(service) && !linkChecked) {
      setError(t("catalog.linkCheckFailed"));
      return;
    }
    if (isPaidService(service) && (paidQuantity < MIN_CUSTOM || paidQuantity > MAX_CUSTOM)) {
      setError(
        t("catalog.customAmountRange")
          .replace("{min}", MIN_CUSTOM.toLocaleString())
          .replace("{max}", MAX_CUSTOM.toLocaleString()),
      );
      return;
    }

    const item = buildCartItem();
    if (!item) return;
    addToCart(item);
    setCartNotice(t("catalog.addedToCart"));
  }

  if (success) {
    return (
      <div className="mff-card border-[#30d158]/20 bg-[#30d158]/10 p-8 text-center">
        <p className="font-display text-lg font-semibold text-[#166534]">{t("toast.orderPlaced")}</p>
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

  const paidService = isPaidService(service) ? (service as PaidCatalogService) : null;

  return (
    <form onSubmit={handleBuyNow} className="mff-card p-6 sm:p-8">
      <h2 className="mff-heading-md">
        {isFreeService(service) ? t("catalog.claimFree") : t("catalog.createYourOrder")}
      </h2>

      {paidService && (
        <>
          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold text-[#1d1d1f]">{t("catalog.choosePackage")}</p>
            <PaidTierSelector
              tiers={paidService.tiers}
              unit={paidService.unit}
              selected={selectedTier}
              onSelect={handleTierSelect}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="custom-amount" className="block text-sm font-semibold text-[#1d1d1f]">
              {t("catalog.customAmountLabel")}
            </label>
            <input
              id="custom-amount"
              type="text"
              inputMode="numeric"
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder={t("catalog.customAmountPlaceholder")}
              className="mff-input mt-2"
            />
            <p className="mt-1.5 text-xs text-[#6e6e73]">
              {t("catalog.customAmountRange")
                .replace("{min}", MIN_CUSTOM.toLocaleString())
                .replace("{max}", MAX_CUSTOM.toLocaleString())}
            </p>
          </div>
        </>
      )}

      <div className="mt-5">
        <label htmlFor="service-username" className="block text-sm font-semibold text-[#1d1d1f]">
          {needsLink ? t("catalog.linkLabel") : t("catalog.usernameLabel")}
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="service-username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setLinkChecked(false);
            }}
            placeholder={
              needsLink ? t("catalog.linkPlaceholder") : t("catalog.usernamePlaceholder")
            }
            className="mff-input min-w-0 flex-1"
            required
          />
          <button
            type="button"
            onClick={handleCheckLink}
            className="shrink-0 rounded-2xl border border-[#0077ed] px-4 py-2.5 text-sm font-semibold text-[#0066cc] transition hover:bg-[#0077ed]/10"
          >
            {t("catalog.checkLink")}
          </button>
        </div>
        {linkChecked && (
          <p className="mt-2 text-xs font-semibold text-[#166534]">{t("catalog.linkVerified")}</p>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-2xl bg-[#30d158]/10 px-4 py-3 text-sm text-[#166534]">
        <span aria-hidden>🛡️</span>
        <p>{t("catalog.usernameHint")}</p>
      </div>

      {paidService && paidPricing && paidQuantity > 0 && (
        <div className="mt-5 grid gap-4 rounded-[20px] bg-[#f5f5f7] px-4 py-4 sm:grid-cols-2">
          <div>
            <span className="block text-sm font-semibold text-[#6e6e73]">{t("catalog.totalToPay")}</span>
            <span className="mt-1 block font-display text-2xl font-bold text-[#0066cc]">
              {formatPrice(locale, paidPricing.priceUSD)}
            </span>
            <span className="mt-1 block text-xs text-[#6e6e73]">
              {t("catalog.unitPrice").replace(
                "{price}",
                formatUnitPrice(locale, paidPricing.priceUSD, paidQuantity),
              )}
            </span>
          </div>
          <div className="sm:text-end">
            <span className="block text-sm font-semibold text-[#6e6e73]">{t("catalog.estimatedStart")}</span>
            <span className="mt-1 block font-display text-lg font-semibold text-[#1d1d1f]">
              {paidService.delivery}
            </span>
          </div>
        </div>
      )}

      {isFreeService(service) && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-[#f5f5f7] px-4 py-4">
          <span className="text-sm font-semibold text-[#6e6e73]">{t("catalog.pointsCost")}</span>
          <span className="font-display text-lg font-semibold text-[#0066cc]">
            {!user
              ? t("catalog.signUpToClaim")
              : `${formatPoints(pointsCost)} ${t("common.points")}`}
          </span>
        </div>
      )}

      {paidService && (
        <p className="mt-4 text-center text-xs text-[#6e6e73]">{t("catalog.guestCheckout")}</p>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      {cartNotice && (
        <p className="mt-4 rounded-lg bg-[#30d158]/10 px-3 py-2 text-sm text-[#166534]" role="status">
          {cartNotice}{" "}
          <button
            type="button"
            onClick={() => router.push(localizedPath("/cart", locale))}
            className="font-bold underline"
          >
            {t("catalog.viewCart")}
          </button>
        </p>
      )}

      <div className={`mt-5 grid gap-3 ${paidService ? "sm:grid-cols-2" : ""}`}>
        {paidService && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full border-2 border-[#0077ed] bg-white px-5 py-3 text-sm font-semibold text-[#0066cc] transition hover:bg-[#0077ed]/10"
          >
            {t("catalog.addToCart")}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mff-btn-primary w-full disabled:opacity-60"
        >
          {loading
            ? t("common.loading")
            : isFreeService(service)
              ? t("catalog.claimFree")
              : t("catalog.buyNow")}
        </button>
      </div>

      {paidService && (
        <ul className="mt-5 grid gap-2 text-xs text-[#6e6e73] sm:grid-cols-2">
          {[t("catalog.securePayment"), t("catalog.instantDelivery"), t("catalog.noPasswordNeeded"), t("catalog.noMembershipRequired")].map(
            (item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="font-bold text-[#1a7f37]" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ),
          )}
        </ul>
      )}

      {isFreeService(service) && !user && ready && (
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
    </form>
  );
}
