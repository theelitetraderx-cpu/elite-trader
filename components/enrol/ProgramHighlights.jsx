"use client";

import { Zap, ShieldCheck } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

export default function ProgramHighlights({
  displayPlanName,
  planFeatures,
  selectedPlan,
}) {
  return (
    <BorderGlow
      borderRadius={24}
      backgroundColor="#0a0a0a"
      glowColor={selectedPlan.glowColor || "43 74 49"}
      colors={selectedPlan.colors || ["#d4af37", "#ffd700", "#b8860b"]}
      glowIntensity={0.75}
      className="border border-white/5"
    >
      <div className="p-5 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
            <Zap size={18} />
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
            Program Highlights: {displayPlanName}
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {planFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-slate-300"
            >
              <ShieldCheck
                className="text-gold-500/70 shrink-0 mt-0.5"
                size={15}
              />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </BorderGlow>
  );
}
