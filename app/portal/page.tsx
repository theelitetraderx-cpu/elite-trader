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
import Image from "next/image";

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
    <div className="flex h-screen overflow-hidden bg-[#050505] text-slate-300">
      <LessonSidebar course={null} isPaid={isPaid} />
      
      <main className="flex-1 lg:ml-80 h-full overflow-y-auto custom-scrollbar relative">
         {/* Minimal Top Header */}
         <div className="h-16" /> {/* Spacer for the fixed global navbar */}

         {!isAuthorized ? (
            <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 text-center">
               <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                  <ShieldCheck className="text-white/20" size={32} />
               </div>
               <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Elite Access Required</h2>
               <p className="text-slate-500 max-w-sm mb-10 text-sm leading-relaxed font-medium">
                  The Elite Trader Learning Portal is currently restricted. 
                  Please confirm your enrollment or contact your administrator.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">
                     Back to Dashboard
                  </Link>
               </div>
            </div>
         ) : (
            <div className="max-w-6xl mx-auto px-8 py-16">
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16 pb-12 border-b border-white/5"
               >
                  <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-3">
                     Your Learning Dashboard
                  </h1>
                  <p className="text-slate-500 text-sm font-medium">
                     Continue your trading programs and track your progress.
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
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

