import type { ReactNode } from "react";

type HomeSectionVariant =
  | "canvas"
  | "elevated"
  | "aurora"
  | "spotlight"
  | "dark"
  | "brand"
  | "sky"
  | "slate"
  | "white"
  | "mesh"
  | "teal"
  | "ink";

const variantClasses: Record<HomeSectionVariant, string> = {
  canvas: "bg-[#f5f5f7]",
  elevated: "bg-white section-spotlight",
  aurora: "section-aurora",
  spotlight: "section-spotlight",
  dark: "section-dark text-white",
  brand: "hero-banner text-white",
  sky: "section-aurora",
  slate: "bg-[#f5f5f7]",
  white: "bg-white section-spotlight",
  mesh: "section-aurora",
  teal: "section-spotlight",
  ink: "section-dark text-white",
};

export function HomeSection({
  variant,
  children,
  className = "",
  tight = false,
}: {
  variant: HomeSectionVariant;
  children: ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <div
      className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 ${variantClasses[variant]} ${className}`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${tight ? "py-12 sm:py-14" : "py-16 sm:py-20"}`}>
        {children}
      </div>
    </div>
  );
}
