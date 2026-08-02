import {
  platformMetadata,
  PlatformServicesPage,
  parseLocale,
  platformStaticParams,
} from "@/lib/catalog/platform-pages";
import type { Metadata } from "next";

export function generateStaticParams() {
  return platformStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; platform: string }>;
}): Promise<Metadata> {
  const { locale: raw, platform } = await params;
  return platformMetadata("paid", parseLocale(raw), platform);
}

export default async function PaidPlatformPage({
  params,
}: {
  params: Promise<{ locale: string; platform: string }>;
}) {
  const { locale: raw, platform } = await params;
  return (
    <PlatformServicesPage locale={parseLocale(raw)} platformSlug={platform} tier="paid" />
  );
}
