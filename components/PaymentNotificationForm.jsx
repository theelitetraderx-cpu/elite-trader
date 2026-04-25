'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Link as LinkIcon, Mail, ShieldCheck, Phone, Upload, FileText } from 'lucide-react';
import PhoneInput from './PhoneInput';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function PaymentNotificationForm({ planName, planPrice }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    aadhaar: '',
    pan: '',
    amount: planPrice?.replace(/[^0-9.]/g, '') || '',
    network: 'USDT (BEP-20)',
    proof: null
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const isIndia = formData.phone.startsWith('+91');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, proof: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMessage('');

    if (!formData.proof) {
      setErrorMessage('Please upload a payment proof (screenshot or receipt).');
      setLoading(false);
      setStatus('error');
      return;
    }

    // Basic Validation for Indian users
    if (isIndia) {
        if (formData.aadhaar.length !== 12) {
            setErrorMessage('Aadhaar Number must be exactly 12 digits.');
            setLoading(false);
            setStatus('error');
            return;
        }
        if (formData.pan.length !== 10) {
            setErrorMessage('PAN Number must be exactly 10 characters.');
            setLoading(false);
            setStatus('error');
            return;
        }
    }

    try {
      const data = new FormData();
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("amount", `$${formData.amount}`);
      data.append("plan", planName);
      data.append("network", formData.network);
      data.append("attachment", formData.proof);
      
      console.log("Submitting data:", formData);

      // 1. Save to Supabase pending_users table
      const { data: insertedData, error: dbError } = await supabase
        .from('pending_users')
        .insert([{
          name: formData.email.split('@')[0], // Fallback name
          email: formData.email,
          phone: formData.phone,
          amount: `$${formData.amount}`,
          plan_name: planName,
          payment_id: formData.network, 
          aadhaar: isIndia ? formData.aadhaar : null,
          pan: isIndia ? formData.pan.toUpperCase() : null,
          status: 'pending'
        }]);

      if (dbError) {
        console.error('❌ DB Error:', dbError);
        throw new Error(dbError.message); // 🔥 STOP HERE
      }

      console.log('✅ Inserted Record:', insertedData);

      // 2. Send email notification (Only if DB succeeded)
      console.log("Sending admin email notification...");
      const response = await fetch("/api/notify-admin", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Email notification sent successfully");
        setStatus('success');
        setFormData({
          ...formData,
          phone: '',
          aadhaar: '',
          pan: '',
          proof: null
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        throw new Error(result.error || 'Email notification failed');
      }
    } catch (err) {
      console.error('❌ Submission Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
          <ShieldCheck className="text-gold-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Confirm Payment</h2>
          <p className="text-slate-500 text-sm font-medium">Capture your transaction details for verification</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-gold-500/50 focus:bg-black/60 transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <PhoneInput 
              label="Phone Number"
              required
              value={formData.phone}
              onChange={(val) => setFormData({ ...formData, phone: val })}
            />
          </div>
        </div>

        {/* Indian Specific Fields */}
        <AnimatePresence>
            {isIndia && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                >
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-500 uppercase tracking-[0.2em] ml-1">Aadhaar Number (Indian Only)</label>
                        <input
                            type="text"
                            required={isIndia}
                            maxLength={12}
                            value={formData.aadhaar}
                            onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '') })}
                            placeholder="0000 0000 0000"
                            className="w-full bg-black/40 border border-gold-500/20 rounded-2xl py-4 px-4 text-sm text-white focus:outline-none focus:border-gold-500/50 focus:bg-black/60 transition-all font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-500 uppercase tracking-[0.2em] ml-1">PAN Card Number (Indian Only)</label>
                        <input
                            type="text"
                            required={isIndia}
                            maxLength={10}
                            value={formData.pan}
                            onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                            placeholder="ABCDE1234F"
                            className="w-full bg-black/40 border border-gold-500/20 rounded-2xl py-4 px-4 text-sm text-white focus:outline-none focus:border-gold-500/50 focus:bg-black/60 transition-all font-mono uppercase"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Amount Paid ($)</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 font-bold">$</span>
                <input
                    type="number"
                    required
                    name="amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gold-500/50 focus:bg-black/60 transition-all font-mono"
                />
            </div>
          </div>

          {/* Proof Upload */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Payment Proof (Screenshot)</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer group flex items-center gap-3 w-full bg-black/40 border ${formData.proof ? 'border-gold-500/50' : 'border-white/5 border-dashed'} rounded-2xl py-4 px-4 text-sm transition-all hover:bg-black/60 hover:border-white/20`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.proof ? 'bg-gold-500/10 text-gold-500' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}>
                {formData.proof ? <FileText size={16} /> : <Upload size={16} />}
              </div>
              <span className={`text-sm truncate w-full ${formData.proof ? 'text-white font-medium' : 'text-slate-500'}`}>
                {formData.proof ? formData.proof.name : 'Upload receipt or screenshot'}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Network Selection (Keep as helpful context) */}
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Network Used</label>
            <select
                value={formData.network}
                onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white focus:outline-none focus:border-gold-500/50 focus:bg-black/60 transition-all appearance-none cursor-pointer"
            >
                <option value="USDT (BEP-20)">USDT (BEP-20) - Binance Smart Chain</option>
                <option value="USDT (ERC-20)">USDT (ERC-20) - Ethereum</option>
                <option value="USDT (TRC-20)">USDT (TRC-20) - Tron</option>
                <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-black font-black text-sm uppercase tracking-[0.15em] transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'} flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.15)]`}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Send size={18} />
              Submit For Verification
            </>
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-green-400 text-sm flex items-start gap-4"
            >
              <CheckCircle size={24} className="shrink-0 mt-0.5" />
              <div>
                 <p className="font-bold text-white mb-1">Details Received</p>
                 <p className="text-green-400/80">Your notification has been sent to the admin. Verification usually takes 1-6 hours.</p>
              </div>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-red-400 text-sm flex items-start gap-4"
            >
              <AlertCircle size={24} className="shrink-0 mt-0.5" />
              <div>
                 <p className="font-bold text-white mb-1">Submission Error</p>
                 <p className="text-red-400/80">{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
