"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
      hideWidget?: () => void;
      showWidget?: () => void;
      onLoad?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

function ChatIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h8M8 14h5M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.05-1.24A9.96 9.96 0 0012 22z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FloatingSupportDock() {
  const { t } = useLocale();
  const propertyId = siteConfig.tawkPropertyId;
  const widgetId = siteConfig.tawkWidgetId;
  const [loadTawk, setLoadTawk] = useState(false);
  const pendingOpenRef = useRef(false);

  // Chat is only fetched once the visitor interacts, so the third-party bundle
  // never competes with the initial page load.
  useEffect(() => {
    if (!propertyId) return;
    const onInteraction = () => setLoadTawk(true);
    window.addEventListener("scroll", onInteraction, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteraction, { once: true, passive: true });
    return () => {
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("pointerdown", onInteraction);
    };
  }, [propertyId]);

  useEffect(() => {
    if (!propertyId || !loadTawk) return;

    window.Tawk_API = window.Tawk_API || {};
    const previousOnLoad = window.Tawk_API.onLoad;

    window.Tawk_API.onLoad = function onTawkLoad() {
      previousOnLoad?.();
      if (pendingOpenRef.current) {
        pendingOpenRef.current = false;
        window.Tawk_API?.maximize?.();
        return;
      }
      window.Tawk_API?.hideWidget?.();
    };
  }, [propertyId, loadTawk]);

  const openTawk = () => {
    if (window.Tawk_API?.maximize) {
      window.Tawk_API.maximize();
      return;
    }
    pendingOpenRef.current = true;
    setLoadTawk(true);
  };

  return (
    <>
      {propertyId && loadTawk && (
        <Script
          id="tawk-widget"
          src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      )}

      <div
        role="group"
        aria-label={t("common.support")}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex items-end justify-between px-4 pb-4 sm:px-6 sm:pb-6"
      >
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)]"
          title={`WhatsApp ${siteConfig.whatsappDisplay}`}
          aria-label={`WhatsApp ${siteConfig.whatsappDisplay}`}
        >
          <WhatsAppIcon />
        </a>

        {propertyId && (
          <button
            type="button"
            onClick={openTawk}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0077ed] text-white shadow-[0_8px_28px_rgba(0,119,237,0.45)] transition hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,119,237,0.5)]"
            title={t("common.liveChat")}
            aria-label={t("common.liveChat")}
          >
            <ChatIcon />
          </button>
        )}
      </div>
    </>
  );
}
