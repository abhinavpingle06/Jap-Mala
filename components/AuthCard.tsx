"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_40px_120px_-90px_rgba(255,169,87,0.35)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-10 h-36 w-36 rounded-full bg-slate-400/10 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-44 w-44 rounded-full bg-orange-300/5 blur-3xl" />

      <div className="relative">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.36em] text-orange-200/80">Welcome back</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-xl text-sm leading-7 text-slate-400">{subtitle}</p>
        </div>

        <div className="space-y-6">{children}</div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          {footer}
        </div>
      </div>
    </motion.div>
  );
}
