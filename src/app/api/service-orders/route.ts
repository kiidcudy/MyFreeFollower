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
  type OrderPaymentMethod,
} from "@/lib/kv";

export const dynamic = "force-dynamic";

function genPaidOrderId(): string {
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `ORD-${rand}`;
}

function genFreeOrderId(): string {
  return `svc-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

export async function POST(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as Partial<ServiceOrder>;
  if (!body?.serviceSlug || !body?.email || !body?.username) {
    return NextResponse.json({ error: "Missing order data." }, { status: 400 });
  }

  const email = String(body.email).toLowerCase();
  const tier = body.tier === "free" ? "free" : "paid";
  const points = Number(body.points ?? 0);
  const paymentMethod = (body.paymentMethod ?? (tier === "free" ? "points" : "card")) as OrderPaymentMethod;

  if (tier === "paid" && paymentMethod === "points") {
    return NextResponse.json({ error: "Paid orders require card or crypto payment." }, { status: 400 });
  }

  const acc = await getAccount(email);
  if (acc?.user && tier === "free" && points > 0) {
    if ((acc.user.points ?? 0) < points) {
      return NextResponse.json({ error: "Insufficient points." }, { status: 400 });
    }
    await upsertAccount(email, {
      user: { ...acc.user, points: acc.user.points - points },
      withdrawals: acc.withdrawals ?? [],
    });
  }

  const chargeUSD = tier === "paid" ? Number(body.chargeUSD ?? 0) : 0;
  const chargeEUR = tier === "paid" ? Number(body.chargeEUR ?? 0) : 0;

  const order: ServiceOrder = {
    id: body.id ?? (tier === "paid" ? genPaidOrderId() : genFreeOrderId()),
    serviceSlug: String(body.serviceSlug),
    serviceTitle: body.serviceTitle ?? "",
    username: String(body.username).trim(),
    points: tier === "free" ? points : 0,
    quantity: Number(body.quantity ?? 0),
    tier,
    packageId: body.packageId,
    status: "pending",
    paymentMethod,
    paymentStatus: tier === "paid" ? (body.paymentStatus ?? "pending") : undefined,
    chargeUSD: tier === "paid" ? chargeUSD : undefined,
    chargeEUR: tier === "paid" ? chargeEUR : undefined,
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
  const tierFilter = url.searchParams.get("tier");

  if (id) {
    const order = await getServiceOrderById(id);
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    return NextResponse.json({ order, kv: true });
  }

  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let orders = await getServiceOrders();
  if (tierFilter === "paid") orders = orders.filter((o) => o.tier === "paid");
  if (tierFilter === "free") orders = orders.filter((o) => o.tier === "free");

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
