"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Benefits() {
  const whyElite = [
    { title: "A+ Setups Only", desc: "High-probability, repeatable strategies — no guesswork" },
    { title: "Risk-First Trading", desc: "Protect capital before chasing profits" },
    { title: "Real Execution", desc: "Learn entries, exits & trade management in live conditions" },
    { title: "Leverage Clarity", desc: "Use futures smartly — not like gambling" },
    { title: "Mistake Correction", desc: "Fix errors with structured guidance" },
    { title: "Discipline System", desc: "Trade with rules, not emotions" }
  ];

  return (
    <section className="bg-black py-24 md:py-40 relative border-t border-white/5 selection:bg-gold-500 selection:text-black">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* Intro Section */}
        <div className="mb-32">
          <div className="text-gold-500 text-[10px] font-black uppercase tracking-[0.5em] mb-8">
            Elite Trader Advantages
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] font-outfit mb-8">
            Build a real trading edge — <br />
            <span className="text-gold-500">not just knowledge.</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-400 font-medium">
             <span>Start instantly with any plan ($49 / $249 / $499).</span>
             <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full"></span>
             <span className="text-white">The difference is how far you go.</span>
          </div>
        </div>

        {/* Why Elite Trader - Clean List */}
        <div className="mb-40">
           <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-16 underline underline-offset-8">
              WHY ELITE TRADER
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
              {whyElite.map((item, i) => (
                <div key={i} className="space-y-3">
                   <div className="flex items-center gap-3 text-gold-500 uppercase font-black text-xs">
                      <CheckCircle2 size={16} />
                      {item.title}
                   </div>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* The Difference Section */}
        <div className="mb-40 py-20 border-y border-white/5">
           <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-12">THE DIFFERENCE</div>
           <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="space-y-1">
                 <div className="text-gold-500 text-[10px] font-black uppercase">Foundation</div>
                 <div className="text-white text-lg font-bold">Learn basics</div>
              </div>
              <div className="hidden md:block w-8 h-px bg-white/10"></div>
              <div className="space-y-1">
                 <div className="text-gold-500 text-[10px] font-black uppercase">Pro Master</div>
                 <div className="text-white text-lg font-bold">Learn strategies</div>
              </div>
              <div className="hidden md:block w-8 h-px bg-white/10"></div>
              <div className="space-y-1">
                 <div className="text-gold-500 text-[10px] font-black uppercase font-black">Elite</div>
                 <div className="text-white text-lg font-bold">Execute with guidance</div>
              </div>
           </div>
        </div>

        {/* The Quote & Final CTA */}
        <div className="max-w-3xl mx-auto">
           <h3 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight font-outfit mb-8">
              “In trading, knowledge is common. <br />
              <span className="text-gold-500">Execution is rare.</span>”
           </h3>
           <p className="text-slate-400 font-black uppercase tracking-[0.3em] mb-16">
              If you want results, <span className="text-white">choose Elite.</span>
           </p>

           <Link href="#pricing">
              <button className="px-10 py-5 bg-gold-500 text-black font-black uppercase tracking-[0.3em] text-xs rounded-full hover:bg-white transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)] active:scale-95">
                 Go Elite – Build Your Edge
              </button>
           </Link>
        </div>

      </div>
    </section>
  );
}
