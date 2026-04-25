"use client";

import { X, Check, ArrowRight, Zap, Star, Target, AlertTriangle, ShieldCheck, TrendingUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PLANS } from "@/lib/plans";

export default function ComparisonModal({ isOpen, onClose, initialPlanIndex = 0 }) {
  if (!isOpen) return null;

  const comparisonData = [
    {
      index: 0,
      name: "Foundation",
      price: "$49",
      target: "Beginner Only",
      highlights: [
        "Trading Concepts & Terms",
        "Types of Trading Overview",
        "Basic Risk Management",
        "Platform & Chart Setup",
        "How to place basic trades"
      ],
      limitations: "You will not learn advanced futures strategies, leverage handling, or how to consistently execute profitable trades.",
      warning: "Best for getting started, but not enough for real trading results.",
      cta: "Start Foundation",
      accent: "slate-500"
    },
    {
      index: 1,
      name: "Pro Master",
      price: "$249",
      target: "Intermediate / Incomplete",
      highlights: [
        "Everything in Foundation",
        "Futures Trading Mechanics",
        "Leverage & Margin Handling",
        "Liquidation Protection",
        "Live Trade Breakdowns"
      ],
      gap: "You gain knowledge, but still lack personal guidance, trade feedback, and capital allocation clarity.",
      friction: "Most traders at this stage struggle with consistency.",
      cta: "Go Pro Master",
      accent: "gold-500/60"
    },
    {
      index: 2,
      name: "Elite",
      price: "$499",
      target: "The Complete Solution",
      highlights: [
        "Everything in Foundation + Pro",
        "1-on-1 Mentorship (2x/month)",
        "Personalized Trade Reviews",
        "Capital Allocation Advice",
        "Execution Support",
        "Performance Tracking System",
        "Private Elite Community Access"
      ],
      outcome: "You are guided, corrected, and supported to become consistently profitable.",
      confidence: "This is where serious traders accelerate results.",
      cta: "Go Elite – Trade With Confidence",
      accent: "gold-500",
      featured: true
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-6xl bg-[#050505] border border-white/10 rounded-[32px] md:rounded-[48px] shadow-[0_0_120px_rgba(212,175,55,0.15)] flex flex-col max-h-[96vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-10 border-b border-white/5 flex items-center justify-between bg-black/50 sticky top-0 z-20 backdrop-blur-xl">
              <div>
                <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter font-outfit flex items-center gap-3">
                  Compare <span className="text-gold-500">Trading Paths</span>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full">
                     <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse"></div>
                     <span className="text-[10px] font-black text-gold-500 uppercase tracking-widest">Most successful traders choose Elite</span>
                  </div>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:rotate-90 transition-all duration-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                  {comparisonData.map((plan, i) => (
                    <div 
                      key={i}
                      className={`relative flex flex-col p-6 md:p-8 rounded-[32px] border transition-all duration-700 ${
                        plan.featured 
                          ? 'bg-gradient-to-b from-gold-500/15 via-gold-500/5 to-transparent border-gold-400/30 ring-1 ring-gold-500/20' 
                          : 'bg-white/[0.02] border-white/5 opacity-50 hover:opacity-80'
                      }`}
                    >
                      {plan.featured && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] z-30">
                          Most Popular
                        </div>
                      )}

                      {/* Top Info */}
                      <div className="mb-8">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-6 ${
                         plan.featured ? 'bg-gold-500 text-black border-gold-500' : 'bg-black text-slate-400 border-white/10'
                       }`}>
                          {i === 0 ? <Target size={20} /> : i === 1 ? <Zap size={20} /> : <Star size={20} />}
                       </div>
                       <div>
                         <div className="flex items-center gap-3">
                            <div className="text-2xl font-black text-white font-outfit tracking-tighter uppercase">{plan.price}</div>
                            <div className="text-[10px] font-black text-red-500 line-through decoration-red-500 decoration-2 uppercase tracking-widest opacity-80">{plan.originalPrice}</div>
                         </div>
                         <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">One-Time / Lifetime</div>
                       </div>
                    </div>

                      {/* Highlights */}
                      <div className="space-y-4 mb-8">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Curriculum Included</p>
                         {plan.highlights.map((h, j) => (
                           <div key={j} className="flex items-start gap-3">
                             <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? 'text-gold-400' : 'text-slate-600'}`} />
                             <span className={`text-xs font-medium ${plan.featured ? 'text-slate-200' : 'text-slate-400'}`}>{h}</span>
                           </div>
                         ))}
                      </div>

                      {/* The "Psychological" Blocks */}
                      <div className="mt-auto space-y-6 pt-6 border-t border-white/5">
                         {plan.limitations && (
                           <div className="p-4 rounded-2x border border-red-500/20 bg-red-500/5">
                              <div className="flex items-center gap-2 mb-2 text-red-400">
                                 <AlertTriangle size={14} />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Limitations</span>
                              </div>
                              <p className="text-[11px] text-red-400/80 leading-relaxed font-medium italic">"{plan.limitations}"</p>
                           </div>
                         )}

                         {plan.gap && (
                           <div className="p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
                              <div className="flex items-center gap-2 mb-2 text-yellow-500">
                                 <Info size={14} />
                                 <span className="text-[10px] font-black uppercase tracking-widest">The Gap</span>
                              </div>
                              <p className="text-[11px] text-yellow-500/80 leading-relaxed font-medium">"{plan.gap}"</p>
                           </div>
                         )}

                         {plan.outcome && (
                           <div className="p-4 rounded-2xl border border-gold-500/20 bg-gold-500/10 relative overflow-hidden group">
                              <motion.div 
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent skew-x-12"
                              />
                              <div className="flex items-center gap-2 mb-2 text-gold-500 relative z-10">
                                 <TrendingUp size={14} />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Guaranteed Outcome</span>
                              </div>
                              <p className="text-[11px] text-gold-200 leading-relaxed font-bold relative z-10">{plan.outcome}</p>
                           </div>
                         )}

                         {plan.warning && <p className="text-[10px] text-red-500/60 font-bold uppercase tracking-widest text-center">{plan.warning}</p>}
                         {plan.friction && <p className="text-[10px] text-yellow-500/60 font-bold uppercase tracking-widest text-center">{plan.friction}</p>}
                         {plan.confidence && <p className="text-[10px] text-gold-500/80 font-bold uppercase tracking-widest text-center animate-pulse">{plan.confidence}</p>}

                         <a 
                           href={`/enrol?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`}
                           className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                             plan.featured 
                               ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-[0_20px_40px_rgba(212,175,55,0.2)] scale-105' 
                               : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
                           }`}
                         >
                           {plan.cta}
                           <ArrowRight size={16} />
                         </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Anchors */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-gold-500/5 to-transparent border border-white/5">
                   <div className="max-w-md text-center md:text-left">
                      <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter font-outfit mb-2 italic">
                        "The difference is not the price — it's <span className="text-gold-500">how fast you become profitable</span>."
                      </h4>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Decision Anchor #EliteTrader</div>
                   </div>
                   
                   <div className="text-center md:text-right">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gold-500 mb-2">Elite Path Reframing</div>
                      <div className="text-3xl font-black text-white font-outfit tracking-tighter">Less than ₹700/day</div>
                      <div className="text-xs font-medium text-slate-500 mt-1 italic">...to avoid costly trading mistakes that wipe accounts.</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Bottom Bottom Badge */}
            <div className="bg-black py-4 border-t border-white/5 flex items-center justify-center gap-8 overflow-hidden whitespace-nowrap">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex items-center gap-4 opacity-20 hover:opacity-50 transition-opacity">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-500">Institutional Mastery</span>
                    <Star size={10} className="text-gold-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Full Capital Optimization</span>
                    <Star size={10} className="text-white" />
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
