import { NextResponse } from "next/server";
import { blobReady, registerAccount, getClientIp } from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!blobReady) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as {
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
    ref?: string;
  };

  if (!body?.username || !body?.email || !body?.password) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const ip = getClientIp(req);
  const res = await registerAccount({
    username: body.username,
    fullName: body.fullName,
    email: body.email,
    password: body.password,
    ref: body.ref,
    ip,
  });

  return NextResponse.json(res);
}
