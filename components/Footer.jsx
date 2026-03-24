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
            <div className="flex items-center gap-5 text-slate-500">
               <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-gold-500/10 hover:text-gold-400 hover:border-gold-500/30 transition-colors cursor-pointer">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-gold-500/10 hover:text-gold-400 hover:border-gold-500/30 transition-colors cursor-pointer">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-gold-500/10 hover:text-gold-400 hover:border-gold-500/30 transition-colors cursor-pointer">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
               </div>
            </div>
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

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs text-center md:text-left">
            © {new Date().getFullYear()} The Elite Trader. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
             <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
