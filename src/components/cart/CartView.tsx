"use client";

import { useEffect, useState } from "react";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { BinancePayModal } from "@/components/cart/BinancePayModal";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/i18n/currency";
import { PAYMENTS } from "@/lib/site";
import {
  confirmBinanceSubmitted,
  prepareCheckoutOrder,
  startCheckoutPayment,
} from "@/lib/payments-client";

const PENDING_CHECKOUT_KEY = "mff_pending_checkout";

interface PendingCheckout {
  checkoutId: string;
  totalEUR: number;
  totalUSD: number;
  email: string;
}

function savePending(pending: PendingCheckout) {
  try {
    sessionStorage.setItem(PENDING_CHECKOUT_KEY, JSON.stringify(pending));
  } catch {
    /* ignore */
  }
}

function loadPending(): PendingCheckout | null {
  try {
    const raw = sessionStorage.getItem(PENDING_CHECKOUT_KEY);
    return raw ? (JSON.parse(raw) as PendingCheckout) : null;
  } catch {
    return null;
  }
}

function clearPending() {
  try {
    sessionStorage.removeItem(PENDING_CHECKOUT_KEY);
  } catch {
    /* ignore */
  }
}

export function CartView() {
  const { t, locale } = useLocale();
  const { user } = useAuth();
  const { cart, removeFromCart, clearCart, hydrated, itemCount } = useCart();

  const [step, setStep] = useState<"cart" | "pay" | "success">("cart");
  const [pending, setPending] = useState<PendingCheckout | null>(null);
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null);

  const [binanceOpen, setBinanceOpen] = useState(false);
  const [binanceVerifying, setBinanceVerifying] = useState(false);
  const [binanceData, setBinanceData] = useState<{
    amountUsdt: number;
    orderNumber: string;
    checkoutId: string;
  } | null>(null);

  const email = user?.email ?? guestEmail.trim().toLowerCase();
  const totalEUR = cart.reduce((s, i) => s + i.priceEUR, 0);
  const totalUSD = cart.reduce((s, i) => s + i.priceUSD, 0);
  const payTotalEUR = pending?.totalEUR ?? totalEUR;
  const payTotalUSD = pending?.totalUSD ?? totalUSD;

  useEffect(() => {
    if (!hydrated) return;
    const stored = loadPending();
    if (stored && step === "cart" && cart.length === 0) {
      setPending(stored);
      setStep("pay");
    }
  }, [hydrated, step, cart.length]);

  useEffect(() => {
    if (user?.email) setGuestEmail(user.email);
  }, [user?.email]);

  if (!hydrated) {
    return <div className="py-20 text-center text-[#86868b]">{t("common.loading")}</div>;
  }

  if (step === "success") {
    return (
      <div className="mff-card mx-auto max-w-lg p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#30d158]/15 text-[#248a3d]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold text-[#1d1d1f]">{t("cart.successTitle")}</h2>
        {successOrderNumber && (
          <p className="mt-2 font-mono text-sm font-semibold text-[#0077ed]">
            {t("cart.checkoutOrderNumber")}: {successOrderNumber}
          </p>
        )}
        <p className="mt-3 text-sm text-[#6e6e73]">{t("cart.successText")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {user && (
            <LocalizedLink href="/dashboard/orders" className="mff-btn-primary px-5 py-2.5 text-sm">
              {t("nav.orders")}
            </LocalizedLink>
          )}
          <LocalizedLink href="/buy-followers" className="rounded-full border border-[#0077ed] px-5 py-2.5 text-sm font-semibold text-[#0077ed]">
            {t("cart.continueShopping")}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  if (step === "pay" && pending) {
    return (
      <>
        <div className="mff-card mx-auto max-w-lg p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-[#1d1d1f]">{t("cart.payOrderTitle")}</h2>
          <p className="mt-2 text-sm text-[#6e6e73]">{t("cart.payOrderHint")}</p>
          <p className="mt-4 text-center font-display text-3xl font-bold text-[#0077ed]">
            {formatPrice(locale, payTotalUSD)}
          </p>
          <p className="text-center text-xs text-[#86868b]">≈ €{payTotalEUR.toFixed(2)}</p>

          <div className="mt-6 space-y-2">
            {PAYMENTS.binancePay.enabled && (
              <button
                type="button"
                disabled={loading}
                onClick={() => payCheckout("binance")}
                className="w-full rounded-2xl bg-[#f0b90b] px-4 py-3.5 text-sm font-bold text-[#1e2329] hover:opacity-95 disabled:opacity-50"
              >
                {t("cart.payBinance")}
              </button>
            )}
            <button
              type="button"
              disabled
              title={t("cart.comingSoon")}
              className="w-full cursor-not-allowed rounded-2xl border border-black/[0.08] px-4 py-3.5 text-sm font-semibold text-[#86868b] opacity-60"
            >
              {t("cart.payCrypto")}
            </button>
            <button
              type="button"
              disabled
              title={t("cart.comingSoon")}
              className="w-full cursor-not-allowed rounded-2xl border border-black/[0.08] px-4 py-3.5 text-sm font-semibold text-[#86868b] opacity-60"
            >
              {t("cart.payCard")}
            </button>
          </div>

          {message && <p className="mt-4 text-sm font-semibold text-amber-700">{message}</p>}
          {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="button"
            onClick={() => {
              setStep("cart");
              setPending(null);
              clearPending();
              setError(null);
              setMessage(null);
            }}
            className="mt-6 w-full text-sm font-semibold text-[#86868b] hover:text-[#1d1d1f]"
          >
            {t("cart.backToCart")}
          </button>
        </div>

        {binanceData && (
          <BinancePayModal
            open={binanceOpen}
            onClose={() => setBinanceOpen(false)}
            amountUsdt={binanceData.amountUsdt}
            orderNumber={binanceData.orderNumber}
            verifying={binanceVerifying}
            onConfirmPayment={confirmBinancePayment}
            labels={{
              stepPay: t("cart.binanceStepPay"),
              stepVerify: t("cart.binanceStepVerify"),
              sendToId: t("cart.binanceSendToId"),
              nickname: t("cart.binanceNickname"),
              copy: t("cart.binanceCopy"),
              copied: t("cart.binanceCopied"),
              scanViaApp: t("cart.binanceScanTitle"),
              uid: t("cart.binanceUidLabel"),
              instruction1: t("cart.binanceInstruction1"),
              instruction2: t("cart.binanceInstruction2"),
              confirmPayment: t("cart.binanceConfirmPayment"),
              orderNumber: t("cart.binanceOrderNumber"),
              verifyHint: t("cart.binanceVerifyHint"),
              close: t("cart.binanceClose"),
            }}
          />
        )}
      </>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="mff-card mx-auto max-w-lg p-10 text-center">
        <p className="text-[#6e6e73]">{t("cart.empty")}</p>
        <LocalizedLink href="/buy-followers" className="mff-btn-primary mt-5 inline-flex px-5 py-2.5 text-sm">
          {t("cart.emptyCta")}
        </LocalizedLink>
      </div>
    );
  }

  async function placeOrder() {
    setError(null);
    setMessage(null);
    if (!email.includes("@")) {
      setError(t("cart.emailRequired"));
      return;
    }

    setLoading(true);
    try {
      const result = await prepareCheckoutOrder({
        email,
        memberUsername: user?.username,
        items: cart.map((item) => ({
          serviceSlug: item.serviceSlug,
          serviceTitle: item.serviceTitle,
          platform: item.platform,
          quantity: item.quantity,
          priceUSD: item.priceUSD,
          priceEUR: item.priceEUR,
          username: item.username,
        })),
      });

      const next: PendingCheckout = {
        checkoutId: result.checkoutId,
        totalEUR: result.totalEUR,
        totalUSD: result.totalUSD,
        email,
      };
      setPending(next);
      savePending(next);
      clearCart();
      setStep("pay");
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  async function payCheckout(method: "binance" | "cryptomus" | "card") {
    if (!pending) return;
    if (method !== "binance") {
      setMessage(t("cart.comingSoon"));
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const result = await startCheckoutPayment({ checkoutId: pending.checkoutId, method });
      if (method === "binance" && result.orderNumber) {
        setBinanceData({
          amountUsdt: result.amountUsdt ?? result.amountEur,
          orderNumber: result.orderNumber,
          checkoutId: pending.checkoutId,
        });
        setBinanceOpen(true);
        setBinanceVerifying(false);
        setMessage(t("cart.paymentPendingOrder"));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  async function confirmBinancePayment() {
    if (!binanceData) return;
    setBinanceVerifying(true);
    setMessage(t("cart.paymentPendingOrder"));
    try {
      await confirmBinanceSubmitted(binanceData.checkoutId);
      setSuccessOrderNumber(binanceData.orderNumber);
      clearPending();
      setStep("success");
      setBinanceOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errors.generic"));
    } finally {
      setBinanceVerifying(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="mff-card overflow-hidden">
        <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-black/[0.06] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#86868b] sm:grid">
          <span>{t("cart.item")}</span>
          <span>{t("cart.qty")}</span>
          <span>{t("cart.price")}</span>
        </div>
        <ul className="divide-y divide-black/[0.06]">
          {cart.map((item) => (
            <li key={item.key} className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4">
              <div>
                <p className="font-semibold text-[#1d1d1f]">{item.serviceTitle}</p>
                <p className="mt-1 text-xs text-[#86868b]">
                  {item.platform} · {t("cart.target")}: {item.username}
                </p>
              </div>
              <span className="text-sm font-medium text-[#6e6e73] sm:text-center">{item.quantity.toLocaleString()}</span>
              <div className="flex items-center justify-between gap-3 sm:block sm:text-end">
                <span className="font-semibold text-[#0077ed]">{formatPrice(locale, item.priceUSD)}</span>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.key)}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  {t("cart.remove")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="mff-card h-fit p-6">
        {!user && (
          <div className="mb-5">
            <label htmlFor="cart-email" className="block text-sm font-semibold text-[#1d1d1f]">
              {t("auth.email")}
            </label>
            <input
              id="cart-email"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="mff-input mt-2"
              placeholder="you@example.com"
              required
            />
            <p className="mt-1.5 text-xs text-[#86868b]">{t("cart.guestCheckout")}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6e6e73]">{t("cart.total")}</span>
          <span className="font-display text-xl font-bold text-[#0077ed]">{formatPrice(locale, totalUSD)}</span>
        </div>
        <p className="mt-1 text-end text-xs text-[#86868b]">≈ €{totalEUR.toFixed(2)}</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={placeOrder}
          className="mff-btn-primary mt-5 w-full disabled:opacity-60"
        >
          {loading ? t("common.loading") : t("cart.checkout")}
        </button>

        <LocalizedLink
          href="/buy-followers"
          className="mt-3 block text-center text-sm font-semibold text-[#0077ed] hover:underline"
        >
          {t("cart.continueShopping")}
        </LocalizedLink>
      </aside>
    </div>
  );
}
