"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * GA4 — loads only when a measurement id is configured.
 *
 * `strategy="lazyOnload"` alone still injects gtag at the window load event,
 * which on this site fires *before* the hero has painted, so the ~160 KB gtag
 * bundle lands inside the LCP window and gets charged to it. We therefore wait
 * for the browser to report its first contentful paint and then for the first
 * idle slot after it.
 *
 * This is time-based, never interaction-based: a visitor who bounces without
 * scrolling or clicking still sends a pageview, because both the idle callback
 * and the paint observer are backed by hard timeouts.
 */
const IDLE_TIMEOUT_MS = 2000;
const PAINT_FALLBACK_MS = 4000;

export function GoogleAnalytics() {
  const id = siteConfig.googleAnalyticsId;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!id) return;
    let done = false;
    let observer: PerformanceObserver | undefined;

    const mount = () => {
      if (done) return;
      done = true;
      observer?.disconnect();
      const ric = window.requestIdleCallback;
      if (ric) ric(() => setMounted(true), { timeout: IDLE_TIMEOUT_MS });
      else window.setTimeout(() => setMounted(true), 200);
    };

    const painted = performance.getEntriesByName("first-contentful-paint").length > 0;
    if (painted) {
      mount();
    } else {
      try {
        observer = new PerformanceObserver((list) => {
          if (list.getEntriesByName("first-contentful-paint").length) mount();
        });
        observer.observe({ type: "paint", buffered: true });
      } catch {
        /* no PerformanceObserver — the fallback timer covers it */
      }
    }

    const fallback = window.setTimeout(mount, PAINT_FALLBACK_MS);
    return () => {
      window.clearTimeout(fallback);
      observer?.disconnect();
    };
  }, [id]);

  if (!id || !mounted) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
