import { NextResponse } from "next/server";
import {
  isBlobReady,
  upsertAccount,
  listAccounts,
  getAccount,
  getClientIp,
  checkAdminPassword,
} from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as {
    email?: string;
    data?: {
      user?: unknown;
    };
  };

  if (!body?.email || !body?.data) {
    return NextResponse.json({ error: "Missing data." }, { status: 400 });
  }

  const ip = getClientIp(req);
  const email = body.email.toLowerCase();

  await upsertAccount(email, {
    ...(body.data as object),
    ...(ip ? { ip } : {}),
  });

  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ accounts: [], kv: false });

  const email = new URL(req.url).searchParams.get("email")?.toLowerCase();
  if (email) {
    const account = await getAccount(email);
    return NextResponse.json({ account, kv: true });
  }

  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const accounts = await listAccounts();
  return NextResponse.json({ accounts, kv: true });
}
