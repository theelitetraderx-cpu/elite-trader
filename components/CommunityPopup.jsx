"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bell, ArrowRight, MessageSquare } from "lucide-react";

export default function CommunityPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAndShow = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const hasBeenClosed = sessionStorage.getItem("community-popup-closed-auth");
      
      console.log("[CommunityPopup] Checking state ->", { isLoggedIn, hasBeenClosed });

      if (isLoggedIn && !hasBeenClosed) {
        console.log("[CommunityPopup] Opening popup!");
        setIsOpen(true);
      }
    };

    // Show after 3 seconds if logged in and not closed in this session
    const timer = setTimeout(() => {
      checkAndShow();
    }, 3000);

    // Listen for instant auth state changes
    window.addEventListener('auth-change', checkAndShow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('auth-change', checkAndShow);
    };
  }, []);
  const closePopup = () => {
    console.log("[CommunityPopup] Closing popup and saving to session storage.");
    setIsOpen(false);
    sessionStorage.setItem("community-popup-closed-auth", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          {/* Backdrop Overlay to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-xl bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_50px_120px_rgba(0,0,0,0.9)] overflow-hidden font-inter"
          >
            {/* Top Glow Decor */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Close */}
            <button 
              onClick={closePopup}
              className="absolute top-8 right-8 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-12 relative z-10">
              {/* Branding / Badge */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gold-600/10 rounded-[1.25rem] flex items-center justify-center border border-gold-500/20 shadow-lg shadow-gold-900/20">
                    <Send className="w-7 h-7 text-gold-400 fill-gold-400/20" />
                </div>
                <div>
                    <span className="text-[0.7rem] font-black text-gold-500 uppercase tracking-[0.4em] font-outfit">Join Our Hub</span>
                    <h3 className="text-white font-bold text-2xl font-outfit uppercase tracking-tighter leading-none">Inner Circle</h3>
                </div>
              </div>

              {/* Content */}
              <h2 className="text-5xl font-bold text-white mb-5 font-outfit leading-[1.1] tracking-tight uppercase">
                Master the Markets <br/> <span className="text-gold-500">Together</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed max-w-[90%]">
                Join our premium communities for real-time market insights, high-probability signals, and advanced trading tactics.
              </p>

              {/* Buttons Grid */}
              <div className="grid grid-cols-1 gap-5">
                {/* Telegram */}
                <a 
                  href="https://t.me/Elitefuture" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-6 px-10 rounded-3xl transition-all shadow-[0_20px_40px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] font-outfit uppercase tracking-widest text-lg"
                >
                  <div className="flex items-center gap-4">
                    <Send className="w-6 h-6" />
                    <span>Telegram Channel</span>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Discord */}
                <a 
                  href="https://discord.gg/W36Es5ZAU8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between w-full bg-[#151515] hover:bg-[#202020] text-gold-500 font-bold py-6 px-10 rounded-3xl transition-all border border-gold-500/30 hover:scale-[1.02] active:scale-[0.98] font-outfit uppercase tracking-widest text-lg"
                >
                  <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6" />
                    <span>Discord Server</span>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>


            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
