import { getAllPosts, getLocalizedPost } from "@/data/blog";
import { getBlogCover } from "@/data/blog/images";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";
import Image from "next/image";
import Link from "next/link";

function formatDate(date: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export function HomeBlogPreview({ locale }: { locale: Locale }) {
  const posts = getAllPosts()
    .slice(0, 3)
    .map((post) => getLocalizedPost(locale, post.slug) ?? post);

  return (
    <>
      <SectionHeader
        title={t(locale, "home.blogPreviewTitle")}
        subtitle={t(locale, "home.blogPreviewSubtitle")}
        action={
          <Link href={localizedPath("/blog", locale)} className="mff-link-arrow shrink-0">
            {t(locale, "home.viewAllBlog")} →
          </Link>
        }
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {posts.map((post) => {
          const cover = getBlogCover(post.slug, locale);
          return (
          <article
            key={post.slug}
            className="mff-card-hover group flex flex-col overflow-hidden"
          >
            {cover && (
              <Image
                src={cover.src}
                alt={cover.alt}
                width={600}
                height={315}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="flex flex-1 flex-col p-6 sm:p-7">
            <time dateTime={post.publishedAt} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0077ed]">
              {formatDate(post.publishedAt, locale)}
            </time>
            <h3 className="mt-4 font-display text-lg font-semibold tracking-tight group-hover:text-[#0077ed]">
              <Link href={localizedPath(`/blog/${post.slug}`, locale)}>{post.title}</Link>
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6e6e73] line-clamp-3">
              {post.description}
            </p>
            <Link href={localizedPath(`/blog/${post.slug}`, locale)} className="mff-link-arrow mt-5">
              {t(locale, "home.readArticle")} →
            </Link>
            </div>
          </article>
        );})}
      </div>
    </>
  );
}
