"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { FloatingSupportDock } from "@/components/widgets/FloatingSupportDock";
import { useAuth } from "@/lib/auth-store";
import { localizedPath } from "@/lib/i18n/navigation";
import { formatMoney, formatPoints, moneyFromPoints } from "@/lib/site";

interface NavItem {
  href: string;
  labelKey: string;
  icon: string;
  children?: { href: string; labelKey: string }[];
}

const navItems: NavItem[] = [
  { href: "/dashboard/tasks", labelKey: "tasks", icon: "🏠" },
  { href: "/dashboard/profile", labelKey: "profile", icon: "👤" },
  { href: "/dashboard/free-services", labelKey: "services", icon: "🛍️" },
  { href: "/dashboard/daily-bonus", labelKey: "dailyBonus", icon: "🎁" },
  { href: "/dashboard/proofs", labelKey: "proofs", icon: "💙" },
  {
    href: "/dashboard/withdraw",
    labelKey: "financial",
    icon: "💳",
    children: [
      { href: "/dashboard/withdraw", labelKey: "withdraw" },
      { href: "/dashboard/points", labelKey: "pointsHistory" },
      { href: "/dashboard/orders", labelKey: "orders" },
    ],
  },
  { href: "/dashboard/referrals", labelKey: "referrals", icon: "🌐" },
  { href: "/dashboard/surveys", labelKey: "surveys", icon: "📊" },
  { href: "/dashboard/rules", labelKey: "rules", icon: "❓" },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { t, locale } = useLocale();
  const [openFin, setOpenFin] = useState(
    pathname.includes("/dashboard/withdraw") ||
      pathname.includes("/dashboard/points") ||
      pathname.includes("/dashboard/orders"),
  );

  return (
    <nav className="space-y-1 p-3" aria-label="Dashboard">
      {navItems.map((item) => {
        const fullPath = localizedPath(item.href, locale);
        const active = pathname === fullPath || pathname.startsWith(`${fullPath}/`);

        if (item.children) {
          const groupActive =
            pathname.includes("/dashboard/withdraw") ||
            pathname.includes("/dashboard/points") ||
            pathname.includes("/dashboard/orders");
          return (
            <div key={item.href}>
              <button
                type="button"
                onClick={() => setOpenFin((v) => !v)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  groupActive
                    ? "bg-accent-50 text-accent-800"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>{item.icon}</span> {t(`dashboard.${item.labelKey}`)}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${openFin ? "rotate-90" : ""}`}
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              {openFin && (
                <div className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                  {item.children.map((c) => {
                    const cPath = localizedPath(c.href, locale);
                    return (
                      <LocalizedLink
                        key={c.href}
                        href={c.href}
                        onClick={onNavigate}
                        className={`block rounded-lg px-3 py-2 text-sm transition ${
                          pathname === cPath
                            ? "font-semibold text-accent-700"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {t(`dashboard.${c.labelKey}`)}
                      </LocalizedLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <LocalizedLink
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-accent-50 text-accent-800"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>{item.icon}</span> {t(`dashboard.${item.labelKey}`)}
          </LocalizedLink>
        );
      })}
    </nav>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const { user, ready, logout } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) router.replace(localizedPath("/login", locale));
  }, [ready, user, router, locale]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-100 text-slate-500">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset ring-black/10 lg:hidden"
              aria-label={t("nav.menu")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <LocalizedLink href="/dashboard/tasks" className="inline-flex shrink-0">
              <Logo />
            </LocalizedLink>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-xl bg-accent-50 px-3 py-2 text-sm font-bold text-accent-800 sm:flex">
              🪙 {formatPoints(user.points)} {t("common.points")}
              <span className="text-slate-400">·</span>
              <span>{formatMoney(moneyFromPoints(user.points))}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push(localizedPath("/login", locale));
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50"
            >
              ⎋ <span className="hidden sm:inline">{t("nav.logout")}</span>
            </button>
          </div>
        </div>
      </header>

      <LocalizedLink
        href="/dashboard/free-services"
        className="block border-b border-accent-700/20 bg-gradient-to-r from-accent-700 via-accent-600 to-brand-500 px-4 py-3 text-white transition hover:brightness-105 sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <p className="text-sm font-bold sm:text-base">🎯 {t("dashboard.servicesBanner")}</p>
          <span className="shrink-0 rounded-lg bg-white/20 px-3 py-1 text-xs font-bold ring-1 ring-inset ring-white/30 sm:text-sm">
            {t("dashboard.goToServices")} →
          </span>
        </div>
      </LocalizedLink>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <aside className="sticky top-20 hidden h-fit w-64 shrink-0 rounded-2xl border border-slate-200 bg-white lg:block">
          <SidebarNav />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white">
            <div className="flex h-16 items-center justify-between px-4">
              <LocalizedLink href="/dashboard/tasks" className="inline-flex shrink-0">
              <Logo />
            </LocalizedLink>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-inset ring-black/10"
              >
                ✕
              </button>
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <FloatingSupportDock />
    </div>
  );
}
