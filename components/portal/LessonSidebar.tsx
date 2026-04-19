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
    <div className="h-full flex flex-col pt-20 lg:pt-0">
      <div className="p-6 border-b border-white/5">
         <Link href="/portal" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-6">
            <ChevronLeft size={16} /> Back to Portal
         </Link>
         {course ? (
             <h2 className="text-xl font-bold text-white leading-tight">{course.title}</h2>
         ) : (
             <h2 className="text-xl font-bold text-white leading-tight">Portal Menu</h2>
         )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
        <Link 
            href="/portal"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === "/portal" ? "bg-white/10 text-white font-semibold" : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
        >
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">My Courses</span>
        </Link>
        
        {course && (
            <div className="pt-6 pb-2 px-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-2">Lessons</p>
                <div className="space-y-1 mt-3">
                    {course.lessons.map((lesson, idx) => {
                       const isActive = pathname.includes(`/portal/lesson/${lesson.id}`);
                       const hasAccess = !lesson.is_locked || isPaid;
                       
                       return (
                         <Link 
                            key={lesson.id}
                            href={`/portal/lesson/${lesson.id}`}
                            onClick={handleLinkClick}
                            className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                                isActive 
                                ? "bg-gradient-to-r from-gold-500/20 to-transparent border border-gold-500/20 text-white" 
                                : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                            }`}
                         >
                            <div className="mt-0.5">
                               {lesson.completed ? (
                                  <CheckCircle size={16} className="text-gold-500" />
                               ) : !hasAccess ? (
                                  <Lock size={16} className="text-slate-600" />
                               ) : (
                                  <PlayCircle size={16} className={isActive ? "text-gold-500" : "text-slate-500 group-hover:text-white"} />
                               )}
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                                  {idx + 1}. {lesson.title}
                                </p>
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
