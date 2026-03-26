'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import PhoneInput from '@/components/PhoneInput';

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const supabase = createClient();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+91 ',
    password: '',
    confirmPassword: ''
  });
  
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
            phone_number: formData.phone
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        // Successfully signed up
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('auth-change'));
        router.push('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.host.includes('localhost') ? 'http://' : 'https://'}${window.location.host}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080808]">

      {/* ─── LEFT PANEL ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden bg-black">
        {/* Ambient gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10" />
        <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black to-transparent z-10" />

        {/* Logo */}
        <div className="relative z-20 flex flex-col items-center mix-blend-screen">
          <Image
            src="/elite-logo.png"
            alt="Elite Trader Logo"
            width={300}
            height={300}
            className="object-contain"
            priority
          />
          <div className="mt-8 text-center">
            <p className="text-gold-400 text-xs tracking-[0.4em] uppercase font-semibold opacity-80">
              Precision Trading. Consistent Profits.
            </p>
            <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
          </div>
        </div>

        {/* Testimonial card */}
        <div className="absolute bottom-10 z-20 max-w-xs mx-auto px-8">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-slate-300 text-sm leading-relaxed italic mb-4">
              &ldquo;Elite Trader completely changed how I approach the markets. Disciplined, structured, profitable.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-black font-bold text-xs">H</div>
              <div>
                <div className="text-white text-xs font-semibold">Harish</div>
                <div className="text-slate-500 text-[10px]">Pro Master Member</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold-400 text-xs">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL ─── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 bg-[#080808] relative overflow-y-auto py-12">
        {/* Subtle top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        {/* Mobile logo */}
        <div className="lg:hidden flex justify-center mb-10 mix-blend-screen">
          <Image src="/elite-logo.png" alt="Elite Trader" width={100} height={100} className="object-contain" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold mb-3">Join The Elite</p>
          <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
            Create your<br />account
          </h1>
          <p className="mt-3 text-slate-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="John"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/60 focus:bg-white/[0.05] transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Doe"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/60 focus:bg-white/[0.05] transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="you@example.com"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/60 focus:bg-white/[0.05] transition-all text-sm"
            />
          </div>

          {/* Phone Number */}
          <PhoneInput 
            value={formData.phone}
            onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
            required={true}
          />

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Min. 8 characters"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/60 focus:bg-white/[0.05] transition-all text-sm pr-12"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-gold-400 transition-colors">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Re-enter password"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/60 focus:bg-white/[0.05] transition-all text-sm pr-12"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-gold-400 transition-colors">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-1">
            <input id="terms" type="checkbox" className="w-4 h-4 mt-0.5 rounded border border-white/10 bg-white/5 accent-gold-500 cursor-pointer flex-shrink-0" />
            <label htmlFor="terms" className="text-sm text-slate-400 cursor-pointer select-none leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-2">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-2">Privacy Policy</a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-1 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#080808] px-4 text-xs text-slate-600">or sign up with</span>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 text-white text-sm font-medium transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-600">
          © 2025 Elite Trader. All rights reserved.
        </p>
      </div>
    </div>
  );
}
