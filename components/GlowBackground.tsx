export function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="absolute right-10 top-28 h-56 w-56 rounded-full bg-slate-400/10 blur-3xl" />
      <div className="absolute bottom-10 left-8 h-56 w-56 rounded-full bg-orange-300/5 blur-3xl" />
    </div>
  );
}
