"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { adminLogout, isAdminAuthed } from "@/lib/admin-store";
import { BlobSetupBanner } from "@/components/admin/BlobSetupBanner";

const navItems = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/tasks", label: "Tasks", icon: "📝" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/proofs", label: "Proofs", icon: "🧾" },
  { href: "/admin/orders", label: "Orders", icon: "🛍️" },
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
      <div className="flex min-h-dvh items-center justify-center bg-slate-100 text-slate-500">
        Loading…
      </div>
    );
  }

  if (!authed) return null;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-dvh bg-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-extrabold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-brand-500 text-white">
              ⚙️
            </span>
            <span className="text-lg">
              MyFreeFollower <span className="text-accent-700">Admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/en"
              target="_blank"
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:inline-flex"
            >
              View Site
            </Link>
            <button
              type="button"
              onClick={() => {
                adminLogout();
                router.push("/admin/login");
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50"
            >
              ⎋ Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <aside className="sticky top-20 hidden h-fit w-60 shrink-0 rounded-2xl border border-slate-200 bg-white p-3 lg:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-accent-50 text-accent-800"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <div className="flex flex-wrap gap-2 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                  isActive(item.href)
                    ? "bg-accent-600 text-white ring-accent-600"
                    : "bg-white text-slate-600 ring-slate-200"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
          <BlobSetupBanner />
          {children}
        </div>
      </div>
    </div>
  );
}
