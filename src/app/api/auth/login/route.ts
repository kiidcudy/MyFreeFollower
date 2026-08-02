import { NextResponse } from "next/server";
import { isBlobReady, loginAccount, getClientIp } from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as { identifier?: string; password?: string };
  if (!body?.identifier || !body?.password) {
    return NextResponse.json(
      { ok: false, error: "Email/username and password are required." },
      { status: 400 }
    );
  }

  const res = await loginAccount(body.identifier, body.password, getClientIp(req));
  return NextResponse.json(res);
}
