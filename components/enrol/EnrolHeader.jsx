"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

export default function EnrolHeader({
  displayPlanName,
  planPrice,
  planPrices,
  couponActive,
  selectedPlan,
}) {
  return (
    <header className="mb-8 md:mb-12">
      <Link
        href="/#pricing"
        className="inline-flex items-center gap-2 text-gold-500/90 hover:text-gold-400 transition-colors mb-6 md:mb-8 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">
          Back to Pricing
        </span>
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-outfit uppercase leading-[0.95] mb-4">
            Complete Your{" "}
            <span className="text-gold-500">Enrollment</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Secure your access to{" "}
            <span className="text-white font-semibold">{displayPlanName}</span>.
            Follow the instructions below to finalize your payment.
          </p>
        </div>

        <BorderGlow
          borderRadius={20}
          backgroundColor="#0a0a0a"
          glowColor={selectedPlan.glowColor || "43 74 49"}
          colors={selectedPlan.colors || ["#d4af37", "#ffd700", "#b8860b"]}
          glowIntensity={1}
          className="w-full lg:w-auto lg:min-w-[220px] border border-gold-500/20 shrink-0"
        >
          <div className="px-6 py-5 text-left lg:text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">
              Total Investment
            </p>
            <p className="text-3xl md:text-4xl font-black text-gold-400 font-outfit">
              {planPrice}
            </p>
            {planPrices.showStrike && (
              <p className="text-sm text-red-400/80 line-through mt-1">
                {planPrices.listLabel}
              </p>
            )}
            {!couponActive && (
              <Link
                href="/#pricing"
                className="text-[9px] text-gold-500/80 hover:text-gold-400 font-bold uppercase tracking-widest mt-2 inline-block"
              >
                Apply ELITE code on pricing
              </Link>
            )}
          </div>
        </BorderGlow>
      </div>
    </header>
  );
}
