"use client";

import { useState, useEffect } from "react";
import { Target, Zap, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ComparisonModal from "./ComparisonModal";
import PlanCard from "./pricing/PlanCard";
import { usePricing } from "./pricing/PricingProvider";
import { ELITE_PLAN, getPlanPrices } from "@/lib/plans";

const PLAN_ICONS = [Target, Zap, Star];

export default function Pricing() {
  const { plans, getEnrolHref } = usePricing();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(2);
  const router = useRouter();

  const eliteListPrice = getPlanPrices(ELITE_PLAN, false).priceLabel;
  const eliteMemberPrice = getPlanPrices(ELITE_PLAN, true).priceLabel;

  useEffect(() => {
    const focus = sessionStorage.getItem("pricing_focus_plan");
    const openCompare = sessionStorage.getItem("pricing_open_compare") === "true";
    if (focus !== null) {
      const idx = Number(focus);
      if (!Number.isNaN(idx) && idx >= 0 && idx < plans.length) {
        setSelectedPlanIdx(idx);
        if (openCompare) setModalOpen(true);
      }
      sessionStorage.removeItem("pricing_focus_plan");
      sessionStorage.removeItem("pricing_open_compare");
    }
  }, [plans.length]);

  const openComparison = (idx) => {
    setSelectedPlanIdx(idx);
    setModalOpen(true);
  };

  const handleEnrol = (idx) => {
    const plan = plans[idx];
    if (idx < 2) {
      openComparison(idx);
      return;
    }
    router.push(getEnrolHref(plan));
  };

  return (
    <>
      <section id="pricing" className="bg-black py-24 md:py-32 relative border-t border-white/5 scroll-mt-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="text-gold-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              Professional Funding Path
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-5 uppercase tracking-tighter font-outfit">
              Ready to <span className="text-gold-500">Master</span> the Markets?
            </h2>
            <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed">
              Choose your path below. Enter your member code on the enrolment page to unlock
              discounted pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                planIndex={i}
                icon={PLAN_ICONS[i]}
                isFeatured={plan.featured}
                showEnrol
                onCompare={openComparison}
                onEnrol={handleEnrol}
              />
            ))}
          </div>

          <div className="mt-12 p-6 md:p-8 rounded-3xl border border-gold-500/20 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-500/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-gold-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                Best value
              </p>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-outfit">
                Go ELITE — full program & exclusive access
              </h3>
              <p className="text-slate-400 text-sm mt-2 max-w-lg">
                Everything in PRO plus elite entry models, A+ setups, live strategy breakdowns,
                and private community — {eliteListPrice} list, {eliteMemberPrice} with member code
                at enrolment.
              </p>
            </div>
            <Link
              href={getEnrolHref(ELITE_PLAN)}
              className="shrink-0 inline-flex items-center gap-2 py-4 px-8 rounded-2xl bg-gold-500 text-black font-black uppercase tracking-widest text-[10px] hover:bg-gold-400 shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-colors"
            >
              Get ELITE
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <ComparisonModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialPlanIndex={selectedPlanIdx}
        />
      </section>
    </>
  );
}
