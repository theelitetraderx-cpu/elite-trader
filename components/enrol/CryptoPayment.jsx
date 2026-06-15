"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Globe, ShieldCheck, AlertTriangle } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

const BEP20_ADDRESS = "0xA2903438B84541d933be5b8188237682a89F4E29";
const BEP20_NETWORK = "USDT (BEP-20)";
const BEP20_CHAIN = "BNB Smart Chain (BEP-20)";

export default function CryptoPayment({ selectedPlan }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BEP20_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = BEP20_ADDRESS;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (copyError) {
        console.error("Copy failed:", copyError);
      }
    }
  };

  return (
    <section className="rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 md:p-8">
      <div className="flex items-start gap-3 mb-6 md:mb-8">
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
          <Globe className="text-gold-500" size={18} />
        </div>
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
            Cryptocurrency Payment
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Send USDT on BNB Smart Chain (BEP-20) only
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto">
        <BorderGlow
          borderRadius={20}
          backgroundColor="#0a0a0a"
          glowColor={selectedPlan.glowColor || "43 74 49"}
          colors={selectedPlan.colors || ["#d4af37", "#ffd700", "#b8860b"]}
          glowIntensity={0.6}
          className="border border-white/5"
        >
          <div className="flex flex-col items-center p-6 sm:p-8">
            <p className="text-xs sm:text-sm font-bold mb-1 tracking-wider uppercase text-[#F3BA2F]">
              {BEP20_NETWORK}
            </p>
            <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest text-center mb-5">
              Network: {BEP20_CHAIN}
            </p>

            <div className="bg-white p-3 rounded-xl mb-5 shadow-lg shadow-black/20">
              <QRCodeSVG value={BEP20_ADDRESS} size={180} level="H" />
            </div>

            <div className="w-full rounded-xl bg-black/50 border border-white/10 p-4 mb-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 text-center">
                Receiving Address
              </p>
              <p className="text-[11px] sm:text-xs text-white font-mono text-center break-all leading-relaxed">
                {BEP20_ADDRESS}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className={`w-full py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                copied
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:border-gold-500/40 hover:text-gold-400"
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </div>
        </BorderGlow>
      </div>

      <div className="mt-6 md:mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
        <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={16} />
        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
          <span className="text-amber-400 font-black uppercase tracking-wider">
            BEP-20 only:
          </span>{" "}
          Send <strong className="text-white">USDT on BNB Smart Chain (BEP-20)</strong> only.
          Do not use ERC-20 (Ethereum) or TRC-20 (Tron) — funds sent on the wrong network may be
          permanently lost. After payment, submit your details below.
        </p>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 flex items-start gap-3">
        <ShieldCheck className="text-gold-400 shrink-0 mt-0.5" size={16} />
        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
          <span className="text-gold-400 font-black uppercase tracking-wider">
            Note:
          </span>{" "}
          Double-check your wallet shows <strong className="text-slate-300">BNB Chain</strong> or{" "}
          <strong className="text-slate-300">BEP-20</strong> before confirming the transfer.
        </p>
      </div>
    </section>
  );
}
