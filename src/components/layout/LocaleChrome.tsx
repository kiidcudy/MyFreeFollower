"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingSupportDock } from "@/components/widgets/FloatingSupportDock";

export function LocaleChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = /\/dashboard(\/|$)/.test(pathname);

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="site-main flex-1 w-full overflow-x-hidden pb-24">
        {children}
      </main>
      <Footer />
      <FloatingSupportDock />
    </>
  );
}
