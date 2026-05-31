import { useState } from "react";
import { MantraKey, MANTRAS } from "./Mantras";
import { MantraDisplay } from "./MantraPanel";

type CounterPanelProps = {
  count: number;
  rounds: number;
  onReset: () => void;
};

export function CounterPanel({ count, rounds, onReset }: CounterPanelProps) {
  const [showMantraSelector, setShowMantraSelector] = useState(false);
  const [selectedMantra, setSelectedMantra] = useState<MantraKey>("hareKrishna");
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
        <div className="pb-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-3">Mala Type</p>
          <p className="text-xl sm:text-xl font-semibold text-slate-700">108 Beads</p>
        </div>

        {/* Change Mantra */}
        <div className="flex flex-col items-center">
          <MantraDisplay mantraKey={selectedMantra} />
          <button
            onClick={() => setShowMantraSelector(true)}
            className="pb-5 font-medium uppercase tracking-[0.1em]"
          >
            Select Mantra
          </button>
          {
            showMantraSelector && (
              <div className="fixed z-10 inset-100 bg-black/30 flex flex-col items-center justify-center ">
                <div className="bg-white flex flex-col items-center rounded-2xl p-6 w-[90%] max-w-sm">
                  <h2 className="bg-orange-300 py-2 px-3 rounded-2xl font-medium uppercase tracking-[0.1em]">Select Mantra</h2>

                  {Object.entries(MANTRAS).map(([key, mantra]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedMantra(key as MantraKey);
                        setShowMantraSelector(false);
                      }}
                      className="w-full text-left m-2 p-2 rounded-lg hover:bg-orange-200"
                    >
                      {mantra.title}
                    </button>
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center space-y-4">
        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className=" px-2 border-2 rounded-2xl text-black font-semibold uppercase tracking-[0.1em] text-lg hover:border-black-400 hover:bg-slate-50 transition"
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
