import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { RevealOnScroll, ScrollProgress } from "@/components/motion";
import { Footer, Header, Rail, SkipLink } from "@/components/shell";
import { site } from "@/lib/content";
import { JsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const serif = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap", weight: ["400", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const defaultTitle = site.name;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [...site.keywords],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${site.name}: Writing` }] },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
    title: defaultTitle,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: { telephone: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-dvh antialiased">
        <SkipLink />
        <ScrollProgress />
        <RevealOnScroll />
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <Rail />
        <div className="lg:pl-24">
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
