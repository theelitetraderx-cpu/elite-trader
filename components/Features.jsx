"use client";

import { PlayCircle, FileText, Bot, Signal } from "lucide-react";

export default function Features() {
  const features = [
    { title: "PRECISION VIDEO LESSONS", desc: "High-quality, structured modules focused on real trading concepts and execution clarity. Access anytime.", icon: <PlayCircle className="w-5 h-5 text-gold-400" /> },
    { title: "TRADING BLUEPRINTS & RESOURCES", desc: "Downloadable playbooks, charts, and frameworks designed for practical application — not theory.", icon: <FileText className="w-5 h-5 text-gold-500" /> },
    { title: "LIVE TRADING ENVIRONMENT (UPCOMING)", desc: "Access a dedicated trading room with real-time setups, execution guidance, and market context.", icon: <Signal className="w-5 h-5 text-gold-600" /> },
    { title: "AI PERFORMANCE REVIEW (UPCOMING)", desc: "Advanced tools to analyze trading behavior, identify mistakes, and improve decision-making.", icon: <Bot className="w-5 h-5 text-gold-400" /> }
  ];

  return (
    <section className="bg-black py-32 border-t border-white/5 pb-40 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center">
          
          <div className="w-full">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-[10px] font-black uppercase tracking-widest mb-8">
                Course Content System
             </div>
             <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase font-outfit leading-tight">
               Built for structured <br className="hidden md:block"/>trading development
             </h3>
             <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto mb-20 font-medium">
               Designed to deliver high-quality trade breakdowns, real-market execution training, and a clear path to mastering futures trading.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#0a0a0a] border border-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#151515] group-hover:border-gold-500/30 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{f.title}</h4>
                      <p className="text-slate-500 leading-relaxed text-sm font-medium">{f.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
