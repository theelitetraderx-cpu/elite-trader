'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  RefreshCcw,
  Hash,
  ShieldCheck,
  Search,
  Layout
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function PaymentsSection({ user }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchUserPayments = async () => {
    if (!user?.email) {
      console.warn('No user email found for fetching payments');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching payments:', error);
        throw error;
      }
      setPayments(data || []);
    } catch (err) {
      console.error('Catch block error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPayments();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Rejected': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Verified': return <CheckCircle2 size={12} />;
      case 'Rejected': return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-gold-500/50">
        <div className="w-10 h-10 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold uppercase tracking-widest">Loading History...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard size={20} className="text-gold-500" />
            Payment Status
          </h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">History of your program enrollments</p>
        </div>
        
        <button 
          onClick={fetchUserPayments}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white"
        >
          <RefreshCcw size={14} />
          Refresh
        </button>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-16 text-center">
          <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Layout size={24} className="text-slate-600" />
          </div>
          <h4 className="text-white font-bold mb-2">No Enrollment History</h4>
          <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">You haven't submitted any payment notifications yet. Ready to start your elite journey?</p>
          <a 
            href="/#pricing" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/10"
          >
            Choose a Plan
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {payments.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all overflow-hidden"
              >
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl pointer-events-none group-hover:bg-gold-500/10 transition-colors" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-gold-500 shadow-inner">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-white uppercase tracking-tight">{p.plan_name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${getStatusColor(p.status)}`}>
                          {getStatusIcon(p.status)}
                          {p.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        <span>{new Date(p.created_at).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                        <span>{p.network}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div className="text-xl font-bold text-white">${p.amount}</div>
                    <div className="flex items-center gap-2">
                       <code className="text-[9px] text-slate-600 bg-black/40 px-2 py-1 rounded truncate max-w-[120px]">{p.tx_hash}</code>
                       <a 
                         href={`https://bscscan.com/tx/${p.tx_hash}`} 
                         target="_blank" 
                         className="p-1.5 bg-white/5 rounded-lg hover:text-gold-500 hover:bg-white/10 transition-all text-slate-500"
                         title="View on Explorer"
                       >
                         <ExternalLink size={12} />
                       </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div className="mt-8 p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-start gap-4">
            <Clock className="text-gold-500/40 shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">
              Verification usually takes <span className="text-gold-500/60">1-12 hours</span>. If your status hasn't changed after 24 hours, please contact support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
