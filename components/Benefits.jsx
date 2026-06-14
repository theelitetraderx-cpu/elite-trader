"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Target,
  Zap,
  Star,
  Shield,
  TrendingUp,
  Layers,
  RefreshCw,
  Brain,
} from "lucide-react";
import BorderGlow from "./BorderGlow";

const WHY_ELITE = [
  {
    title: "A+ Setups Only",
    desc: "High-probability, repeatable strategies — no guesswork",
    icon: Target,
  },
  {
    title: "Risk-First Trading",
    desc: "Protect capital before chasing profits",
    icon: Shield,
  },
  {
    title: "Real Execution",
    desc: "Learn entries, exits & trade management in live conditions",
    icon: TrendingUp,
  },
  {
    title: "Leverage Clarity",
    desc: "Use futures smartly — not like gambling",
    icon: Layers,
  },
  {
    title: "Mistake Correction",
    desc: "Fix errors with structured guidance",
    icon: RefreshCw,
  },
  {
    title: "Discipline System",
    desc: "Trade with rules, not emotions",
    icon: Brain,
  },
];

const TIERS = [
  {
    name: "Foundation",
    tagline: "Learn basics",
    desc: "Crypto, spot trading & core discipline",
    icon: Target,
    featured: false,
  },
  {
    name: "PRO",
    tagline: "Futures & signals",
    desc: "Advanced analysis & live signal access",
    icon: Zap,
    featured: false,
  },
  {
    name: "ELITE",
    tagline: "A+ setups & community",
    desc: "Entry models, private floor & priority support",
    icon: Star,
    featured: true,
  },
];

export default function Benefits() {
  return (
    <section className="bg-black py-24 md:py-32 relative border-t border-white/5 overflow-hidden selection:bg-gold-500 selection:text-black">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gold-600/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            Elite Trader Advantages
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] font-outfit mb-6">
            Build a real trading edge
            <span className="block text-gold-500 mt-2">not just knowledge.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Plans from <span className="text-white">$49 / $249 / $499</span> with your member
            code on{" "}
            <Link href="/enrol" className="text-gold-500 hover:text-gold-400 font-semibold">
              enrolment
            </Link>
            . The difference is how far you go.
          </p>
        </div>

        {/* Why Elite Trader */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              Why Elite Trader
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {WHY_ELITE.map((item) => {
              const Icon = item.icon;
              return (
                <BorderGlow
                  key={item.title}
                  borderRadius={20}
                  backgroundColor="#0a0a0a"
                  glowColor="43 74 49"
                  colors={["#d4af37", "#ffd700", "#b8860b"]}
                  glowIntensity={0.45}
                  className="border border-white/5 h-full"
                >
                  <div className="p-5 md:p-6 h-full text-left group">
                    <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="flex items-center gap-2 text-gold-500 uppercase font-black text-[10px] tracking-widest mb-2">
                      <CheckCircle2 size={12} className="shrink-0" />
                      {item.title}
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        </div>

        {/* The Difference */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3">
              The Difference
            </p>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Three structured paths — each level builds on the last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <BorderGlow
                  key={tier.name}
                  borderRadius={24}
                  backgroundColor="#0a0a0a"
                  glowColor="43 74 49"
                  colors={["#d4af37", "#ffd700", "#b8860b"]}
                  glowIntensity={tier.featured ? 0.9 : 0.4}
                  className={`h-full border ${
                    tier.featured ? "border-gold-500/30" : "border-white/5"
                  }`}
                >
                  <div className="p-6 md:p-8 text-center h-full flex flex-col items-center">
                    {tier.featured && (
                      <span className="text-[9px] font-black uppercase tracking-widest text-gold-500 mb-4">
                        Most complete
                      </span>
                    )}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                        tier.featured
                          ? "bg-gold-500 text-black shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                          : "bg-white/5 border border-white/10 text-gold-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-gold-500 text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                      {tier.name}
                    </p>
                    <h3 className="text-white text-lg md:text-xl font-black uppercase tracking-tight font-outfit mb-2">
                      {tier.tagline}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mt-auto">
                      {tier.desc}
                    </p>
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        </div>

        {/* Quote + CTA */}
        <BorderGlow
          borderRadius={28}
          backgroundColor="#080808"
          glowColor="45 80 50"
          colors={["#d4af37", "#ffd700", "#b8860b"]}
          glowIntensity={0.7}
          className="border border-gold-500/15 max-w-3xl mx-auto"
        >
          <div className="px-6 py-10 md:px-12 md:py-14 text-center">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight font-outfit mb-4">
              &ldquo;In trading, knowledge is common.{" "}
              <span className="text-gold-500">Execution is rare.&rdquo;</span>
            </h3>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              If you want results,{" "}
              <span className="text-white">choose ELITE.</span>
            </p>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-black font-black uppercase tracking-widest text-[10px] hover:bg-gold-400 transition-all shadow-[0_0_28px_rgba(212,175,55,0.3)] active:scale-[0.98]"
            >
              Go ELITE — Build Your Edge
              <ArrowRight size={14} />
            </Link>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
