"use client";

import { useEffect, useState } from "react";
import LessonSidebar from "@/components/portal/LessonSidebar";
import CourseCard from "@/components/portal/CourseCard";
import CourseSkeleton from "@/components/portal/CourseSkeleton";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { usePortal } from "@/components/portal/PortalProvider";

const supabase = createClient();

export default function PortalPage() {
  const { isPaid, loading: authLoading } = usePortal();
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
          setCourses(dbCourses.map(c => ({
            ...c,
            // Calculate completed lessons if needed, or leave at 0 for now
            total_lessons: 0, // Should come from a join or separate query
            completed_lessons: 0
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
      </main>
    </div>
  );
}
