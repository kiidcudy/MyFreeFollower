import { NextRequest, NextResponse } from "next/server";
import { completeCryptomusCheckoutPayment } from "@/lib/server/checkout";
import { verifyCryptomusWebhook } from "@/lib/server/cryptomus";

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const sign = req.headers.get("sign");
    if (!verifyCryptomusWebhook(raw, sign)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const body = JSON.parse(raw) as {
      order_id?: string;
      status?: string;
      uuid?: string;
    };

    const paid = body.status === "paid" || body.status === "paid_over";
    if (!paid || !body.order_id) {
      return NextResponse.json({ ok: true });
    }

    await completeCryptomusCheckoutPayment(body.order_id, body.uuid);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[cryptomus/webhook]", e);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
