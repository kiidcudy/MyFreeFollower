import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { FloatingSupportDock } from "@/components/widgets/FloatingSupportDock";
import { isLocale, isRtl, locales, type Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/translations";

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
        <Header topBanner={t(locale, "home.topBanner")} />
        <main id="main-content" className="site-main flex-1 w-full overflow-x-hidden pb-24">
          {children}
        </main>
        <Footer locale={locale} />
        <FloatingSupportDock />
      </div>
    </LocaleProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
