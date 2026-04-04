'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Link as LinkIcon, Mail, ShieldCheck } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function PaymentNotificationForm({ planName, planPrice }) {
  const [formData, setFormData] = useState({
    email: '',
    amount: planPrice?.replace(/[^0-9.]/g, '') || '',
    network: 'USDT (BEP-20)',
    txHash: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        setFormData(prev => ({ ...prev, email: session.user.email || '' }));
      }
    }
    getSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMessage('');

    if (!formData.txHash || formData.txHash.length < 10) {
      setErrorMessage('Please enter a valid Transaction Hash.');
      setLoading(false);
      setStatus('error');
      return;
    }

    try {
      const { error } = await supabase
        .from('payments')
        .insert([
          {
            email: formData.email,
            user_id: userId,
            plan_name: planName,
            amount: parseFloat(formData.amount),
            network: formData.network,
            tx_hash: formData.txHash,
            status: 'Pending'
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ ...formData, txHash: '' }); // Clear txhash on success
    } catch (err) {
      console.error('Error submitting payment:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
          <ShieldCheck className="text-gold-500" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Confirm Your Payment</h2>
          <p className="text-slate-500 text-sm">Notify the admin after you've sent the crypto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Network Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Network Used</label>
            <select
              value={formData.network}
              onChange={(e) => setFormData({ ...formData, network: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-gold-500/50 transition-colors appearance-none"
            >
              <option value="USDT (BEP-20)">USDT (BEP-20) - Binance Smart Chain</option>
              <option value="USDT (ERC-20)">USDT (ERC-20) - Ethereum</option>
              <option value="USDT (TRC-20)">USDT (TRC-20) - Tron</option>
            </select>
          </div>
        </div>

        {/* Amount & TX Hash */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Amount Paid ($)</label>
            <input
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Transaction Hash (TxID)</label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                required
                value={formData.txHash}
                onChange={(e) => setFormData({ ...formData, txHash: e.target.value })}
                placeholder="Paste transaction hash here..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                title="Your unique transaction ID on the blockchain"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-sm uppercase tracking-widest transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''} flex items-center justify-center gap-2`}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Send size={18} />
              Submit Details
            </>
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-green-400 text-sm flex items-center gap-3"
            >
              <CheckCircle size={20} className="shrink-0" />
              <p>Payment details submitted successfully! The admin will verify your transaction shortly.</p>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm flex items-center gap-3"
            >
              <AlertCircle size={20} className="shrink-0" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
