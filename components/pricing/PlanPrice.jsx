"use client";

import { usePricing } from "./PricingProvider";
import { getPlanPrices } from "@/lib/plans";

export default function PlanPrice({ plan, size = "md" }) {
  const { getPrices } = usePricing();
  const prices = getPrices(plan);
  const memberLabel = getPlanPrices(plan, true).priceLabel;

  const priceClass =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-2xl" : "text-3xl";

  return (
    <div className="text-right">
      <div className="flex items-baseline justify-end gap-1">
        <span className={`${priceClass} font-black text-white font-outfit`}>
          {prices.priceLabel}
        </span>
        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          / {plan.period}
        </span>
      </div>
      <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">
        {memberLabel} w/ code at enrol
      </p>
    </div>
  );
}
