"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { PLANS } from "@/lib/plans";
import BorderGlow from "./BorderGlow";
import Link from "next/link";

export default function Pricing() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  const plans = PLANS;

  return (
    <section id="pricing" className="bg-black py-20 md:py-32 relative border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-full md:max-w-3xl h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
            Invest in your trading edge.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 md:ml-2">Lifetime Access.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
            Choose the learning path that fits your goals. Unlock professional strategies, live coaching, and active community signals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-6 items-start max-w-md lg:max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative transition-all ${plan.featured ? 'lg:scale-[1.03] z-20' : 'z-10'}`}>
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.5)] z-30 whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <BorderGlow
                borderRadius={24}
                backgroundColor="#0f0f0f"
                glowColor={plan.glowColor}
                colors={plan.colors}
                glowIntensity={plan.featured ? 1.2 : 0.9}
                fillOpacity={0}
                className={plan.featured ? 'shadow-[0_0_60px_rgba(212,175,55,0.15)] h-full w-full block' : 'h-full w-full block'}
              >
                <div className="p-6 md:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-gold-400 text-sm font-medium mb-3 uppercase tracking-widest flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${plan.featured ? 'bg-gold-300 shadow-[0_0_5px_#ffd700]' : 'bg-slate-500'} `}></div> {plan.target}
                    </div>
                    <div className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">{plan.name}</div>

                    <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/5">
                      <div className="text-4xl md:text-5xl font-medium text-white">{plan.price}</div>
                    </div>

                    <button
                      onClick={() => toggleDetails(i)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all mb-4 group"
                    >
                      <span className="text-sm font-medium">Course Details</span>
                      {expandedIndex === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
                    </button>

                    <div className={`space-y-4 transition-all duration-300 overflow-hidden ${expandedIndex === i ? 'max-h-[1000px] mb-8 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}>
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.featured ? 'text-gold-400' : 'text-slate-500'}`} />
                          <span className="text-slate-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                  <Link 
                    href={`/enrol?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`} 
                    className={`w-full mt-auto py-4 rounded-xl font-medium transition-all text-center block ${plan.featured
                    ? 'bg-gold-500 hover:bg-gold-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] font-bold'
                    : 'bg-[#151515] hover:bg-[#202020] text-gold-500 border border-gold-500/30'
                    }`}
                  >
                    Enroll in {plan.name}
                  </Link>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
