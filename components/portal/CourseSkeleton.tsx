"use client";

import { motion } from "framer-motion";

export default function CourseSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 animate-pulse">
      <div className="aspect-video w-full bg-white/10 rounded-xl mb-4 overflow-hidden relative">
         <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-1/2"
         />
      </div>
      <div className="h-5 bg-white/10 rounded-md w-3/4 mb-3"></div>
      <div className="h-4 bg-white/5 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-white/5 rounded-md w-5/6 mb-4"></div>
      
      <div className="flex items-center justify-between mt-auto">
         <div className="h-8 bg-white/10 rounded-lg w-24"></div>
         <div className="h-4 bg-white/10 rounded-full w-12"></div>
      </div>
    </div>
  );
}
