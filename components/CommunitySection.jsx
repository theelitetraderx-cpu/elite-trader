import { Instagram, Send, MessageSquare, ArrowRight, Users } from "lucide-react";
import StarBorder from "./StarBorder";
import BorderGlow from "./BorderGlow";

const communities = [
  {
    name: "Discord",
    description: "Join our official trading floor for live callouts and active discussions.",
    icon: <MessageSquare className="w-6 h-6" />,
    href: "https://discord.gg/W36Es5ZAU8",
    color: "from-gold-600 to-gold-400",
    hex: "#d4af37"
  },
  {
    name: "Telegram",
    description: "Get real-time market updates, trade breakdowns, and technical analysis.",
    icon: <Send className="w-6 h-6" />,
    href: "https://t.me/Elitefuture",
    color: "from-gold-500 to-yellow-400",
    hex: "#d4af37"
  },
  {
    name: "Instagram",
    description: "Daily trade recaps, educational reels, and behind-the-scenes content.",
    icon: <Instagram className="w-6 h-6" />,
    href: "https://instagram.com/theelitetrader",
    color: "from-purple-600 to-pink-500",
    hex: "#a855f7"
  }
];

export default function CommunitySection() {
  return (
    <section id="community" className="bg-black py-32 relative border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
           <div className="w-full lg:w-1/2 reveal">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6 font-inter">
                <Users className="w-3.5 h-3.5" /> Elite Community
             </div>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-outfit uppercase leading-tight">
               Join the <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Trading Floor</span>
             </h2>
             <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
               Connect with thousands of disciplined traders. Get real-time setups, verified results, and mentorship across all our official platforms.
             </p>
           </div>
           
           <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6 reveal reveal-delayed-1">
             {communities.map((item, i) => (
               <BorderGlow 
                 key={i} 
                 glowColor="45 80 50"
                 backgroundColor="#0f0f0f"
                 borderRadius={24}
                 glowIntensity={1.0}
                 colors={['#d4af37', '#ffd700', '#b8860b']}
                 className="h-full w-full block"
               >
                 <div className="p-6 h-full relative overflow-hidden group">
                   {/* Hover Gradient Overlay */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity`} />
                   
                   <div className="flex items-start justify-between mb-4 relative z-20">
                     <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg shadow-black/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all`}>
                       {item.icon}
                     </div>
                   </div>
                   
                   <h3 className="text-lg font-medium text-white mb-2 relative z-20">{item.name}</h3>
                   <p className="text-sm text-slate-400 mb-6 line-clamp-2 relative z-20">{item.description}</p>
                   
                   <a 
                     href={item.href} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors group/link relative z-20 mt-auto"
                   >
                     Join Here <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                   </a>
                 </div>
               </BorderGlow>
             ))}
           </div>
        </div>

        {/* Call to Action Footer */}
        <div className="flex justify-center reveal reveal-delayed-2">
           <StarBorder color="#d4af37" speed="4s">
              <a href="/community" className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black font-bold py-3.5 px-10 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-gold-500/20">
                 Explore All Channels <ArrowRight className="w-5 h-5" />
              </a>
           </StarBorder>
        </div>
      </div>
    </section>
  );
}
