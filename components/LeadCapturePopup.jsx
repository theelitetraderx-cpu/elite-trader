"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Loader2, CheckCircle, Sparkles } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";
import { getErrorMessage } from "@/lib/getErrorMessage";

const HIDDEN_PATHS = ["/login", "/register", "/enrol", "/dashboard"];
const STORAGE_KEY = "elite-lead-submitted";
const DISMISS_KEY = "elite-lead-popup-dismissed";

export default function LeadCapturePopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailNote, setEmailNote] = useState("");

  useEffect(() => {
    if (HIDDEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
      return;
    }

    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "true") return;
    if (sessionStorage.getItem(DISMISS_KEY) === "true") return;
    if (localStorage.getItem("isLoggedIn") === "true") return;

    const timer = window.setTimeout(() => setIsOpen(true), 8000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailNote("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "popup",
          pageUrl: window.location.href,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not submit your details.");
      }

      setSuccess(true);
      localStorage.setItem(STORAGE_KEY, "true");

      if (result.sandboxCopy) {
        setEmailNote(
          `Confirmation email sent to ${result.deliveredTo} (Resend test mode).`
        );
      } else if (result.warning) {
        setEmailNote(result.warning);
      }

      window.setTimeout(() => {
        setIsOpen(false);
      }, 2800);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (HIDDEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", damping: 28, stiffness: 360 }}
          className="fixed bottom-6 left-4 sm:left-6 z-[90] w-[calc(100vw-2rem)] max-w-[360px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
            <div className="absolute -top-16 -right-10 w-32 h-32 bg-gold-600/15 rounded-full blur-3xl pointer-events-none" />

            <button
              type="button"
              onClick={closePopup}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5 relative z-10">
              {success ? (
                <div className="py-6 text-center">
                  <CheckCircle className="w-10 h-10 text-gold-500 mx-auto mb-3" />
                  <h3 className="text-white font-bold text-lg mb-2">You&apos;re on the list!</h3>
                  <p className="text-slate-400 text-sm">
                    Check your Gmail for a confirmation. Our team will reach out soon.
                  </p>
                  {emailNote ? (
                    <p className="text-amber-400/80 text-[11px] mt-3 leading-relaxed">{emailNote}</p>
                  ) : null}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1 pr-8">
                    <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500">
                      Free Consultation
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1 pr-6 font-outfit">
                    Get plan details &amp; pricing
                  </h3>
                  <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                    Leave your details and we&apos;ll email you the best path for your trading goals.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={2}
                        placeholder="Full name"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/40"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Gmail / email address"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/40"
                      />
                    </div>

                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      label="Phone"
                      required
                    />

                    {error ? (
                      <p className="text-red-400 text-xs leading-relaxed">{error}</p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-gold-500 text-black text-xs font-black uppercase tracking-widest hover:bg-gold-400 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send My Details"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={closePopup}
                      className="w-full text-[10px] text-slate-600 hover:text-slate-400 transition-colors"
                    >
                      Not now
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
