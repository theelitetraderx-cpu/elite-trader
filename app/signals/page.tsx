"use client";

import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import Footer from "@/components/Footer";
import SignalsPricing from "@/components/SignalsPricing";
import { PricingProvider } from "@/components/pricing/PricingProvider";

export default function SignalsPage() {
  return (
    <PricingProvider>
      <main className="min-h-screen bg-black text-white">
        <div className="absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-gold-600/[0.06] to-transparent pointer-events-none" />

        <div className="relative z-10 pt-28 md:pt-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[10px] font-black uppercase tracking-[0.35em] mb-6">
                <Radio className="w-3.5 h-3.5" />
                Live Signals
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-outfit leading-[0.95] mb-5">
                Trade With{" "}
                <span className="text-gold-500">Live Signals</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-8">
                Standalone signal packages for traders who want real-time setups.
                Or upgrade to ELITE for the full education program.
              </p>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-gold-400 transition-colors"
              >
                View community results
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          <SignalsPricing />
        </div>

        <Footer />
      </main>
    </PricingProvider>
  );
}
