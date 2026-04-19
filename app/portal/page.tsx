"use client";

import { useEffect, useState } from "react";
import LessonSidebar from "@/components/portal/LessonSidebar";
import CourseCard from "@/components/portal/CourseCard";
import CourseSkeleton from "@/components/portal/CourseSkeleton";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { usePortal } from "@/components/portal/PortalProvider";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const supabase = createClient();

export default function PortalPage() {
  const { isPaid, isAuthorized, loading: authLoading, user } = usePortal();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      
      try {
        const { data: dbCourses, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbCourses && dbCourses.length > 0) {
          // Fetch lesson counts for all courses at once
          const { data: lessonCounts } = await supabase
            .from('lessons')
            .select('course_id');

          const countsMap: Record<string, number> = {};
          lessonCounts?.forEach(l => {
            countsMap[l.course_id] = (countsMap[l.course_id] || 0) + 1;
          });

          // Fetch user progress for these courses
          const { data: progressData } = await supabase
            .from('lesson_progress')
            .select('lesson_id')
            .eq('user_id', user?.id || '');
          
          const completedSet = new Set(progressData?.map(p => p.lesson_id) || []);

          setCourses(dbCourses.map(c => ({
            ...c,
            total_lessons: countsMap[c.id] || 0,
            completed_lessons: Array.from(completedSet).length // This is a rough estimation per user, ideally filtered by course
          })));
        } else {
          // Fallback Mock Data if table is empty
          setCourses([
             {
                id: "c1",
                title: "Futures Trading Masterclass",
                description: "Learn precision entries and exits using advanced order flow and volume profile.",
                is_locked: false,
                plan_type: "basic",
                total_lessons: 4,
                completed_lessons: 0
             },
             {
                id: "c2",
                title: "Crypto Scalping Strategies",
                description: "High frequency setups for volatile cryptocurrency pairs.",
                is_locked: true,
                plan_type: "premium",
                total_lessons: 8,
                completed_lessons: 0
             },
             {
                id: "c3",
                title: "Market Psychology & Risk",
                description: "Protecting your capital and cultivating a sniper mindset.",
                is_locked: true,
                plan_type: "premium",
                total_lessons: 5,
                completed_lessons: 0
             }
          ]);
        }
      } catch (e) {
         console.error(e);
      } finally {
         setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <LessonSidebar course={null} isPaid={isPaid} />
      
      <main className="flex-1 lg:ml-80 h-full overflow-y-auto custom-scrollbar relative pt-16 lg:pt-0">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

         {!isAuthorized ? (
            <div className="h-full flex flex-col items-center justify-center px-6 text-center">
               <div className="w-24 h-24 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                    <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
                       <ShieldCheck className="text-black" size={24} />
                    </div>
                  </motion.div>
               </div>
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Elite Access <span className="text-gold-500">Required</span></h2>
               <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
                  The Elite Trader Learning Portal is currently in Early Access for founding members. 
                  Contact support or purchase a plan to unlock the full institutional curriculum.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/enrol" className="px-8 py-4 rounded-xl bg-gold-500 text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                     View All Programs
                  </Link>
                  <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                     Back to Dashboard
                  </Link>
               </div>
            </div>
         ) : (
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
               >
                  <div>
                     <h1 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        Elite<span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600"> Academy</span>
                     </h1>
                     <p className="text-slate-400 max-w-2xl text-lg">
                        Master the markets with our comprehensive trading curriculum. Select a course to continue your journey.
                     </p>
                  </div>
                  
                  <div className="px-6 py-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 font-black uppercase tracking-widest text-sm flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
                     Pro Dashboard
                  </div>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loading ? (
                      <>
                          <CourseSkeleton />
                          <CourseSkeleton />
                          <CourseSkeleton />
                      </>
                  ) : (
                      courses.map((course, idx) => (
                          <motion.div
                              key={course.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                          >
                              <CourseCard
                                  id={course.id}
                                  title={course.title}
                                  description={course.description}
                                  isLocked={course.is_locked}
                                  isPaid={isPaid}
                                  planType={course.plan_type}
                                  completedLessons={course.completed_lessons}
                                  totalLessons={course.total_lessons}
                              />
                          </motion.div>
                      ))
                  )}
               </div>
            </div>
         )}
      </main>
    </div>
  );
}
