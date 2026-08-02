import { PanelHeader } from "@/components/panel/PanelHeader";

export function AdminPageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return <PanelHeader title={title} subtitle={subtitle}>{children}</PanelHeader>;
}
