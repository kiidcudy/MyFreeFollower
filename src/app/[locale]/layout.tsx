import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { TawkWidget } from "@/components/widgets/TawkWidget";
import { SupportSidebar } from "@/components/widgets/SupportSidebar";
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
        <Header />
        <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-4 sm:px-6">
          {children}
        </main>
        <Footer />
        <SupportSidebar />
        <TawkWidget />
      </div>
    </LocaleProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
