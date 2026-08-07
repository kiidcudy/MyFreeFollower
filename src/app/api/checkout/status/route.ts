import { NextRequest, NextResponse } from "next/server";
import { getCheckoutStatus } from "@/lib/server/checkout";

export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const status = await getCheckoutStatus(id);
  if (!status) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(status);
}
