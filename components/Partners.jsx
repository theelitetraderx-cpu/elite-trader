export default function Partners() {
  return (
    <section className="bg-black py-24 overflow-hidden relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent to-white/10 w-12"></div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Trusted by industry leaders and featured in
          </h2>
          <div className="h-px bg-gradient-to-l from-transparent to-white/10 w-12"></div>
        </div>

        {/* Dark clean logo presentation */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100">
           <div className="text-slate-300 font-bold text-2xl cursor-pointer hover:text-gold-500 transition-colors">MarketWatch</div>
           <div className="text-slate-300 font-bold text-3xl cursor-pointer hover:text-gold-500 transition-colors">Forbes</div>
           <div className="text-black font-black text-3xl bg-gold-500 px-3 py-1 rounded shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer tracking-tighter">FAST<span className="font-light">50</span></div>
           <div className="text-slate-300 font-bold text-3xl cursor-pointer hover:text-gold-500 transition-colors">FOX</div>
           <div className="text-slate-300 font-bold text-2xl cursor-pointer hover:text-gold-500 transition-colors">Inc. 500</div>
        </div>
      </div>
    </section>
  );
}
