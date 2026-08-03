import type { Locale } from "@/lib/i18n/config";
import {
  getBuyServiceTitle,
  getFreeServiceTitle,
  getServiceDisplayTitle,
} from "@/lib/i18n/catalog-labels";
import { buildLocalizedSeoContent } from "@/lib/catalog/seo-locale-templates";
import { clampDescription } from "@/lib/seo";
import { formatPoints, formatUSD, siteConfig } from "@/lib/site";
import {
  computeFreePointsCost,
  getSmallestTierUnitPriceUSD,
  isFreeService,
  isPaidService,
  type CatalogService,
  type FreeCatalogService,
  type PaidCatalogService,
} from "@/lib/catalog";
import { localizedPath } from "@/lib/i18n/navigation";

export interface SeoSection {
  heading: string;
  body: string;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoContent {
  metaTitle: string;
  description: string;
  focusKeyword: string;
  intro: string;
  highlights: string[];
  sections: SeoSection[];
  faq: SeoFaq[];
}

function serviceLabel(service: CatalogService, locale: Locale = "en"): string {
  return getServiceDisplayTitle(locale, service);
}

function servicePath(service: CatalogService, locale: Locale): string {
  const hub = isFreeService(service) ? "/free-followers" : "/buy-followers";
  return localizedPath(`${hub}/${service.slug}`, locale);
}

function formatAmount(service: FreeCatalogService): string {
  return `${service.amount.toLocaleString("en-US")} ${service.unit}`;
}

function freeFocusKeyword(service: FreeCatalogService): string {
  return `free ${service.platform.toLowerCase()} ${service.type.toLowerCase()}`;
}

function paidFocusKeyword(service: PaidCatalogService): string {
  return `buy ${service.platform.toLowerCase()} ${service.type.toLowerCase()}`;
}

function generateFreeSeoContent(service: FreeCatalogService): SeoContent {
  const label = serviceLabel(service);
  const title = getFreeServiceTitle("en", service.platform, service.type);
  const amount = formatAmount(service);
  const focusKeyword = freeFocusKeyword(service);
  const pointsCost = computeFreePointsCost(service);

  const metaTitle = `${title} — ${amount} Trial | ${siteConfig.name}`;
  const description = clampDescription(
    `Claim ${amount} ${focusKeyword} on ${siteConfig.name}. Complete simple tasks, earn points, and redeem — no password required. Start free social media growth today.`,
  );

  const intro = `${focusKeyword} lets you test real growth on ${service.platform} without paying upfront. On ${siteConfig.name}, you earn points by completing micro-tasks and redeem them for a ${amount} trial package. We never ask for your password — only your public username or profile link. Thousands of members use our task economy daily before upgrading to paid packages.`;

  const highlights = [
    "No password required — public username or link only",
    `${amount} ${service.unit} trial sized for real testing`,
    "Earn points through simple dashboard tasks",
    "Delivery typically starts within 0–24 hours",
    "Upgrade to paid tiers anytime from the same account",
  ];

  const sections: SeoSection[] = [
    {
      heading: `What Are Free ${service.platform} ${service.type}?`,
      body: `Free ${service.type.toLowerCase()} on ${service.platform} help you build social proof before investing in larger packages. Our ${amount} trial is sized for testing delivery speed and quality. ${focusKeyword} is ideal for new creators, small businesses, and anyone exploring task-based growth.`,
    },
    {
      heading: `How to Claim Free ${label}`,
      body: `Sign up free, browse available tasks, and submit proof when finished. Approved tasks credit points to your balance. When you have enough points (this service costs about ${formatPoints(pointsCost)} points), open the order form, enter your username, and confirm. Delivery typically starts within 0–24 hours.`,
    },
    {
      heading: `Why Choose ${siteConfig.name} for Free Growth`,
      body: `${siteConfig.name} combines a task economy with a full paid catalog across 24 platforms. You can start with ${focusKeyword}, then scale with affordable paid tiers or keep earning through daily tasks. Support is available 24/7 via live chat and WhatsApp.`,
    },
    {
      heading: `Free vs Paid ${service.platform} ${service.type}`,
      body: `Free trials use earned points and are perfect for testing. Paid packages deliver larger quantities instantly with card, crypto, or points at checkout. Many members claim a free trial first, then upgrade when they see results.`,
    },
    {
      heading: `Who Should Use Free ${service.platform} ${service.type}?`,
      body: `Free trials suit new accounts, side projects, local businesses, and creators validating a niche before ad spend. If you want to see how ${service.type.toLowerCase()} affect profile trust and engagement signals, a ${amount} test is a low-risk starting point.`,
    },
    {
      heading: "Step-by-Step: Sign-Up to Delivery",
      body: `1) Create a free account. 2) Complete tasks in your dashboard and collect points. 3) Open this service page and redeem your trial. 4) Enter your public username or profile URL. 5) Track delivery from your orders area. Most trials begin within 0–24 hours.`,
    },
    {
      heading: "Tips for Best Results",
      body: `Use a complete public profile with a clear photo and bio. Avoid changing your username during delivery. Combine ${service.type.toLowerCase()} with consistent posting for stronger organic momentum. Save screenshots if you plan to compare before/after metrics.`,
    },
    {
      heading: "Support, Guarantees & Fair Use",
      body: `${siteConfig.name} provides 24/7 support for order questions. Free trials are limited per service to keep the system fair for all members. We never request passwords or private account access. Report any delivery issue with your order ID for fast help.`,
    },
    {
      heading: "How Points Work for This Service",
      body: `Every approved task adds points to your shared balance across ${siteConfig.name}. This ${amount} ${service.unit} trial costs about ${formatPoints(pointsCost)} points — you can reach that through daily tasks, referrals, surveys, and login bonuses. Points never require a credit card, and you can save them for this service or other free trials on ${service.platform}.`,
    },
    {
      heading: `What Results to Expect on ${service.platform}`,
      body: `A ${amount} free trial is designed for testing — you should see gradual ${service.type.toLowerCase()} delivery within 0–24 hours, not an instant spike. Compare profile visits, saves, or replies over the next week alongside your organic posts. Use this data to decide whether a paid tier fits your next campaign.`,
    },
    {
      heading: "Scaling After Your Free Trial",
      body: `Once you validate delivery quality, upgrade to paid ${service.type.toLowerCase()} for larger quantities or keep earning points for additional free services. Many members combine free trials across platforms, then invest in paid packages during product launches, seasonal promos, or creator collaborations.`,
    },
  ];

  const faq: SeoFaq[] = [
    {
      question: `Is ${focusKeyword} really free?`,
      answer: `Yes. You earn points by completing tasks — no credit card required. This ${amount} package costs approximately ${formatPoints(pointsCost)} points to redeem.`,
    },
    {
      question: `Do I need to share my ${service.platform} password?`,
      answer: `Never. We only need your public username or profile URL. ${siteConfig.name} will never ask for your password.`,
    },
    {
      question: `How long does free ${service.type.toLowerCase()} delivery take?`,
      answer: `Most free orders start within 0–24 hours. Larger queues may extend completion time slightly, but delivery is gradual and safe for your account.`,
    },
    {
      question: `Can I order free ${service.type.toLowerCase()} more than once?`,
      answer: `Free trials are limited per service to keep the system fair. You can explore other free services on the same platform or upgrade to a paid package for larger quantities.`,
    },
    {
      question: `Is my ${service.platform} account safe?`,
      answer: `We only use public profile information you provide. Delivery is gradual and designed to look natural. Never share passwords with any growth service.`,
    },
    {
      question: "Can I use points on other platforms too?",
      answer: `Yes. Points are shared across the ${siteConfig.name} catalog — Instagram, TikTok, YouTube, and 20+ other platforms.`,
    },
    {
      question: "Do free trial points expire?",
      answer: "Points remain on your account while you stay active. Complete tasks regularly to maintain balance for redemptions.",
    },
    {
      question: "What if delivery is slow or incomplete?",
      answer: "Contact 24/7 support with your order ID and username. We review queue status and help resolve eligible issues quickly.",
    },
    {
      question: "Can I earn points without spending money?",
      answer: `Yes. Complete dashboard tasks, daily login bonuses, referrals, and surveys to earn points with no purchase required. Save points until you have enough for this ${amount} ${service.unit} trial.`,
    },
    {
      question: "Will free ${service.type.toLowerCase()} affect my existing content?",
      answer: `Delivery is gradual and uses only your public username. Your posts, reels, and stories are not modified — only your ${service.type.toLowerCase()} count increases over time.`,
    },
  ];

  return { metaTitle, description, focusKeyword, intro, highlights, sections, faq };
}

function generatePaidSeoContent(service: PaidCatalogService): SeoContent {
  const label = serviceLabel(service);
  const title = getBuyServiceTitle("en", service.platform, service.type);
  const focusKeyword = paidFocusKeyword(service);
  const smallestTier = service.tiers[0];
  const unitUsd = getSmallestTierUnitPriceUSD(service);
  const startPrice = smallestTier ? formatUSD(smallestTier.priceUSD) : formatUSD(unitUsd * 100);
  const startQty = smallestTier?.quantity ?? 100;

  const metaTitle = `${title} — From ${startPrice} | ${siteConfig.name}`;
  const description = clampDescription(
    `Buy ${focusKeyword} from ${startPrice}. Instant delivery in ${service.delivery}. Pay with card or crypto. Trusted ${service.platform} growth — no password required.`,
  );

  const intro = `${focusKeyword} on ${siteConfig.name} delivers real-looking ${service.unit} with fast, gradual delivery. Packages start at ${startQty.toLocaleString("en-US")} ${service.unit} for ${startPrice}. Enter your username, choose a tier, and checkout securely — we never request your password. Ideal for launches, campaigns, and scaling social proof across ${service.platform}.`;

  const highlights = [
    `Packages from ${startPrice} with volume discounts`,
    `Delivery starts within ${service.delivery}`,
    "Pay by card or cryptocurrency",
    "No password — username or link only",
    "24/7 support and order tracking in dashboard",
  ];

  const sections: SeoSection[] = [
    {
      heading: `Why Buy ${service.platform} ${service.type}?`,
      body: `${service.type} on ${service.platform} signal popularity and trust. Higher counts improve first impressions, encourage organic engagement, and help content reach wider audiences. ${focusKeyword} is one of the fastest ways to kick-start momentum when you launch a profile, campaign, or product.`,
    },
    {
      heading: `Delivery & Quality`,
      body: `Orders typically start within ${service.delivery}. Delivery is spread naturally to protect account health. All packages are backed by ${siteConfig.name} support and transparent order tracking in your dashboard.`,
    },
    {
      heading: `Pricing & Payment Options`,
      body: `Choose from preset tiers up to ${service.tiers[service.tiers.length - 1]?.quantity.toLocaleString("en-US") ?? "10,000"} ${service.unit}. Pay by credit/debit card or cryptocurrency at checkout. Volume tiers reduce the per-unit price automatically.`,
    },
    {
      heading: `How to Order ${label}`,
      body: `Select a package size, enter your ${service.platform} username or link, and complete checkout with card or crypto. Track status anytime from your orders page.`,
    },
    {
      heading: `Who Buys ${service.platform} ${service.type}?`,
      body: `Creators, brands, agencies, and small businesses buy ${service.type.toLowerCase()} to improve credibility at launch, support ad campaigns, or strengthen social proof before partnerships. ${focusKeyword} helps new profiles look established faster.`,
    },
    {
      heading: "What's Included in Every Order",
      body: `Every order includes gradual delivery, dashboard tracking, tier-based pricing, and access to 24/7 support. You choose quantity and payment method — we handle fulfillment from ${startQty.toLocaleString("en-US")} up to ${service.tiers[service.tiers.length - 1]?.quantity.toLocaleString("en-US") ?? "10,000"} ${service.unit}.`,
    },
    {
      heading: "Refunds, Refills & Order Handling",
      body: `If eligible delivery issues occur, contact support with your order ID. We review queue logs and policy terms to offer refills or credits where applicable. See our refund policy for full details.`,
    },
    {
      heading: "Build a Long-Term Growth Plan",
      body: `Combine paid ${service.type.toLowerCase()} with organic content, free task rewards, and cross-platform packages on ${siteConfig.name}. Many customers start with a small tier, measure results, then scale during product launches or seasonal campaigns.`,
    },
    {
      heading: "Choosing the Right Package Size",
      body: `Start with ${startQty.toLocaleString("en-US")} ${service.unit} if you are testing a new profile or campaign. Mid tiers suit weekly content pushes; top tiers up to ${service.tiers[service.tiers.length - 1]?.quantity.toLocaleString("en-US") ?? "10,000"} ${service.unit} fit launches, ads, or brand partnerships. Larger packages lower the per-unit price automatically.`,
    },
    {
      heading: "Delivery Timeline & Order Tracking",
      body: `After checkout, orders enter the queue and typically start within ${service.delivery}. Track progress from your dashboard orders page — status updates show when delivery begins and completes. Contact support with your order ID if you need a queue check.`,
    },
    {
      heading: "Combining Paid Growth with Organic Strategy",
      body: `Paid ${service.type.toLowerCase()} improve first impressions, but organic posting drives long-term engagement. Post consistently, use strong hooks, and reply to comments while your order delivers. Pair ${focusKeyword} with free task points to stretch your budget across multiple platforms.`,
    },
  ];

  const faq: SeoFaq[] = [
    {
      question: `Is it safe to buy ${service.platform} ${service.type.toLowerCase()}?`,
      answer: `Yes. We never ask for your password. Delivery is gradual and designed to look natural. Thousands of orders are processed daily on ${siteConfig.name}.`,
    },
    {
      question: `How fast will my order start?`,
      answer: `Most ${focusKeyword} orders begin within ${service.delivery}. Completion time depends on package size and current queue volume.`,
    },
    {
      question: `Which payment methods are accepted?`,
      answer: `Credit/debit card and cryptocurrency are supported at checkout. Prices display in your local currency where available.`,
    },
    {
      question: `Can I use free task points for paid packages?`,
      answer: `No. Points are for free trial services only. Paid packages require card or crypto checkout.`,
    },
    {
      question: `What if I need help with my order?`,
      answer: `Contact our 24/7 support team via live chat or WhatsApp. Provide your order ID and username for the fastest resolution.`,
    },
    {
      question: "Do you offer drop protection or refills?",
      answer: "Eligible orders may qualify for refills per our service terms. Open a ticket with your order details and our team will review.",
    },
    {
      question: "Can I order multiple tiers over time?",
      answer: "Yes. Many customers reorder smaller tiers for ongoing campaigns or upgrade to higher quantities for launches.",
    },
    {
      question: "Can I split one order across multiple profiles?",
      answer: `Each order is tied to one username or link. Place separate orders if you need ${service.type.toLowerCase()} on multiple ${service.platform} profiles.`,
    },
    {
      question: "Are bulk discounts applied automatically?",
      answer: "Yes. Higher tiers include lower per-unit pricing at checkout — no coupon code required. Compare tier cards on this page before ordering.",
    },
  ];

  return { metaTitle, description, focusKeyword, intro, highlights, sections, faq };
}

/** English Rank Math–style SEO body for free or paid catalog services. */
export function generateSeoContent(service: CatalogService): SeoContent {
  if (isFreeService(service)) return generateFreeSeoContent(service);
  if (isPaidService(service)) return generatePaidSeoContent(service);
  throw new Error("Unknown catalog service tier");
}

export function getLocalizedSeoContent(
  locale: Locale,
  service: CatalogService,
): SeoContent {
  if (locale === "en") return generateSeoContent(service);
  return buildLocalizedSeoContent(locale, service);
}

export function seoContentToHtml(content: SeoContent): string {
  const sections = content.sections
    .map(
      (s) =>
        `<h2>${s.heading}</h2>\n<p>${s.body.replace(/\n/g, "</p>\n<p>")}</p>`,
    )
    .join("\n\n");
  return `<p>${content.intro}</p>\n\n${sections}`;
}

export function serviceCanonicalPath(
  service: CatalogService,
  locale: Locale,
): string {
  return servicePath(service, locale);
}
