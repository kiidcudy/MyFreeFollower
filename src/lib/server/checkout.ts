import {
  addServiceOrder,
  isBlobReady,
  mutateCheckout,
  saveCheckout,
  getCheckoutById,
  type CheckoutLineItem,
  type MffCheckout,
  type ServiceOrder,
} from "@/lib/kv";
import { eurToUsdt } from "@/lib/binance-pay";

function uid(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function genOrderId(): string {
  return `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

function genCheckoutOrderNumber(): string {
  return `MFF-${Date.now().toString(36).slice(-6).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`;
}

export interface PrepareCheckoutItem {
  serviceSlug: string;
  serviceTitle: string;
  platform: string;
  quantity: number;
  priceUSD: number;
  priceEUR: number;
  username: string;
}

export function storageReady(): boolean {
  return isBlobReady();
}

export async function prepareCheckout(input: {
  email: string;
  memberUsername?: string;
  items: PrepareCheckoutItem[];
}): Promise<{ checkoutId: string; totalEUR: number; totalUSD: number; orderIds: string[] }> {
  if (!input.items.length) throw new Error("Cart is empty");
  const email = input.email.trim().toLowerCase();
  if (!email.includes("@")) throw new Error("Valid email required");

  const totalEUR = Math.round(input.items.reduce((s, i) => s + i.priceEUR, 0) * 100) / 100;
  const totalUSD = Math.round(input.items.reduce((s, i) => s + i.priceUSD, 0) * 100) / 100;
  const checkoutId = uid("chk_");
  const now = Date.now();

  const lineItems: CheckoutLineItem[] = [];
  const orderIds: string[] = [];

  for (const item of input.items) {
    const orderId = genOrderId();
    orderIds.push(orderId);
    lineItems.push({
      orderId,
      serviceSlug: item.serviceSlug,
      serviceTitle: item.serviceTitle,
      platform: item.platform,
      quantity: item.quantity,
      priceUSD: item.priceUSD,
      priceEUR: item.priceEUR,
      username: item.username.trim(),
    });

    const order: ServiceOrder = {
      id: orderId,
      serviceSlug: item.serviceSlug,
      serviceTitle: item.serviceTitle,
      username: item.username.trim(),
      points: 0,
      quantity: item.quantity,
      tier: "paid",
      packageId: String(item.quantity),
      status: "pending",
      paymentMethod: "crypto",
      paymentStatus: "pending",
      chargeUSD: item.priceUSD,
      chargeEUR: item.priceEUR,
      email,
      memberUsername: input.memberUsername ?? email,
      createdAt: now,
    };
    await addServiceOrder(order);
  }

  const checkout: MffCheckout = {
    id: checkoutId,
    email,
    memberUsername: input.memberUsername,
    items: lineItems,
    totalEUR,
    totalUSD,
    status: "pending",
    paymentStatus: "none",
    createdAt: now,
  };

  await saveCheckout(checkout);
  return { checkoutId, totalEUR, totalUSD, orderIds };
}

export async function startBinanceCheckoutPayment(checkoutId: string): Promise<{
  paymentId: string;
  amountEur: number;
  amountUsdt: number;
  orderNumber: string;
}> {
  const checkout = await getCheckoutById(checkoutId);
  if (!checkout || checkout.status !== "pending") {
    throw new Error("Checkout not found or already paid");
  }

  const paymentId = uid("pay_");
  const amountUsdt = eurToUsdt(checkout.totalEUR);
  const orderNumber = paymentId.slice(-8).toUpperCase();

  await mutateCheckout(checkoutId, (c) => ({
    ...c,
    paymentMethod: "binance",
    paymentStatus: "pending",
    paymentId,
  }));

  return {
    paymentId,
    amountEur: checkout.totalEUR,
    amountUsdt,
    orderNumber,
  };
}

export async function confirmBinancePaymentSubmitted(checkoutId: string): Promise<void> {
  await mutateCheckout(checkoutId, (c) => {
    if (c.status !== "pending") return c;
    return { ...c, paymentStatus: "awaiting" };
  });
}

export async function getCheckoutStatus(checkoutId: string) {
  const checkout = await getCheckoutById(checkoutId);
  if (!checkout) return null;
  return {
    status: checkout.status,
    paymentStatus: checkout.paymentStatus,
    checkoutOrderNumber: checkout.checkoutOrderNumber,
    totalEUR: checkout.totalEUR,
    totalUSD: checkout.totalUSD,
    email: checkout.email,
  };
}
