"use client";

import Link from "next/link";
import { Send, Mail } from "lucide-react";

const CONTACT = {
  email: "theelitetraderx@gmail.com",
  telegram: "https://t.me/Elitefuture",
  telegramLabel: "@Elitefuture",
};

const EXPLORE_LINKS = [
  { label: "Courses", href: "/#courses" },
  { label: "Pricing & Plans", href: "/#pricing" },
  { label: "Community", href: "/community" },
  { label: "Live Signals", href: "/signals" },
  { label: "Enrol Now", href: "/enrol" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
  { label: "Log In", href: "/login" },
  { label: "Join", href: "/register" },
];

function openChat() {
  window.dispatchEvent(new Event("open-chat"));
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 relative flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="The Elite Trader Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(212,175,55,0.3)] mix-blend-lighten"
                />
              </div>
              <span className="text-white font-medium text-xl tracking-wide">
                The Elite<span className="text-gold-500 font-light ml-1">Trader</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-6">
              Think smart. Trade wise. Become elite. Structured futures and crypto education —
              Foundation, PRO, and ELITE paths with live signals and a professional trading community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-slate-400 text-xs font-semibold hover:border-gold-500/25 hover:text-gold-400 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-gold-500" />
                {CONTACT.telegramLabel}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-slate-400 text-xs font-semibold hover:border-gold-500/25 hover:text-gold-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.25em] mb-6 font-outfit">
              Explore
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold-500 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.25em] mb-6 font-outfit">
              Company
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold-500 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openChat}
                  className="hover:text-gold-500 transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-slate-600 text-[10px] uppercase tracking-widest font-medium text-center sm:text-left">
              © {new Date().getFullYear()} The Elite Trader. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest font-bold text-slate-500">
              <Link href="/#contact" className="hover:text-gold-500 transition-colors">
                Support
              </Link>
              <a
                href={`mailto:${CONTACT.email}?subject=Elite Trader enquiry`}
                className="hover:text-gold-500 transition-colors"
              >
                Email Us
              </a>
              <Link href="/enrol" className="hover:text-gold-500 transition-colors">
                Enrol
              </Link>
            </div>
          </div>

          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold text-center">
            Built by{" "}
            <a
              href="https://h2t.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-white transition-colors"
            >
              H2T Technologies
            </a>{" "}
            — <span className="text-slate-600 font-medium italic normal-case">Let&apos;s Create Something Bold</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
