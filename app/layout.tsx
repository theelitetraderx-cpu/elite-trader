import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import ClickSpark from "@/components/ClickSpark";
import CommunityPopup from "@/components/CommunityPopup";
import CryptoChatWidget from "@/components/CryptoChatWidget";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";
import UnhandledRejectionGuard from "@/components/UnhandledRejectionGuard";
import { createClient } from "@/utils/supabase/server";

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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elite Trader - Precision Trading",
  description:
    "The premier learning platform for modern futures and crypto traders. Master professional strategies and risk management with The Elite Trader.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${inter.variable} ${playfair.variable} antialiased font-inter`
          .trim()
          .replace(/\s+/g, " ")}
        suppressHydrationWarning
      >
        <AuthProvider initialUser={user}>
          <UnhandledRejectionGuard />
          <Navbar />
          <CommunityPopup />
          <CryptoChatWidget />
          <Toaster theme="dark" position="top-right" />
          <ClickSpark>{children}</ClickSpark>
        </AuthProvider>
      </body>
    </html>
  );
}
