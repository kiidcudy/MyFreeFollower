import { NextRequest, NextResponse } from "next/server";
import { confirmBinancePaymentSubmitted, storageReady } from "@/lib/server/checkout";

export async function POST(req: NextRequest) {
  try {
    if (!storageReady()) {
      return NextResponse.json({ error: "Server storage not configured", code: "NO_BLOB" }, { status: 503 });
    }

    const body = (await req.json()) as { checkoutId?: string };
    if (!body.checkoutId) {
      return NextResponse.json({ error: "Missing checkoutId" }, { status: 400 });
    }

    await confirmBinancePaymentSubmitted(body.checkoutId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[payments/binance/confirm]", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Confirm failed" }, { status: 400 });
  }
}
