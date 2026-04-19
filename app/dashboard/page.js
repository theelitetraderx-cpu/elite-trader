"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Share2, LogOut, ShieldCheck, Settings, Bell, ChevronRight, BookOpen, Shield } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BorderGlow from "@/components/BorderGlow";
import ProfileSection from "@/components/dashboard/ProfileSection";
import FriendsSection from "@/components/dashboard/FriendsSection";
import PaymentsSection from "@/components/dashboard/PaymentsSection";
import NetworkCircles from "@/components/dashboard/NetworkCircles";
import { usePortal } from "@/components/portal/PortalProvider";

const supabase = createClient();

export default function Dashboard() {
  const { user, loading, isAuthorized } = usePortal();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = useMemo(() => {
    const baseTabs = [
      { id: "profile", label: "Profile", icon: User },
      { id: "portal", label: "Learning Portal", icon: ShieldCheck, highlight: true },
      { id: "friends", label: "Friends", icon: Users },
      { id: "payments", label: "Payments", icon: CreditCard },
    ];
    
    if (isAuthorized) {
        baseTabs.push({ id: "admin", label: "Admin Panel", icon: Shield, highlight: false });
    }
    
    return baseTabs;
  }, [isAuthorized]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black scroll-smooth overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        
        {/* Dashboard Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
              Trader <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Dashboard</span>
            </h1>
            <p className="text-slate-400 font-medium">Manage your elite trading profile and rewards.</p>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <button className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
            </button>
            <button className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Tabs - Sidebar on Desktop, Horizontal Scroll on Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 lg:space-y-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 no-scrollbar items-center lg:items-stretch"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === "admin") {
                      router.push("/admin");
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  className={`flex-shrink-0 lg:w-full flex items-center justify-between p-3 lg:p-4 rounded-2xl transition-all group ${
                    isActive || tab.highlight
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-lg shadow-gold-500/20' 
                    : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                      <Icon size={18} />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-[11px] lg:text-[13px] whitespace-nowrap">{tab.label}</span>
                  </div>
                  <ChevronRight size={16} className={`hidden lg:block ${isActive ? 'opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'} transition-all`} />
                </button>
              );
            })}

            <div className="hidden lg:block mt-8 pt-8 border-t border-white/5">
              <div className="p-5 rounded-3xl bg-gold-500/5 border border-gold-500/10 mb-4">
                <div className="flex items-center gap-2 text-gold-500 text-[10px] font-bold uppercase tracking-widest mb-2">
                  <ShieldCheck size={12} /> Security Level: High
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    className="h-full bg-gold-500"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <BorderGlow
                  borderRadius={32}
                  backgroundColor="#0a0a0a"
                  glowColor="40 80 80"
                  colors={['#d4af37', '#ffd700', '#aa8a2e']}
                  glowIntensity={0.5}
                  fillOpacity={0}
                >
                  <div className="min-h-[500px]">
                    {activeTab === "profile" && <ProfileSection user={user} />}
                    {activeTab === "portal" && (
                        <div className="p-8">
                             <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Elite <span className="text-gold-500">Academy</span></h2>
                                    <p className="text-slate-400">Your institution for market mastery.</p>
                                </div>
                                <button 
                                    onClick={() => router.push('/portal')}
                                    className="px-6 py-3 rounded-xl bg-gold-500 text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
                                >
                                    Enter Full Portal
                                </button>
                             </div>
                             <div className="p-20 rounded-[40px] bg-white/[0.02] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                                <ShieldCheck size={48} className="text-gold-500/50 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Curriculum Ready</h3>
                                <p className="text-slate-500 max-w-sm mb-8 text-sm">
                                    Click the button above to launch the full learning experience with progress tracking and video mastery.
                                </p>
                             </div>
                        </div>
                    )}
                    {activeTab === "friends" && <FriendsSection user={user} />}
                    {activeTab === "payments" && <PaymentsSection user={user} />}
                  </div>
                </BorderGlow>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Social Proof Section */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
              Our Growing <span className="text-gold-500">Network</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">You're part of an elite community of traders globally. Connect, grow, and dominate the markets together.</p>
          </div>
          
          <div className="relative h-[600px] w-full">
            <NetworkCircles />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
