export async function prepareCheckoutOrder(input: {
  email: string;
  memberUsername?: string;
  items: Array<{
    serviceSlug: string;
    serviceTitle: string;
    platform: string;
    quantity: number;
    priceUSD: number;
    priceEUR: number;
    username: string;
  }>;
}): Promise<{ checkoutId: string; totalEUR: number; totalUSD: number }> {
  const res = await fetch("/api/checkout/prepare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json()) as { error?: string; code?: string };
  if (!res.ok) {
    if (data.code === "NO_BLOB") throw new Error("Server storage not configured. Contact support.");
    throw new Error(data.error || "Could not create order");
  }
  return data as Awaited<ReturnType<typeof prepareCheckoutOrder>>;
}

export async function startCheckoutPayment(input: {
  checkoutId: string;
  method: "binance" | "cryptomus" | "card";
}): Promise<{
  paymentId: string;
  method: string;
  amountEur: number;
  amountUsdt?: number;
  orderNumber?: string;
}> {
  const res = await fetch("/api/payments/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) throw new Error(data.error || "Payment failed");
  return data as Awaited<ReturnType<typeof startCheckoutPayment>>;
}

export async function confirmBinanceSubmitted(checkoutId: string): Promise<void> {
  const res = await fetch("/api/payments/binance/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checkoutId }),
  });
  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error || "Could not confirm payment");
  }
}

export async function pollCheckoutStatus(
  checkoutId: string,
  onUpdate: (status: { status: string; paymentStatus: string; checkoutOrderNumber?: string }) => void,
  maxMs = 120_000,
): Promise<{ ok: boolean; checkoutOrderNumber?: string }> {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    await new Promise((r) => setTimeout(r, 3000));
    const res = await fetch(`/api/checkout/status?id=${encodeURIComponent(checkoutId)}`);
    if (!res.ok) continue;
    const data = (await res.json()) as {
      status: string;
      paymentStatus: string;
      checkoutOrderNumber?: string;
    };
    onUpdate(data);
    if (data.status === "paid" || data.paymentStatus === "completed") {
      return { ok: true, checkoutOrderNumber: data.checkoutOrderNumber };
    }
  }
  return { ok: false };
}
