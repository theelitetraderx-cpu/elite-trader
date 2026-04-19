"use client";

import { use, useState, useEffect } from "react";
import LessonSidebar from "@/components/portal/LessonSidebar";
import SecureVideoPlayer from "@/components/portal/SecureVideoPlayer";
import NotesEditor from "@/components/portal/NotesEditor";
import { Lock, FileText, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePortal } from "@/components/portal/PortalProvider";

export default function LessonPage({ params }: { params: any }) {
  const resolvedParams: any = use(params);
  const lessonId = resolvedParams.lessonId;
  const router = useRouter();
  const { isPaid, user, loading: authLoading } = usePortal();

  // Local state for completed lessons array (Mock DB alternative)
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
     // Load completed lessons from Local Storage on mount
     const localData = localStorage.getItem("elite_completed_lessons");
     if (localData) {
         setCompletedLessons(JSON.parse(localData));
     }
  }, []);

  const markLessonComplete = (id: string) => {
      let newCompleted = [...completedLessons];
      if (!newCompleted.includes(id)) {
         newCompleted.push(id);
         setCompletedLessons(newCompleted);
         localStorage.setItem("elite_completed_lessons", JSON.stringify(newCompleted));
      }
  };

  // Hardcode the Basic Course layout referencing the local MP4 files
  const courseData = {
    id: "c1",
    title: "Futures Trading Masterclass",
    lessons: [
       { id: "l1", title: "Introduction & Platform Setup", is_locked: false, videoUrl: "/community/course videos/lesson-1.mp4", desc: "Setting up your charts and understanding the basic interface.", plan: 'basic' },
       { id: "l2", title: "Market Structure Fundamentals", is_locked: false, videoUrl: "/community/course videos/lesson-2.mp4", desc: "Identifying trends, break of structure, and liquidity grabs.", plan: 'basic' },
       { id: "l3", title: "Order Flow Mechanics", is_locked: false, videoUrl: "/community/course videos/lesson-3.mp4", desc: "Understanding the DOM, footprint charts, and aggressive vs passive buyers.", plan: 'basic' },
       { id: "l4", title: "Sniper Entry Execution", is_locked: false, videoUrl: "/community/course videos/lesson-4.mp4", desc: "Putting it all together to execute high-probability low-risk setups.", plan: 'basic' }
    ]
  };

  // Inject dynamic completed status from local state into the course map
  const hydratedCourseData = {
     ...courseData,
     lessons: courseData.lessons.map(l => ({
        ...l,
        completed: completedLessons.includes(l.id)
     }))
  };

  // Find active and next lesson indices
  const activeIndex = hydratedCourseData.lessons.findIndex(l => l.id === lessonId);
  const activeLesson = hydratedCourseData.lessons[activeIndex] || hydratedCourseData.lessons[0];
  
  // Strict Access Logic
  const hasAccess = activeLesson.plan === 'basic' || isPaid;

  const handleVideoEnded = () => {
     // Mark current completed
     markLessonComplete(activeLesson.id);

     // Check if there is a next lesson
     const nextLesson = hydratedCourseData.lessons[activeIndex + 1];
     if (nextLesson) {
         // Auto-advance
         setTimeout(() => {
             router.push(`/portal/lesson/${nextLesson.id}`);
         }, 1000); // 1 second delay feeling
     }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-gold-500">
        <div className="w-8 h-8 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#030303] min-h-screen text-slate-200 font-sans selection:bg-gold-500 selection:text-black">
      <LessonSidebar course={hydratedCourseData} isPaid={isPaid} />

      <main className="flex-1 lg:ml-80 h-screen overflow-y-auto w-full custom-scrollbar pt-16 lg:pt-0">
        
        <div className="sticky top-0 z-40 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 lg:px-12 flex items-center justify-between">
            <Link href="/portal" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={16} /> Back to Academy
            </Link>
            {isPaid && (
               <div className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  Premium Access
               </div>
            )}
        </div>

        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 xl:px-12 py-8 flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Video Player & Content */}
          <div className="w-full lg:w-[65%] xl:w-[70%] space-y-8 flex flex-col">
              
              <div className="relative rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                 <div className="absolute inset-0 border border-gold-500/20 rounded-3xl pointer-events-none z-20"></div>
                 {hasAccess ? (
                    <div className="aspect-video w-full bg-black">
                       <SecureVideoPlayer 
                          url={activeLesson.videoUrl} 
                          isPaid={isPaid}
                          isLocked={false}
                          userEmail={user?.email || "restricted@elitetrader.com"}
                          onEnded={handleVideoEnded}
                       />
                    </div>
                 ) : (
                    <div className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#050505] to-[#111]">
                       <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                           <Lock className="text-slate-500 w-10 h-10" />
                       </div>
                       <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Restricted Lesson</h2>
                       <p className="text-slate-500 max-w-sm text-center">You must upgrade your plan to unlock this learning module.</p>
                       <button 
                         onClick={() => router.push('/portal')}
                         className="mt-8 px-8 py-4 rounded-xl bg-gold-500 text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                       >
                           View Available Courses
                       </button>
                    </div>
                 )}
              </div>

              {/* Lesson Details */}
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                 
                 <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
                    {activeLesson.title}
                 </h1>
                 <p className="text-slate-400 leading-relaxed mb-8 max-w-3xl">
                    {activeLesson.desc}
                 </p>

                 {/* Mock Resources */}
                 {hasAccess && (
                    <div className="pt-8 border-t border-white/10">
                       <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                          <FileText size={16} className="text-gold-500" /> Attached Resources
                       </h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="flex items-center justify-between p-4 rounded-2xl bg-black/50 border border-white/5 hover:border-gold-500/30 transition-all group cursor-pointer">
                                <div>
                                   <div className="font-bold text-slate-200 text-sm mb-1">Session Framework PDF</div>
                                   <div className="text-[10px] text-slate-500 uppercase tracking-widest">PDF • 2.4 MB</div>
                                </div>
                                <div className="p-2 rounded-xl bg-white/5 text-slate-400 group-hover:text-gold-500 group-hover:bg-gold-500/10 transition-colors">
                                   <Download size={18} />
                                </div>
                             </div>
                       </div>
                    </div>
                 )}
              </div>
          </div>

          {/* RIGHT: Notes Panel */}
          <div className="w-full lg:w-[35%] xl:w-[30%] lg:h-[calc(100vh-140px)] sticky top-28 z-30">
             <NotesEditor lessonId={activeLesson.id} userId={user?.id || 'guest'} />
          </div>

        </div>
      </main>
    </div>
  );
}
