"use client";

import Link from "next/link";
import { Lock, PlayCircle, CheckCircle, Crown } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  isPaid: boolean;
  planType?: string; // "basic" | "premium"
  completedLessons: number;
  totalLessons: number;
}

export default function CourseCard({
  id,
  title,
  description,
  isLocked,
  isPaid,
  planType,
  completedLessons,
  totalLessons,
}: CourseCardProps) {
  const hasAccess = !isLocked || isPaid;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  const cardClasses = "relative group block h-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-5 hover:bg-white/[0.02] hover:border-gold-500/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all overflow-hidden flex flex-col";

  return (
    <Link href={`/portal/course/${id}`} className={cardClasses}>
      
      {/* Premium Tag Overlay */}
      {planType === 'premium' && (
         <div className="absolute top-8 left-8 z-20 px-3 py-1 bg-gradient-to-r from-gold-500 to-gold-700 text-black text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-gold-500/20 backdrop-blur-md">
            <Crown size={12} /> Premium
         </div>
      )}

      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Thumbnail */}
      <div className="w-full aspect-video bg-[#050505] rounded-2xl mb-6 overflow-hidden relative border border-white/5 group-hover:border-gold-500/20 transition-colors">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
           <div className={`w-32 h-32 rounded-full blur-[80px] transition-all group-hover:scale-150 ${hasAccess ? 'bg-gold-500' : 'bg-slate-500'}`} />
        </div>
        
        {!hasAccess && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-10 transition-all rounded-2xl border border-white/10 m-1">
             <Lock className="text-white/50 w-8 h-8 mb-2" />
             <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Locked Content</span>
          </div>
        )}
        
        {hasAccess && (
           <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm rounded-2xl m-1 border border-gold-500/30">
              <motion.div whileHover={{scale: 1.1}} className="bg-gold-500 text-black p-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <PlayCircle className="w-8 h-8 ml-1" />
              </motion.div>
           </div>
        )}
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-500 transition-colors uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-1">
          {description}
        </p>

        {/* Access vs Progress */}
        <div className="pt-5 border-t border-white/10 flex items-center justify-between mt-auto">
            {hasAccess ? (
                <div className="w-full">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        <span>Course Progress</span>
                        <span className={progressPercentage === 100 ? "text-gold-500" : "text-white"}>
                            {progressPercentage === 100 ? (
                                <span className="flex items-center gap-1"><CheckCircle size={12}/> Completed</span>
                            ) : (
                                `${completedLessons}/${totalLessons > 0 ? totalLessons : '?'} Lessons`
                            )}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-gold-500 to-gold-400 relative"
                        >
                            <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex items-center justify-between">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                       <Lock size={14} /> VIP Access Only
                   </div>
                   <span className="text-[10px] font-black bg-white/5 px-3 py-1.5 rounded-lg text-white uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors">
                      Upgrade
                   </span>
                </div>
            )}
        </div>
      </div>
    </Link>
  );
}
