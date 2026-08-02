"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { localizedPath } from "@/lib/i18n/navigation";
import { formatPoints } from "@/lib/site";

const navKeys = [
  { href: "/dashboard", key: "overview", icon: "◉" },
  { href: "/dashboard/tasks", key: "tasks", icon: "✓" },
  { href: "/dashboard/proofs", key: "proofs", icon: "📋" },
  { href: "/dashboard/free-services", key: "freeServices", icon: "🎁" },
  { href: "/dashboard/buy-services", key: "buyServices", icon: "🛒" },
  { href: "/dashboard/points", key: "pointsHistory", icon: "💎" },
  { href: "/dashboard/withdraw", key: "withdraw", icon: "💸" },
  { href: "/dashboard/referrals", key: "referrals", icon: "🔗" },
  { href: "/dashboard/daily-bonus", key: "dailyBonus", icon: "⭐" },
  { href: "/dashboard/orders", key: "orders", icon: "📦" },
  { href: "/dashboard/profile", key: "profile", icon: "👤" },
] as const;

type NavKey = (typeof navKeys)[number]["key"];

function navLabel(t: (key: string) => string, key: NavKey): string {
  return t(`dashboard.${key}`);
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const { user, ready, logout } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) {
      router.replace(localizedPath("/login", locale));
    }
  }, [ready, user, router, locale]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-ink-700">{t("common.loading")}</p>
      </div>
    );
  }

  if (!user) return null;

  const dashBase = localizedPath("/dashboard", locale);

  return (
    <div className="-mx-4 -my-8 flex min-h-[calc(100vh-12rem)] flex-col lg:flex-row">
      <aside
        className={`border-b border-slate-200 bg-white lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-e ${
          mobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="border-b border-slate-100 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {t("dashboard.title")}
          </p>
          <p className="mt-1 truncate text-sm font-bold text-ink-900">
            {user.fullName || user.username}
          </p>
          <p className="mt-2 inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-800 ring-1 ring-brand-200">
            {formatPoints(user.points)} {t("common.points")}
          </p>
        </div>
        <nav className="space-y-0.5 p-2" aria-label="Dashboard">
          {navKeys.map((item) => {
            const fullPath = localizedPath(item.href, locale);
            const active =
              item.href === "/dashboard"
                ? pathname === dashBase || pathname === `${dashBase}/`
                : pathname.startsWith(fullPath);
            return (
              <LocalizedLink
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-brand-50 text-brand-800 ring-1 ring-brand-200"
                    : "text-ink-700 hover:bg-slate-50"
                }`}
              >
                <span aria-hidden className="text-base">
                  {item.icon}
                </span>
                {navLabel(t, item.key)}
              </LocalizedLink>
            );
          })}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={() => {
              logout();
              router.push(localizedPath("/login", locale));
            }}
            className="w-full rounded-lg px-3 py-2 text-start text-sm font-semibold text-ink-600 hover:bg-slate-50"
          >
            {t("nav.logout")}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <p className="font-display text-sm font-bold text-ink-900">{t("dashboard.title")}</p>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold"
          >
            {mobileOpen ? t("nav.closeMenu") : t("nav.menu")}
          </button>
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
