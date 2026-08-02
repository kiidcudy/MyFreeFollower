import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { LocaleChrome } from "@/components/layout/LocaleChrome";
import { isLocale, isRtl, locales, type Locale } from "@/lib/i18n/config";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;

  return (
    <LocaleProvider initialLocale={locale}>
      <div dir={isRtl(locale) ? "rtl" : "ltr"} className="flex min-h-screen flex-col">
        <LocaleChrome>{children}</LocaleChrome>
      </div>
    </LocaleProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
