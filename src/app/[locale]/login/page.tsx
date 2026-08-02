"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { useAuth } from "@/lib/auth-store";
import { localizedPath } from "@/lib/i18n/navigation";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  const { t, locale } = useLocale();
  const { login, user, ready } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) {
      router.replace(localizedPath("/dashboard", locale));
    }
  }, [ready, user, router, locale]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(identifier, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? t("auth.invalidCredentials"));
      return;
    }
    router.push(localizedPath("/dashboard", locale));
  }

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t("nav.home"), path: "/" },
          { label: t("nav.login"), path: "/login" },
        ]}
      />

      <div className="mx-auto max-w-md">
        <h1 className="font-display text-3xl font-bold text-ink-900">
          {t("auth.loginTitle")}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
        >
          <div>
            <label htmlFor="login-identifier" className="block text-sm font-semibold text-ink-800">
              {t("auth.email")}
            </label>
            <input
              id="login-identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="login-password" className="block text-sm font-semibold text-ink-800">
              {t("auth.password")}
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? t("common.loading") : t("auth.loginSubmit")}
          </button>

          <div className="mt-6">
            <p className="text-center text-xs text-ink-700">{t("auth.orContinueWith")}</p>
            <div className="mt-3">
              <GoogleSignInButton
                onError={setError}
                onSuccess={() => router.push(localizedPath("/dashboard", locale))}
              />
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-ink-700">
          {t("auth.noAccount")}{" "}
          <LocalizedLink href="/register" className="font-semibold text-brand-700 hover:underline">
            {t("auth.registerTab")}
          </LocalizedLink>
        </p>
      </div>
    </>
  );
}
