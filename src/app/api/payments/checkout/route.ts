import { NextRequest, NextResponse } from "next/server";
import { startBinanceCheckoutPayment, storageReady } from "@/lib/server/checkout";

export async function POST(req: NextRequest) {
  try {
    if (!storageReady()) {
      return NextResponse.json({ error: "Server storage not configured", code: "NO_BLOB" }, { status: 503 });
    }

    const body = (await req.json()) as {
      checkoutId?: string;
      method?: "binance" | "cryptomus" | "card";
    };

    if (!body.checkoutId || !body.method) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (body.method === "binance") {
      const result = await startBinanceCheckoutPayment(body.checkoutId);
      return NextResponse.json({ ...result, method: "binance" });
    }

    return NextResponse.json({ error: "Payment method not available yet" }, { status: 501 });
  } catch (e) {
    console.error("[payments/checkout]", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Payment failed" }, { status: 400 });
  }
}
