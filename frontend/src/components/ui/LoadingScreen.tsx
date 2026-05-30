"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 16);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] loading-bg flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--accent-primary)]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[var(--accent-secondary)]/08 blur-[100px] pointer-events-none" />

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="relative mb-12 logo-glow flex items-center justify-center"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <Image
                src="/logo.png"
                alt="HINEET TECH logo"
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
                priority
              />

              <div className="flex flex-col justify-center leading-none">
                <div className="text-2xl font-bold tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                  HINEET TECH
                </div>
                <div className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mt-1">
                  Private Limited
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-sm font-medium tracking-[0.3em] text-[var(--text-muted)] uppercase mb-12"
          >
            Building Everyday Experiences
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.25 }}
            className="w-56 h-[2px] bg-[var(--glass-border)] rounded-full overflow-hidden"
          >
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full blue-gradient-btn rounded-full transition-all duration-100"
            />
          </motion.div>

          {/* Subtle loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-1.5 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]/40"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
