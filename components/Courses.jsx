import { BookOpen, Star, TrendingUp, ShieldAlert, Target } from "lucide-react";
import Link from 'next/link';
import StarBorder from "./StarBorder";
import BorderGlow from "./BorderGlow";

export default function Courses() {
  const courses = [
    {
      title: "Futures Trading Mastery",
      level: "Beginner → Advanced",
      lessons: 50,
      hours: 8,
      icon: <TrendingUp className="w-6 h-6 text-gold-500" />,
      glow: "from-gold-600/20 to-transparent",
      desc: "The complete A-Z guide to trading index futures. Master market structure, liquidity, and entries.",
      glowColor: "43 74 49",
      colors: ['#d4af37', '#ffd700', '#b8860b'],
    },
    {
      title: "Crypto Scalping Strategy",
      level: "Intermediate",
      lessons: 35,
      hours: 5.5,
      icon: <Target className="w-6 h-6 text-gold-400" />,
      glow: "from-gold-600/20 to-transparent",
      desc: "Live chart examples, real trades, and precisely tuned indicators for high-frequency crypto scalping.",
      glowColor: "43 74 49",
      colors: ['#d4af37', '#ffd700', '#b8860b'],
    },
    {
      title: "Risk Management System",
      level: "All Levels",
      lessons: 20,
      hours: 3,
      icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
      glow: "from-emerald-600/20 to-transparent",
      desc: "Position sizing math, dynamic stop loss strategies, and psychological capital protection rules.",
      glowColor: "160 84 39",
      colors: ['#10b981', '#34d399', '#059669'],
    },
    {
      title: "The Elite Trader Setups",
      level: "Advanced",
      lessons: 42,
      hours: 7,
      icon: <Star className="w-6 h-6 text-purple-400" />,
      glow: "from-purple-600/20 to-transparent",
      desc: "Our proprietary entry setups, trend continuation models, and advanced order flow reading.",
      glowColor: "270 60 60",
      colors: ['#a855f7', '#c084fc', '#7c3aed'],
    }
  ];

  return (
    <section id="courses" className="bg-black py-32 relative border-t border-white/5">
       {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
           <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-xs font-bold uppercase tracking-widest mb-6">
               <BookOpen className="w-3.5 h-3.5" /> Elite Curriculum
             </div>
             <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
               Master the markets with our comprehensive courses.
             </h2>
             <p className="text-lg text-slate-400 leading-relaxed">
               Built by funded traders for future funded traders. Real strategies, zero fluff.
             </p>
           </div>
           
           <StarBorder color="#d4af37" speed="7s">
              <a href="#pricing" className="bg-[#050505] hover:bg-[#0a0a0a] text-white border border-white/5 hover:border-gold-500/50 font-medium py-3 px-6 rounded-full transition-all flex items-center gap-2 whitespace-nowrap h-max">
                 View All Programs
              </a>
           </StarBorder>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 reveal reveal-delayed-1">
          {courses.map((course, i) => (
            <BorderGlow
              key={i}
              borderRadius={24}
              backgroundColor="#0a0a0a"
              glowColor={course.glowColor}
              colors={course.colors}
              glowIntensity={1.0}
              className="h-full transition-all hover:-translate-y-2"
            >
              <div className="p-6 flex flex-col h-full relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${course.glow} rounded-full blur-2xl pointer-events-none`}></div>
                
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-white/5 mb-6 shadow-inner relative z-10">
                  {course.icon}
                </div>
                
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 relative z-10">
                   {course.level}
                </div>
                
                <h3 className="text-xl font-medium text-white mb-3 relative z-10 leading-snug">
                  {course.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow relative z-10">
                  {course.desc}
                </p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
