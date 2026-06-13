"use client";

import Link from "next/link";
import {
  Send,
  ArrowRight,
  Shield,
  Radio,
} from "lucide-react";
import Footer from "@/components/Footer";
import RippleGrid from "@/components/RippleGrid";
import BorderGlow from "@/components/BorderGlow";
import ProfitShowcase from "@/components/community/ProfitShowcase";
import SignalsPricing from "@/components/SignalsPricing";
import { PricingProvider } from "@/components/pricing/PricingProvider";

const STATS = [
  { value: "98%", label: "Win rate avg" },
  { value: "300+", label: "Active traders" },
];

const TELEGRAM = {
  href: "https://t.me/Elitefuture",
  label: "@Elitefuture",
};

export default function CommunityPage() {
  return (
    <PricingProvider>
      <main className="min-h-screen bg-[#060714] text-white relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <RippleGrid
            gridColor="#d4af37"
            gridSize={8}
            rippleIntensity={0.05}
            glowIntensity={0.2}
            opacity={0.45}
          />
        </div>

        <div className="relative z-10 pt-28 md:pt-36 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight leading-tight">
                Connect with the{" "}
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Elite Community
                </span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Join thousands of disciplined traders mastering the futures market.
                Choose your preferred platform to start growing with us.
              </p>
            </div>

            {/* Two-column: content + stacked profit cards */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-24 md:mb-32 text-left">
              <div className="w-full lg:w-1/2 lg:max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6">
                  Verified Results
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                  Our Community{" "}
                  <span className="text-gold-400 italic">Wins</span> Together
                </h2>

                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
                  Every single day, our members post their high-probability setups
                  and verified profits. We don&apos;t just teach trading; we build
                  professional traders who execute with discipline.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-gold-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="w-full max-w-[340px] sm:max-w-[380px]">
                  <ProfitShowcase />
                </div>
              </div>
            </div>

            {/* Bottom — join + signals */}
            <section className="border-t border-white/5 pt-16 md:pt-20 space-y-16 md:space-y-20">
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 text-gold-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                    <Send className="w-3.5 h-3.5" />
                    Join Us
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                    Join our Official Channel
                  </h2>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Real-time market updates, trade breakdowns, and technical analysis.
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <BorderGlow
                    glowColor="45 80 50"
                    backgroundColor="#0a0a0a"
                    borderRadius={32}
                    glowIntensity={0.9}
                    colors={["#d4af37", "#ffd700", "#b8860b"]}
                    className="border border-white/5"
                  >
                    <div className="p-8 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-yellow-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-gold-500/25">
                        <Send className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Telegram</h3>
                      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        Get real-time market updates, trade breakdowns, and technical analysis.
                      </p>
                      <a
                        href={TELEGRAM.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gold-500 text-black font-bold text-sm hover:bg-gold-400 transition-colors shadow-[0_0_24px_rgba(212,175,55,0.3)]"
                      >
                        Open {TELEGRAM.label}
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </BorderGlow>
                </div>
              </div>

              <div>
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[9px] font-black uppercase tracking-[0.3em]">
                    <Radio className="w-3 h-3" />
                    Signal access
                  </div>
                </div>
                <SignalsPricing embedded />
              </div>

              <div className="rounded-[32px] bg-gradient-to-br from-[#1a1500] to-[#0a0800] border border-gold-500/20 p-8 md:p-12 text-center">
                <div className="inline-flex items-center gap-2 text-gold-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  New here?
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  New to The Elite Trader?
                </h2>
                <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
                  Start with our comprehensive Foundation course to learn the structural
                  rules of the market before joining the professional floor.
                </p>
                <Link
                  href="/#courses"
                  className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gold-500 text-black font-semibold hover:bg-gold-400 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  Master the Foundation
                  <ArrowRight size={14} />
                </Link>
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </main>
    </PricingProvider>
  );
}
