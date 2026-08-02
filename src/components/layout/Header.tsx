"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { localesForSelect } from "@/lib/i18n/config";
import { formatPoints } from "@/lib/site";

function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = localesForSelect.find((l) => l.code === locale);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-[100]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-semibold text-[#1d1d1f] transition hover:bg-black/[0.07]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.language")}
      >
        <span>{current?.flag ?? locale.toUpperCase()}</span>
        <span className="hidden sm:inline">{current?.label}</span>
      </button>
      {open && (
        <ul
          className="absolute end-0 z-[100] mt-2 max-h-64 w-48 overflow-y-auto rounded-2xl border border-black/[0.06] bg-white/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl"
          role="listbox"
        >
          {localesForSelect.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                role="option"
                aria-selected={item.code === locale}
                onClick={() => {
                  setLocale(item.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-start text-sm transition ${
                  item.code === locale
                    ? "bg-[#0077ed]/10 font-semibold text-[#0077ed]"
                    : "text-[#1d1d1f] hover:bg-black/[0.04]"
                }`}
              >
                <span className="text-xs">{item.flag}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PointsBadge() {
  const { user, ready } = useAuth();
  const { t } = useLocale();
  if (!ready || !user) return null;

  return (
    <LocalizedLink
      href="/dashboard"
      className="hidden items-center gap-1.5 rounded-full bg-[#0077ed]/10 px-3.5 py-1.5 text-xs font-semibold text-[#0077ed] transition hover:bg-[#0077ed]/15 sm:inline-flex"
    >
      {formatPoints(user.points)} {t("nav.points")}
    </LocalizedLink>
  );
}

export function Header() {
  const { t, locale } = useLocale();
  const { user, ready, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainNav = [
    { href: "/free-followers", label: t("nav.freeServices"), highlight: true },
    { href: "/buy-followers", label: t("nav.services") },
  ];

  const secondaryNav = [
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-black/[0.04] bg-[#0077ed]/[0.03]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs text-[#6e6e73] sm:px-6">
          <p className="truncate font-medium">{t("home.topBanner")}</p>
          <LanguageSwitcher />
        </div>
      </div>

      <div
        className={`border-b transition duration-300 ${
          scrolled
            ? "border-black/[0.06] bg-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
            : "border-transparent bg-white/60 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Logo locale={locale} />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {mainNav.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                className={link.highlight ? "mff-nav-link-active" : "mff-nav-link"}
              >
                {link.label}
              </LocalizedLink>
            ))}
            {secondaryNav.map((link) => (
              <LocalizedLink key={link.href} href={link.href} className="mff-nav-link">
                {link.label}
              </LocalizedLink>
            ))}
          </nav>

          <div className="hidden flex-1 justify-center px-4 md:flex lg:max-w-sm xl:max-w-md">
            <SiteSearch variant="header" />
          </div>

          <div className="ms-auto flex items-center gap-2">
            <PointsBadge />
            {!ready ? (
              <div className="h-9 w-24 animate-pulse rounded-full bg-black/[0.05]" aria-hidden />
            ) : user ? (
              <div className="flex items-center gap-1">
                <LocalizedLink href="/dashboard" className="mff-nav-link hidden sm:inline-flex">
                  {t("nav.dashboard")}
                </LocalizedLink>
                <button type="button" onClick={logout} className="mff-nav-link">
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LocalizedLink href="/login" className="mff-nav-link hidden sm:inline-flex">
                  {t("nav.login")}
                </LocalizedLink>
                <LocalizedLink href="/register" className="mff-btn-primary px-5 py-2.5 text-xs">
                  {t("nav.register")}
                </LocalizedLink>
              </div>
            )}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.menu")}
              aria-expanded={menuOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-b border-black/[0.06] bg-white/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4 sm:px-6">
            <SiteSearch variant="header" />
            <nav className="space-y-1" aria-label="Mobile">
              {[...mainNav, ...secondaryNav].map((link) => (
                <LocalizedLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    pathname.includes(link.href)
                      ? "bg-[#0077ed]/10 text-[#0077ed]"
                      : "text-[#1d1d1f] hover:bg-black/[0.04]"
                  }`}
                >
                  {link.label}
                </LocalizedLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
