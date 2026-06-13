"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-7 h-7 text-red-400" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight font-outfit mb-3">
          Sign-in failed
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          We could not complete authentication. The link may have expired or Google
          sign-in was cancelled. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center py-3 px-6 rounded-xl bg-gold-500 text-black font-bold text-sm hover:bg-gold-400 transition-colors"
          >
            Back to login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center py-3 px-6 rounded-xl border border-white/10 text-white font-bold text-sm hover:border-gold-500/40 transition-colors"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
