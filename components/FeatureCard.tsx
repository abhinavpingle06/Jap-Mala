import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_28px_80px_-48px_rgba(248,165,68,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:bg-white/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300 shadow-[inset_0_0_0_1px_rgba(255,185,108,0.2)] transition duration-300 group-hover:bg-orange-300/15">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </div>
  );
}
