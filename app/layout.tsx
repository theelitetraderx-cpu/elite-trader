import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Inter } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/ClickSpark";
import CommunityPopup from "@/components/CommunityPopup";
import SplashLoader from "@/components/SplashLoader";
import CryptoChatWidget from '@/components/CryptoChatWidget';
import { Toaster } from "sonner";
import PortalProvider from "@/components/portal/PortalProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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

import Navbar from "@/components/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  let initialIsPaid = false;
  let initialIsAuthorized = false;

  if (user) {
    const allowedEmails = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
    initialIsAuthorized = allowedEmails.includes(user.email?.toLowerCase() || "");
    
    const { data: profile } = await supabase
      .from('users')
      .select('status')
      .eq('id', user.id)
      .single();
    
    initialIsPaid = profile?.status === 'approved' || initialIsAuthorized;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${inter.variable} antialiased font-inter`.trim().replace(/\s+/g, ' ')}
        suppressHydrationWarning
      >
        <PortalProvider 
          initialUser={user} 
          initialIsPaid={initialIsPaid} 
          initialIsAuthorized={initialIsAuthorized}
        >
          <Navbar />
          <SplashLoader />
          <CommunityPopup />
          <CryptoChatWidget />
          <Toaster theme="dark" position="top-right" />
          <ClickSpark>
            {children}
          </ClickSpark>
        </PortalProvider>
      </body>
    </html>
  );
}
