import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import SkipLink from "@/components/SkipLink";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { APP_CONFIG } from "@/utils/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.BASE_URL),
  title: "Woman-Owned | Discover Amazing Women-Owned Businesses",
  description: "Supporting women entrepreneurs and connecting you with incredible local businesses that make our communities stronger. Discover women-owned businesses in your area.",
  keywords: "women-owned businesses, female entrepreneurs, local businesses, women business directory, support women",
  openGraph: {
    title: "Woman-Owned | Discover Amazing Women-Owned Businesses",
    description: "Supporting women entrepreneurs and connecting you with incredible local businesses that make our communities stronger.",
    type: "website",
    siteName: APP_CONFIG.NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Woman-Owned | Discover Amazing Women-Owned Businesses",
    description: "Supporting women entrepreneurs and connecting you with incredible local businesses that make our communities stronger.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics 
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          gtmId={process.env.NEXT_PUBLIC_GTM_ID}
        />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
