"use client";

import { useState } from "react";
import { CheckCircle2, Star, Zap, Target, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { PLANS } from "@/lib/plans";
import BorderGlow from "./BorderGlow";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Pricing() {
  const [expandedIndex, setExpandedIndex] = useState(2); // Default to Elite (i=2) expanded

  return (
    <section id="pricing" className="bg-black py-24 md:py-32 relative border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-gold-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
             Professional Funding Path
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter font-outfit">
            Ready to <span className="text-gold-500">Master</span> the Markets?
          </h2>
          <p className="text-slate-400 text-sm md:text-lg font-medium">
            Choose your plan. Build your edge. Start your professional journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => {
            const isFeatured = plan.featured;
            const isExpanded = expandedIndex === i;

            return (
              <div key={i} className={`relative transition-all duration-500 ${isExpanded ? 'z-20' : 'z-10'}`}>
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] z-30">
                    Most Popular
                  </div>
                )}
                
                <BorderGlow
                  borderRadius={32}
                  backgroundColor="#0a0a0a"
                  glowColor={plan.glowColor}
                  colors={plan.colors}
                  glowIntensity={isExpanded ? 1.0 : 0.4}
                  className={`border transition-all duration-500 ${isExpanded ? 'border-gold-500/20 shadow-[0_20px_50px_rgba(212,175,55,0.1)]' : 'border-white/5 opacity-60'}`}
                >
                  <div className="p-8 flex flex-col h-full cursor-pointer" onClick={() => setExpandedIndex(isExpanded ? null : i)}>
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                         <div className={`p-2 rounded-lg ${isExpanded ? 'bg-gold-500 text-black' : 'bg-white/5 text-slate-400'}`}>
                            {i === 0 ? <Target size={20} /> : i === 1 ? <Zap size={20} /> : <Star size={20} />}
                         </div>
                         <div className="text-right">
                           <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] line-through decoration-red-500 decoration-2 mb-1 opacity-80">{plan.originalPrice}</div>
                           <div className="flex items-baseline justify-end gap-1">
                              <span className="text-3xl font-black text-white font-outfit">{plan.price}</span>
                              <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">/ {plan.period}</span>
                           </div>
                         </div>
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight font-outfit mb-1">{plan.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gold-500 text-[10px] font-black uppercase tracking-widest">{plan.target}</span>
                        <div className="text-slate-500">
                           {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </div>

                    {/* Features - Tap to Reveal */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 mb-4 pt-4 border-t border-white/5">
                            {plan.features.map((feature, j) => (
                              <div key={j} className="flex items-start gap-3">
                                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-1 ${isFeatured ? 'text-gold-500' : 'text-slate-600'}`} />
                                <span className="text-[13px] text-slate-400 font-medium leading-tight">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Always Visible CTAs */}
                    <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                       <Link 
                        href={`/enrol?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                          isFeatured 
                            ? 'bg-gold-500 text-black hover:bg-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {isFeatured ? 'Enrol Elite Now' : `Enrol in ${plan.name}`} <ArrowRight size={14} />
                      </Link>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); setExpandedIndex(isExpanded ? null : i); }}
                        className="w-full text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-gold-500 transition-colors flex items-center justify-center gap-2"
                      >
                         {isExpanded ? 'Hide Details' : 'Click to see details'} 
                         {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>

        {/* Global Anchor Footer */}
        <div className="mt-20 text-center">
           <p className="text-xs font-black text-slate-600 uppercase tracking-[0.4em] italic leading-relaxed">
              "The difference isn't the price — it's <span className="text-gold-500">how fast you become profitable</span>."
           </p>
        </div>
      </div>
    </section>
  );
}
