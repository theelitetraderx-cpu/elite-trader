import { PLANS, SIGNAL_PLANS } from "./plans";
import { PROMO_ALIAS } from "./coupon";

const GREETINGS = /^(hi|hello|hey|good\s*(morning|afternoon|evening)|sup|yo)\b/i;

const PRICING =
  /\b(price|pricing|plan|plans|cost|how much|fee|package|coupon|discount)\b/i;
const FOUNDATION = /\bfoundation\b/i;
const PRO = /\bpro\b/i;
const ELITE = /\belite\b/i;
const SIGNALS = /\bsignal/i;
const CONTACT = /\b(contact|support|help|email|telegram|reach|talk to)\b/i;
const ENROL = /\b(enrol|enroll|join|sign up|register|buy|purchase)\b/i;
const LOGIN = /\b(log ?in|sign ?in|account)\b/i;
const ABOUT = /\b(what is|who are|about|elite trader)\b/i;
const RISK = /\b(risk|stop loss|capital)\b/i;
const FUTURES = /\bfutures?\b/i;
const SPOT = /\bspot\b/i;

function planSummary() {
  const lines = PLANS.map(
    (p) => `• **${p.name}** — $${p.salePrice} (coupon: $${p.listPrice} → $${p.salePrice})`
  );
  const signalLines = SIGNAL_PLANS.map(
    (s) =>
      `• Signals ${s.label} — $${s.salePrice}${s.listPrice > s.salePrice ? ` (was $${s.listPrice})` : ""}`
  );
  return [...lines, ...signalLines].join("\n");
}

export function getBasicChatReply(userMessage: string): string {
  const text = userMessage.trim();
  if (!text) {
    return "Send a message and I'll help with plans, pricing, or getting started.";
  }

  if (GREETINGS.test(text)) {
    return "Hello! Welcome to **The Elite Trader**. I can help with our **Foundation**, **PRO**, and **ELITE** plans, **Signals** pricing, or how to enrol. What would you like to know?";
  }

  if (CONTACT.test(text)) {
    return [
      "Here's how to reach us:",
      "",
      "• **Telegram:** [t.me/Elitefuture](https://t.me/Elitefuture)",
      "• **Email:** theelitetraderx@gmail.com",
      "• **Pricing:** visit the [Pricing section](/#pricing) on this site",
      "",
      "For fastest support, message us on Telegram.",
    ].join("\n");
  }

  if (FOUNDATION.test(text)) {
    const p = PLANS[0];
    return [
      `**${p.name} ($${p.salePrice})** includes:`,
      ...p.features.map((f) => `• ${f}`),
      "",
      `Apply code **${PROMO_ALIAS}** on the pricing page for member pricing.`,
    ].join("\n");
  }

  if (ELITE.test(text)) {
    const p = PLANS[2];
    return [
      `**${p.name} ($${p.salePrice})** — our most complete path:`,
      ...p.features.map((f) => `• ${f}`),
      "",
      "Most traders upgrade to ELITE for entry models, A+ setups, and private community.",
    ].join("\n");
  }

  if (PRO.test(text)) {
    const p = PLANS[1];
    return [
      `**${p.name} ($${p.salePrice})** includes:`,
      ...p.features.map((f) => `• ${f}`),
      "",
      "Upgrade to **ELITE ($499)** for entry models and exclusive community access.",
    ].join("\n");
  }

  if (SIGNALS.test(text)) {
    return [
      "**Signals** (standalone access):",
      ...SIGNAL_PLANS.map(
        (s) =>
          `• ${s.label} — **$${s.salePrice}**${s.listPrice > s.salePrice ? ` ~~$${s.listPrice}~~` : ""}`
      ),
      "",
      "See our [Signals page](/signals) for standalone packages.",
    ].join("\n");
  }

  if (PRICING.test(text)) {
    return [
      "Here are our current plans (use coupon on site for member rates):",
      "",
      planSummary(),
      "",
      `Code: **${PROMO_ALIAS}**`,
      "",
      "[View pricing](/#pricing) · [Enrol](/enrol)",
    ].join("\n");
  }

  if (ENROL.test(text)) {
    return [
      "To enrol:",
      "",
      "1. Go to **[Pricing](/#pricing)** and pick Foundation, PRO, or ELITE",
      "2. Apply code **" + PROMO_ALIAS + "** for member pricing",
      "3. Click **Enrol** and complete USDT payment on the enrolment page",
      "",
      "Need help? Contact us on [Telegram](https://t.me/Elitefuture).",
    ].join("\n");
  }

  if (LOGIN.test(text)) {
    return "Log in at **/login** with your email and password. New here? [Create an account](/register) first, then enrol from the [pricing page](/#pricing).";
  }

  if (ABOUT.test(text)) {
    return "**The Elite Trader** teaches crypto and futures trading — from spot basics to elite setups and live signals. We offer structured courses (Foundation → PRO → ELITE) plus standalone Signals packages.";
  }

  if (RISK.test(text)) {
    return "Risk management is core to our **Foundation** plan. We teach position sizing, discipline, and protecting capital before chasing profits. Never risk more than you can afford to lose.";
  }

  if (FUTURES.test(text)) {
    return "**Futures trading** is covered in our **PRO** and **ELITE** plans — including leverage concepts, trade planning, and live signals. Foundation focuses on spot and basics first.";
  }

  if (SPOT.test(text)) {
    return "**SPOT trading** and Binance setup are part of **Foundation ($49)** — the best place to start if you're new to crypto markets.";
  }

  return [
    "I'm the Elite Trader assistant. I can help with:",
    "",
    "• **Plans & pricing** (Foundation, PRO, ELITE, Signals)",
    "• **How to enrol** and coupon codes",
    "• **Contact** via Telegram or email",
    "• Basic **trading** topics (spot, futures, risk)",
    "",
    "Try asking: *\"What plans do you offer?\"* or *\"How do I contact support?\"*",
  ].join("\n");
}
