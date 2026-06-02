"use client";

import { motion } from "framer-motion";

export function MobilePreview() {
  return (
    <div
      className="relative mx-auto w-full max-w-85 rounded-[1.5rem] border border-white/10 bg-slate-950/70 shadow-[0_0px_80px_-10px_rgba(248,165,68,0.55)] backdrop-blur-3xl transition duration-300 hover:-translate-y-1 hover:border-orange-200/30"
    >
      <img 
      src= "/icons/jap-page.png"
        className="w-full h-auto rounded-[1.5rem]"
      />
    </div>
  );
}
