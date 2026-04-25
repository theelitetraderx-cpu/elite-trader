import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserPlus, MessageCircle, MoreVertical, ShieldCheck, Zap } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function FriendsSection({ user }) {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('users')
          .select('*')
          .limit(20);

        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        
        const mappedUsers = data.map(profile => ({
          id: profile.id,
          name: profile.name || profile.email?.split('@')[0] || "Trader",
          role: "Elite Trader",
          status: profile.status || "Active",
          avatar: `https://ui-avatars.com/api/?name=${profile.name || 'User'}&background=d4af37&color=000`,
          active: true
        }));

        setFriends(mappedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, user?.id]);

  const filteredFriends = friends; // Already filtered by SQL query

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      
      {/* Search & Add */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Search friends by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-200 focus:border-gold-500/50 focus:outline-none transition-all"
          />
        </div>
        <button className="px-6 py-3 rounded-2xl bg-gold-500 text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">
          <UserPlus size={18} /> Add Friend
        </button>
      </div>

      {/* Friends List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredFriends.map((friend) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl p-0.5 ${friend.active ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-white/10'}`}>
                    <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-2xl object-cover bg-black" />
                  </div>
                  {friend.active && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white uppercase tracking-tight text-[13px]">{friend.name}</h4>
                    {friend.id === 2 && <ShieldCheck size={14} className="text-gold-500" />}
                  </div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 mt-0.5">
                    <Zap size={10} className="text-gold-500" /> {friend.role}
                  </div>
                  <div className={`text-[9px] font-black uppercase tracking-widest mt-2 ${friend.active ? 'text-green-500' : 'text-slate-600'}`}>
                    {friend.status}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={() => alert(`Messaging ${friend.name} - Coming Soon!`)}
                  className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <MessageCircle size={18} />
                </button>
                <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10">
                  <MoreVertical size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFriends.length === 0 && (
        <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
          <p className="text-slate-500 font-medium">No friends found. Start expanding your network!</p>
        </div>
      )}

    </div>
  );
}
