"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { adminLogout, isAdminAuthed } from "@/lib/admin-store";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/admin", label: "Overview", icon: "◉" },
  { href: "/admin/tasks", label: "Tasks", icon: "✓" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/proofs", label: "Proofs", icon: "📋" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: "💸" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const ok = isAdminAuthed();
    setAuthed(ok);
    if (!ok) router.replace("/admin/login");
  }, [router]);

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-300">
        Loading…
      </div>
    );
  }

  if (!authed) return null;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-56 shrink-0 flex-col bg-slate-900 text-slate-200 lg:flex">
        <div className="border-b border-slate-700 p-4">
          <p className="font-display text-sm font-bold text-white">MyFreeFollower Admin</p>
          <p className="text-xs text-slate-400">Control panel</p>
        </div>
        <nav className="flex-1 space-y-0.5 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-teal-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-700 p-3 space-y-1">
          <Link
            href="/en"
            target="_blank"
            className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            View Site ↗
          </Link>
          <button
            type="button"
            onClick={() => {
              adminLogout();
              router.push("/admin/login");
            }}
            className="w-full rounded-lg px-3 py-2 text-start text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white px-4 py-3 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-sm font-bold text-ink-900 lg:hidden">
              MyFreeFollower Admin
            </p>
            <div className="flex flex-wrap gap-2 lg:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isActive(item.href)
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="ms-auto flex items-center gap-2">
              <Link
                href="/en"
                target="_blank"
                className="hidden rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-slate-50 sm:inline-flex"
              >
                View Site
              </Link>
              <button
                type="button"
                onClick={() => {
                  adminLogout();
                  router.push("/admin/login");
                }}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-slate-50"
              >
                Log out
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
