import Script from "next/script";

export function JsonLd({
  data,
  id,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}) {
  const schemaType =
    !Array.isArray(data) && typeof data["@type"] === "string"
      ? (data["@type"] as string)
      : "graph";

  return (
    <Script
      id={id ?? `jsonld-${schemaType.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
