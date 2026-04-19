"use client";

import { useEffect, useRef } from "react";
import { Lock } from "lucide-react";
import Link from "next/link";

interface SecureVideoPlayerProps {
  url: string;
  isPaid: boolean;
  isLocked: boolean;
  userEmail: string;
  onEnded?: () => void;
}

export default function SecureVideoPlayer({ url, isPaid, isLocked, userEmail, onEnded }: SecureVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic dev tool blocking (F12, Ctrl+Shift+I, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I (Windows) or Cmd+Opt+I (Mac)
      if (
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.metaKey && e.altKey && e.key === "i")
      ) {
        e.preventDefault();
      }
      // Prevent Ctrl+S
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Determine if user has access to this video
  const hasAccess = !isLocked || isPaid;

  if (!hasAccess) {
    return (
      <div className="w-full aspect-video bg-black/80 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center">
        {/* Fake blur background representing content */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-black blur-md z-0 opacity-50 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        </div>
        
        {/* Lock Overlay */}
        <div className="z-10 flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-gold-500 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Premium Content Locked</h3>
          <p className="text-slate-400 max-w-md mb-6">
            This lesson is exclusive to EliteTrader Premium members. Unlock full access to master precision trading.
          </p>
          <Link 
            href="/dashboard/payments"
            className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
          >
            Unlock Premium Access
          </Link>
        </div>
      </div>
    );
  }

  // Active / Secure player
  return (
    <div 
      className="w-full aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative"
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()} // Disable Right Click
    >
      {/* 
        Generic secure Iframe setup.
        Depending on the host provider (Vimeo, YouTube), different query parameters might be appended.
      */}
      {url.endsWith('.mp4') ? (
        <video 
          src={url}
          controls
          controlsList="nodownload"
          disablePictureInPicture
          onEnded={onEnded}
          className="w-full h-full absolute inset-0 z-10"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <iframe 
          src={url} 
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute inset-0 z-10 bg-black"
          style={{ border: 'none' }}
        ></iframe>
      )}

      {/* Watermark Overlay Structure */}
      {userEmail && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
             {/* Creating a grid of translucent watermarks */}
             <div className="absolute top-1/4 left-1/4 -rotate-45 opacity-[0.03] text-white font-mono text-xl whitespace-nowrap">
                {userEmail}
             </div>
             <div className="absolute bottom-1/4 right-1/4 -rotate-45 opacity-[0.03] text-white font-mono text-xl whitespace-nowrap">
                {userEmail}
             </div>
        </div>
      )}
    </div>
  );
}
