"use client";

import { motion } from "framer-motion";

export function MobilePreview() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-85 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_40px_120px_-80px_rgba(245,145,60,0.35)] backdrop-blur-xl"
    >
      <div className="absolute left-1/2 top-4 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/10" />
      <div className="space-y-5 pt-6">
        <div className="rounded-4xl border border-white/10 bg-slate-900/70 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Virtual Mala</span>
            <span className="rounded-full bg-orange-300/10 px-3 py-1 text-orange-100">108</span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-4 w-4 rounded-full bg-orange-300/80 shadow-[0_0_16px_rgba(245,156,72,0.35)]" />
            <div className="h-4 w-4 rounded-full bg-slate-500/40" />
            <div className="h-4 w-4 rounded-full bg-slate-500/40" />
          </div>
          <div className="mt-5 grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="h-3 rounded-full bg-orange-300/10" />
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-slate-400">
            A calm tactile counter for your daily chanting ritual.
          </p>
        </div>

        <div className="rounded-4xl border border-white/10 bg-slate-900/60 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
            <span>Ambient Sound</span>
            <span className="text-slate-300">Soft beats</span>
          </div>
          <div className="rounded-3xl bg-white/5 p-4">
            <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
              <span>Lotus Flow</span>
              <span>02:18</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-700">
              <div className="h-2.5 w-3/5 rounded-full bg-orange-300" />
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-white/10 bg-slate-900/60 p-5 text-center text-sm text-slate-400">
          <p className="font-medium text-orange-100">Offline ready</p>
          <p className="mt-2">Designed to feel like a peaceful app that you can carry with you.</p>
        </div>
      </div>
    </motion.div>
  );
}
