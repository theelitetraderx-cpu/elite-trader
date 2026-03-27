"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AVATARS = [
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
];

const OrbitPath = ({ radius, speed, avatars, reverse = false }) => {
  return (
    <div 
      className="absolute border border-gold-500/10 rounded-full border-dashed"
      style={{ 
        width: radius * 2, 
        height: radius * 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {avatars.map((url, i) => {
          const angle = (i / avatars.length) * 2 * Math.PI;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              whileHover={{ scale: 1.2, zIndex: 50 }}
            >
              <div className="relative group">
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Avatar Container */}
                <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full border border-gold-500/40 p-1 bg-black/80 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <img 
                    src={url} 
                    alt="User" 
                    className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                  {/* Floating badge */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gold-500 rounded-full border-2 border-black"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function NetworkCircles() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Center Glow */}
      <div className="absolute w-32 h-32 bg-gold-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Multi-layered Orbits */}
      <OrbitPath radius={150} speed={40} avatars={AVATARS.slice(0, 4)} />
      <OrbitPath radius={280} speed={60} avatars={AVATARS.slice(4, 9)} reverse={true} />
      <OrbitPath radius={420} speed={90} avatars={AVATARS.slice(9, 12)} />
      
      {/* Core Dot */}
      <div className="relative z-10 w-4 h-4 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.8)]"></div>
    </div>
  );
}
