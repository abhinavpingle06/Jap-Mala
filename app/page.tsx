"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroVisual } from "@/components/HeroVisual";
import { MobilePreview } from "@/components/MobilePreview";
import { featureItems, navLinks } from "@/lib/siteData";
import VerticalSlider from "@/components/Swiper";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05040f] text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-0 h-192 w-3xl -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="fixed z-200 pointer-events-none bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-orange-400/60 via-orange-500/5 to-transparent blur-xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-slate-400/5 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 rounded-full bg-orange-400/5 blur-3xl" />

      <Navbar links={navLinks} />

      <main className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <section id="top" className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-4 inline-flex rounded-full border border-orange-300/20 bg-orange-300/10 px-4 py-2 text-sm tracking-[0.24em] text-orange-100">
              Calm digital chanting
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              A peaceful digital space for daily jap and mindfulness.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Experience mantra chanting with virtual mala beads, calming ambience, and distraction-free focus.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-orange-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_-30px_rgba(255,169,87,0.9)] transition hover:-translate-y-0.5 hover:bg-orange-200"
              >
                Start Chanting
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-200/40 hover:bg-white/10"
              >
                Explore Experience
              </a>
            </div>
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            {/* <HeroVisual /> */}
            <VerticalSlider/>
          </div>
        </section>

        <section id="features" className="space-y-10 py-10">
          <SectionHeading
            eyebrow="Features"
            title="A calm toolkit for your mindful chanting practice."
            description="Minimal controls, considered motion, and thoughtful audio support are designed to keep your focus on the breath and the mantra."
          />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featureItems.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="grid gap-10 rounded-4xl border border-white/10 bg-slate-950/60 p-8 shadow-[0_40px_120px_-80px_rgba(13,15,31,0.8)] backdrop-blur-xl sm:p-10 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Experience"
              title="No ads, no distractions, just a modern spiritual flow."
              description="A premium meditation companion that feels calm, immersive, and ready for daily use — even when you go offline."
            />
            <div className="mt-8 space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              {[
                "No ads / clean interface",
                "Peaceful bright UI tuned for focus",
                "Works offline and installable like an app",
                "Modern, intentionally calm spiritual experience",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4 text-sm text-slate-300 sm:text-base">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-orange-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <MobilePreview />
          </div>
        </section>

        <section className="space-y-6 py-4 text-center text-slate-400 sm:py-8">
          <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">About</p>
          <p className="mx-auto max-w-3xl text-base leading-8 sm:text-lg">
            Virtual Jap Mala is a modern landing place for daily chanting. It is designed to feel fluid and meditative, with soft motion, subtle glow, and a glassy interface that supports mindful focus.
          </p>
        </section>
      </main>

      <footer id="footer" className="border-t border-white/10 bg-[#05040f]/80 py-8 text-center text-sm text-slate-500 sm:py-10">
        <p>Virtual Jap Mala — a calm companion for your daily mantra.</p>
      </footer>
    </div>
  );
}
