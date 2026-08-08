"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n/navigation";

type LocalizedLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "href"
> & {
  href: string;
};

export function LocalizedLink({
  href,
  children,
  // Header and footer nav links sit in the viewport on every page, so the
  // default viewport prefetch fires a dozen ?_rsc requests during load.
  // Next still prefetches on hover/touch-start, so navigation stays fast.
  prefetch = false,
  ...props
}: LocalizedLinkProps) {
  const { locale } = useLocale();
  const path = href.startsWith("http")
    ? href
    : localizedPath(href, locale);

  if (href.startsWith("http")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={path} prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}
