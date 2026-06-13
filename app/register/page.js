'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { getAuthErrorMessage } from '@/lib/auth/errors';
import { completeClientSignIn } from '@/lib/auth/afterAuth';
import { hasSupabaseConfig } from '@/lib/supabase/env';
import {
  getEmailConfirmRedirectUrl,
  getOAuthRedirectUrl,
  isPhoneComplete,
} from '@/lib/auth/session';
import { createClient } from '@/utils/supabase/client';
import PhoneInput from '@/components/PhoneInput';
import AuthShell, {
  AuthBrand,
  AuthInput,
  AuthPasswordInput,
  AuthSubmitButton,
  AuthSocialButtons,
  AuthFooter,
} from '@/components/auth/AuthShell';

const MIN_PASSWORD_LENGTH = 8;

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+91 ',
    password: '',
    confirmPassword: '',
  });

  const supabase = createClient();
  const router = useRouter();
  const configReady = hasSupabaseConfig();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!configReady) {
      setError('Authentication is not configured. Please contact support.');
      return;
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isPhoneComplete(formData.phone, 10)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          emailRedirectTo: getEmailConfirmRedirectUrl('/dashboard'),
          userData: {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            phone_number: formData.phone.trim(),
          },
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Registration failed. Please try again.');
      }

      const { data } = payload;

      if (data?.session?.user) {
        await completeClientSignIn(data.session);
        router.refresh();
        router.push('/dashboard');
        return;
      }

      if (data?.user) {
        setSuccess(
          'Account created! Check your email to verify your address, then sign in to access your dashboard.'
        );
        return;
      }

      setError('Registration failed. Please try again.');
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!configReady) {
      setError('Authentication is not configured. Please contact support.');
      return;
    }

    setError(null);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getOAuthRedirectUrl('/dashboard'),
        },
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Google sign-up failed. Please try again.'));
    }
  };

  return (
    <AuthShell imageAlt="Join The Elite Trader">
      <AuthBrand />

      <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-1">
        Join <span className="text-[#d4af37]">Now</span>
      </h1>
      <p className="text-slate-500 text-xs text-center mb-3 leading-relaxed">
        Create your account and start your journey to trading mastery.
      </p>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm text-center">
          {success}{' '}
          <Link href="/login" className="text-[#d4af37] font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      )}

      {!configReady && (
        <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm text-center">
          Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.
        </div>
      )}

      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <AuthInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            placeholder="John"
          />
          <AuthInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            placeholder="Doe"
          />
        </div>

        <AuthInput
          label="Email Address"
          icon={User}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
        />

        <PhoneInput
          value={formData.phone}
          onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))}
          required
        />

        <AuthPasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          show={showPass}
          onToggle={() => setShowPass(!showPass)}
          placeholder="Min. 8 characters"
        />

        <AuthPasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          show={showConfirm}
          onToggle={() => setShowConfirm(!showConfirm)}
          placeholder="Re-enter password"
        />

        <label className="flex items-start gap-2 cursor-pointer select-none pt-1">
          <input
            id="terms"
            type="checkbox"
            required
            className="w-4 h-4 mt-0.5 rounded border-white/20 bg-[#0c0c0c] accent-[#d4af37] shrink-0"
          />
          <span className="text-xs text-slate-500 leading-relaxed">
            I agree to the{' '}
            <Link href="#" className="text-[#d4af37] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-[#d4af37] hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <AuthSubmitButton loading={loading}>Join Now</AuthSubmitButton>

        <AuthSocialButtons onGoogle={handleGoogleLogin} />
      </form>

      <AuthFooter
        prompt="Already have an account?"
        linkHref="/login"
        linkText="Sign In"
      />
    </AuthShell>
  );
}
