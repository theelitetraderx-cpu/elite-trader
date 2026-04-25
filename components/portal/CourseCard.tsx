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
  
  // Status Logic
  let status = "Not Started";
  if (completedLessons > 0) {
    status = completedLessons === totalLessons ? "Completed" : "In Progress";
  }

  const cardClasses = "relative group block h-full bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all overflow-hidden flex flex-col rounded-xl";

  return (
    <Link href={`/portal/course/${id}`} className={cardClasses}>
      
      {/* Thumbnail - Simplified */}
      <div className="w-full aspect-video bg-black/50 overflow-hidden relative border-b border-white/5">
        {!hasAccess && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-all border border-white/10 m-2 rounded-lg">
             <Lock className="text-white/20 w-6 h-6 mb-2" />
             <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Enrollment Required</span>
          </div>
        )}
        
        {hasAccess && (
           <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs">
              <div className="bg-white/10 p-4 rounded-full border border-white/20 backdrop-blur-md">
                  <PlayCircle className="w-6 h-6 text-white" />
              </div>
           </div>
        )}

        {/* Status Tag */}
        <div className="absolute top-4 right-4 z-20">
           <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-md border ${
              status === "Completed" ? "bg-green-500/10 border-green-500/20 text-green-500" :
              status === "In Progress" ? "bg-gold-500/10 border-gold-500/20 text-gold-500" :
              "bg-white/5 border-white/10 text-slate-500"
           }`}>
              {status}
           </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-500 transition-colors uppercase tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-1 mb-6 flex-1 italic">
          {description}
        </p>

        {/* LMS Metrics */}
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span>{completedLessons}/{totalLessons} Lessons</span>
                <span>{Math.round(progressPercentage)}%</span>
            </div>
            
            {/* Thin Progress Bar */}
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${status === 'Completed' ? 'bg-green-500' : 'bg-gold-500'}`}
                />
            </div>

            <div className="pt-4 flex items-center justify-between">
                <span className="text-[10px] font-black text-gold-500 uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    {status === "Not Started" ? "Start Course" : "Continue Course"} <PlayCircle size={12} />
                </span>
            </div>
        </div>
      </div>
    </Link>
  );
}

