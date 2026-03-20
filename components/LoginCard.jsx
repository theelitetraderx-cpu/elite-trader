"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg p-10 rounded-[2.5rem] bg-[#0a0a0a]/40 backdrop-blur-[30px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative z-20 overflow-hidden font-inter"
    >
      {/* Sharper inner border highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="mb-10 relative text-center">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight font-outfit uppercase">Welcome Back</h2>
        <p className="text-slate-400 text-lg font-medium opacity-80">Access The Elite Trader Platform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-500 transition-colors" />
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#050505]/60 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/40 focus:bg-black/40 transition-all text-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold-500 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-[#050505]/60 border border-white/5 rounded-2xl py-5 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/40 focus:bg-black/40 transition-all text-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm px-1">
          <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-300">
            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-gold-600 focus:ring-0 transition-all" />
            Remember me
          </label>
          <a href="#" className="text-gold-500 hover:text-gold-400 font-medium transition-colors">Forgot?</a>
        </div>

        <div className="pt-2 space-y-4">
          <button
            type="submit"
            className="group w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(212,175,55,0.25)] transition-all active:scale-[0.98] text-lg uppercase tracking-wider font-outfit"
          >
            Login <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            className="w-full bg-white text-black hover:bg-slate-100 font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg text-lg font-outfit"
          >
            <img src="https://www.google.com/favicon.ico" alt="" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Don't have an account?{" "}
          <Link href="/register" className="text-gold-500 hover:text-gold-400 font-bold transition-colors">Register</Link>
        </p>
      </div>
    </motion.div>
  );
}
