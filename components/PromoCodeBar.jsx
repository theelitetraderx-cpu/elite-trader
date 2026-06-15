"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import { PROMO_ALIAS } from "@/lib/coupon";

export default function PromoCodeBar({ className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_ALIAS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = PROMO_ALIAS;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

  return (
    <div
      className={`mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:px-6 sm:py-5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(212,175,55,0.15)] ${className}`}
    >
      <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-slate-300 text-center sm:text-left">
        For the best deal use code:{" "}
        <span className="text-white font-black tracking-[0.2em]">{PROMO_ALIAS}</span>
        <span className="hidden sm:inline text-slate-500 font-semibold normal-case tracking-normal">
          {" "}
          — apply at enrolment
        </span>
      </p>

      <button
        type="button"
        onClick={handleCopy}
        className={`shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          copied
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
            : "bg-gold-500 text-black hover:bg-gold-400 shadow-[0_0_16px_rgba(212,175,55,0.25)]"
        }`}
      >
        {copied ? <Check size={14} /> : <Clipboard size={14} />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
