"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { getOAuthRedirectUrl } from "@/lib/auth/session";
import { createClient } from "@/utils/supabase/client";
import AuthShell, {
  AuthBrand,
  AuthInput,
  AuthPasswordInput,
  AuthSubmitButton,
  AuthSocialButtons,
  AuthFooter,
} from "@/components/auth/AuthShell";
import { completeClientSignIn } from "@/lib/auth/afterAuth";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient();
  const router = useRouter();
  const configReady = hasSupabaseConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configReady) {
      setError("Authentication is not configured. Please contact support.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Sign in failed. Please try again.");
      }

      const { data } = payload;

      if (data?.session?.user) {
        await completeClientSignIn(data.session);
        router.refresh();
        router.push("/dashboard");
        return;
      }

      setError("Sign in failed. Please try again.");
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err, "An error occurred during sign in."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!configReady) {
      setError("Authentication is not configured. Please contact support.");
      return;
    }

    setError(null);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getOAuthRedirectUrl("/dashboard"),
        },
      });
      if (oauthError) throw oauthError;
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err, "Google sign-in failed. Please try again."));
    }
  };

  return (
    <AuthShell>
      <AuthBrand />

      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-1.5">
        Welcome <span className="text-[#d4af37]">Back</span>
      </h1>
      <p className="text-slate-500 text-xs sm:text-sm text-center mb-5 leading-relaxed">
        Access your trading dashboard, courses, and elite community.
      </p>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {!configReady && (
        <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm text-center">
          Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthInput
          label="Email Address"
          icon={User}
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />

        <AuthPasswordInput
          label="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          show={showPass}
          onToggle={() => setShowPass(!showPass)}
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-[#0c0c0c] accent-[#d4af37]"
            />
            <span className="text-xs text-slate-400">Remember me</span>
          </label>
          <Link
            href="#"
            className="text-xs text-[#d4af37] hover:text-[#e8c96a] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthSubmitButton loading={loading}>Sign In</AuthSubmitButton>

        <AuthSocialButtons onGoogle={handleGoogleLogin} />
      </form>

      <AuthFooter
        prompt="New to The Elite Trader?"
        linkHref="/register"
        linkText="Create Account"
      />
    </AuthShell>
  );
}
