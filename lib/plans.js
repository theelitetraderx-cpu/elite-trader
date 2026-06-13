export const PLANS = [
  {
    index: 0,
    name: "Foundation",
    listPrice: 99,
    salePrice: 49,
    target: "Foundation",
    tierLabel: "Foundational",
    description:
      "Crypto basics, Binance setup, spot trading, and the core skills to start trading with discipline.",
    features: [
      "Crypto Basics",
      "Binance Setup",
      "SPOT Trading",
      "Technical Analysis Basics",
      "Risk Management",
      "Trading psychology",
      "Community Access",
    ],
    featured: false,
    glowColor: "43 74 49",
    colors: ["#d4af37", "#ffd700", "#b8860b"],
    period: "LT",
  },
  {
    index: 1,
    name: "PRO",
    listPrice: 349,
    salePrice: 249,
    target: "PRO",
    tierLabel: "Professional",
    description:
      "Everything in Foundation, plus futures trading, advanced analysis, strategy sessions, and live signals.",
    features: [
      "Includes Everything in FOUNDATION",
      "FUTURES Trading",
      "Adv Technical Analysis",
      "Trade planning",
      "Risk to Reward Models",
      "Weekly market Analysis",
      "Strategy sessions",
      "+ LIVE SIGNALS",
    ],
    featured: false,
    glowColor: "43 74 49",
    colors: ["#ffd700", "#d4af37", "#b8860b"],
    period: "LT",
  },
  {
    index: 2,
    name: "ELITE",
    listPrice: 599,
    salePrice: 499,
    target: "ELITE",
    tierLabel: "Institutional",
    description:
      "Everything in PRO, plus elite entry models, A+ setups, private community, and priority support.",
    features: [
      "Includes Everything in PRO",
      "ELITE Entry Models",
      "A+ Trade Setups",
      "Exclusive market insights",
      "LIVE STRATEGY BREAKDOWN",
      "PRIVATE ELITE COMMUNITY",
      "STRATEGY UPDATES",
      "Priority Support",
      "+ Exclusive Access",
    ],
    featured: true,
    glowColor: "43 74 49",
    colors: ["#d4af37", "#ffd700", "#b8860b"],
    period: "LT",
  },
];

export const SIGNAL_PLANS = [
  {
    index: 0,
    name: "Signals",
    label: "1 Month",
    listPrice: 40,
    salePrice: 40,
    period: "1 Mo",
    description: "Live trade signals for one month.",
  },
  {
    index: 1,
    name: "Signals",
    label: "3 Months",
    listPrice: 70,
    salePrice: 70,
    period: "3 Mo",
    description: "Three months of live signals and market updates.",
  },
  {
    index: 2,
    name: "Signals",
    label: "6 Months",
    listPrice: 180,
    salePrice: 180,
    period: "6 Mo",
    description: "Half-year access to signals and strategy alerts.",
  },
  {
    index: 3,
    name: "Signals",
    label: "Lifetime",
    listPrice: 349,
    salePrice: 299,
    period: "LT",
    featured: true,
    description: "Unlimited signals access — best long-term value.",
  },
];

export const ELITE_PLAN = PLANS[2];
export const PRO_PLAN = PLANS[1];

export function formatUsd(amount) {
  return `$${amount}`;
}

export function getPlanPrices(plan, couponApplied) {
  const list = plan.listPrice;
  const sale = plan.salePrice;

  if (couponApplied) {
    return {
      current: sale,
      list,
      showStrike: sale < list,
      priceLabel: formatUsd(sale),
      listLabel: formatUsd(list),
    };
  }

  return {
    current: list,
    list,
    showStrike: false,
    priceLabel: formatUsd(list),
    listLabel: formatUsd(list),
  };
}

/** Signals lifetime always shows $349 → $299 */
export function getSignalPrices(plan) {
  const showStrike = plan.salePrice < plan.listPrice;
  return {
    current: plan.salePrice,
    list: plan.listPrice,
    showStrike,
    priceLabel: formatUsd(plan.salePrice),
    listLabel: formatUsd(plan.listPrice),
  };
}

export function parsePlanPrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, ""));
}

export function getUpgradeDelta(fromPlan, couponApplied = true) {
  const from = couponApplied ? fromPlan.salePrice : fromPlan.listPrice;
  const elite = couponApplied ? ELITE_PLAN.salePrice : ELITE_PLAN.listPrice;
  return Math.max(elite - from, 0);
}

export function buildEnrolUrl(plan, couponApplied, couponCode, label) {
  const prices = plan.name === "Signals"
    ? getSignalPrices(plan)
    : getPlanPrices(plan, couponApplied);

  const planName = label ? `${plan.name} - ${label}` : plan.name;

  const params = new URLSearchParams({
    plan: planName,
    price: prices.priceLabel,
  });

  if (couponApplied && couponCode && plan.name !== "Signals") {
    params.set("coupon", couponCode);
  }

  return `/enrol?${params.toString()}`;
}
