import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/marketing/HeroSection";
import { PlatformGrid } from "@/components/marketing/PlatformGrid";
import { TrustBar } from "@/components/marketing/TrustBar";
import { CtaSection } from "@/components/marketing/CtaSection";
import { PopularServices } from "@/components/marketing/PopularServices";
import { PopularFreeServices } from "@/components/marketing/PopularFreeServices";
import { HomeFeaturedPlatforms } from "@/components/marketing/HomeFeaturedPlatforms";
import { HomeGuaranteeBand } from "@/components/marketing/HomeGuaranteeBand";
import { HomeTestimonials } from "@/components/marketing/HomeTestimonials";
import { HomeBlogPreview } from "@/components/marketing/HomeBlogPreview";
import { WhyUs } from "@/components/marketing/WhyUs";
import { HomeFaq } from "@/components/marketing/HomeFaq";
import { HomeSeoBlock } from "@/components/marketing/HomeSeoBlock";
import { PaymentMethodsBar } from "@/components/marketing/PaymentMethodsBar";
import { HomeSection } from "@/components/marketing/HomeSection";
import { HomeSplitCta } from "@/components/marketing/HomeSplitCta";
import { HomeHowSteps } from "@/components/marketing/HomeHowSteps";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";
import { buildFAQSchema, createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  return createMetadata({
    title: t(locale, "meta.homeTitle"),
    description: t(locale, "meta.homeDescription"),
    path: "",
    locale,
    absoluteTitle: true,
  });
}

const internalLinks = [
  { path: "/free-followers", labelKey: "home.linkFreeHub" },
  { path: "/buy-followers", labelKey: "home.linkPaidHub" },
  { path: "/how-it-works", labelKey: "home.linkHowItWorks" },
  { path: "/faq", labelKey: "home.linkFaq" },
  { path: "/blog", labelKey: "home.linkBlog" },
  { path: "/about", labelKey: "home.linkAbout" },
  { path: "/contact", labelKey: "home.linkContact" },
  { path: "/register", labelKey: "home.linkRegister" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;

  const faq = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    question: t(locale, `home.faqQ${n}`),
    answer: t(locale, `home.faqA${n}`),
  }));

  return (
    <div className="home-full flex flex-col">
      <JsonLd data={buildFAQSchema(faq)} />

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <HeroSection fullBleed />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <TrustBar />
      </div>

      <HomeSection variant="slate">
        <PlatformGrid />
      </HomeSection>

      <HomeSection variant="white">
        <PopularFreeServices />
      </HomeSection>

      <HomeSection variant="mesh">
        <PopularServices />
      </HomeSection>

      <HomeSection variant="brand" tight>
        <HomeSplitCta />
      </HomeSection>

      <HomeSection variant="white">
        <HomeFeaturedPlatforms />
      </HomeSection>

      <HomeSection variant="mesh">
        <WhyUs />
      </HomeSection>

      <HomeSection variant="ink">
        <HomeHowSteps dark />
      </HomeSection>

      <HomeSection variant="teal">
        <HomeGuaranteeBand />
      </HomeSection>

      <HomeSection variant="slate">
        <PaymentMethodsBar />
      </HomeSection>

      <HomeSection variant="sky">
        <HomeTestimonials />
      </HomeSection>

      <HomeSection variant="white">
        <HomeFaq />
      </HomeSection>

      <HomeSection variant="mesh">
        <HomeBlogPreview locale={locale} />
      </HomeSection>

      <HomeSection variant="slate">
        <HomeSeoBlock />
      </HomeSection>

      <HomeSection variant="elevated" tight>
        <h2 className="mff-heading-md">{t(locale, "home.internalLinksTitle")}</h2>
        <p className="mt-3 max-w-2xl text-sm text-[#6e6e73]">{t(locale, "home.internalLinksDesc")}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {internalLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={localizedPath(link.path, locale)}
                className="mff-card-hover block px-5 py-4 text-sm font-semibold text-[#1d1d1f] hover:text-[#0077ed]"
              >
                {t(locale, link.labelKey)} →
              </Link>
            </li>
          ))}
        </ul>
      </HomeSection>

      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6">
        <CtaSection />
      </div>
    </div>
  );
}
