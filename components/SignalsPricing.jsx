"use client";

import { Radio, ArrowRight } from "lucide-react";
import Link from "next/link";
import BorderGlow from "@/components/BorderGlow";
import { SIGNAL_PLANS, getSignalPrices, buildEnrolUrl } from "@/lib/plans";

export default function SignalsPricing({ embedded = false }) {
  return (
    <section
      id="signals"
      className={
        embedded
          ? "relative py-4 md:py-8"
          : "bg-black py-20 md:py-28 relative border-t border-white/5"
      }
    >
      {!embedded && (
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />
      )}

      <div
        className={
          embedded
            ? "relative z-10"
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        }
      >
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Radio className="w-3.5 h-3.5" /> Signals
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter font-outfit">
            Live <span className="text-gold-500">Signals</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium">
            Standalone signal access — or go ELITE for the full program plus exclusive setups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-6xl mx-auto">
          {SIGNAL_PLANS.map((plan) => {
            const prices = getSignalPrices(plan);
            const isFeatured = plan.featured;

            return (
              <BorderGlow
                key={plan.label}
                borderRadius={24}
                backgroundColor="#0a0a0a"
                glowColor={plan.glowColor || "43 74 49"}
                colors={["#d4af37", "#ffd700", "#b8860b"]}
                glowIntensity={isFeatured ? 1 : 0.5}
                className={`h-full border ${
                  isFeatured ? "border-gold-500/30" : "border-white/5"
                }`}
              >
                <div className="p-5 md:p-6 flex flex-col h-full">
                  {isFeatured && (
                    <span className="text-[9px] font-black uppercase tracking-widest text-gold-500 mb-3">
                      Best Value
                    </span>
                  )}

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-500 mb-1">
                    {plan.label}
                  </p>
                  <h3 className="text-xl font-black text-white uppercase font-outfit tracking-tight mb-4">
                    Signals
                  </h3>

                  <div className="mb-4">
                    {prices.showStrike && (
                      <div className="text-[10px] font-black text-red-500 line-through decoration-red-500 mb-0.5">
                        {prices.listLabel}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white font-outfit">
                        {prices.priceLabel}
                      </span>
                      <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                        / {plan.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-1">
                    {plan.description}
                  </p>

                  <Link
                    href={buildEnrolUrl(plan, false, "", plan.label)}
                    className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                      isFeatured
                        ? "bg-gold-500 text-black hover:bg-gold-400"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Get Signals
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </BorderGlow>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-slate-500 font-semibold uppercase tracking-widest mt-10 max-w-xl mx-auto">
          Want signals plus full education?{" "}
          <a href="/#pricing" className="text-gold-500 hover:text-gold-400">
            Compare ELITE at $499
          </a>
        </p>
      </div>
    </section>
  );
}
