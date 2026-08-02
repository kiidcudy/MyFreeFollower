import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/translations";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  return createMetadata({
    title: t(locale, "meta.registerTitle"),
    description: t(locale, "meta.defaultDescription"),
    path: "/register",
    locale,
    noIndex: true,
  });
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
