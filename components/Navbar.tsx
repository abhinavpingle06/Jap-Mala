"use client";

import { motion } from "framer-motion";

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
};

export function Navbar({ links }: NavbarProps) {
  return (
    <motion.nav
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 md:px-2 md:pt-8"
    >
      <a href="#top" className=" font-serif font-bold text-2xl tracking-tight text-orange-300/90">
        Virtual Jap Mala
      </a>
      <div className="flex items-center gap-8">
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-orange-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="/login"
          className="rounded-full border border-orange-300/20 bg-orange-300/10 px-5 py-2.5 text-sm font-semibold text-orange-100 transition hover:border-orange-200/40 hover:bg-orange-300/15"
        >
          Start Chanting
        </a>
      </div>
    </motion.nav>
  );
}
