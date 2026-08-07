import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/data/blog";
import {
  allFreeServices,
  allPaidServices,
  getPlatformsWithServices,
  platformToSlug,
} from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { siteConfig } from "@/lib/site";

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

function entry(
  path: string,
  locale: Locale,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  },
): MetadataRoute.Sitemap[number] {
  const normalized = path === "" ? "" : path;
  return {
    url: `${siteConfig.url}${localizedPath(normalized || "/", locale)}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

/** All public URLs for a single locale (~250 entries). */
export function buildLocaleSitemap(locale: Locale): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  const blogSlugs = getAllPostSlugs();
  const platforms = getPlatformsWithServices();

  for (const path of STATIC_PATHS) {
    items.push(
      entry(path, locale, {
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
      entry(`/free-followers/platform/${platformToSlug(platform)}`, locale, {
        changeFrequency: "weekly",
        priority: 0.85,
      }),
    );
    items.push(
      entry(`/buy-followers/platform/${platformToSlug(platform)}`, locale, {
        changeFrequency: "weekly",
        priority: 0.85,
      }),
    );
  }

  for (const service of allFreeServices) {
    items.push(
      entry(`/free-followers/${service.slug}`, locale, {
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );
  }

  for (const service of allPaidServices) {
    items.push(
      entry(`/buy-followers/${service.slug}`, locale, {
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );
  }

  for (const slug of blogSlugs) {
    items.push(
      entry(`/blog/${slug}`, locale, {
        changeFrequency: "monthly",
        priority: 0.65,
      }),
    );
  }

  return items;
}
