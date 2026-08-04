import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { localeHreflang } from "@/lib/i18n/config";
import { buildAlternateLanguages, localizedPath } from "@/lib/i18n/navigation";
import { siteConfig } from "@/lib/site";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MetaInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  absoluteTitle?: boolean;
  openGraphType?: "website" | "article";
  locale?: Locale;
}

/** Trim meta descriptions to a safe SERP length at a word boundary. */
export function clampDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).replace(
    /[\s.,;:—–-]+$/u,
    "",
  );
}

export function absUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

export function createMetadata({
  title,
  description,
  path = "",
  image = "/og-default.png",
  keywords,
  noIndex = false,
  absoluteTitle = false,
  openGraphType = "website",
  locale = "en",
}: MetaInput = {}): Metadata {
  const pageTitle = absoluteTitle
    ? (title ?? siteConfig.slogan)
    : title
      ? `${title} | ${siteConfig.name}`
      : siteConfig.slogan;
  const pageDescription = clampDescription(
    description ?? siteConfig.description,
  );
  const canonicalPath = localizedPath(path, locale);
  const url = absUrl(canonicalPath);

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: buildAlternateLanguages(path, siteConfig.url),
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: openGraphType,
      locale: localeHreflang[locale],
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        { url: image, width: 1200, height: 630, alt: siteConfig.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
    keywords: keywords ?? [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Social Media Growth",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
  };
}

const organizationId = `${siteConfig.url}/#organization`;

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-192.png`,
    email: siteConfig.email,
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      availableLanguage: ["English"],
    },
  };
}

export function buildFAQSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question.replace(/^\d+\.\s*/, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

const offerPriceValidUntil = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
})();

export function buildProductSchema(product: {
  name: string;
  description: string;
  priceUsd: number;
  path: string;
  slug: string;
  imageUrl?: string;
  tier?: "free" | "paid";
}) {
  const url = absUrl(product.path);
  const isFree = product.tier === "free" || product.priceUsd === 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl ?? `${siteConfig.url}/logo.svg`,
    sku: product.slug,
    brand: { "@type": "Brand", name: siteConfig.name },
    url,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: isFree ? 0 : product.priceUsd,
      priceValidUntil: offerPriceValidUntil,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      url,
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function buildHowToSchema(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    ...(howTo.totalTime ? { totalTime: howTo.totalTime } : {}),
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export const primaryNavItems = [
  { name: "Free Followers", path: "/free-followers" },
  { name: "Buy Followers", path: "/buy-followers" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
] as const;

export function globalStructuredDataJsonLd() {
  const websiteId = `${siteConfig.url}/#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": organizationId },
      },
      ...primaryNavItems.map((item) => ({
        "@type": "SiteNavigationElement",
        name: item.name,
        url: absUrl(`/en${item.path}`),
        isPartOf: { "@id": websiteId },
      })),
    ],
  };
}
