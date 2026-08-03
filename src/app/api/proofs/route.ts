import { NextResponse } from "next/server";
import {
  isBlobReady,
  addProof,
  getProofs,
  getProofById,
  deleteProof,
  checkAdminPassword,
  type Proof,
} from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as Partial<Proof>;
  if (!body?.taskId || !body?.email || !body?.media || !body?.mediaType) {
    return NextResponse.json({ error: "Missing proof data." }, { status: 400 });
  }

  const proof: Proof = {
    id:
      body.id ??
      `proof-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    taskId: String(body.taskId),
    taskTitle: body.taskTitle ?? "",
    platform: body.platform ?? "",
    type: body.type,
    points: Number(body.points ?? 0),
    email: String(body.email).toLowerCase(),
    username: body.username ?? body.email!,
    accountName: body.accountName?.trim() || undefined,
    mediaType: body.mediaType,
    media: body.media,
    status: "pending",
    createdAt: Date.now(),
  };

  const result = await addProof(proof);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }
  return NextResponse.json({ ok: true, id: proof.id });
}

export async function GET(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ proofs: [], kv: false });

  const url = new URL(req.url);
  const email = url.searchParams.get("email")?.toLowerCase();
  const id = url.searchParams.get("id");

  if (id) {
    const proof = await getProofById(id);
    if (!proof) return NextResponse.json({ error: "Proof not found." }, { status: 404 });
    if (email && proof.email !== email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }
    return NextResponse.json({ proof, kv: true });
  }

  const all = await getProofs();

  if (email) {
    return NextResponse.json({ proofs: all.filter((p) => p.email === email), kv: true });
  }

  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ proofs: all, kv: true });
}

export async function DELETE(req: Request) {
  if (!isBlobReady()) return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json()) as { id?: string };
  if (!body?.id) {
    return NextResponse.json({ error: "Proof id required." }, { status: 400 });
  }

  const ok = await deleteProof(body.id);
  if (!ok) return NextResponse.json({ error: "Proof not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
