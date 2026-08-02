"use client";

import { getRelatedServices, type CatalogService } from "@/lib/catalog";
import { ServiceGrid } from "@/components/catalog/ServiceGrid";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function RelatedServices({ slug, limit = 6 }: { slug: string; limit?: number }) {
  const { t } = useLocale();
  const related: CatalogService[] = getRelatedServices(slug, limit);
  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mff-heading-md">{t("catalog.relatedServices")}</h2>
      <div className="mt-8">
        <ServiceGrid services={related} columns={3} />
      </div>
    </section>
  );
}
