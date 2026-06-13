"use client";

import {
  X,
  Check,
  ArrowRight,
  Zap,
  Star,
  Target,
  AlertTriangle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ELITE_PLAN, getUpgradeDelta } from "@/lib/plans";
import { usePricing } from "./pricing/PricingProvider";

const COMPARISON_META = [
  {
    limitations:
      "You learn crypto and spot basics, but not futures, elite setups, or private community access.",
    warning: "Best for getting started, but not enough for serious results.",
    cta: "Continue with Foundation",
  },
  {
    gap: "You get futures and signals, but miss elite entry models, A+ setups, and priority support.",
    friction: "Most traders outgrow PRO without elite strategy breakdowns.",
    cta: "Continue with PRO",
  },
  {
    outcome:
      "Full path: PRO curriculum plus elite models, live strategy breakdowns, and private community.",
    confidence: "This is where serious traders accelerate results.",
    cta: "Go ELITE – Trade With Confidence",
    featured: true,
  },
];

export default function ComparisonModal({
  isOpen,
  onClose,
  initialPlanIndex = 0,
}) {
  const { plans, couponApplied, getPrices, getEnrolHref } = usePricing();
  const consideringPlan = plans[initialPlanIndex] ?? plans[0];
  const isConsideringSmallPlan = initialPlanIndex < 2;
  const upgradeDelta = getUpgradeDelta(consideringPlan, couponApplied);
  const consideringPrices = getPrices(consideringPlan);
  const elitePrices = getPrices(ELITE_PLAN);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-6xl bg-[#050505] border border-white/10 rounded-[32px] md:rounded-[48px] shadow-[0_0_120px_rgba(212,175,55,0.15)] flex flex-col max-h-[96vh] overflow-hidden"
          >
            <div className="p-6 md:p-10 border-b border-white/5 flex items-center justify-between bg-black/50 sticky top-0 z-20 backdrop-blur-xl gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter font-outfit">
                  Compare <span className="text-gold-500">Trading Paths</span>
                </h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
                  Most serious traders choose ELITE
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:rotate-90 transition-all duration-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4 md:p-10">
                {isConsideringSmallPlan && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 md:p-8 rounded-[28px] border border-gold-500/30 bg-gradient-to-br from-gold-500/15 via-gold-500/5 to-transparent"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-[10px] font-black uppercase tracking-widest mb-4">
                          <Sparkles size={12} />
                          Recommended upgrade
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-outfit mb-3">
                          {consideringPlan.name} ({consideringPrices.priceLabel}) leaves critical gaps
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                          For just{" "}
                          <span className="text-gold-400 font-bold">${upgradeDelta} more</span>,
                          ELITE adds entry models, A+ setups, live strategy breakdowns, and private
                          community access.
                        </p>
                        <p className="text-[11px] text-gold-500/80 font-bold uppercase tracking-widest">
                          {couponApplied
                            ? `ELITE member price — ${elitePrices.listLabel} → ${elitePrices.priceLabel}`
                            : `Apply coupon — ELITE $599 → $499`}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[260px]">
                        <Link
                          href={getEnrolHref(ELITE_PLAN)}
                          onClick={onClose}
                          className="w-full py-4 px-6 rounded-2xl bg-gold-500 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gold-400 transition-colors"
                        >
                          Upgrade to ELITE – {elitePrices.priceLabel}
                          <ArrowRight size={16} />
                        </Link>
                        <Link
                          href={getEnrolHref(consideringPlan)}
                          onClick={onClose}
                          className="w-full py-3 px-6 rounded-2xl border border-white/10 text-slate-500 hover:text-slate-300 font-bold uppercase tracking-widest text-[10px] text-center transition-colors"
                        >
                          Continue with {consideringPlan.name} anyway
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                  {plans.map((plan, i) => {
                    const meta = COMPARISON_META[i];
                    const isFeatured = plan.featured;
                    const isSelected = i === initialPlanIndex;
                    const prices = getPrices(plan);

                    return (
                      <div
                        key={plan.name}
                        className={`relative flex flex-col p-6 md:p-8 rounded-[32px] border transition-all duration-500 ${
                          isFeatured
                            ? "bg-gradient-to-b from-gold-500/15 via-gold-500/5 to-transparent border-gold-400/30 ring-1 ring-gold-500/20 shadow-[0_20px_50px_rgba(212,175,55,0.12)]"
                            : isSelected
                              ? "bg-white/[0.04] border-white/15"
                              : "bg-white/[0.02] border-white/5 opacity-80"
                        }`}
                      >
                        {isFeatured && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] z-30">
                            Most Popular
                          </div>
                        )}

                        <div className="mb-6">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-5 ${
                              isFeatured
                                ? "bg-gold-500 text-black border-gold-500"
                                : "bg-black text-slate-400 border-white/10"
                            }`}
                          >
                            {i === 0 ? (
                              <Target size={20} />
                            ) : i === 1 ? (
                              <Zap size={20} />
                            ) : (
                              <Star size={20} />
                            )}
                          </div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="text-2xl font-black text-white font-outfit uppercase">
                              {prices.priceLabel}
                            </div>
                            {prices.showStrike && (
                              <div className="text-[10px] font-black text-red-500 line-through decoration-red-500 uppercase tracking-widest opacity-80">
                                {prices.listLabel}
                              </div>
                            )}
                          </div>
                          <h4 className="text-lg font-black text-white uppercase tracking-tight font-outfit mt-4">
                            {plan.name}
                          </h4>
                        </div>

                        <div className="space-y-3 mb-6 flex-1">
                          {plan.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3">
                              <Check
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isFeatured ? "text-gold-400" : "text-slate-600"
                                }`}
                              />
                              <span
                                className={`text-xs font-medium ${
                                  isFeatured ? "text-slate-200" : "text-slate-400"
                                }`}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
                          {meta?.limitations && (
                            <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
                              <div className="flex items-center gap-2 mb-2 text-red-400">
                                <AlertTriangle size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                  Limitations
                                </span>
                              </div>
                              <p className="text-[11px] text-red-400/80 leading-relaxed font-medium italic">
                                &ldquo;{meta.limitations}&rdquo;
                              </p>
                            </div>
                          )}
                          {meta?.gap && (
                            <p className="text-[10px] text-yellow-500/70 font-bold uppercase tracking-widest text-center">
                              {meta.gap}
                            </p>
                          )}
                          {meta?.outcome && (
                            <div className="p-4 rounded-2xl border border-gold-500/20 bg-gold-500/10">
                              <div className="flex items-center gap-2 mb-2 text-gold-500">
                                <TrendingUp size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                  Complete Path
                                </span>
                              </div>
                              <p className="text-[11px] text-gold-200 leading-relaxed font-bold">
                                {meta.outcome}
                              </p>
                            </div>
                          )}

                          <Link
                            href={getEnrolHref(plan)}
                            onClick={onClose}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all ${
                              isFeatured
                                ? "bg-gold-500 text-black hover:bg-gold-400"
                                : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                            }`}
                          >
                            {meta?.cta}
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
