import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth-store";
import { createMetadata, globalStructuredDataJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = createMetadata({
  absoluteTitle: true,
  title: siteConfig.slogan,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
});

export const viewport: Viewport = {
  themeColor: "#0077ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interDisplay.variable} flex min-h-screen flex-col`}
      >
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
        <JsonLd data={globalStructuredDataJsonLd()} id="jsonld-global" />
      </body>
    </html>
  );
}
