import type { ReactNode } from "react";

export function PanelHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="panel-header">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">{title}</h1>
          {subtitle && <p className="mt-1 text-white/85">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
