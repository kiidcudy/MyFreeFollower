import { NextResponse } from "next/server";
import { blobReady, reviewProof, checkAdminPassword, type ProofStatus } from "@/lib/kv";

export const dynamic = "force-dynamic";

const VALID: ProofStatus[] = ["approved", "rejected", "needs_edit", "recheck"];

export async function POST(req: Request) {
  if (!blobReady) return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json()) as {
    proofId?: string;
    status?: ProofStatus;
    note?: string;
  };

  if (!body?.proofId || !body?.status || !VALID.includes(body.status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const res = await reviewProof(body.proofId, body.status, body.note);
  if (!res.ok) return NextResponse.json({ error: "Proof not found." }, { status: 404 });
  return NextResponse.json({ ok: true, awarded: res.awarded });
}
