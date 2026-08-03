import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { getAllPosts, getLocalizedPost } from "@/data/blog";
import { getBlogCover } from "@/data/blog/images";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { getMessages, t } from "@/lib/i18n/translations";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);

  return createMetadata({
    title: messages.blog.title,
    description: messages.blog.description,
    path: "/blog",
    locale,
    openGraphType: "website",
    keywords: [
      "free followers blog",
      "instagram growth tips",
      "tiktok growth guide",
      " tasks",
    ],
  });
}

function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return null;

  const locale = rawLocale as Locale;
  const posts = getAllPosts().map(
    (post) => getLocalizedPost(locale, post.slug) ?? post,
  );

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "nav.blog"), path: "/blog", href: false },
        ]}
      />

      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
          {t(locale, "blog.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-700">
          {t(locale, "blog.description")}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          const cover = getBlogCover(post.slug, locale);
          return (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:border-brand-200 hover:shadow-soft"
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
            <div className="flex flex-1 flex-col p-6">
            <time
              dateTime={post.publishedAt}
              className="text-xs font-semibold uppercase tracking-wide text-brand-700"
            >
              {formatDate(post.publishedAt, locale)}
            </time>
            <h2 className="mt-2 font-display text-xl font-bold text-ink-900 group-hover:text-brand-700">
              <Link href={localizedPath(`/blog/${post.slug}`, locale)}>
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
              {post.description}
            </p>
            <div className="mt-5">
              <Link
                href={localizedPath(`/blog/${post.slug}`, locale)}
                className="inline-flex items-center text-sm font-semibold text-brand-700 hover:text-brand-600 hover:underline"
              >
                {t(locale, "blog.readMore")} →
              </Link>
            </div>
            </div>
          </article>
        );})}
      </div>

      <section className="mt-12 rounded-xl bg-brand-gradient p-8 text-white">
        <h2 className="font-display text-2xl font-bold">
          {t(locale, "about.ctaTitle")}
        </h2>
        <p className="mt-2 max-w-xl text-white/90">
          {t(locale, "about.ctaBody")}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <LocalizedLink
            href="/free-followers"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50"
          >
            {t(locale, "nav.freeFollowers")}
          </LocalizedLink>
          <LocalizedLink
            href="/register"
            className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10"
          >
            {t(locale, "nav.register")}
          </LocalizedLink>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
