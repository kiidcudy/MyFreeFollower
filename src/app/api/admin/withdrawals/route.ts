import { NextResponse } from "next/server";
import {
  isBlobReady,
  getWithdrawals,
  addWithdrawal,
  updateWithdrawal,
  deleteWithdrawal,
  checkAdminPassword,
  type Withdrawal,
} from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ withdrawals: [], kv: false });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const withdrawals = await getWithdrawals();
  return NextResponse.json({ withdrawals, kv: true });
}

export async function POST(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as {
    action?: "create" | "review";
    withdrawal?: Withdrawal;
    id?: string;
    status?: "approved" | "rejected";
    note?: string;
  };

  if (body.action === "create") {
    const w = body.withdrawal;
    if (!w?.email || !w?.amountPoints || !w?.destination) {
      return NextResponse.json({ error: "Missing withdrawal data." }, { status: 400 });
    }
    await addWithdrawal({
      ...w,
      email: w.email.toLowerCase(),
      status: w.status ?? "pending",
      createdAt: w.createdAt ?? Date.now(),
    });
    return NextResponse.json({ ok: true, id: w.id });
  }

  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (body.action === "review") {
    if (!body.id || !body.status) {
      return NextResponse.json({ error: "Invalid review request." }, { status: 400 });
    }
    const res = await updateWithdrawal(body.id, {
      status: body.status,
      note: body.note,
      reviewedAt: Date.now(),
    });
    if (!res.ok) return NextResponse.json(res, { status: 404 });
    return NextResponse.json({ ok: true, refunded: res.refunded });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}

export async function DELETE(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json()) as { id?: string };
  if (!body?.id) {
    return NextResponse.json({ error: "Withdrawal id required." }, { status: 400 });
  }

  const ok = await deleteWithdrawal(body.id);
  if (!ok) return NextResponse.json({ error: "Withdrawal not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
