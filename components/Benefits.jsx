import { Activity, ShieldCheck, Zap, Award, Target, LayoutDashboard } from "lucide-react";
import BorderGlow from "./BorderGlow";

export default function Benefits() {
  return (
    <section className="bg-black py-32 relative border-t border-white/5">
       {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5" /> Elite Advantages
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 tracking-tight">
            Built for traders who want to scale right.
          </h3>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We focus on structured A+ setups, disciplined execution, and risk-first trading. Prioritizing long-term consistency over short-term hype.
          </p>
        </div>

        {/* Dark Neon Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Large Featured Card */}
          <BorderGlow
            className="md:col-span-2"
            borderRadius={24}
            backgroundColor="#0a0a0a"
            glowColor="43 74 49"
            colors={['#d4af37', '#ffd700', '#b8860b']}
          >
            <div className="p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-gold-600/20 to-gold-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-gold-500/10 to-transparent rounded-2xl flex items-center justify-center border border-gold-500/20 mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <Target className="w-7 h-7 text-gold-400" />
                </div>
                <h4 className="text-3xl font-medium text-white mb-4 tracking-tight">Risk-First Execution.</h4>
                <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-10">
                   Trading isn&apos;t about how much you can make, but how much you can keep. Master the art of risk-managed setups.
                </p>
                
                <div className="flex items-center gap-4 bg-black p-4 rounded-full border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.5)] w-max max-w-full overflow-x-auto">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-600 border border-gold-400 text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.5)] flex-shrink-0">1</div>
                   <div className="text-slate-200 font-medium whitespace-nowrap text-sm">Analyze Structure</div>
                   <div className="h-4 border-l border-white/5"></div>
                   <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]">✓</div>
                   <div className="text-white font-medium whitespace-nowrap text-sm pr-2">Execute A+ Setup</div>
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Transparent Card */}
          <BorderGlow
            borderRadius={24}
            backgroundColor="#0a0a0a"
            glowColor="160 84 39"
            colors={['#10b981', '#34d399', '#059669']}
          >
            <div className="p-10 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10 w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Zap className="w-7 h-7 text-emerald-400" />
              </div>
              <h4 className="text-xl font-medium text-white mb-3 relative z-10">Transparent. Real.</h4>
              <p className="text-slate-400 text-base leading-relaxed mb-8 relative z-10">
                No hollow promises. Just real trade breakdowns and structured learning for serious traders.
              </p>
              <div className="bg-black rounded-2xl p-6 border border-white/5 mt-auto text-center relative z-10 shadow-inner overflow-hidden">
                 <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Consistency Score</div>
                 <div className="text-3xl text-emerald-400 font-bold tracking-tight filter drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">A+ TRADER</div>
              </div>
            </div>
          </BorderGlow>

          {/* Features Grid Bottom Row */}
          <BorderGlow borderRadius={24} backgroundColor="#0a0a0a" glowColor="43 74 49" colors={['#d4af37', '#ffd700', '#b8860b']}>
            <div className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6 border border-gold-500/20">
                   <LayoutDashboard className="w-6 h-6 text-gold-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Multiple Accounts</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Trade up to 5 funded accounts simultaneously under one simple login.</p>
              </div>
            </div>
          </BorderGlow>

          <BorderGlow borderRadius={24} backgroundColor="#0a0a0a" glowColor="43 74 49" colors={['#d4af37', '#ffd700', '#b8860b']}>
            <div className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6 border border-gold-500/20">
                   <Activity className="w-6 h-6 text-gold-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Real-Time Data</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Direct market access with institutional grade feeds included for free.</p>
              </div>
            </div>
          </BorderGlow>

          <BorderGlow borderRadius={24} backgroundColor="#0a0a0a" glowColor="270 60 60" colors={['#a855f7', '#c084fc', '#d4af37']}>
            <div className="p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6 border border-gold-500/20">
                   <Award className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Official Certificate</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Receive a verified digital certificate to showcase your achievement on LinkedIn.</p>
              </div>
            </div>
          </BorderGlow>

        </div>
      </div>
    </section>
  );
}
