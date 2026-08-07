"use client";

import { JsonLd } from "@/components/seo/JsonLd";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/navigation";

export type BreadcrumbItem = {
  label: string;
  path: string;
  href?: boolean;
};

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { locale } = useLocale();
  const schemaItems = items.map((item) => ({
    name: item.label,
    path: localizedPath(item.path, locale),
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#6e6e73]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const linkable = item.href ?? !isLast;

          return (
            <li key={`${item.path}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden>/</span>}
              {linkable ? (
                <LocalizedLink href={item.path} className="font-medium text-[#0066cc] hover:underline">
                  {item.label}
                </LocalizedLink>
              ) : (
                <span className="font-semibold text-[#1d1d1f]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={buildBreadcrumbSchema(schemaItems)} id="jsonld-breadcrumb" />
    </nav>
  );
}
