"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import PlanPrice from "./PlanPrice";

const ICONS = {
  0: "target",
  1: "zap",
  2: "star",
};

export default function PlanCard({
  plan,
  planIndex,
  icon: Icon,
  isFeatured,
  onCompare,
  onEnrol,
  showEnrol = true,
  className = "",
}) {
  return (
    <div className={`relative h-full ${isFeatured ? "z-20" : "z-10"} ${className}`}>
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] z-30 whitespace-nowrap">
          Most Popular
        </div>
      )}

      <BorderGlow
        borderRadius={32}
        backgroundColor="#0a0a0a"
        glowColor={plan.glowColor}
        colors={plan.colors}
        glowIntensity={isFeatured ? 1.15 : 0.7}
        className={`h-full border transition-all duration-500 ${
          isFeatured
            ? "border-gold-500/30 shadow-[0_20px_50px_rgba(212,175,55,0.14)]"
            : "border-white/5 hover:border-white/12"
        }`}
      >
        <div className="p-6 md:p-8 flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black flex items-center justify-center border shrink-0 transition-transform duration-500 ${
                isFeatured ? "border-gold-500/30" : "border-white/10"
              }`}
            >
              <Icon
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  isFeatured ? "text-gold-400" : planIndex === 0 ? "text-slate-400" : "text-gold-500"
                }`}
                strokeWidth={1.5}
              />
            </div>
            <PlanPrice plan={plan} size="sm" />
          </div>

          <div className="mb-6 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-500 mb-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold-500" />
              {plan.target}
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight uppercase font-outfit tracking-tighter">
              {plan.name}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {plan.description}
            </p>
          </div>

          <div className="space-y-3 mb-6 flex-1 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              Curriculum Highlights
            </p>
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isFeatured ? "text-gold-500" : "text-gold-500/45"
                  }`}
                />
                <span className="text-xs text-slate-300 font-medium leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-5 border-t border-white/5 space-y-3 relative z-10">
            {showEnrol && onEnrol && (
              <button
                type="button"
                onClick={() => onEnrol(planIndex)}
                className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                  isFeatured
                    ? "bg-gold-500 text-black hover:bg-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {isFeatured ? "Enrol ELITE Now" : `Enrol in ${plan.name}`}
                <ArrowRight size={14} />
              </button>
            )}

            <button
              type="button"
              onClick={() => onCompare(planIndex)}
              className="w-full flex items-center justify-between group/compare"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover/compare:text-gold-500 transition-colors">
                Compare Paths
              </span>
              <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/compare:bg-gold-500 group-hover/compare:text-black group-hover/compare:border-gold-500 transition-all">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

export { ICONS };
