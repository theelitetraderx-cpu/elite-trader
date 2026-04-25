"use client";

import Footer from "@/components/Footer";
import RippleGrid from "@/components/RippleGrid";
import CardSwap, { SwapCard } from "@/components/CardSwap";
import { MessageSquare, Send, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ElectricBorder from "@/components/ElectricBorder";

const socialLinks = [
  {
    name: "Telegram",
    description: "Get real-time market updates, trade breakdowns, and technical analysis.",
    icon: <Send className="w-8 h-8" />,
    href: "https://t.me/Elitefuture",
    color: "from-gold-500 to-yellow-400",
    shadow: "shadow-gold-500/20",
    hex: "#d4af37"
  }
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#060714] text-white">
      
      {/* Background Ripple Grid */}
      <div className="fixed inset-0 z-0">
        <RippleGrid 
          gridColor="#d4af37"
          gridSize={8}
          rippleIntensity={0.05}
          glowIntensity={0.2}
          opacity={0.4}
        />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Connect with the <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Elite Community</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-16">
            Join thousands of disciplined traders mastering the futures market. Choose your preferred platform to start growing with us.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-32 text-left">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6">
                 Verified Results
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Our Community <span className="text-gold-400 italic">Wins</span> Together
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Every single day, our members post their high-probability setups and verified profits. We don't just teach trading; we build professional traders who execute with discipline.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl font-bold text-gold-400 mb-1">98%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Win Rate Avg</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl font-bold text-gold-500 mb-1">300+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Active Traders</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full h-[320px] sm:h-[420px] md:h-[500px] relative flex items-center justify-center">
              <CardSwap width={320} height={450} delay={4000}>
                <SwapCard>
                  <img src="/community/profit1.png" alt="Profit 1" className="w-full h-full object-cover" />
                </SwapCard>
                <SwapCard>
                  <img src="/community/profit2.png" alt="Profit 2" className="w-full h-full object-cover" />
                </SwapCard>
                <SwapCard>
                  <img src="/community/profit3.png" alt="Profit 3" className="w-full h-full object-cover" />
                </SwapCard>
                <SwapCard>
                  <img src="/community/profit4.png" alt="Profit 4" className="w-full h-full object-cover" />
                </SwapCard>
              </CardSwap>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-12 tracking-tight">Join our Official Channel</h2>
          <div className="max-w-md mx-auto">
            {socialLinks.map((link) => (
              <ElectricBorder 
                key={link.name} 
                color={link.hex}
                borderRadius={32}
                speed={1.2}
                chaos={0.12}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-8 h-full flex flex-col items-center bg-white/[0.02] transition-all duration-300 overflow-hidden text-center`}
                >
                  {/* Gradient Background Effect on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${link.color} mb-6 shadow-lg shadow-black/20 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all`}>
                      {link.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{link.name}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      {link.description}
                    </p>
                    
                    <div className="mt-auto w-full pt-6 border-t border-white/5 flex items-center justify-center">
                      <span className="text-gold-500 font-bold uppercase tracking-widest text-[10px]">Open Telegram</span>
                      <ArrowUpRight className="w-4 h-4 ml-2 text-gold-500" />
                    </div>
                  </div>
                </a>
              </ElectricBorder>
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[32px] bg-gradient-to-br from-[#1a1500] to-[#0a0800] border border-gold-500/20 text-center">
            <h2 className="text-3xl font-bold mb-4">New to The Elite Trader?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Start with our comprehensive Foundation course to learn the structural rules of the market before joining the professional floor.
            </p>
            <Link 
              href="/#courses" 
              className="inline-flex items-center px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Master the Foundation
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
