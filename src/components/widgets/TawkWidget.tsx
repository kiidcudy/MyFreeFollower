"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export function TawkWidget() {
  const propertyId = siteConfig.tawkPropertyId;
  if (!propertyId) return null;

  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "default";
  const src = `https://embed.tawk.to/${propertyId}/${widgetId}`;

  return (
    <Script
      id="tawk-widget"
      src={src}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
