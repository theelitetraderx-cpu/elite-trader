import { PlayCircle, FileText, Bot, Signal } from "lucide-react";
import BorderGlow from "./BorderGlow";

export default function Features() {
  const features = [
    { title: "HD Video Lessons", desc: "Crystal clear 4k video playback powered by Cloudinary. Watch anywhere, anytime.", icon: <PlayCircle className="w-5 h-5 text-gold-400" /> },
    { title: "Trading Resources", desc: "Downloadable PDF blueprints, cheat sheets, and exact trading charts to follow along.", icon: <FileText className="w-5 h-5 text-gold-500" /> },
    { title: "Future Add-ons: Live Trading", desc: "Upcoming access to the private Live Trading Room and real-time trade signals.", icon: <Signal className="w-5 h-5 text-gold-600" /> },
    { title: "Future Add-ons: AI Analysis", desc: "We are integrating AI to automatically review your trading patterns and provide feedback.", icon: <Bot className="w-5 h-5 text-gold-400" /> }
  ];

  return (
    <section className="bg-black py-32 border-t border-white/5 pb-40 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="w-full lg:w-1/2">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-xs font-bold uppercase tracking-widest mb-6">
                Course Content System
             </div>
             <h3 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">
               Built on a modern <br className="hidden md:block"/>learning ecosystem.
             </h3>
             <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-12">
               Our educational platform is designed to provide high-quality trade breakdowns, live sessions, and a structured path to mastering futures markets.
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
               {features.map((f, i) => (
                 <div key={i} className="flex gap-5 group">
                   <div className="flex-shrink-0 w-12 h-12 bg-[#0a0a0a] border border-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#151515] group-hover:border-gold-500/30 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                     {f.icon}
                   </div>
                   <div>
                     <h4 className="text-lg font-medium text-white mb-1 leading-snug">{f.title}</h4>
                     <p className="text-slate-400 leading-relaxed max-w-md text-sm">{f.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="w-full lg:w-1/2">
             <BorderGlow
               borderRadius={24}
               backgroundColor="#0a0a0a"
               glowColor="43 74 49"
               colors={['#d4af37', '#ffd700', '#b8860b']}
               glowIntensity={1.0}
             >
               <div className="p-4 relative overflow-hidden">
                 <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-600/10 blur-[80px] rounded-full pointer-events-none"></div>

                 {/* Fake App Window */}
                 <div className="bg-black border border-white/5 rounded-2xl h-[450px] flex flex-col shadow-inner relative z-10 overflow-hidden">
                    <div className="border-b border-white/5 p-4 flex gap-2 bg-[#050505]">
                      <div className="w-3 h-3 rounded-full bg-white/5"></div>
                      <div className="w-3 h-3 rounded-full bg-white/5"></div>
                      <div className="w-3 h-3 rounded-full bg-white/5"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Database Structure Preview</div>
                      
                      <div className="space-y-4">
                         <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 font-mono text-xs flex justify-between items-center hover:border-gold-500/30 transition-colors">
                            <span className="text-gold-500">auth.users</span>
                            <span className="text-slate-500">{"{"} id, email, referral_code {"}"}</span>
                         </div>
                         <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 font-mono text-xs flex justify-between items-center hover:border-gold-500/30 transition-colors relative">
                            <div className="absolute left-4 -bottom-4 w-px h-4 bg-white/10"></div>
                            <span className="text-gold-400">public.courses</span>
                            <span className="text-slate-500">{"{"} id, title, price {"}"}</span>
                         </div>
                         <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 font-mono text-xs flex justify-between items-center ml-8 hover:border-gold-500/30 transition-colors">
                            <span className="text-gold-300">public.lessons</span>
                            <span className="text-slate-500">{"{"} course_id, video_url {"}"}</span>
                         </div>
                         <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 font-mono text-xs flex justify-between items-center hover:border-gold-500/30 transition-colors mt-6">
                            <span className="text-gold-600">public.purchases</span>
                            <span className="text-slate-500">{"{"} user_id, status {"}"}</span>
                         </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto border-t border-white/5 bg-[#0a0a0a] p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_8px_#d4af37]"></div>
                         <span className="text-xs text-slate-400">Database Connected</span>
                      </div>
                      <span className="text-xs text-slate-500">Latency: 12ms</span>
                    </div>
                 </div>
               </div>
             </BorderGlow>
          </div>

        </div>
      </div>
    </section>
  );
}
