"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { useAuth } from "@/lib/auth-store";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { localizedPath } from "@/lib/i18n/navigation";

export default function RegisterPage() {
  const { t, locale } = useLocale();
  const { register, user, ready } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  useEffect(() => {
    if (ready && user) {
      router.replace(localizedPath("/dashboard", locale));
    }
  }, [ready, user, router, locale]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !fullName.trim() || !email.trim() || !password) {
      setError(t("auth.requiredField"));
      return;
    }
    if (password.length < 8) {
      setError(t("auth.passwordHint"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }
    if (!agreeTerms) {
      setError(t("auth.agreeTerms"));
      return;
    }

    setLoading(true);
    const result = await register({
      username: username.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      ref: referralCode.trim() || undefined,
    });
    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? t("errors.generic"));
      return;
    }

    router.push(localizedPath("/dashboard", locale));
  }

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t("nav.home"), path: "/" },
          { label: t("nav.register"), path: "/register" },
        ]}
      />

      <div className="mx-auto max-w-md">
        <h1 className="font-display text-3xl font-bold text-ink-900">
          {t("auth.registerTitle")}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
        >
          <div>
            <label htmlFor="reg-username" className="block text-sm font-semibold text-ink-800">
              {t("auth.username")}
            </label>
            <input
              id="reg-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="reg-fullname" className="block text-sm font-semibold text-ink-800">
              {t("auth.fullName")}
            </label>
            <input
              id="reg-fullname"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="reg-email" className="block text-sm font-semibold text-ink-800">
              {t("auth.email")}
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="reg-password" className="block text-sm font-semibold text-ink-800">
              {t("auth.password")}
            </label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <p className="mt-1 text-xs text-ink-700">{t("auth.passwordHint")}</p>
          </div>

          <div className="mt-4">
            <label htmlFor="reg-confirm" className="block text-sm font-semibold text-ink-800">
              {t("auth.confirmPassword")}
            </label>
            <input
              id="reg-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="reg-ref" className="block text-sm font-semibold text-ink-800">
              {t("auth.referralCode")}
            </label>
            <input
              id="reg-ref"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <label className="mt-4 flex items-start gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 rounded border-slate-300"
            />
            <span>{t("auth.agreeTerms")}</span>
          </label>

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
            {loading ? t("common.loading") : t("auth.registerSubmit")}
          </button>

          <div className="mt-6">
            <p className="text-center text-xs text-ink-700">{t("auth.orContinueWith")}</p>
            <div className="mt-3">
              <GoogleSignInButton
                referralCode={referralCode || undefined}
                onError={setError}
                onSuccess={() => router.push(localizedPath("/dashboard", locale))}
              />
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-ink-700">
          {t("auth.hasAccount")}{" "}
          <LocalizedLink href="/login" className="font-semibold text-brand-700 hover:underline">
            {t("auth.loginTab")}
          </LocalizedLink>
        </p>
      </div>
    </>
  );
}
