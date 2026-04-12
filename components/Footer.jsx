"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 relative flex items-center justify-center overflow-hidden">
                <img src="/site-logo.png" alt="The Elite Trader Logo" className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]" />
              </div>
              <span className="text-white font-medium text-xl tracking-wide">The Elite<span className="text-gold-500 font-light ml-1">Trader</span></span>
            </Link>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-8">
              The premier learning platform for modern futures and crypto traders. The Elite Trader is designed to help you master professional strategies and risk management.
            </p>

          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="#courses" className="hover:text-gold-500 transition-colors">All Courses</Link></li>
              <li><a href="https://t.me/Elitefuturetrades" target="_blank" className="hover:text-gold-500 transition-colors">Pricing & Plans</a></li>
              <li><Link href="#" className="hover:text-gold-500 transition-colors">Student Success</Link></li>
              <li><Link href="#" className="hover:text-gold-500 transition-colors">Live Coaching</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-gold-500 transition-colors">About The Elite Trader</Link></li>
              <li>
                <button 
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-chat')); }} 
                  className="hover:text-gold-500 transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li><Link href="/community" className="hover:text-gold-500 transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-medium text-center md:text-left">
            © {new Date().getFullYear()} The Elite Trader. All rights reserved.
          </p>
          
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold text-center">
            Built by <span className="text-gold-500 hover:text-white transition-colors cursor-default">H2T Technologies</span> — <span className="text-slate-600 font-medium italic">Let’s Create Something Bold</span>
          </p>

          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold text-slate-500">
             <Link href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-gold-500 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
