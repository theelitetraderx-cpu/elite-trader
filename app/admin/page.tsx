"use client";

import { useEffect, useState } from "react";
import { Users, CreditCard, ActiveUsers, ShieldAlert } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";

const supabase = createClient();

export default function AdminOverview() {
  const [stats, setStats] = useState({
     totalUsers: 0,
     totalPayments: 0,
     recentLogins: []
  });

  useEffect(() => {
    // In a real scenario, this fetches from Supabase.
    // For now we mock the data since we don't have the explicit user tables defined heavily.
    setStats({
      totalUsers: 142,
      totalPayments: 24,
      recentLogins: [
        { email: "user1@example.com", joined: "2026-04-18", status: "Active" },
        { email: "trader_pro@market.com", joined: "2026-04-18", status: "Active" },
        { email: "crypto_whale@moon.io", joined: "2026-04-17", status: "Inactive" },
      ]
    });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
          Admin <span className="text-gold-500">Overview</span>
        </h1>
        <p className="text-slate-400">Monitor your platform's health, users, and revenue.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-5"><Users size={100}/></div>
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Total Registered Logins</h3>
           <div className="text-5xl font-black text-white">{stats.totalUsers}</div>
        </motion.div>
        
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-5"><CreditCard size={100}/></div>
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Total Payments</h3>
           <div className="text-5xl font-black text-gold-500">{stats.totalPayments}</div>
        </motion.div>
      </div>

      {/* Recent Logins Table */}
      <div className="mt-12">
         <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-6">Recent Logins</h2>
         <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
            <table className="w-full text-left text-sm text-slate-400">
               <thead className="bg-black/50 text-xs uppercase bg-white/[0.02]">
                  <tr>
                     <th className="px-6 py-4">User</th>
                     <th className="px-6 py-4">Joined / Last Login</th>
                     <th className="px-6 py-4">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {stats.recentLogins.map((login, idx) => (
                     <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{login.email}</td>
                        <td className="px-6 py-4">{login.joined}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${login.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {login.status}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
