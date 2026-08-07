import { NextRequest, NextResponse } from "next/server";
import { prepareCheckout, storageReady } from "@/lib/server/checkout";

export async function POST(req: NextRequest) {
  try {
    if (!storageReady()) {
      return NextResponse.json({ error: "Server storage not configured", code: "NO_BLOB" }, { status: 503 });
    }

    const body = (await req.json()) as {
      email?: string;
      memberUsername?: string;
      items?: Array<{
        serviceSlug: string;
        serviceTitle: string;
        platform: string;
        quantity: number;
        priceUSD: number;
        priceEUR: number;
        username: string;
      }>;
    };

    if (!body.items?.length || !body.email) {
      return NextResponse.json({ error: "Cart is empty or email missing" }, { status: 400 });
    }

    const result = await prepareCheckout({
      email: body.email,
      memberUsername: body.memberUsername,
      items: body.items,
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("[checkout/prepare]", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Checkout failed" }, { status: 400 });
  }
}
