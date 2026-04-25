"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Send, Image as ImageIcon, Loader2, ShieldAlert, CheckCircle2, Trash2, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AnnouncementsSection({ user, profile }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const isAdmin = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"].includes(user?.email?.toLowerCase());
  // Access: if admin OR if plan is Elite
  const isElite = profile?.plan === "Elite" || isAdmin;

  useEffect(() => {
    if (isElite) {
      fetchAnnouncements();
    } else {
      setLoading(false);
    }
  }, [isElite]);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('not found')) {
            // Table doesn't exist, handle gracefully
            console.warn("Announcements table not found. Please create it in Supabase.");
            setAnnouncements([]);
        } else {
            throw error;
        }
      } else {
        setAnnouncements(data || []);
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message && !image) return;

    setSending(true);
    try {
      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('announcements')
          .upload(fileName, image);
        
        if (uploadError) throw uploadError;
        imageUrl = supabase.storage.from('announcements').getPublicUrl(fileName).data.publicUrl;
      }

      const { error } = await supabase
        .from('announcements')
        .insert([{
          text: message,
          image_url: imageUrl,
          author_id: user.id
        }]);

      if (error) throw error;

      setMessage("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchAnnouncements();
    } catch (err) {
      alert(`Error sending announcement: ${err.message || JSON.stringify(err)}. Make sure the 'announcements' table and 'announcements' storage bucket exist in Supabase SQL Editor.`);
      console.error("Error sending announcement:", err);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
     if(!confirm("Delete this announcement?")) return;
     try {
       await supabase.from('announcements').delete().eq('id', id);
       fetchAnnouncements();
     } catch (e) {
       console.error(e);
     }
  }

  if (!isElite) {
    return (
      <div className="p-8 h-[500px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mb-6 border border-gold-500/20">
          <ShieldAlert size={40} className="text-gold-500" />
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Elite Access Required</h3>
        <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
          The Announcements channel is exclusively for <span className="text-gold-500 font-bold">Elite Members</span>. Upgrade your plan to receive real-time updates and signals from the admin.
        </p>
        <button 
          onClick={() => window.location.href = '/#pricing'}
          className="px-8 py-4 rounded-2xl bg-gold-500 text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg shadow-gold-500/20"
        >
          Upgrade to Elite
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      
      {/* Admin Broadcast Box */}
      {isAdmin && (
        <div className="p-6 rounded-3xl bg-gold-500/5 border border-gold-500/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Bell size={80} />
           </div>
           <h3 className="text-sm font-black text-gold-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Bell size={14} /> Send Announcement
           </h3>
           <form onSubmit={handleSend} className="space-y-4">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message to the Elite community..."
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-gold-500/50 min-h-[100px] transition-all"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${image ? 'bg-gold-500 text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
                   >
                      <ImageIcon size={14} />
                      {image ? 'Image Selected' : 'Add Image'}
                   </button>
                   <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                   />
                   {image && <span className="text-[10px] text-slate-500 truncate max-w-[100px]">{image.name}</span>}
                </div>
                <button 
                  disabled={sending || (!message && !image)}
                  className="px-6 py-2 rounded-xl bg-gold-500 text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-gold-400 transition-all disabled:opacity-50"
                >
                  {sending ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                  Post Broadcast
                </button>
              </div>
           </form>
        </div>
      )}

      {/* Feed */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           Live Announcements
        </h3>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
             <Loader2 className="animate-spin text-gold-500" size={30} />
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Syncing with server...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl text-center">
             <Bell size={40} className="text-slate-800 mx-auto mb-4" />
             <p className="text-slate-600 text-sm font-medium">No announcements yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((ann, idx) => (
              <motion.div 
                key={ann.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative overflow-hidden group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-black">
                       <ShieldCheck size={20} />
                    </div>
                    <div>
                       <h4 className="text-sm font-black text-white uppercase tracking-tight">System Admin</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {new Date(ann.created_at).toLocaleString()}
                       </p>
                    </div>
                  </div>
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(ann.id)}
                      className="p-2 rounded-lg bg-white/5 text-slate-600 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {ann.text && (
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {ann.text}
                    </p>
                  )}
                  {ann.image_url && (
                    <div className="mt-4 rounded-2xl overflow-hidden border border-white/5 max-w-2xl">
                      <img 
                        src={ann.image_url} 
                        alt="Announcement" 
                        className="w-full h-auto object-contain bg-black/20"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
