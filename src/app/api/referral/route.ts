import { NextResponse } from "next/server";
import { blobReady, listAccounts } from "@/lib/kv";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

interface UserLike {
  username?: string;
  points?: number;
  invitedBy?: string;
}

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code")?.trim();
  if (!code) {
    return NextResponse.json({ error: "Referral code required." }, { status: 400 });
  }

  if (!blobReady) {
    return NextResponse.json({
      invited: [],
      count: 0,
      totalEarned: 0,
      commission: 0,
      commissionPercent: siteConfig.referralCommissionPercent,
      kv: false,
    });
  }

  const accounts = await listAccounts();
  const invited = accounts
    .map((a) => a.user as UserLike | null)
    .filter((u): u is UserLike => Boolean(u) && u!.invitedBy === code)
    .map((u) => ({ username: u.username ?? "User", points: u.points ?? 0 }));

  const totalEarned = invited.reduce((s, i) => s + i.points, 0);
  const commission = Math.floor(
    (totalEarned * siteConfig.referralCommissionPercent) / 100
  );

  return NextResponse.json({
    invited,
    count: invited.length,
    totalEarned,
    commission,
    commissionPercent: siteConfig.referralCommissionPercent,
    kv: true,
  });
}
