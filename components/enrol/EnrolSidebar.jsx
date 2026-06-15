"use client";

import Link from "next/link";
import { ShieldCheck, Star, ArrowRight } from "lucide-react";
import { getPlanPrices } from "@/lib/plans";

const STEPS = [
  { step: "01", text: "Send USDT on BEP-20 (BNB Smart Chain) only" },
  { step: "02", text: "Scan the QR code or copy the address" },
  { step: "03", text: "Complete the transfer from your wallet" },
  { step: "04", text: "Finalize by sending the receipt" },
];

export default function EnrolSidebar({
  isSignals,
  selectedPlan,
  couponActive,
  eliteEnrolHref,
  ELITE_PLAN,
}) {
  const showUpsell = !isSignals && selectedPlan.name !== "ELITE";
  const isElite = !isSignals && selectedPlan.name === "ELITE";

  return (
    <aside className="space-y-5 md:space-y-6">
      {showUpsell && (
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 p-6 md:p-8 text-black shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-black/10 rounded-xl">
              <Star size={20} className="fill-black" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Recommended
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-4 font-outfit">
            The ELITE
            <br />
            Advantage
          </h3>

          <p className="text-black/80 text-sm font-semibold mb-6 leading-relaxed">
            Everything in PRO plus elite entry models, A+ setups, and private
            community.
          </p>

          <ul className="space-y-2.5 mb-6 text-[10px] font-black uppercase tracking-wider">
            {[
              "ELITE Entry Models",
              "Live Strategy Breakdown",
              "+ Exclusive Access",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={eliteEnrolHref}
            className="w-full py-3.5 rounded-xl bg-black text-white font-black tracking-widest uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-black/90 transition-colors"
          >
            Upgrade to ELITE —{" "}
            {getPlanPrices(ELITE_PLAN, couponActive).priceLabel}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {isElite && (
        <div className="rounded-2xl md:rounded-3xl border border-gold-500/25 bg-gold-500/[0.06] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gold-500 flex items-center justify-center text-black shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-white">
                Institutional Enrollment
              </h3>
              <p className="text-gold-500 text-[10px] font-black uppercase tracking-widest">
                Verified Priority Pass
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            You selected ELITE — the most complete path with entry models, A+
            setups, live strategy breakdowns, and private community access.
          </p>
          <div className="flex items-center gap-2 text-gold-500 text-[10px] font-black uppercase tracking-widest">
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            Priority Processing Active
          </div>
        </div>
      )}

      <div className="rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
          Step-by-Step
        </h4>
        <ol className="space-y-5">
          {STEPS.map((item) => (
            <li key={item.step} className="flex gap-3 sm:gap-4">
              <span className="text-gold-500/50 font-black text-base sm:text-lg leading-none shrink-0">
                {item.step}
              </span>
              <span className="text-slate-300 text-sm font-medium leading-relaxed">
                {item.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
