"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import EnrolCoupon from "@/components/enrol/EnrolCoupon";
import CouponAppliedBurst from "@/components/pricing/CouponAppliedBurst";

export default function EnrolHeader({
  displayPlanName,
  planPrice,
  planPrices,
  couponActive,
  couponFlash,
  isSignals,
  selectedPlan,
  onApplyCoupon,
  onClearCoupon,
}) {
  return (
    <header className="mb-8 md:mb-12">
      <Link
        href="/#pricing"
        className="inline-flex items-center gap-2 text-gold-500/90 hover:text-gold-400 transition-colors mb-6 md:mb-8 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">
          Back to Pricing
        </span>
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-outfit uppercase leading-[0.95] mb-4">
            Complete Your <span className="text-gold-500">Enrollment</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Secure your access to{" "}
            <span className="text-white font-semibold">{displayPlanName}</span>.
            Follow the instructions below to finalize your payment.
          </p>
        </div>

        <BorderGlow
          borderRadius={20}
          backgroundColor="#0a0a0a"
          glowColor={selectedPlan.glowColor || "43 74 49"}
          colors={selectedPlan.colors || ["#d4af37", "#ffd700", "#b8860b"]}
          glowIntensity={couponActive ? 1.2 : 1}
          className={`relative w-full lg:w-auto lg:min-w-[260px] border shrink-0 overflow-hidden transition-colors duration-500 ${
            couponActive ? "border-emerald-500/35" : "border-gold-500/20"
          }`}
        >
          <CouponAppliedBurst active={couponFlash} />
          <motion.div
            animate={
              couponFlash
                ? {
                    boxShadow: [
                      "0 0 0 rgba(212,175,55,0)",
                      "0 0 32px rgba(212,175,55,0.35)",
                      "0 0 0 rgba(212,175,55,0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1 }}
            className="relative z-10 px-6 py-5 text-left lg:text-right"
          >
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">
              Total Investment
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={planPrice}
                initial={{ scale: 1.15, opacity: 0, y: -8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <p
                  className={`text-3xl md:text-4xl font-black font-outfit ${
                    couponActive ? "text-gold-400" : "text-gold-400"
                  }`}
                >
                  {planPrice}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {planPrices.showStrike && (
                <motion.p
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 0.85, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400/90 line-through mt-1"
                >
                  {planPrices.listLabel}
                </motion.p>
              )}
            </AnimatePresence>

            {!isSignals && (
              <EnrolCoupon
                applied={couponActive}
                onApply={onApplyCoupon}
                onClear={onClearCoupon}
              />
            )}
          </motion.div>
        </BorderGlow>
      </div>
    </header>
  );
}
