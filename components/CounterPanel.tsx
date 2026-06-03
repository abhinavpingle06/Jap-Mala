import { useState } from "react";
import { MantraKey, MANTRAS } from "./Mantras";
import { MantraDisplay } from "./MantraPanel";
import { useStopwatch } from "react-timer-hook";
import { Volume2, Vibrate, Music } from "lucide-react";

type CounterPanelProps = {
  count: number;
  rounds: number;
  onReset: () => void;
};

const handelConfiguration = (button:string) => {
  if(button == "bead"){
    return 
  }
}

// StopWatch Function
const StopWatch = () => {
  const {
    seconds,
    minutes,
    hours,
    days,
  } = useStopwatch({ autoStart: true });

  return (
    <div className="text-xl sm:text-2xl font-semibold text-slate-700">
      {String(hours).padStart(2, "0")}:
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  )
}

export function CounterPanel({ count, rounds, onReset }: CounterPanelProps) {
  const [showMantraSelector, setShowMantraSelector] = useState(false);
  const [selectedMantra, setSelectedMantra] = useState<MantraKey>("hareKrishna");
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 text-slate-900">
      {/* Top counter info */}
      <div className="space-y-6">
        {/* Current Count */}
        <div className="border-b border-slate-200/60 ">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-3">Current Count</p>
          <p className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900">{count}</p>
        </div>

        {/* Rounds Info */}
        <div className="border-b border-slate-200/60 pb-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-3">Completed Rounds</p>
          <p className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900">{rounds}</p>
        </div>

        {/* Mala Type */}
        <div className="pb-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-1">Mala Type</p>
          <p className="text-xl sm:text-xl font-semibold text-slate-700">108 Beads</p>
        </div>
        <div className="border-b border-slate-200/6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-1">Samay</p>
          {StopWatch()}
        </div>
        <div className="flex gap-1">
          <button onClick={() => handelConfiguration("bead")} className="hover:bg-white flex flex-col items-center flex-1 py-2 rounded-lg border border-slate-200">
            <Volume2 size={16} />
            <span className="text-[9px] mt-1">Beads</span>
          </button>

          <button onClick={() => handelConfiguration("vibrate")} className="hover:bg-white flex flex-col items-center flex-1 py-2 rounded-lg border border-slate-200">
            <Vibrate size={16} />
            <span className="text-[9px] mt-1">Vibration</span>
          </button>

          <button onClick={() => handelConfiguration("music")} className="hover:bg-white flex flex-col items-center flex-1 py-2 rounded-lg border border-slate-200">
            <Music size={16} />
            <span className="text-[9px] mt-1">Music</span>
          </button>
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
              <div className="fixed z-10 inset-0 bg-black/30 flex flex-col items-center justify-center ">
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
      </div>
    </div>
  );
}
