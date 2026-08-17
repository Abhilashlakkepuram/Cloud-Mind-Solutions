import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { company, siteUrl } from "@/lib/site";

/** Display — geometric, technical character. Headings only, used with restraint. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Body — high legibility at small sizes. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Utility — data points, labels, timestamps, technical callouts. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — AI & IT Consulting in St. Petersburg, FL`,
    template: `%s — ${company.name}`,
  },
  description:
    "CloudMind Solutions plans, builds, and runs cloud infrastructure, applied AI, cybersecurity, and managed IT for mid-market teams. Based in St. Petersburg, Florida.",
  applicationName: company.name,
  keywords: [
    "AI consulting",
    "cloud infrastructure consulting",
    "cybersecurity consulting",
    "managed IT services",
    "software consulting",
    "St. Petersburg Florida IT",
  ],
  authors: [{ name: company.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    url: siteUrl,
    title: `${company.name} — ${company.tagline}`,
    description:
      "Cloud, applied AI, cybersecurity, software, and managed IT — planned, built, and run by engineers who stay after the handover.",
    locale: "en_US",
    images: [
      {
        // Generated from the supplied logo — see scripts/logo-assets.py
        url: "/assets/og/default.png",
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description:
      "AI & IT consulting: cloud, applied AI, cybersecurity, software, managed IT.",
    images: ["/assets/og/default.png"],
  },
  robots: { index: true, follow: true },
  // All derived from the supplied mark by scripts/logo-assets.py.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/assets/logo/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/logo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/logo/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0B1E3D",
  // No maximum-scale / user-scalable=no — zoom must stay available.
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {/* reducedMotion="user" makes every motion component respect the OS
            setting without per-component branching. */}
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-blue-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          {/* Outside PageTransition so it never fades with route changes. */}
          <WhatsAppButton />
        </MotionConfig>
      </body>
    </html>
  );
}
