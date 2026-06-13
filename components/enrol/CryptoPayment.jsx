"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Globe, ShieldCheck } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

const CRYPTO_NETWORKS = [
  {
    network: "USDT (BEP-20)",
    address: "0xBE12Ed2f8A8650393D912b55e18A70c32189b148",
    type: "Binance Smart Chain",
    color: "#F3BA2F",
  },
  {
    network: "USDT (ERC-20)",
    address: "0xBE12Ed2f8A8650393D912b55e18A70c32189b148",
    type: "Ethereum Network",
    color: "#627EEA",
  },
  {
    network: "USDT (TRC-20)",
    address: "T9zwe28th6ZPHNPJvuFwgUG2b5j6gw9eVs",
    type: "Tron Network",
    color: "#FF0013",
  },
];

export default function CryptoPayment({ selectedPlan }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = async (address, network) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(network);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = address;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(network);
        setTimeout(() => setCopied(null), 2000);
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
            Send USDT to any of the verified addresses below
          </p>
        </div>
      </div>

      {/* Mobile: horizontal scroll · Desktop: 3-column grid */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-1 px-1 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 md:gap-5">
        {CRYPTO_NETWORKS.map((crypto) => (
          <div
            key={crypto.network}
            className="min-w-[260px] sm:min-w-[280px] md:min-w-0 snap-center flex-1"
          >
            <BorderGlow
              borderRadius={20}
              backgroundColor="#0a0a0a"
              glowColor={selectedPlan.glowColor || "43 74 49"}
              colors={selectedPlan.colors || ["#d4af37", "#ffd700", "#b8860b"]}
              glowIntensity={0.5}
              className="border border-white/5 h-full"
            >
              <div className="flex flex-col items-center p-5 sm:p-6">
                <p
                  className="text-xs sm:text-sm font-bold mb-4 tracking-wider uppercase"
                  style={{ color: crypto.color }}
                >
                  {crypto.network}
                </p>

                <div className="bg-white p-2 rounded-xl mb-5 shadow-lg shadow-black/20">
                  <QRCodeSVG value={crypto.address} size={140} level="H" />
                </div>

                <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest text-center mb-3">
                  Network: {crypto.type}
                </p>

                <button
                  type="button"
                  onClick={() => handleCopy(crypto.address, crypto.network)}
                  className={`w-full py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    copied === crypto.network
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:border-gold-500/40 hover:text-gold-400"
                  }`}
                >
                  {copied === crypto.network ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                  {copied === crypto.network ? "Copied!" : "Copy Address"}
                </button>
              </div>
            </BorderGlow>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 flex items-start gap-3">
        <ShieldCheck className="text-gold-400 shrink-0 mt-0.5" size={16} />
        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
          <span className="text-gold-400 font-black uppercase tracking-wider">
            Note:
          </span>{" "}
          Please ensure you select the correct network in your wallet before
          sending funds. Incorrect network transfers may result in permanent loss
          of funds. After payment, submit your details below.
        </p>
      </div>
    </section>
  );
}
