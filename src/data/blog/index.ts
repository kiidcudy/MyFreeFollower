import type { Locale } from "@/lib/i18n/config";
import { blogLocaleOverrides, mergeLocalizedPost } from "@/data/blog/locale";
import { blogPosts, type BlogPost } from "@/data/blog/posts";

export type { BlogPost, BlogSection, BlogFaq } from "@/data/blog/posts";

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getLocalizedPost(
  locale: Locale,
  slug: string,
): BlogPost | undefined {
  const post = getPostBySlug(slug);
  if (!post) return undefined;

  const override = blogLocaleOverrides[locale]?.[slug];
  if (!override) return post;

  return mergeLocalizedPost(post, override);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return getAllPosts().slice(0, limit);

  const related = post.relatedSlugs
    .map((relatedSlug) => getPostBySlug(relatedSlug))
    .filter((item): item is BlogPost => Boolean(item));

  if (related.length >= limit) return related.slice(0, limit);

  const extras = getAllPosts().filter(
    (item) => item.slug !== slug && !post.relatedSlugs.includes(item.slug),
  );

  return [...related, ...extras].slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
