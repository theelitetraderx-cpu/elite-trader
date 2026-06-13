"use client";

import { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import StarBorder from "./StarBorder";
import PlanCard from "./pricing/PlanCard";
import { Target, Zap, Star } from "lucide-react";
import { usePricing } from "./pricing/PricingProvider";

const PLAN_ICONS = [Target, Zap, Star];

function scrollToPricing(planIndex) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("pricing_focus_plan", String(planIndex));
    sessionStorage.setItem("pricing_open_compare", "true");
  }
  const el = document.getElementById("pricing");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.href = "/#pricing";
  }
}

export default function Courses() {
  const { plans } = usePricing();

  return (
    <section id="courses" className="bg-black py-24 md:py-32 relative border-t border-white/5">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-xs font-bold uppercase tracking-widest mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Elite Curriculum
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.95] font-outfit">
              Master the markets with our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                comprehensive courses.
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium">
              Three structured paths — Foundation for crypto & spot, PRO for futures and live signals.
            </p>
          </div>

          <StarBorder color="#d4af37" speed="7s">
            <button
              type="button"
              onClick={() => scrollToPricing(2)}
              className="bg-[#050505] hover:bg-[#0a0a0a] text-white border border-white/5 hover:border-gold-500/50 font-black uppercase tracking-widest text-xs py-4 px-8 rounded-full transition-all flex items-center gap-2 whitespace-nowrap h-max shadow-lg shadow-gold-500/10"
            >
              View Pricing & Enrol
              <ArrowRight className="w-4 h-4" />
            </button>
          </StarBorder>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              planIndex={i}
              icon={PLAN_ICONS[i]}
              isFeatured={plan.featured}
              showEnrol={false}
              onCompare={scrollToPricing}
              onEnrol={scrollToPricing}
              className="hover:-translate-y-1 transition-transform duration-500"
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-500">
          {plans.map((plan, i) => (
            <div key={plan.name} className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  i === 2 ? "text-gold-500" : i === 1 ? "text-gold-500/60" : ""
                }`}
              >
                {plan.tierLabel}
              </span>
              {i < plans.length - 1 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
