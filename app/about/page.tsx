"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  Target,
  Zap,
  Star,
  ArrowRight,
  Send,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLANS } from "@/lib/plans";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PLAN_META: Record<
  string,
  { tier: string; icon: typeof Target; accent: string }
> = {
  Foundation: { tier: "01", icon: Target, accent: "from-slate-400/20 to-transparent" },
  PRO: { tier: "02", icon: Zap, accent: "from-gold-500/25 to-transparent" },
  ELITE: { tier: "03", icon: Star, accent: "from-gold-400/30 to-amber-600/5" },
};

function TierBadge({
  tier,
  label,
  icon: Icon,
  featured = false,
}: {
  tier: string;
  label: string;
  icon: typeof Target;
  featured?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative shrink-0 w-[54px] h-[54px]">
        <div
          className={`absolute inset-0 rotate-45 rounded-[14px] border ${
            featured
              ? "border-gold-500/45 bg-gradient-to-br from-gold-500/25 via-gold-500/8 to-black shadow-[0_0_28px_rgba(212,175,55,0.18)]"
              : "border-white/10 bg-gradient-to-br from-white/[0.06] to-black"
          }`}
        />
        <Icon
          className={`absolute inset-0 m-auto w-9 h-9 rotate-0 opacity-[0.08] ${
            featured ? "text-gold-400" : "text-white"
          }`}
          strokeWidth={1}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[7px] font-black tracking-[0.22em] text-gold-500/75 uppercase leading-none">
            Tier
          </span>
          <span className="text-lg font-black font-outfit text-white leading-none mt-0.5">
            {tier}
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.28em] ${
            featured ? "text-gold-500" : "text-slate-500"
          }`}
        >
          {label}
        </p>
        <div
          className={`mt-2.5 h-px w-14 ${
            featured
              ? "bg-gradient-to-r from-gold-500 via-gold-500/40 to-transparent"
              : "bg-gradient-to-r from-white/25 to-transparent"
          }`}
        />
      </div>
    </div>
  );
}

function FeatureMark({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0 w-8">
        <span className="text-[11px] font-black font-outfit text-gold-500/80 tabular-nums leading-none">
          {num}
        </span>
        <div className="w-px flex-1 min-h-[28px] mt-2 bg-gradient-to-b from-gold-500/50 via-gold-500/15 to-transparent" />
      </div>
      <div className="pb-1">
        <h3 className="text-white font-bold text-sm mb-1.5 tracking-tight">{title}</h3>
        <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function CommunityMark({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center border bg-black/40"
        style={{ borderColor: `${color}40`, boxShadow: `0 0 20px ${color}15` }}
      >
        {children}
      </div>
      <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}

const PILLARS = [
  {
    title: "Risk-First Discipline",
    desc: "Capital protection and structured risk management come before chasing returns.",
  },
  {
    title: "Real-Market Execution",
    desc: "Strategies built for live conditions — entries, exits, and trade management.",
  },
  {
    title: "Structured Curriculum",
    desc: "A clear path from crypto basics to elite futures setups — no scattered content.",
  },
  {
    title: "Professional Community",
    desc: "Serious traders, live discussions, and direct access to experienced mentors.",
  },
];

const OFFERINGS = [
  {
    title: "Structured Courses",
    desc: "Foundation, PRO, and ELITE — each tier builds on the last with clear outcomes.",
  },
  {
    title: "Live Signals",
    desc: "High-probability setups with entry, target, and stop-loss — standalone or bundled.",
  },
  {
    title: "Risk Management",
    desc: "Position sizing, R:R models, and psychology frameworks for long-term consistency.",
  },
  {
    title: "Futures & Spot",
    desc: "Binance-focused training covering crypto spot, futures, and market structure.",
  },
  {
    title: "Elite Community",
    desc: "Telegram and Discord hubs for analysis, support, and trader accountability.",
  },
  {
    title: "A+ Setups",
    desc: "Elite entry models and repeatable strategies — not theory, real execution.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    gsap.fromTo(
      ".about-reveal",
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-reveal", start: "top 88%" },
      }
    );
  }, []);

  return (
    <div className="bg-black min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-gold-600/[0.06] to-transparent pointer-events-none" />

      <main className="relative z-10 pt-28 md:pt-36 pb-20">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 md:mb-28 about-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[10px] font-black uppercase tracking-[0.35em] mb-6">
            About Us
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase font-outfit leading-[0.95]">
            Built for traders who want{" "}
            <span className="text-gold-500">real edge</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            The Elite Trader is a structured education platform for crypto and futures traders —
            from first principles to elite execution, signals, and community.
          </p>
        </section>

        {/* Intro + stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="about-reveal">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5 tracking-tight font-outfit uppercase">
                Who we are
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                <strong className="text-white font-semibold">The Elite Trader</strong> teaches
                high-probability trading on Binance — covering BTC, altcoins, and futures with a
                focus on discipline, risk management, and repeatable setups.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                We are not a signal-chasing group or a hype course. Our programs are designed for
                traders who want structure, accountability, and skills that translate to live
                markets.
              </p>
              <div className="flex flex-wrap gap-10">
                {[
                  { value: "3", label: "Learning Tiers" },
                  { value: "2+", label: "Years Active" },
                  { value: "24/7", label: "Community Access" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-black text-gold-500 font-outfit">
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-reveal rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10">
              <p className="text-gold-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Our Philosophy
              </p>
              <blockquote className="text-white text-lg md:text-xl font-medium leading-relaxed mb-6 font-outfit">
                &ldquo;Think smart. Trade wise. Become elite.&rdquo;
              </blockquote>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every module, signal, and community interaction is built around one goal: helping
                you trade with rules, protect capital, and grow with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Learning paths */}
        <section className="border-y border-white/5 bg-white/[0.01] py-24 md:py-32 mb-24 md:mb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 about-reveal">
              <div className="text-gold-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3">
                Curriculum
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter font-outfit">
                Our <span className="text-gold-500">Learning Paths</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {PLANS.map((plan) => {
                const meta = PLAN_META[plan.name] ?? PLAN_META.Foundation;
                const Icon = meta.icon;
                return (
                  <div
                    key={plan.name}
                    className={`about-reveal relative overflow-hidden rounded-2xl border p-7 md:p-8 transition-colors ${
                      plan.featured
                        ? "border-gold-500/30 bg-gradient-to-br from-gold-500/[0.06] to-black"
                        : "border-white/5 bg-white/[0.02] hover:border-gold-500/20"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${meta.accent} rounded-full blur-2xl`}
                    />
                    {plan.featured && (
                      <span className="relative z-10 inline-block px-3 py-1 mb-4 text-[9px] font-black uppercase tracking-widest text-gold-500 bg-gold-500/10 rounded-full border border-gold-500/20">
                        Most Popular
                      </span>
                    )}
                    <div className="relative z-10">
                      <TierBadge
                        tier={meta.tier}
                        label={plan.tierLabel}
                        icon={Icon}
                        featured={plan.featured}
                      />
                    </div>
                    <h3 className="relative z-10 text-xl font-black text-white uppercase tracking-tight font-outfit mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{plan.description}</p>
                    <ul className="space-y-2.5">
                      {plan.features.slice(0, 5).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-slate-400 text-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10 about-reveal">
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold-500 hover:text-gold-400 transition-colors"
              >
                View full pricing
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          <div className="text-center mb-14 about-reveal">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-outfit">
              What we stand for
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className="about-reveal p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold-500/20 transition-colors"
              >
                <FeatureMark index={i} title={pillar.title} desc={pillar.desc} />
              </div>
            ))}
          </div>
        </section>

        {/* Offerings grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          <div className="text-center mb-14 about-reveal">
            <div className="text-gold-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3">
              Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-outfit">
              What we offer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERINGS.map((item, i) => (
              <div
                key={item.title}
                className="about-reveal group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold-500/25 hover:bg-gold-500/[0.03] transition-all"
              >
                <FeatureMark index={i} title={item.title} desc={item.desc} />
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          <div className="text-center mb-12 about-reveal">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter font-outfit">
              Join our <span className="text-gold-500">community</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
              Connect with traders on Telegram and Discord for updates, analysis, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <a
              href="https://t.me/Elitefuture"
              target="_blank"
              rel="noopener noreferrer"
              className="about-reveal group flex flex-col p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#0088cc]/30 hover:bg-[#0088cc]/5 transition-all"
            >
              <CommunityMark color="#0088cc">
                <Send className="w-4 h-4 text-[#0088cc]" />
              </CommunityMark>
              <h3 className="text-white font-bold mb-2">Telegram</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-5 flex-1">
                Real-time market updates, trade breakdowns, and quick support.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#0088cc]">
                @Elitefuture <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>

            <a
              href="https://discord.gg/W36Es5ZAU8"
              target="_blank"
              rel="noopener noreferrer"
              className="about-reveal group flex flex-col p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#5865F2]/30 hover:bg-[#5865F2]/5 transition-all"
            >
              <CommunityMark color="#5865F2">
                <MessageSquare className="w-4 h-4 text-[#5865F2]" />
              </CommunityMark>
              <h3 className="text-white font-bold mb-2">Discord</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-5 flex-1">
                Live discussions, callouts, and community accountability.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#5865F2]">
                Join Server <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 about-reveal">
          <div className="rounded-3xl border border-gold-500/25 bg-gradient-to-br from-gold-500/10 to-transparent p-10 md:p-14 text-center">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight font-outfit mb-4">
              Ready to start?
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Join The Elite Trader and begin your path from disciplined basics to elite execution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gold-500 text-black text-xs font-black uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-[0_0_30px_rgba(212,175,55,0.25)]"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-white/10 text-slate-300 text-xs font-black uppercase tracking-widest hover:border-gold-500/30 hover:text-gold-400 transition-colors"
              >
                View Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
