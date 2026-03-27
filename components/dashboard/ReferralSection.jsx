"use client";

import { useState } from "react";
import { Copy, Share2, TrendingUp, Gift, Check, ExternalLink, QrCode } from "lucide-react";
import { motion } from "framer-motion";

export default function ReferralSection({ user }) {
  const [copied, setCopied] = useState(false);
  const referralCode = user?.id?.slice(0, 8).toUpperCase() || "ELITE-TRADER";
  const referralLink = `https://theelitetrader.com/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: "Total Referrals", value: "12", icon: Share2, color: "text-blue-400" },
    { label: "Pending Credits", value: "$450", icon: TrendingUp, color: "text-green-400" },
    { label: "Rewards Earned", value: "$1,200", icon: Gift, color: "text-gold-500" },
  ];

  return (
    <div className="p-8 space-y-10">
      
      {/* Referral Link Card */}
      <div className="p-8 rounded-[32px] bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center text-gold-500 shadow-2xl">
            <QrCode size={64} />
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Refer & Earn <span className="text-gold-500">Elite Rewards</span></h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md">
              Share your unique link with fellow traders. Earn up to 20% commission on every enrollment through your referral.
            </p>
            
            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {referralLink}
              </div>
              <button 
                onClick={handleCopy}
                className={`p-3.5 rounded-2xl transition-all ${
                  copied ? 'bg-green-500 text-black' : 'bg-gold-500 text-black hover:bg-gold-400'
                }`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
              <div className="text-3xl font-black text-white mt-1">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Referral Program Info */}
      <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-6">
        <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={16} className="text-gold-500" /> Milestone Rewards
        </h4>
        
        <div className="space-y-4">
          {[
            { target: "5 Referrals", reward: "Custom Trading Journal", progress: 100 },
            { target: "15 Referrals", reward: "1-on-1 Mentorship (30m)", progress: 80 },
            { target: "50 Referrals", reward: "Elite Masterclass Pass", progress: 24 },
          ].map((milestone, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">{milestone.target}: <span className="text-gold-500 font-medium italic">{milestone.reward}</span></span>
                <span className="text-[10px] font-black text-slate-500">{milestone.progress}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${milestone.progress}%` }}
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button className="text-gold-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
            View Full Program Terms <ExternalLink size={12} />
          </button>
        </div>
      </div>

    </div>
  );
}
