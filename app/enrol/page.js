'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import EnrolHeader from '@/components/enrol/EnrolHeader';
import ProgramHighlights from '@/components/enrol/ProgramHighlights';
import CryptoPayment from '@/components/enrol/CryptoPayment';
import EnrolSidebar from '@/components/enrol/EnrolSidebar';
import PaymentNotificationForm from '@/components/PaymentNotificationForm';
import {
  PLANS,
  ELITE_PLAN,
  SIGNAL_PLANS,
  getPlanPrices,
  getSignalPrices,
  buildEnrolUrl,
} from '@/lib/plans';
import { isValidCoupon, COUPON_STORAGE_KEY } from '@/lib/coupon';

function EnrolContent() {
  const searchParams = useSearchParams();
  const planNameQuery = searchParams.get('plan') || 'ELITE';
  const couponParam = searchParams.get('coupon');

  const isSignals = planNameQuery.toLowerCase().startsWith('signals');
  const selectedPlan = isSignals
    ? SIGNAL_PLANS.find((s) => planNameQuery.includes(s.label)) || SIGNAL_PLANS[0]
    : PLANS.find((p) => planNameQuery.toLowerCase() === p.name.toLowerCase()) ||
      PLANS[2];

  const [couponActive, setCouponActive] = useState(false);

  useEffect(() => {
    const fromUrl = couponParam ? isValidCoupon(couponParam) : false;
    const fromStorage =
      typeof window !== 'undefined' &&
      localStorage.getItem(COUPON_STORAGE_KEY) === 'true';
    setCouponActive(Boolean(fromUrl || fromStorage));
  }, [couponParam]);

  const planPrices = isSignals
    ? getSignalPrices(selectedPlan)
    : getPlanPrices(selectedPlan, couponActive);
  const planPrice = searchParams.get('price') || planPrices.priceLabel;
  const eliteEnrolHref = buildEnrolUrl(
    ELITE_PLAN,
    couponActive,
    couponActive ? couponParam || undefined : ''
  );
  const displayPlanName = isSignals
    ? `${selectedPlan.name} – ${selectedPlan.label}`
    : selectedPlan.name;
  const planFeatures = isSignals
    ? [
        `${selectedPlan.label} access to live trading signals`,
        selectedPlan.description,
      ]
    : selectedPlan.features;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold-500 selection:text-black">
      <div className="absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-gold-600/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10 pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnrolHeader
            displayPlanName={displayPlanName}
            planPrice={planPrice}
            planPrices={planPrices}
            couponActive={couponActive}
            selectedPlan={selectedPlan}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <ProgramHighlights
                displayPlanName={displayPlanName}
                planFeatures={planFeatures}
                selectedPlan={selectedPlan}
              />

              <CryptoPayment selectedPlan={selectedPlan} />

              <PaymentNotificationForm
                planName={displayPlanName}
                planPrice={planPrice}
              />
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <EnrolSidebar
                isSignals={isSignals}
                selectedPlan={selectedPlan}
                couponActive={couponActive}
                eliteEnrolHref={eliteEnrolHref}
                ELITE_PLAN={ELITE_PLAN}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnrolFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gold-500 text-[10px] font-black uppercase tracking-widest">
          Loading enrollment…
        </p>
      </div>
    </div>
  );
}

export default function EnrolPage() {
  return (
    <Suspense fallback={<EnrolFallback />}>
      <EnrolContent />
      <Footer />
    </Suspense>
  );
}
