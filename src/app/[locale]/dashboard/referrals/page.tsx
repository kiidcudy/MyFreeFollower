"use client";

import { useEffect, useState } from "react";
import { PanelHeader } from "@/components/panel/PanelHeader";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { localizedPath } from "@/lib/i18n/navigation";
import { formatPoints, referralCommissionPercent, siteConfig } from "@/lib/site";

interface ReferralStats {
  count: number;
  commission: number;
  commissionPercent: number;
  invited: { username: string; points: number }[];
}

export default function DashboardReferralsPage() {
  const { t, locale } = useLocale();
  const { referralCode } = useAuth();
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<ReferralStats | null>(null);

  const referralPath = localizedPath(`/register?ref=${referralCode}`, locale);
  const referralUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${referralPath}`
      : `${siteConfig.url}${referralPath}`;

  useEffect(() => {
    if (!referralCode) return;
    fetch(`/api/referral?code=${encodeURIComponent(referralCode)}`)
      .then((r) => r.json())
      .then((data: ReferralStats) => setStats(data))
      .catch(() =>
        setStats({
          count: 0,
          commission: 0,
          commissionPercent: referralCommissionPercent(),
          invited: [],
        }),
      );
  }, [referralCode]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-6">
      <PanelHeader
        title={t("dashboard.referrals")}
        subtitle={t("dashboard.referralDesc", { percent: referralCommissionPercent() })}
      />

      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        {t("dashboard.referralWarning")}
      </div>

      <section className="card p-6">
        <h2 className="font-display text-lg font-bold text-ink-900">
          {t("dashboard.referralLink")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            readOnly
            value={referralUrl}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={copyLink}
            className="btn-primary px-4 py-2 text-sm"
          >
            {copied ? t("dashboard.referralCopied") : t("dashboard.referralCopy")}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">Code: {referralCode}</p>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-lg font-bold text-ink-900">
          {t("dashboard.referralStats")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-brand-50 p-4">
            <p className="text-xs font-semibold text-brand-800">
              {t("dashboard.referralCount")}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-brand-900">
              {stats?.count ?? "—"}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold text-ink-700">
              {t("dashboard.referralEarnings")}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-ink-900">
              {stats?.commission ?? "—"} {t("common.points")}
            </p>
          </div>
        </div>

        {stats && stats.invited.length > 0 && (
          <ul className="mt-4 divide-y divide-slate-100">
            {stats.invited.map((inv, i) => (
              <li key={i} className="flex justify-between py-2 text-sm">
                <span className="font-medium">{inv.username}</span>
                <span className="text-slate-500">
                  {formatPoints(inv.points)} {t("common.points")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
