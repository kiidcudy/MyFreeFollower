import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { blobReady, upsertGoogleAccount, getClientIp } from "@/lib/kv";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const client = siteConfig.googleClientId
  ? new OAuth2Client(siteConfig.googleClientId)
  : null;

export async function POST(req: Request) {
  if (!blobReady) return NextResponse.json({ ok: false, kv: false }, { status: 503 });

  const body = (await req.json()) as { credential?: string; ref?: string };
  if (!body?.credential) {
    return NextResponse.json({ ok: false, error: "Google credential missing." }, { status: 400 });
  }

  if (!client || !siteConfig.googleClientId) {
    return NextResponse.json(
      { ok: false, error: "Google sign-in is not configured on this server." },
      { status: 503 }
    );
  }

  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: body.credential,
      audience: siteConfig.googleClientId,
    });
    payload = ticket.getPayload();
  } catch {
    return NextResponse.json({ ok: false, error: "Google verification failed." }, { status: 401 });
  }

  if (!payload?.email || !payload.email_verified) {
    return NextResponse.json(
      { ok: false, error: "Google email could not be verified." },
      { status: 401 }
    );
  }

  const res = await upsertGoogleAccount({
    email: payload.email,
    name: payload.name,
    ref: body.ref,
    ip: getClientIp(req),
  });

  return NextResponse.json(res);
}
