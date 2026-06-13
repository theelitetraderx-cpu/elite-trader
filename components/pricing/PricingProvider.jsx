"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  COUPON_CODE_STORAGE_KEY,
  COUPON_STORAGE_KEY,
  isValidCoupon,
  PROMO_CODE,
} from "@/lib/coupon";
import {
  buildEnrolUrl,
  getPlanPrices,
  PLANS,
} from "@/lib/plans";

const PricingContext = createContext(null);

export function PricingProvider({ children }) {
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const applied = localStorage.getItem(COUPON_STORAGE_KEY) === "true";
    const savedCode = localStorage.getItem(COUPON_CODE_STORAGE_KEY) || "";
    setCouponApplied(applied);
    setCouponCode(savedCode);
    setHydrated(true);
  }, []);

  const applyCoupon = useCallback((code) => {
    if (!isValidCoupon(code)) {
      return { ok: false, message: "Invalid coupon code. Please try again." };
    }
    const normalized = code.trim().toUpperCase();
    setCouponApplied(true);
    setCouponCode(normalized);
    localStorage.setItem(COUPON_STORAGE_KEY, "true");
    localStorage.setItem(COUPON_CODE_STORAGE_KEY, normalized);
    return { ok: true, message: "Coupon applied — member pricing unlocked." };
  }, []);

  const clearCoupon = useCallback(() => {
    setCouponApplied(false);
    setCouponCode("");
    localStorage.removeItem(COUPON_STORAGE_KEY);
    localStorage.removeItem(COUPON_CODE_STORAGE_KEY);
  }, []);

  const getPrices = useCallback(
    (plan) => getPlanPrices(plan, couponApplied),
    [couponApplied]
  );

  const getEnrolHref = useCallback(
    (plan) =>
      buildEnrolUrl(plan, couponApplied, couponApplied ? couponCode || PROMO_CODE : ""),
    [couponApplied, couponCode]
  );

  const value = useMemo(
    () => ({
      plans: PLANS,
      couponApplied,
      couponCode,
      promoCode: PROMO_CODE,
      hydrated,
      applyCoupon,
      clearCoupon,
      getPrices,
      getEnrolHref,
    }),
    [
      couponApplied,
      couponCode,
      hydrated,
      applyCoupon,
      clearCoupon,
      getPrices,
      getEnrolHref,
    ]
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
