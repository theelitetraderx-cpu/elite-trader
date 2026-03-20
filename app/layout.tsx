import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Inter } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/ClickSpark";
import CommunityPopup from "@/components/CommunityPopup";
import SplashLoader from "@/components/SplashLoader";
import ChatBot from "@/components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite Trader - Precision Trading",
  description: "The premier learning platform for modern futures and crypto traders. Master professional strategies and risk management with The Elite Trader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${inter.variable} antialiased font-inter`}
      >
        <SplashLoader />
        <CommunityPopup />
        <ChatBot />
        <ClickSpark>
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
