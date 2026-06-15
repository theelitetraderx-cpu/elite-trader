"use client";

import { BookOpen } from "lucide-react";
import { Target, Zap, Star } from "lucide-react";
import { PLANS } from "@/lib/plans";
import CourseCard from "./CourseCard";

const PLAN_ICONS = [Target, Zap, Star];

export default function Courses() {
  return (
    <section id="courses" className="bg-black py-24 md:py-32 relative border-t border-white/5">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PLANS.map((plan, i) => (
            <CourseCard
              key={plan.name}
              plan={plan}
              planIndex={i}
              icon={PLAN_ICONS[i]}
              isFeatured={plan.featured}
              className="hover:-translate-y-1 transition-transform duration-500"
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-500">
          {PLANS.map((plan, i) => (
            <div key={plan.name} className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  i === 2 ? "text-gold-500" : i === 1 ? "text-gold-500/60" : ""
                }`}
              >
                {plan.tierLabel}
              </span>
              {i < PLANS.length - 1 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
