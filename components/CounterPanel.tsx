type CounterPanelProps = {
  count: number;
  rounds: number;
  onReset: () => void;
};

export function CounterPanel({ count, rounds, onReset }: CounterPanelProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-300/20 bg-[#fff7ec] p-6 shadow-sm text-slate-900">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#9c7a58]">Current Count</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight">{count}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-300/25 bg-white p-4">
            <p className="text-sm text-slate-500">Rounds</p>
            <p className="mt-2 text-2xl font-semibold">{rounds}</p>
          </div>
          <div className="rounded-3xl border border-slate-300/25 bg-white p-4">
            <p className="text-sm text-slate-500">Mala Type</p>
            <p className="mt-2 text-2xl font-semibold">108 Beads</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-full border border-[#9c7a58] bg-[#ffffff] px-4 py-3 text-base font-semibold text-[#6f553f] transition hover:bg-[#f7e7d1]"
      >
        Reset
      </button>
      <p className="text-sm leading-7 text-slate-500">Chant with peace and focus.</p>
    </section>
  );
}
