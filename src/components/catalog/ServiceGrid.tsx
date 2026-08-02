import type { CatalogService } from "@/lib/catalog";
import { ServiceCard } from "@/components/catalog/ServiceCard";

export function ServiceGrid({
  services,
  columns = 3,
}: {
  services: CatalogService[];
  columns?: 2 | 3 | 4;
}) {
  const gridClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  if (services.length === 0) return null;

  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
