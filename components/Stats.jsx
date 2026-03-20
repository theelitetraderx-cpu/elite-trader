export default function Stats() {
  const stats = [
    { value: "10,000+", label: "Target Traders", icon: "📈", desc: "Total payouts issued in 2024 alone" },
    { value: "81,177", label: "Successful Payouts", icon: "💎", desc: "Active funded traders right now" },
    { value: "2 Days", label: "Fastest Funding", icon: "⚡", desc: "Average time to receive first funding" },
    { value: "12+ Yrs", label: "Industry Leaders", icon: "🏛️", desc: "Established prop firm operations" },
  ];

  return (
    <section className="bg-black py-20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all hover:bg-[#151515] hover:border-gold-500/30 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-2xl rounded-full group-hover:bg-gold-500/10 transition-colors pointer-events-none"></div>
              
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-2xl mb-4 border border-gold-500/20 shadow-[0_0_15px_rgba(212,175,55,0.15)] relative z-10">
                {stat.icon}
              </div>
              <div className="text-3xl font-light text-white mb-2 tracking-tight relative z-10">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gold-400 mb-3 relative z-10">
                {stat.label}
              </div>
              <div className="text-sm text-slate-500 leading-relaxed relative z-10">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
