import { NextResponse } from "next/server";
import {
  blobReady,
  listAccounts,
  adminUpdateUser,
  checkAdminPassword,
  type AdminUserAction,
} from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!blobReady) return NextResponse.json({ accounts: [], kv: false });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const accounts = await listAccounts();
  return NextResponse.json({ accounts, kv: true });
}

export async function POST(req: Request) {
  if (!blobReady) return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json()) as {
    email?: string;
    action?: AdminUserAction;
    value?: string | number;
  };

  if (!body?.email || !body?.action) {
    return NextResponse.json({ ok: false, error: "Missing request fields." }, { status: 400 });
  }

  const res = await adminUpdateUser(body.email, body.action, body.value);
  if (!res.ok) return NextResponse.json(res, { status: 400 });
  return NextResponse.json(res);
}
