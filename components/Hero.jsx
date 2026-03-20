import { ChevronRight } from "lucide-react";
import Link from 'next/link';
import GridScanWrapper from "./GridScanWrapper";
import StarBorder from "./StarBorder";

export default function Hero() {
   const userName = "New Trader";

   return (
      <>
         {/* HERO SECTION with GridScan Background */}
          <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black font-sans">
            
            {/* GridScan Interactive Background */}
            <div className="absolute inset-0 z-0">
               <GridScanWrapper 
                  scanColor="#d4af37" 
                  linesColor="#1a1a1a" 
                  gridScale={0.08}
                  scanOpacity={0.4}
                  bloomIntensity={0.5}
                  noiseIntensity={0.02}
               />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full lg:-mt-10">
            
                {/* Hero Text */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                   <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 reveal">
                      Trade With <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Precision.</span><br/>
                      Execute With <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Discipline.</span>
                   </h1>
                   <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed reveal reveal-delayed-1">
                      The Elite Trader is built on structured setups, risk management, and long-term consistency.
                   </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/5 pt-10 reveal reveal-delayed-2">
                      <StarBorder color="#d4af37" speed="4s">
                         <a href="#pricing" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold py-3.5 px-8 rounded-full flex items-center gap-2 transition-all">
                            Start Learning <ChevronRight className="w-5 h-5" />
                         </a>
                      </StarBorder>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
