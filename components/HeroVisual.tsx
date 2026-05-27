"use client";

import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative mx-auto flex h-full w-full max-w-105 items-center justify-center"
    >
      <div className="absolute -left-16 top-8 h-24 w-24 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-slate-400/5 blur-3xl" />
      <div className="relative flex h-90 w-90 items-center justify-center rounded-[2.5rem] border border-white/10 bg-slate-950/50 p-6 shadow-[0_40px_120px_-70px_rgba(255,175,75,0.5)] backdrop-blur-xl">
        <div className="absolute inset-0 rounded-[2.5rem] border border-orange-400/10" />
        <div className="absolute inset-10 rounded-full border border-white/10 bg-[#0d1222]/80" />
        <div className="absolute inset-20 rounded-full border border-orange-300/20 bg-orange-300/5" />
        <div className="absolute inset-22 rounded-full border border-white/10 bg-[#111528]/90" />

        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute top-6 left-10 h-6 w-6 rounded-full bg-orange-300/80 shadow-[0_0_25px_rgba(245,151,84,0.4)]" />
          <div className="absolute top-24 right-12 h-5 w-5 rounded-full bg-slate-300/20 shadow-[0_0_20px_rgba(255,255,255,0.12)]" />
          <div className="absolute bottom-16 left-16 h-6 w-6 rounded-full bg-orange-100/20 shadow-[0_0_24px_rgba(255,145,65,0.2)]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative flex h-56 w-56 items-center justify-center rounded-full border border-orange-300/10"
          >
            <div className="absolute h-4 w-4 rounded-full bg-orange-200/90 shadow-[0_0_18px_rgba(255,183,113,0.45)]" style={{ top: "12%", left: "50%", transform: "translate(-50%, -50%)" }} />
            <div className="absolute h-3.5 w-3.5 rounded-full bg-white/70" style={{ top: "50%", left: "12%", transform: "translate(-50%, -50%)" }} />
            <div className="absolute h-4 w-4 rounded-full bg-orange-200/70" style={{ top: "78%", left: "76%", transform: "translate(-50%, -50%)" }} />
            <div className="absolute h-3 w-3 rounded-full bg-slate-200/20" style={{ top: "30%", left: "80%", transform: "translate(-50%, -50%)" }} />
            <div className="absolute h-3.5 w-3.5 rounded-full bg-slate-200/30" style={{ top: "70%", left: "26%", transform: "translate(-50%, -50%)" }} />
            <div className="absolute h-4 w-4 rounded-full bg-orange-200/50" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
