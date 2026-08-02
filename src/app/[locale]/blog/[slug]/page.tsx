import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BlogArticleBody,
  BlogTableOfContents,
} from "@/components/blog/BlogArticleBody";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import {
  getAllPostSlugs,
  getLocalizedPost,
  getRelatedPosts,
} from "@/data/blog";
import { getBlogCover } from "@/data/blog/images";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { t } from "@/lib/i18n/translations";
import {
  absUrl,
  buildFAQSchema,
  createMetadata,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import Image from "next/image";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPostSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const post = getLocalizedPost(locale, slug);

  if (!post) {
    return createMetadata({
      title: "Article not found",
      noIndex: true,
      path: `/blog/${slug}`,
      locale,
    });
  }

  const cover = getBlogCover(post.slug, locale);

  return createMetadata({
    title: post.metaTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    locale,
    openGraphType: "article",
    keywords: [post.focusKeyword, ...siteConfig.keywords.slice(0, 5)],
    absoluteTitle: true,
    image: cover?.src,
  });
}

function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const post = getLocalizedPost(locale, slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3).map(
    (item) => getLocalizedPost(locale, item.slug) ?? item,
  );

  const cover = getBlogCover(post.slug, locale);
  const canonicalPath = localizedPath(`/blog/${post.slug}`, locale);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: cover ? [`${siteConfig.url}${cover.src}`] : undefined,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    mainEntityOfPage: absUrl(canonicalPath),
    keywords: post.focusKeyword,
  };

  const faqSchema = buildFAQSchema(
    post.faq.map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t(locale, "nav.home"), path: "/" },
          { label: t(locale, "nav.blog"), path: "/blog" },
          { label: post.title, path: `/blog/${post.slug}`, href: false },
        ]}
      />

      <article>
        <header className="mb-8 border-b border-slate-200 pb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            {t(locale, "blog.categoryGuides")}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-700">
            {post.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-700">
            <span>{t(locale, "blog.author")}</span>
            <span aria-hidden className="text-slate-300">
              ·
            </span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt, locale)}
            </time>
          </div>
        </header>

        {cover && (
          <figure className="mb-10 overflow-hidden rounded-[28px] border border-black/[0.06] shadow-soft">
            <Image
              src={cover.src}
              alt={cover.alt}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
            />
          </figure>
        )}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <BlogArticleBody sections={post.sections} />

            <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                {t(locale, "blog.faqHeading")}
              </h2>
              <dl className="mt-4 space-y-5">
                {post.faq.map((item) => (
                  <div key={item.q}>
                    <dt className="font-semibold text-ink-900">{item.q}</dt>
                    <dd className="mt-1 text-ink-700">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-800">
              {t(locale, "blog.tocHeading")}
            </p>
            <BlogTableOfContents sections={post.sections} />
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-14 border-t border-slate-200 pt-10">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            {t(locale, "blog.relatedPosts")}
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={localizedPath(`/blog/${item.slug}`, locale)}
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-brand-200 hover:shadow-soft"
                >
                  <h3 className="font-display font-bold text-ink-900 hover:text-brand-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-700">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 flex flex-wrap gap-3">
        <LocalizedLink
          href="/free-followers"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
        >
          {t(locale, "nav.freeFollowers")}
        </LocalizedLink>
        <LocalizedLink
          href="/buy-followers"
          className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-800 hover:border-brand-200"
        >
          {t(locale, "nav.buyFollowers")}
        </LocalizedLink>
      </section>

      <JsonLd data={articleSchema} id="jsonld-article" />
      <JsonLd data={faqSchema} id="jsonld-blog-faq" />
    </>
  );
}
