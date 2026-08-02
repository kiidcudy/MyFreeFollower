"use client";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  action?: React.ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  action,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-start";
  const titleColor = light ? "text-white" : "text-[#1d1d1f]";
  const subColor = light ? "text-white/75" : "text-[#6e6e73]";

  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 ${align === "center" && !action ? "flex-col" : ""}`}
    >
      <div className={`max-w-3xl ${alignClass}`}>
        {eyebrow && (
          <p
            className={`mff-eyebrow mb-4 ${light ? "bg-white/15 text-white/90" : "bg-[#0077ed]/10 text-[#0077ed]"}`}
          >
            {eyebrow}
          </p>
        )}
        <h2 className={`mff-heading-lg ${titleColor}`}>{title}</h2>
        {subtitle && <p className={`mt-3 mff-subtitle ${subColor}`}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
