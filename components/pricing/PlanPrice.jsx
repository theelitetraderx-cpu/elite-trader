"use client";

import { usePricing } from "./PricingProvider";

export default function PlanPrice({ plan, size = "md" }) {
  const { getPrices } = usePricing();
  const prices = getPrices(plan);

  const priceClass =
    size === "lg"
      ? "text-3xl"
      : size === "sm"
        ? "text-2xl"
        : "text-3xl";

  return (
    <div className="text-right">
      {prices.showStrike && (
        <div className="text-[10px] font-black text-red-500 uppercase tracking-widest line-through decoration-red-500 decoration-2 mb-0.5 opacity-90">
          {prices.listLabel}
        </div>
      )}
      <div className="flex items-baseline justify-end gap-1">
        <span className={`${priceClass} font-black text-white font-outfit`}>
          {prices.priceLabel}
        </span>
        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          / {plan.period}
        </span>
      </div>
      {!prices.showStrike && (
        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">
          Apply coupon to save
        </p>
      )}
    </div>
  );
}
