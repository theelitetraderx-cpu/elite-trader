"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, MapPin, Edit3, Save, Camera, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function ProfileSection({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.user_metadata?.bio || "Elite trader in the making. Focus: Price Action & Market Structure.");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = fileName; // No avatars/ prefix needed inside the bucket

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;
      
      // Force refresh or update local state if needed
      window.location.reload();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { bio: bio }
    });
    
    if (!error) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
        
        {/* Avatar Area */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 p-1 flex items-center justify-center shadow-2xl shadow-gold-500/20">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gold-500/40" />
                )}
              </div>
            </div>
            <label className="absolute bottom-2 right-2 p-3 rounded-2xl bg-gold-500 text-black hover:bg-gold-400 transition-all shadow-xl group-hover:scale-110 cursor-pointer">
              <Camera size={18} />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              {user?.user_metadata?.first_name || "New Trader"}
            </h3>
            <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[10px] font-black uppercase tracking-widest">
              Elite Member
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="flex-1 space-y-8 w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <Mail size={12} /> Email Address
              </div>
              <div className="text-white font-medium">{user?.email}</div>
            </div>
            
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <Calendar size={12} /> Joined On
              </div>
              <div className="text-white font-medium">{new Date(user?.created_at).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Edit3 size={16} className="text-gold-500" /> Professional Bio
              </h4>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  isEditing ? 'bg-green-500 text-black hover:bg-green-400' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {isEditing ? (
                  <>{loading ? 'Saving...' : 'Save Changes'} <Save size={14} /></>
                ) : (
                  <>'Edit Bio' <Edit3 size={14} /></>
                )}
              </button>
            </div>
            
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-32 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-200 focus:border-gold-500/50 focus:outline-none transition-all resize-none"
                placeholder="Write something about your trading journey..."
              />
            ) : (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-400 italic leading-relaxed">
                "{bio}"
              </div>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-gold-500/5 border border-gold-500/10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="text-white font-bold text-sm uppercase">Verified Member</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-widest">Trust Index: Premium</div>
              </div>
            </div>
            <div className="text-[10px] font-black text-gold-500 uppercase tracking-widest border border-gold-500/30 px-3 py-1.5 rounded-full">
              Identity Verified
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
