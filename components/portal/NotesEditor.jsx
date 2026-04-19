"use client";

import { useState, useEffect } from "react";
import { Edit3, Save, RefreshCw, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient();

export default function NotesEditor({ lessonId, userId }) {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Fetch existing notes on mount
  useEffect(() => {
    function fetchNotes() {
      if (!userId || !lessonId) return;
      
      // Changed to localStorage to prevent Supabase 404s while DB is empty
      const localKey = `elite_notes_${userId}_${lessonId}`;
      const savedNote = localStorage.getItem(localKey);
      
      if (savedNote) {
         try {
            const data = JSON.parse(savedNote);
            setContent(data.content || "");
            setLastSaved(new Date(data.updated_at));
         } catch(e) {
            console.error("Local storage note parse error", e);
         }
      }
    }
    fetchNotes();
  }, [lessonId, userId]);

  // Debounced Auto-Save
  useEffect(() => {
    const timer = setTimeout(() => {
       if (content === "" && !lastSaved) return; // Don't auto-save initial empty state
       saveNotes(content);
    }, 2000); // 2 second debounce
    
    return () => clearTimeout(timer);
  }, [content]);

  const saveNotes = async (textToSave) => {
     if (!userId || !lessonId) return;
     setIsSaving(true);
     
     try {
         // Temporarily save to localStorage instead of Supabase to prevent 404s
         const localKey = `elite_notes_${userId}_${lessonId}`;
         localStorage.setItem(localKey, JSON.stringify({
            content: textToSave,
            updated_at: new Date().toISOString()
         }));
         setLastSaved(new Date());
     } catch (e) {
         console.error(e);
     } finally {
         setIsSaving(false);
     }
  };

  return (
    <div className={`flex flex-col bg-[#050505] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'h-[500px] lg:h-full pb-[0]' : 'h-14'}`}>
      {/* Header */}
      <div 
         className="bg-white/[0.02] border-b border-white/5 p-4 flex items-center justify-between cursor-pointer select-none"
         onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm">
           <Edit3 size={16} className="text-gold-500" /> Lesson Notes
        </div>
        
        <div className="flex items-center gap-4">
           <AnimatePresence>
             {isSaving ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black">
                   <RefreshCw size={12} className="animate-spin" /> Saving...
                </motion.div>
             ) : lastSaved ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center gap-2 text-[10px] text-green-500 uppercase font-black tracking-widest">
                   <CheckCircle2 size={12} /> Saved {lastSaved.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </motion.div>
             ) : null}
           </AnimatePresence>
           
           <button className="text-slate-400 hover:text-white transition-colors">
              {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
           </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className={`flex-1 overflow-hidden transition-opacity duration-300 ${isExpanded ? 'opacity-100 flex p-4' : 'opacity-0 hidden'}`}>
         <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Jot down key takeaways, timestamps, and strategies from this lesson..."
            className="w-full h-full bg-transparent text-slate-300 resize-none outline-none text-sm leading-relaxed custom-scrollbar selection:bg-gold-500/30 font-mono"
            autoComplete="off"
            spellCheck="false"
         />
      </div>
    </div>
  );
}
