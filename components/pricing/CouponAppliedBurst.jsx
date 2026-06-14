"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function CouponAppliedBurst({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.75rem]"
          aria-hidden
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 w-[min(100%,520px)] aspect-square rounded-full border border-gold-500/40 bg-gold-500/[0.07]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-b from-gold-500/15 via-transparent to-gold-500/5"
          />
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const dist = 100 + (i % 3) * 28;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 1, scale: 0, x: "-50%", y: "-50%" }}
                animate={{
                  opacity: 0,
                  scale: 1.2,
                  x: `calc(-50% + ${Math.cos(angle) * dist}px)`,
                  y: `calc(-50% + ${Math.sin(angle) * dist}px)`,
                }}
                transition={{ duration: 0.85, ease: "easeOut", delay: i * 0.02 }}
                className="absolute left-1/2 top-[28%] w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
