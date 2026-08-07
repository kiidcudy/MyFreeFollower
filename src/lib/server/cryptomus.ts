import { createHash } from "crypto";

const API_URL = "https://api.cryptomus.com/v1/payment";

function merchantId(): string {
  return (process.env.CRYPTOMUS_MERCHANT_ID || "").trim();
}

function apiKey(): string {
  return (process.env.CRYPTOMUS_API_KEY || "").trim();
}

export function cryptomusConfigured(): boolean {
  return Boolean(merchantId() && apiKey());
}

function sign(body: string): string {
  return createHash("md5").update(body + apiKey()).digest("hex");
}

export interface CryptomusInvoice {
  uuid: string;
  url: string;
  order_id: string;
  amount: string;
  currency: string;
  payment_status?: string;
}

export async function createCryptomusInvoice(input: {
  orderId: string;
  amountEur: number;
  returnUrl: string;
  callbackUrl: string;
}): Promise<CryptomusInvoice> {
  if (!cryptomusConfigured()) throw new Error("Cryptomus not configured");

  const payload = {
    amount: input.amountEur.toFixed(2),
    currency: "EUR",
    order_id: input.orderId.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128),
    url_return: input.returnUrl,
    url_callback: input.callbackUrl,
    is_payment_multiple: false,
    lifetime: 7200,
  };

  const body = JSON.stringify(payload);
  const encoded = Buffer.from(body).toString("base64");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      merchant: merchantId(),
      sign: sign(encoded),
    },
    body,
  });

  const json = (await res.json()) as {
    state?: number;
    message?: string;
    result?: CryptomusInvoice;
  };

  if (!res.ok || json.state !== 0 || !json.result?.url) {
    throw new Error(json.message || "Cryptomus invoice failed");
  }

  return json.result;
}

export function verifyCryptomusWebhook(rawBody: string, signature: string | null): boolean {
  if (!signature || !apiKey()) return false;
  const encoded = Buffer.from(rawBody).toString("base64");
  const expected = sign(encoded);
  return signature === expected;
}
