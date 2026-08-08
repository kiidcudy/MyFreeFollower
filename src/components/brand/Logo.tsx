"use client";

import Link from "next/link";
import { useId } from "react";
import { localizedPath } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/config";

function LogoMark({ className = "", gradId }: { className?: string; gradId: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="40" x2="44" y2="8">
          <stop offset="0%" stopColor="#0077ed" />
          <stop offset="55%" stopColor="#5ac8fa" />
          <stop offset="100%" stopColor="#30d158" />
        </linearGradient>
      </defs>
      <path
        d="M8 34C14 22 18 16 24 16C30 16 34 22 40 34"
        stroke={`url(#${gradId})`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M12 28C16 20 19 15 24 15C29 15 32 20 36 28"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="14" cy="30" r="3" fill="#0077ed" />
      <circle cx="24" cy="18" r="3.5" fill="#5ac8fa" />
      <circle cx="34" cy="30" r="3" fill="#30d158" />
      <path
        d="M24 18V10M24 10L20 14M24 10L28 14"
        stroke="#0077ed"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  locale,
  className = "",
  variant = "dark",
}: {
  locale?: Locale;
  className?: string;
  variant?: "dark" | "light";
}) {
  const gradId = useId().replace(/:/g, "");
  const textMain = variant === "light" ? "#ffffff" : "#1d1d1f";
  // #0066cc clears 4.5:1 on the #f5f5f7 footer surface; #0077ed only reaches 3.96:1.
  const textAccent = variant === "light" ? "#64d2ff" : "#0066cc";

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" gradId={gradId} />
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73]"
          style={{ letterSpacing: "0.22em" }}
        >
          My
        </span>
        <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
          <span style={{ color: textAccent }}>Free</span>
          <span style={{ color: textMain }}>Follower</span>
        </span>
      </span>
    </span>
  );

  if (!locale) return content;

  return (
    <Link
      prefetch={false}
      href={localizedPath("/", locale)}
      className="inline-flex shrink-0 items-center"
      aria-label="MyFreeFollower"
    >
      {content}
    </Link>
  );
}
