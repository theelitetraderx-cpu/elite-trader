"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, UserPlus, XCircle, CheckCircle, Mail, Phone, Calendar, CreditCard, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function PendingUsersPage() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const allowedAdmins = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
      
      if (!user || !allowedAdmins.includes(user.email?.toLowerCase() || "")) {
        router.push("/dashboard");
        return;
      }
      setIsAdmin(true);
      refreshData();
    };

    checkAdmin();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
        fetchPendingUsers(),
        fetchApprovedUsers()
    ]);
    setLoading(false);
  };

  const fetchPendingUsers = async () => {
    const { data, error } = await supabase
      .from('pending_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setPendingUsers(data || []);
  };

  const fetchApprovedUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setApprovedUsers(data || []);
  };

  const handleApprove = async (userId: string) => {
    const originalPending = [...pendingUsers];
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    setActionLoading(userId);
    try {
      const response = await fetch("/api/admin/approve-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingUserId: userId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        let errorMsg = "Approval failed";
        try {
            const errorJson = JSON.parse(errorText);
            errorMsg = errorJson.error || errorMsg;
        } catch (e) {}
        alert(errorMsg);
        setPendingUsers(originalPending); // Rollback
        return;
      }

      const result = await response.json();
      
      // Update UI instantly and fetch the fresh history
      await fetchApprovedUsers();
      
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Network error or server is down");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId: string) => {
    // Optimistic Update
    const originalPending = [...pendingUsers];
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    setActionLoading(userId);
    try {
      const response = await fetch("/api/admin/approve-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingUserId: userId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        alert("Rejection failed");
        setPendingUsers(originalPending); // Rollback
        return;
      }

      // Success already handled by optimistic update
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("Network error or server is down");
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                <ShieldCheck className="text-gold-500" size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500/80">Admin Nexus</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">
              Verify <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Access Requests</span>
            </h1>
            <p className="text-slate-500 mt-4 max-w-md font-medium">Verify payment proofs and authorize new institutional traders.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[140px]">
              <div className="text-2xl font-black text-gold-500">{pendingUsers.length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Awaiting Review</div>
            </div>
          </div>
        </div>

        {/* Section 1: Pending Users */}
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-gold-500 rounded-full" />
                <h2 className="text-xl font-black uppercase tracking-widest text-white/90">Pending Queue</h2>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            {loading && pendingUsers.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fetching Records...</p>
                </div>
            ) : pendingUsers.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-center px-6">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <CheckCircle className="text-slate-700" size={40} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-2">Queue Clear</h2>
                <p className="text-slate-500 max-w-xs mx-auto">All pending registrations have been processed.</p>
                </div>
            ) : (
                <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-white/5">
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Applicant Info</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Payment Details</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Verification Info</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Submitted</th>
                        <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                    <AnimatePresence>
                        {pendingUsers.map((user: any) => (
                        <motion.tr 
                            key={user.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="group hover:bg-white/[0.02] transition-all"
                        >
                            <td className="px-6 py-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/5 flex items-center justify-center border border-gold-500/20 text-gold-500 font-black">
                                {user.name.charAt(0)}
                                </div>
                                <div>
                                <div className="font-bold text-white text-sm">{user.name}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                                    <Mail size={12} />
                                    {user.email}
                                </div>
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-6">
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-black text-gold-500">{user.amount || '$0.00'}</div>
                                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter flex items-center gap-1">
                                    <CreditCard size={10} />
                                    {user.payment_id || 'Transfer'}
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-6" >
                            <div className="space-y-1">
                                {user.pan && (
                                    <div className="text-[10px] font-bold text-slate-400 font-mono">PAN: {user.pan}</div>
                                )}
                                {user.phone && (
                                    <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                                        <Phone size={10} /> {user.phone}
                                    </div>
                                )}
                            </div>
                            </td>
                            <td className="px-6 py-6">
                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                                <Calendar size={14} />
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                            </td>
                            <td className="px-6 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <button 
                                    onClick={() => handleReject(user.id)}
                                    disabled={!!actionLoading}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all disabled:opacity-50"
                                >
                                    <XCircle size={20} />
                                </button>
                                <button 
                                    onClick={() => handleApprove(user.id)}
                                    disabled={!!actionLoading}
                                    className="h-10 px-4 rounded-xl bg-gold-500 text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)] disabled:opacity-50"
                                >
                                    {actionLoading === user.id ? (
                                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <UserPlus size={16} />
                                            Approve
                                        </>
                                    )}
                                </button>
                            </div>
                            </td>
                        </motion.tr>
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
                </div>
            )}
            </div>
        </div>

        {/* Section 2: Approved User History */}
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                    <h2 className="text-xl font-black uppercase tracking-widest text-white/90">Approved History</h2>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Approved: {approvedUsers.length}</p>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                {approvedUsers.length === 0 ? (
                    <div className="py-24 flex flex-col items-center justify-center text-center px-6 opacity-30">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No history found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Trader ID</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Name / Email</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                                    <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Approved On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {approvedUsers.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-white/[0.01] transition-all">
                                        <td className="px-6 py-6">
                                            <div className="font-mono text-gold-500 font-bold text-xs">{user.user_code}</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div>
                                                <div className="font-bold text-white text-sm">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="text-slate-500 text-xs">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 p-4 rounded-2xl bg-gold-500/5 border border-gold-500/10 flex items-start gap-4">
          <ShieldAlert className="text-gold-500 shrink-0" size={20} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gold-500/80 mb-1">Administrative Security</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Approval actions are permanent and will automatically generate institutional credentials and send credential emails via Resend. Rejection will permanently delete the application record.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
