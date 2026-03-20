'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrendingUp, Target, Zap, Shield, Globe, Award, Calculator, ArrowRight, Send, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const btcPrice = 98450; // Static Premium Price
  const [calcInputs, setCalcInputs] = useState({
    investment: 1000,
    winRate: 60,
    riskReward: 2,
    trades: 20
  });

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(".fade-in", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        scrollTrigger: {
          trigger: ".fade-in",
          start: "top 85%",
        }
      }
    );
  }, []);

  const calculateProfit = () => {
    const { investment, winRate, riskReward, trades } = calcInputs;
    const wins = trades * (winRate / 100);
    const losses = trades - wins;
    const riskPerTrade = investment * 0.02; // Assuming 2% risk per trade
    const totalProfit = (wins * riskPerTrade * riskReward) - (losses * riskPerTrade);
    return totalProfit.toFixed(2);
  };

  return (
    <div className="bg-[#060714] min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 text-center mb-32">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 fade-in">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Elite Trader</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed fade-in">
            Precision Trading. Consistent Profits. From Beginner to Elite Trader.
          </p>
        </section>

        {/* STATS HIGHLIGHT */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in">
              <h2 className="text-4xl font-bold text-white tracking-tight">Where Precision Meets Profitability</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Welcome to **The Elite Trader**, where we specialize in high-probability strategies on platforms like Binance, focusing on BTC, altcoins, and FX markets. 
              </p>
              <div className="flex gap-12">
                <div>
                  <div className="text-5xl font-bold text-gold-500 mb-1">2+</div>
                  <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Years Experience</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gold-400 mb-1">98%</div>
                  <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Accuracy Strategy</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gold-600/10 to-gold-500/10 border border-white/5 rounded-3xl p-10 backdrop-blur-3xl fade-in">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center text-gold-400">
                    <TrendingUp />
                 </div>
                 <h3 className="text-xl font-bold text-white">Market Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-slate-400">Bitcoin (BTC)</span>
                  <span className="text-2xl font-mono text-gold-400 font-bold">
                    ${btcPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-slate-500 text-center pt-2 italic">
                  Elite Strategy Target Reference
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFERINGS GRID */}
        <section className="bg-white/[0.02] border-y border-white/5 py-32 mb-32">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-20 fade-in tracking-tight">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Zap />, title: "Advanced Courses", desc: "From basics to institutional Smart Money Concepts (SMC)." },
                { icon: <Target />, title: "Signal Membership", desc: "High-probability setups with entry, TP, and SL directly." },
                { icon: <Shield />, title: "Risk Management", desc: "Master the psychology and math behind long-term success." },
                { icon: <Globe />, title: "Live Analysis", desc: "Daily market tracking for BTC, ETH, Altcoins, and Forex." },
                { icon: <Award />, title: "Mentorship", desc: "Direct guidance from experienced traders at every step." },
                { icon: <Globe />, title: "Digital Certificate", desc: "Verified certification upon completion of our masterclass." }
              ].map((item, i) => (
                <div key={i} className="group p-8 border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-gold-500/30 transition-all duration-300 fade-in">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold-600/20 group-hover:text-gold-400 transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COURSES DETAIL */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
           <h2 className="text-4xl font-bold text-white mb-16 fade-in tracking-tight">Our Trading Courses</h2>
           <div className="space-y-6">
              {[
                { 
                  title: "Beginner to Pro Crypto Trading", 
                  tags: ["Binance Focused", "Psychology", "Technical Analysis"],
                  points: ["Market Structure", "Candlestick Psychology", "Indicators (RSI, MACD, EMA)", "Entry & Exit Strategies", "Risk Management"]
                },
                { 
                  title: "Advanced Smart Money Concepts (SMC)", 
                  tags: ["Institutional Trading", "Advanced"],
                  points: ["Liquidity Zones", "Order Blocks", "Break of Structure", "Price Action Mastery"]
                },
                { 
                  title: "Live Trading Sessions", 
                  tags: ["Real-time", "Interaction"],
                  points: ["BTC & Altcoin scalping", "Forex setups", "Trade explanations"]
                }
              ].map((course, i) => (
                <div key={i} className="p-10 border border-white/5 rounded-3xl bg-gradient-to-r from-transparent to-white/[0.02] hover:to-gold-600/[0.02] transition-colors fade-in">
                   <div className="flex flex-wrap gap-2 mb-6">
                      {course.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 bg-gold-600/10 text-gold-400 text-[10px] font-black uppercase tracking-widest rounded-full">{tag}</span>
                      ))}
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-8">{course.title}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.points.map((p, k) => (
                        <div key={k} className="flex items-center gap-3 text-slate-400 italic">
                           <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                           {p}
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* PROFIT CALCULATOR */}
        <section className="max-w-4xl mx-auto px-6 mb-40">
           <div className="bg-[#0c0e1e] border border-gold-500/20 rounded-[40px] p-12 relative overflow-hidden fade-in">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      <Calculator size={28} />
                   </div>
                   <div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Profit Calculator</h2>
                      <p className="text-slate-400">See your potential with Elite Trader strategies</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div>
                        <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Initial Investment ($)</label>
                        <input 
                          type="number" 
                          value={calcInputs.investment} 
                          onChange={(e) => setCalcInputs({...calcInputs, investment: Number(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Win Rate (%)</label>
                          <input 
                            type="number" 
                            value={calcInputs.winRate} 
                            onChange={(e) => setCalcInputs({...calcInputs, winRate: Number(e.target.value)})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">R:R Ratio</label>
                          <input 
                            type="number" 
                            value={calcInputs.riskReward} 
                            onChange={(e) => setCalcInputs({...calcInputs, riskReward: Number(e.target.value)})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Number of Trades</label>
                        <input 
                          type="number" 
                          value={calcInputs.trades} 
                          onChange={(e) => setCalcInputs({...calcInputs, trades: Number(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                   </div>

                   <div className="flex flex-col justify-center items-center p-10 bg-white/5 rounded-3xl border border-white/10">
                      <div className="text-slate-500 text-sm mb-2">Projected Profit (2% Risk)</div>
                      <div className="text-6xl font-black text-white mb-2">${calculateProfit()}</div>
                      <div className="text-gold-400 font-bold uppercase tracking-widest text-xs">Based on Strategy Accuracy</div>
                   </div>
                </div>
              </div>
           </div>
        </section>

        {/* JOIN COMMUNITY */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
           <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold text-white tracking-tight uppercase font-outfit">Join Our <span className="text-gold-500">Hub</span></h2>
              <p className="text-slate-400 mt-4">Connect with the elite networks of professional traders.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
              {/* Telegram Card */}
              <a 
                href="https://t.me/Elitefuture" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center text-center p-12 bg-[#0088cc]/5 hover:bg-[#0088cc]/10 border border-[#0088cc]/20 rounded-[3rem] transition-all duration-500 hover:scale-[1.02] fade-in"
              >
                <div className="w-20 h-20 bg-[#0088cc] rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-[0_20px_40px_rgba(0,136,204,0.3)] group-hover:rotate-6 transition-transform">
                  <Send className="w-10 h-10 fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-outfit uppercase">Telegram Channel</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Get real-time market updates, trade breakdowns, and technical analysis directly to your phone.
                </p>
                <div className="mt-auto inline-flex items-center gap-2 text-[#0088cc] font-bold uppercase tracking-widest text-xs">
                  Join Channel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Discord Card */}
              <a 
                href="https://discord.gg/W36Es5ZAU8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center text-center p-12 bg-[#5865F2]/5 hover:bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-[3rem] transition-all duration-500 hover:scale-[1.02] fade-in"
              >
                <div className="w-20 h-20 bg-[#5865F2] rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-[0_20px_40px_rgba(88,101,242,0.3)] group-hover:-rotate-6 transition-transform">
                  <MessageSquare className="w-10 h-10 fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-outfit uppercase">Discord Server</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Join our official trading floor for live callouts, active discussions, and community support.
                </p>
                <div className="mt-auto inline-flex items-center gap-2 text-[#5865F2] font-bold uppercase tracking-widest text-xs">
                  Join Server <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
           </div>
        </section>

        {/* MISSION */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-40">
           <h2 className="text-3xl font-bold text-white mb-6 fade-in tracking-tight">Our Mission</h2>
           <p className="text-xl text-slate-400 leading-relaxed fade-in">
             To empower traders with the knowledge, tools, and confidence to achieve financial independence through smart trading.
           </p>
        </section>

        {/* CALL TO ACTION */}
        <section className="max-w-5xl mx-auto px-6 text-center mb-20 fade-in">
           <div className="bg-gradient-to-r from-gold-600 to-gold-400 rounded-[3rem] py-20 px-10 shadow-[0_0_80px_rgba(212,175,55,0.2)]">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-10 leading-tight">Join The Elite Trader and step into the future of trading.</h2>
              <Link href="/register" className="bg-black text-gold-400 font-bold px-10 py-5 rounded-full hover:scale-105 transition-transform inline-flex items-center gap-3 mx-auto shadow-2xl">
                 Start Your Journey <ArrowRight />
              </Link>
              <div className="mt-12 flex flex-wrap justify-center gap-10 text-black/60 text-sm font-bold tracking-widest uppercase">
                 <span>&quot;Trade Smart. Trade Elite.&quot;</span>
                 <span>&quot;Precision Trading. Consistent Profits.&quot;</span>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
