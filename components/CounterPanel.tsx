type CounterPanelProps = {
  count: number;
  rounds: number;
  onReset: () => void;
};

export function CounterPanel({ count, rounds, onReset }: CounterPanelProps) {
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 text-slate-900">
      {/* Top counter info */}
      <div className="space-y-8">
        {/* Current Count */}
        <div className="border-b border-slate-200/60 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-3">Current Count</p>
          <p className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900">{count}</p>
        </div>

        {/* Rounds Info */}
        <div className="border-b border-slate-200/60 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-3">Completed Rounds</p>
          <p className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900">{rounds}</p>
        </div>

        {/* Mala Type */}
        <div className="pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-3">Mala Type</p>
          <p className="text-lg sm:text-xl font-semibold text-slate-700">108 Beads</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="space-y-4">
        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className="w-full py-3 px-4 border border-slate-300/40 bg-white text-slate-700 font-medium text-sm rounded hover:border-slate-400 hover:bg-slate-50 transition"
        >
          Reset
        </button>

        {/* Peaceful text */}
        <p className="text-xs leading-6 text-slate-500 text-center">
          Chant with peace and focus.
        </p>
      </div>
    </div>
  );
}
