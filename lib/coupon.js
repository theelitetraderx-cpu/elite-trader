/** Site-wide promo — apply at enrolment checkout for member pricing */
export const PROMO_CODE = "TRDM9KQ2";
/** Display / shorthand alias users can enter at checkout */
export const PROMO_ALIAS = "ELITE";

export function normalizeCouponCode(code) {
  return String(code ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

export function isValidCoupon(code) {
  const normalized = normalizeCouponCode(code);
  return normalized === PROMO_CODE || normalized === PROMO_ALIAS;
}

/** @deprecated pricing page no longer stores coupons — use enrol session keys */
export const COUPON_STORAGE_KEY = "elite_coupon_applied";
/** @deprecated */
export const COUPON_CODE_STORAGE_KEY = "elite_coupon_code";

/** Enrol page only — session scoped */
export const ENROL_COUPON_SESSION_KEY = "elite_enrol_coupon_applied";
export const ENROL_COUPON_CODE_SESSION_KEY = "elite_enrol_coupon_code";
