"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";

export function AuthBrand() {
  return (
    <div className="flex flex-col items-center text-center mb-4">
      <img
        src="/logo.png"
        alt="The Elite Trader"
        className="auth-logo-full w-[min(130px,36vw)] h-auto"
        draggable={false}
      />
      <p className="mt-2 text-[#d4af37]/70 text-[10px] uppercase tracking-[0.25em]">
        Discipline • Strategy • Freedom
      </p>
    </div>
  );
}

export function AuthInput({ label, icon: Icon, type = "text", className = "", ...props }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            size={18}
          />
        )}
        <input
          type={type}
          className={`w-full bg-[#0c0c0c] border border-white/10 rounded-xl py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]/50 transition-colors ${
            Icon ? "pl-11 pr-4" : "px-4"
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}

export function AuthPasswordInput({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder = "Enter your password",
  required = true,
  name = "password",
}) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <div className="relative">
        <Lock
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          size={18}
        />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#d4af37] transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export function AuthSubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full mt-2 py-3.5 rounded-xl bg-gradient-to-b from-[#e8c96a] via-[#d4af37] to-[#a88620] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(212,175,55,0.3)] border border-[#f5e6a8]/25 transition-all hover:brightness-105 ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          {children}
          <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}

export function AuthSocialButtons({ onGoogle }) {
  return (
    <>
      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black px-3 text-xs text-slate-500">
            Or continue with
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          void Promise.resolve(onGoogle?.()).catch((error) => {
            console.error("Google sign-in failed:", error);
          });
        }}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#0c0c0c] border border-white/10 hover:border-white/20 transition-colors text-white text-sm"
        aria-label="Continue with Google"
      >
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>
    </>
  );
}

export default function AuthShell({ children, imageAlt = "Elite Trader workspace" }) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <div className="auth-page-root fixed inset-0 z-20 flex flex-col lg:flex-row bg-black overflow-hidden">
      {/* Form panel — scrollable so long forms show the submit button */}
      <div className="w-full lg:w-1/2 h-full min-h-0 flex flex-col order-2 lg:order-1">
        <div className="auth-form-scroll flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-[400px] mx-auto px-6 sm:px-8 lg:px-12 py-5 lg:py-6 pb-10">
            {children}
          </div>
        </div>
      </div>

      {/* Image panel — full height right */}
      <div className="hidden lg:block lg:w-1/2 relative h-full order-2 overflow-hidden">
        <Image
          src="/auth-desk.png"
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 lg:bg-gradient-to-l lg:from-black/50 lg:via-black/15 lg:to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#d4af37]/20" aria-hidden />
      </div>

      {/* Mobile: background only (no extra height block) */}
      <div className="lg:hidden absolute inset-0 -z-10">
        <Image
          src="/auth-desk.png"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>
    </div>
  );
}

export function AuthFooter({ prompt, linkHref, linkText }) {
  return (
    <>
      <p className="mt-3 text-center text-sm text-slate-500">
        {prompt}{" "}
        <Link
          href={linkHref}
          className="text-[#d4af37] font-semibold hover:text-[#e8c96a] transition-colors"
        >
          {linkText}
        </Link>
      </p>
      <p className="mt-2 flex items-center justify-center gap-2 text-[11px] text-slate-600">
        <Shield size={14} className="text-slate-500 shrink-0" />
        Your data is secure and encrypted
      </p>
    </>
  );
}
