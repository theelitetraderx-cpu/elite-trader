"use client";

import { BookOpen, CheckCircle2, Zap, Target, Star, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';
import StarBorder from "./StarBorder";
import BorderGlow from "./BorderGlow";
import ComparisonModal from "./ComparisonModal";
import { PLANS } from "@/lib/plans";

export default function Courses() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

  const openComparison = (idx) => {
    setSelectedPlanIdx(idx);
    setModalOpen(true);
  };
  return (
    <section id="courses" className="bg-black py-32 relative border-t border-white/5">
       {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-xs font-bold uppercase tracking-widest mb-6">
               <BookOpen className="w-3.5 h-3.5" /> Elite Curriculum
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9] font-outfit">
               Master the markets with our<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">comprehensive courses.</span>
             </h2>
             <p className="text-lg text-slate-400 leading-relaxed font-medium">
               Built by funded traders for future funded traders. Real strategies, zero fluff.
             </p>
           </div>
           
           <StarBorder color="#d4af37" speed="7s">
              <a href="#pricing" className="bg-[#050505] hover:bg-[#0a0a0a] text-white border border-white/5 hover:border-gold-500/50 font-black uppercase tracking-widest text-xs py-4 px-8 rounded-full transition-all flex items-center gap-2 whitespace-nowrap h-max shadow-lg shadow-gold-500/10">
                 View All Programs
              </a>
           </StarBorder>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <button 
              key={i} 
              onClick={() => openComparison(i)}
              className={`block w-full text-left group relative ${plan.featured ? 'z-20' : 'z-10'}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] z-30 whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <BorderGlow
                borderRadius={32}
                backgroundColor="#0a0a0a"
                glowColor={plan.glowColor}
                colors={plan.colors}
                glowIntensity={plan.featured ? 1.2 : 0.8}
                className={`h-full transition-all duration-500 group-hover:-translate-y-2 ${plan.featured ? 'shadow-[0_20px_50px_rgba(212,175,55,0.15)]' : 'group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)]'}`}
              >
                <div className="p-8 flex flex-col h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/10 to-transparent rounded-full blur-2xl pointer-events-none`}></div>
                  
                  {/* Icon & Label */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-white/5 shadow-inner relative z-10 transition-transform group-hover:scale-110 duration-500">
                      {i === 0 ? <Target className="w-6 h-6 text-slate-400" /> : 
                       i === 1 ? <Zap className="w-6 h-6 text-gold-500" /> : 
                       <Star className="w-6 h-6 text-gold-400" />}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-red-500 uppercase tracking-widest line-through decoration-red-500 decoration-2 mb-0.5 opacity-80">{plan.originalPrice}</div>
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-2xl font-black text-white font-outfit uppercase tracking-tighter">{plan.price}</span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">/ LT</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Title & Description */}
                  <div className="mb-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2 flex items-center gap-2">
                       <span className="w-1 h-1 bg-gold-500 rounded-full"></span>
                       {plan.target}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight uppercase font-outfit tracking-tighter">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {i === 0 ? "The complete A-Z guide to trading index futures. Master market structure, liquidity, and entries." :
                       i === 1 ? "Advanced leverage mechanics, institutional risk protocols, and live trading execution systems." :
                       "Personalized 1-on-1 mentorship and precision capital allocation for serious institutional traders."}
                    </p>
                  </div>

                  {/* Highlights/Benefits */}
                  <div className="space-y-4 mb-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Curriculum Highlights</p>
                    <div className="space-y-3">
                      {plan.features.slice(0, 4).map((feature, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-gold-500/50 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/btn">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Compare Paths</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/btn:bg-gold-500 group-hover/btn:text-black group-hover/btn:border-gold-500 transition-all duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </button>
          ))}
        </div>

        <ComparisonModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          initialPlanIndex={selectedPlanIdx}
        />

        {/* Progression Indicator */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-500">
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest">Foundational</span>
              <div className="w-8 h-px bg-white/10"></div>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500/60">Professional</span>
              <div className="w-8 h-px bg-white/10"></div>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">Institutional</span>
           </div>
        </div>
      </div>
    </section>
  );
}

