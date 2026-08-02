import { NextResponse } from "next/server";
import {
  isBlobReady,
  addServiceOrder,
  getServiceOrders,
  getServiceOrderById,
  updateServiceOrder,
  deleteServiceOrder,
  checkAdminPassword,
  getAccount,
  upsertAccount,
  type ServiceOrder,
} from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as Partial<ServiceOrder>;
  if (!body?.serviceSlug || !body?.email || !body?.username) {
    return NextResponse.json({ error: "Missing order data." }, { status: 400 });
  }

  const email = String(body.email).toLowerCase();
  const points = Number(body.points ?? 0);

  const acc = await getAccount(email);
  if (acc?.user && points > 0) {
    if ((acc.user.points ?? 0) < points) {
      return NextResponse.json({ error: "Insufficient points." }, { status: 400 });
    }
    await upsertAccount(email, {
      user: { ...acc.user, points: acc.user.points - points },
      withdrawals: acc.withdrawals ?? [],
    });
  }

  const order: ServiceOrder = {
    id:
      body.id ??
      `svc-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    serviceSlug: String(body.serviceSlug),
    serviceTitle: body.serviceTitle ?? "",
    username: String(body.username).trim(),
    points,
    quantity: Number(body.quantity ?? 0),
    tier: body.tier === "free" ? "free" : "paid",
    packageId: body.packageId,
    status: "pending",
    email,
    memberUsername: body.memberUsername ?? body.email!,
    createdAt: body.createdAt ?? Date.now(),
  };

  await addServiceOrder(order);
  return NextResponse.json({ ok: true, id: order.id });
}

export async function GET(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ orders: [], kv: false });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    const order = await getServiceOrderById(id);
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    return NextResponse.json({ order, kv: true });
  }

  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const orders = await getServiceOrders();
  return NextResponse.json({ orders, kv: true });
}

export async function PATCH(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json()) as { id?: string; patch?: Partial<ServiceOrder> };
  if (!body?.id || !body?.patch) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const res = await updateServiceOrder(body.id, body.patch);
  if (!res.ok) return NextResponse.json(res, { status: 404 });
  return NextResponse.json(res);
}

export async function DELETE(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json()) as { id?: string };
  if (!body?.id) {
    return NextResponse.json({ error: "Order id required." }, { status: 400 });
  }

  const ok = await deleteServiceOrder(body.id);
  if (!ok) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
