"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("has-seen-splash");
    if (hasSeenSplash) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("has-seen-splash", "true");
    }, 4500); // Wait for the full animation sequence to finish

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  const text = "THE ELITE TRADER";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

          {/* Sequential Animation Container */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Blur Text Reveal */}
            <motion.div 
              className="flex space-x-2 md:space-x-3 text-gold-500 font-outfit uppercase tracking-[0.3em] md:tracking-[0.5em] text-xl md:text-3xl lg:text-4xl font-light"
              initial={{ filter: "blur(20px)", opacity: 0, scale: 0.9 }}
              animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 10 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Quick Logo Open */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 2.5, duration: 0.8, type: "spring", stiffness: 100 }}
              className="mt-12 relative"
            >
              <div className="absolute inset-0 bg-gold-600/20 blur-[60px] rounded-full scale-150" />
              <Image 
                src="/elite-logo.png" 
                alt="Elite Trader Logo" 
                width={160} 
                height={160} 
                className="object-contain mix-blend-screen relative z-10"
                priority
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
