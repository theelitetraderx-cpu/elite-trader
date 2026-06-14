"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { buildEnrolUrl, getPlanPrices, PLANS } from "@/lib/plans";

const PricingContext = createContext(null);

export function PricingProvider({ children }) {
  const getPrices = useCallback((plan) => getPlanPrices(plan, false), []);

  const getEnrolHref = useCallback((plan) => buildEnrolUrl(plan, false, ""), []);

  const value = useMemo(
    () => ({
      plans: PLANS,
      getPrices,
      getEnrolHref,
    }),
    [getPrices, getEnrolHref]
  );

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  );
}

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) {
    throw new Error("usePricing must be used within PricingProvider");
  }
  return ctx;
}
