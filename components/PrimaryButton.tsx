"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type PrimaryButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  loading?: boolean;
  variant?: "solid" | "ghost";
};

export function PrimaryButton({
  children,
  loading,
  variant = "solid",
  className = "",
  disabled,
  ...props
}: PrimaryButtonProps) {
  const baseStyles =
    variant === "ghost"
      ? "rounded-full border border-white/10 bg-white/5 text-slate-100 hover:border-orange-300/40 hover:bg-white/10"
      : "rounded-full bg-orange-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_-30px_rgba(255,169,87,0.9)] transition hover:-translate-y-0.5 hover:bg-orange-200";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={loading || disabled}
      className={`${baseStyles} ${className} inline-flex items-center justify-center gap-2 ${loading ? "opacity-80" : ""}`}
      {...props}
    >
      {loading ? "Loading…" : children}
    </motion.button>
  );
}
