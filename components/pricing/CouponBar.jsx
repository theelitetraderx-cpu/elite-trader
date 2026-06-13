"use client";

import { useState } from "react";
import { Tag, Check, X, Star } from "lucide-react";
import { usePricing } from "./PricingProvider";
import { PROMO_ALIAS } from "@/lib/coupon";

export default function CouponBar({ className = "" }) {
  const { couponApplied, promoCode, applyCoupon, clearCoupon } = usePricing();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    const result = applyCoupon(input || promoCode);
    if (result.ok) {
      setMessage(result.message);
      setError(false);
      setInput("");
    } else {
      setMessage(result.message);
      setError(true);
    }
  };

  const handleQuickApply = () => {
    const result = applyCoupon(promoCode);
    setMessage(result.message);
    setError(!result.ok);
  };

  return (
    <div
      className={`rounded-2xl border border-gold-500/20 bg-gradient-to-r from-gold-500/[0.08] via-[#0a0a0a] to-gold-500/[0.05] p-4 md:p-5 shadow-[inset_0_1px_0_rgba(212,175,55,0.08)] ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
            <Tag className="w-4 h-4 text-gold-400" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gold-500 mb-1">
              Member pricing
            </p>
            <p className="text-white text-sm font-semibold leading-snug">
              Apply your coupon to unlock discounted lifetime access on every plan.
            </p>
            {!couponApplied && (
              <button
                type="button"
                onClick={handleQuickApply}
                className="mt-3 inline-flex items-center gap-2.5 group"
                aria-label={`Apply ${PROMO_ALIAS} member pricing`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors">
                  Tap to unlock
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_16px_rgba(212,175,55,0.35)] group-hover:shadow-[0_0_24px_rgba(212,175,55,0.5)] group-hover:from-gold-500 group-hover:to-gold-400 transition-all">
                  <Star className="w-3 h-3 fill-black/30" />
                  {PROMO_ALIAS}
                </span>
              </button>
            )}
          </div>
        </div>

        <form
          onSubmit={handleApply}
          className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto lg:min-w-[320px]"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder={`Enter code (${PROMO_ALIAS})`}
            className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-mono tracking-widest placeholder:text-slate-600 placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:border-gold-500/50"
            aria-label="Coupon code"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-gold-500 text-black text-xs font-black uppercase tracking-widest hover:bg-gold-400 transition-colors shrink-0"
          >
            Apply
          </button>
        </form>
      </div>

      {(couponApplied || message) && (
        <div
          className={`mt-3 flex items-center justify-between gap-3 text-xs font-semibold rounded-xl px-4 py-2.5 ${
            couponApplied
              ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
              : error
                ? "bg-red-500/10 border border-red-500/25 text-red-300"
                : "bg-white/5 border border-white/10 text-slate-400"
          }`}
        >
          <span className="flex items-center gap-2">
            {couponApplied ? <Check className="w-4 h-4 shrink-0" /> : null}
            {couponApplied
              ? `${PROMO_ALIAS} pricing active — member rates applied (e.g. ELITE $599 → $499)`
              : message}
          </span>
          {couponApplied && (
            <button
              type="button"
              onClick={() => {
                clearCoupon();
                setMessage("");
              }}
              className="text-slate-400 hover:text-white flex items-center gap-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}
