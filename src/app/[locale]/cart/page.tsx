import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartView } from "@/components/cart/CartView";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/translations";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw as Locale);
  return {
    title: `${messages.cart.title} | ${siteConfig.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const messages = getMessages(raw as Locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mff-heading-lg mb-8">{messages.cart.title}</h1>
      <CartView />
    </div>
  );
}
