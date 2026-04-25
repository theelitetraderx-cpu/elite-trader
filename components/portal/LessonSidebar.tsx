"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlayCircle, CheckCircle, Lock, LayoutDashboard, ChevronLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Lesson {
  id: string;
  title: string;
  is_locked: boolean;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface LessonSidebarProps {
  course: Course | null;
  isPaid: boolean;
}

export default function LessonSidebar({ course, isPaid }: LessonSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle for mobile
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when a lesson is clicked on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const navContent = (
    <div className="h-full flex flex-col pt-20 lg:pt-0 bg-[#050505]">
      <div className="p-8 border-b border-white/5">
         <div className="flex flex-col gap-4">
            <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors flex items-center gap-2">
               <ChevronLeft size={14} /> Exit Portal
            </Link>
            {course ? (
                <h2 className="text-lg font-black text-white uppercase tracking-tighter leading-tight">{course.title}</h2>
            ) : (
                <h2 className="text-lg font-black text-white uppercase tracking-tighter leading-tight">Elite Curriculum</h2>
            )}
         </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-2">
        <Link 
            href="/portal"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                pathname === "/portal" ? "bg-white/5 text-white font-bold border border-white/10" : "text-slate-500 hover:text-white"
            }`}
        >
            <LayoutDashboard size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">My Courses</span>
        </Link>

        <button 
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 w-full cursor-not-allowed opacity-50"
        >
            <CheckCircle size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Your Progress</span>
        </button>
        
        {course && (
            <div className="pt-8 space-y-4">
                <p className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-700">Course Content</p>
                <div className="space-y-1">
                    {course.lessons.map((lesson, idx) => {
                       const isActive = pathname.includes(`/portal/lesson/${lesson.id}`);
                       const hasAccess = !lesson.is_locked || isPaid;
                       
                       return (
                         <Link 
                            key={lesson.id}
                            href={`/portal/lesson/${lesson.id}`}
                            onClick={handleLinkClick}
                            className={`group flex items-start gap-4 p-4 rounded-lg transition-all ${
                                isActive 
                                ? "bg-white/5 border border-white/10 text-white" 
                                : "text-slate-500 hover:text-white border border-transparent"
                            }`}
                         >
                            <div className="mt-0.5 opacity-40">
                               {lesson.completed ? (
                                  <CheckCircle size={14} className="text-green-500" />
                               ) : !hasAccess ? (
                                  <Lock size={14} />
                               ) : (
                                  <PlayCircle size={14} />
                               )}
                            </div>
                            <div>
                                <p className={`text-[11px] font-bold uppercase tracking-tight leading-snug ${isActive ? 'text-white' : ''}`}>
                                  {lesson.title}
                                </p>
                                <span className="text-[9px] font-medium text-slate-600 block mt-1">Module {idx + 1}</span>
                            </div>
                         </Link>
                       )
                    })}
                </div>
            </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4">
         <div className="font-bold uppercase tracking-widest text-white text-sm">EliteTrader Portal</div>
         <button onClick={toggleSidebar} className="p-2 text-white bg-white/5 rounded-lg border border-white/10">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 h-screen fixed left-0 top-0 bg-black/95 border-r border-white/5 z-30">
        {navContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
           <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
               initial={{ x: "-100%" }}
               animate={{ x: 0 }}
               exit={{ x: "-100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="lg:hidden fixed top-0 left-0 w-[280px] h-screen bg-black/95 border-r border-gold-500/20 z-50 shadow-2xl"
            >
               {navContent}
            </motion.div>
           </>
        )}
      </AnimatePresence>
    </>
  );
}
