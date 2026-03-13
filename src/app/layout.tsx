import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Place Companion — AI Guest Companion for Hotels",
  description:
    "An intelligent AI assistant for every guest, at every hour. Place Companion knows your hotel and your destination — multilingual, live in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${dmSans.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="pt-16">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
