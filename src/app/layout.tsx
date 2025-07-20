import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import SkipLink from "@/components/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://woman-owned.com'),
  title: "Woman-Owned | Discover Amazing Women-Owned Businesses",
  description: "Supporting women entrepreneurs and connecting you with incredible local businesses that make our communities stronger. Discover women-owned businesses in your area.",
  keywords: "women-owned businesses, female entrepreneurs, local businesses, women business directory, support women",
  openGraph: {
    title: "Woman-Owned | Discover Amazing Women-Owned Businesses",
    description: "Supporting women entrepreneurs and connecting you with incredible local businesses that make our communities stronger.",
    type: "website",
    url: "https://woman-owned.com",
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
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
