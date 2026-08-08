import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/data/blog";
import {
  allFreeServices,
  allPaidServices,
  getPlatformsWithServices,
  platformToSlug,
} from "@/lib/catalog";
import { defaultLocale } from "@/lib/i18n/config";
import { buildAlternateLanguages, localizedPath } from "@/lib/i18n/navigation";
import { siteConfig } from "@/lib/site";

const contentUpdated = new Date(siteConfig.lastContentUpdate);

const STATIC_PATHS = [
  "",
  "/free-followers",
  "/buy-followers",
  "/how-it-works",
  "/blog",
  "/faq",
  "/contact",
  "/about",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
] as const;

/** One entry per logical path, carrying the full hreflang cluster as per-URL
 *  alternates. Listing all 19 locales as flat, unrelated URLs made Google treat
 *  them as ~4,800 near-duplicate pages and work out the language map itself. */
function entry(
  path: string,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${localizedPath(path || "/", defaultLocale)}`,
    alternates: { languages: buildAlternateLanguages(path, siteConfig.url) },
    lastModified: options.lastModified ?? contentUpdated,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

/** Every public page, once, with its language cluster attached. */
export function buildSitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  const blogSlugs = getAllPostSlugs();
  const platforms = getPlatformsWithServices();

  for (const path of STATIC_PATHS) {
    items.push(
      entry(path, {
        changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
        priority:
          path === ""
            ? 1
            : path.includes("followers") || path === "/blog"
              ? 0.9
              : path === "/privacy-policy" || path === "/terms" || path === "/refund-policy"
                ? 0.3
                : 0.7,
      }),
    );
  }

  for (const platform of platforms) {
    items.push(
      entry(`/free-followers/platform/${platformToSlug(platform)}`, {
        changeFrequency: "weekly",
        priority: 0.85,
      }),
    );
    items.push(
      entry(`/buy-followers/platform/${platformToSlug(platform)}`, {
        changeFrequency: "weekly",
        priority: 0.85,
      }),
    );
  }

  for (const service of allFreeServices) {
    items.push(
      entry(`/free-followers/${service.slug}`, {
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );
  }

  for (const service of allPaidServices) {
    items.push(
      entry(`/buy-followers/${service.slug}`, {
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );
  }

  for (const slug of blogSlugs) {
    items.push(
      entry(`/blog/${slug}`, {
        changeFrequency: "monthly",
        priority: 0.65,
      }),
    );
  }

  return items;
}
