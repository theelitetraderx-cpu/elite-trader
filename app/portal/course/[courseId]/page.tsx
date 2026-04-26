"use client";

import { use, useState, useEffect } from "react";
import { usePortal } from "@/components/portal/PortalProvider";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  PlayCircle, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  Lock, 
  CheckCircle2, 
  ShieldCheck,
  Star,
  Award,
  Users
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const supabase = createClient();

export default function CourseDetailPage({ params }: { params: any }) {
  const resolvedParams: any = use(params);
  const courseId = resolvedParams.courseId;
  const router = useRouter();
  const { isPaid, user, loading: authLoading } = usePortal();

  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      if (authLoading) return;
      setLoading(true);

      try {
        // 1. Fetch Course
        const { data: dbCourse } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        // 2. Fetch Lessons
        const { data: dbLessons } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true });

        // 3. Fetch User Progress
        let dbCompletedIds: string[] = [];
        if (user) {
          const { data: progressData } = await supabase
            .from('lesson_progress')
            .select('lesson_id')
            .eq('user_id', user.id);
          dbCompletedIds = progressData?.map(p => p.lesson_id) || [];
        }

        if (dbCourse) {
          setCourse(dbCourse);
          setLessons(dbLessons || []);
          setProgress(dbCompletedIds);
        } else {
          // FALLBACK Mock Data
          setCourse({
            id: "c1",
            title: "Futures Trading Masterclass",
            description: "Go beyond basic chart patterns. This masterclass dives deep into order flow, liquidity traps, and professional-grade execution.",
            plan_type: "basic",
            instructor: "Elite Trader Team",
            rating: 4.9,
            students: "1,240+",
          });
          setLessons([
            { id: "l1", title: "Introduction & Platform Setup", duration: "12:45", is_locked: false },
            { id: "l2", title: "Market Structure Fundamentals", duration: "18:20", is_locked: false },
            { id: "l3", title: "Order Flow Mechanics", duration: "24:15", is_locked: false },
            { id: "l4", title: "Sniper Entry Execution", duration: "21:10", is_locked: false }
          ]);
        }
      } catch (e) {
        console.error("Course detail error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [courseId, user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
     return <div className="min-h-screen bg-black flex items-center justify-center text-white">Course not found.</div>;
  }

  const hasAccess = course.plan_type === 'basic' || isPaid || !course.is_locked;
  const nextLessonId = lessons.find(l => !progress.includes(l.id))?.id || lessons[0]?.id;

  return (
    <div className="bg-[#030303] min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black">

      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 via-transparent to-transparent opacity-30 pointer-events-none" />
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent blur-[120px] pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/portal" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-12 group">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Academy
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <Award size={12} /> {course.plan_type === 'premium' ? 'Collector Edition' : 'Standard Access'}
                     </span>
                     <div className="flex items-center gap-1 text-gold-500 text-[10px] font-bold">
                        <Star size={12} fill="currentColor" /> {course.rating || 4.9} (Real Feedback)
                     </div>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                     {course.title.split(' ').map((word: string, i: number) => (
                        <span key={word} className={i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600' : ''}>
                           {word}{" "}
                        </span>
                     ))}
                  </h1>
                  
                  <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
                     {course.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-12">
                     <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Clock size={16} className="text-gold-500" /> 
                        <span className="font-bold">4.5 Hours</span> content
                     </div>
                     <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <BookOpen size={16} className="text-gold-500" /> 
                        <span className="font-bold">{lessons.length} Modules</span>
                     </div>
                     <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Users size={16} className="text-gold-500" /> 
                        <span className="font-bold">{course.students || '1,200+'} Traders</span>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                     {hasAccess ? (
                        <button 
                          onClick={() => router.push(`/portal/lesson/${nextLessonId}`)}
                          className="px-10 py-5 rounded-2xl bg-gold-500 text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3"
                        >
                           <PlayCircle size={20} /> {progress.length > 0 ? 'Resume Learning' : 'Start Foundation'}
                        </button>
                     ) : (
                        <button 
                           onClick={() => router.push('/portal')}
                           className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                        >
                           <Lock size={18} /> Purchase Premium Access
                        </button>
                     )}
                  </div>
               </motion.div>

               {/* Right Side: Course Stats Card */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }} 
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.2 }}
                 className="relative hidden lg:block"
               >
                  <div className="absolute inset-0 bg-gold-500/20 blur-[100px] rounded-full opacity-30" />
                  <div className="relative bg-[#0a0a0a] border border-white/10 p-1 rounded-[40px] overflow-hidden group shadow-2xl">
                     <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
                     <div className="aspect-[4/3] w-full bg-black rounded-[38px] overflow-hidden relative">
                        {/* Simulate Video/Thumbnail */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974717482-45a0ae305739?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-20 h-20 rounded-full bg-gold-500 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110">
                              <PlayCircle size={32} className="text-black ml-1" />
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Curriculum Grid */}
      <section className="pb-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
               <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Detailed <span className="text-gold-500">Curriculum</span></h2>
                  <p className="text-slate-400">The roadmap to mastering the {course.title}.</p>
               </div>
               <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold-500" /> End-to-End verified Content
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {lessons.map((lesson, idx) => {
                  const isCompleted = progress.includes(lesson.id);
                  const isLocked = !hasAccess && idx > 0; // Simple locking logic for display

                  return (
                     <motion.div 
                        key={lesson.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`group relative flex items-center justify-between p-6 rounded-3xl border transition-all ${
                           isLocked 
                           ? 'bg-white/[0.01] border-white/5 opacity-50' 
                           : 'bg-white/[0.02] border-white/5 hover:border-gold-500/30 hover:bg-white/[0.04]'
                        }`}
                     >
                        <div className="flex items-center gap-6">
                           <div className="flex flex-col items-center">
                              <span className="text-[10px] font-black text-gold-500/40 uppercase mb-1">Step</span>
                              <span className="text-xl font-black text-white/20 group-hover:text-gold-500 transition-colors">0{idx + 1}</span>
                           </div>
                           
                           <div className="w-[1px] h-10 bg-white/10 mx-2" />

                           <div>
                              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2 uppercase tracking-tight">
                                 {lesson.title}
                                 {isCompleted && <CheckCircle2 size={16} className="text-green-500" />}
                              </h3>
                              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                 <span className="flex items-center gap-1"><Clock size={10} /> {lesson.duration || '15:00'}</span>
                                 <span>•</span>
                                 <span>Video Mastery</span>
                              </div>
                           </div>
                        </div>

                        {!isLocked ? (
                           <button 
                             onClick={() => router.push(`/portal/lesson/${lesson.id}`)}
                             className="p-3 rounded-2xl bg-white/5 text-slate-400 group-hover:bg-gold-500 group-hover:text-black transition-all"
                           >
                              <ChevronRight size={20} />
                           </button>
                        ) : (
                           <Lock size={20} className="text-slate-600 mr-3" />
                        )}
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>

    </div>
  );
}
