"use client";

import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { PricingProvider } from "@/components/pricing/PricingProvider";

export default function HomePage() {
  return (
    <PricingProvider>
      <div className="bg-black min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black scroll-smooth">
        <Hero />
        <Courses />
        <Benefits />
        <Pricing />
        <Features />
        <ContactSection />
        <Footer />
      </div>
    </PricingProvider>
  );
}
