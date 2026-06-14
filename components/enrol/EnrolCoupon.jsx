"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Check, X, Sparkles } from "lucide-react";
import { isValidCoupon, normalizeCouponCode, PROMO_ALIAS } from "@/lib/coupon";

export default function EnrolCoupon({ applied, onApply, onClear }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (code) => {
    if (!isValidCoupon(code)) {
      setMessage("Invalid code. Try ELITE.");
      setError(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 450);
      return;
    }
    const normalized = normalizeCouponCode(code);
    onApply(normalized);
    setMessage("");
    setError(false);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(input || PROMO_ALIAS);
  };

  if (applied) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 pt-4 border-t border-emerald-500/20"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400">
            <Check className="w-3.5 h-3.5" />
            <Sparkles className="w-3 h-3" />
            Member pricing active
          </span>
          <button
            type="button"
            onClick={onClear}
            className="text-slate-500 hover:text-white p-1"
            aria-label="Remove coupon"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={shake ? { x: [0, -6, 6, 0] } : { x: 0 }}
      className="mt-4 pt-4 border-t border-white/5"
    >
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gold-500/80 mb-2 flex items-center gap-1.5">
        <Tag className="w-3 h-3" />
        Member code
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          placeholder={PROMO_ALIAS}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs font-mono tracking-widest placeholder:text-slate-600 focus:outline-none focus:border-gold-500/40"
          aria-label="Member coupon code"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-lg bg-gold-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-gold-400 shrink-0"
        >
          Apply
        </button>
      </form>
      <button
        type="button"
        onClick={() => submit(PROMO_ALIAS)}
        className="mt-2 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-gold-400 transition-colors"
      >
        Quick apply {PROMO_ALIAS}
      </button>
      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-2 text-[10px] font-semibold ${error ? "text-red-400" : "text-slate-400"}`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
