"use client";

import { Fragment } from "react";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";

export interface BlogSection {
  h2: string;
  body: string;
}

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    const token = match[0];
    const bold = token.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink-900">
          {bold[1]}
        </strong>,
      );
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        const className =
          "font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-brand-600";

        if (href.startsWith("http")) {
          nodes.push(
            <a
              key={key++}
              href={href}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>,
          );
        } else {
          nodes.push(
            <LocalizedLink key={key++} href={href} className={className}>
              {label}
            </LocalizedLink>,
          );
        }
      }
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function renderBody(body: string) {
  return body.split(/\n\n+/).map((paragraph, index) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("- ")) {
      const items = trimmed.split(/\n(?=- )/);
      return (
        <ul
          key={index}
          className="mb-4 list-disc space-y-2 pl-6 text-ink-700 leading-relaxed"
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item.replace(/^- /, ""))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="mb-4 leading-relaxed text-ink-700">
        {renderInline(trimmed)}
      </p>
    );
  });
}

export function BlogArticleBody({ sections }: { sections: BlogSection[] }) {
  return (
    <article className="max-w-none">
      {sections.map((section, index) => (
        <section key={section.h2} className="mb-10 scroll-mt-24" id={`section-${index}`}>
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
            {section.h2}
          </h2>
          {renderBody(section.body)}
        </section>
      ))}
    </article>
  );
}

export function BlogTableOfContents({ sections }: { sections: BlogSection[] }) {
  if (sections.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-xl border border-slate-200 bg-white p-5 shadow-card"
    >
      <ul className="space-y-2 text-sm">
        {sections.map((section, index) => (
          <li key={section.h2}>
            <a
              href={`#section-${index}`}
              className="text-brand-700 hover:text-brand-600 hover:underline"
            >
              {section.h2}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
