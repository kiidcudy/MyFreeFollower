"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/lib/auth-store";
import { siteConfig } from "@/lib/site";

type GoogleCredentialResponse = { credential: string };

type GoogleIdApi = {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, string | number>) => void;
};

declare global {
  interface Window {
    google?: { accounts?: { id?: GoogleIdApi } };
  }
}

export function GoogleSignInButton({
  onError,
  onSuccess,
  referralCode,
}: {
  onError?: (message: string) => void;
  onSuccess?: () => void;
  referralCode?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { loginWithGoogle } = useAuth();
  const { locale } = useLocale();
  const clientId = siteConfig.googleClientId;

  const handleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      const result = await loginWithGoogle(response.credential, referralCode);
      if (!result.ok) {
        onError?.(result.error ?? "Google sign-in failed.");
        return;
      }
      onSuccess?.();
    },
    [loginWithGoogle, onError, onSuccess, referralCode],
  );

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;

    const render = (): boolean => {
      const api = window.google?.accounts?.id;
      if (cancelled || !api || !ref.current) return false;
      api.initialize({ client_id: clientId, callback: handleCredential });
      ref.current.innerHTML = "";
      api.renderButton(ref.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        logo_alignment: "left",
        locale,
        width: 320,
      });
      return true;
    };

    if (render()) return;
    const timer = window.setInterval(() => {
      if (render()) window.clearInterval(timer);
    }, 200);
    const stop = window.setTimeout(() => window.clearInterval(timer), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, [clientId, handleCredential, locale]);

  if (!clientId) return null;

  return (
    <>
      <Script
        id="google-gsi-client"
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      <div ref={ref} className="flex min-h-[44px] justify-center" />
    </>
  );
}
