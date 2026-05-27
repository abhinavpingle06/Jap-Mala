"use client";

import { useCallback, useMemo, useState } from "react";
import { Bead } from "@/components/Bead";
import { CounterPanel } from "@/components/CounterPanel";

const beadCount = 108;
const visibleBeadCount = 7;
const centerIndex = Math.floor(visibleBeadCount / 2);

function normalizeIndex(index: number) {
  return ((index % beadCount) + beadCount) % beadCount;
}

export function JapMala() {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleReset = useCallback(() => {
    setCount(0);
    setRounds(0);
    setCurrentIndex(0);
  }, []);

  const handleTap = useCallback(() => {
    setCount((currentCount) => {
      const nextCount = currentCount + 1;
      if (nextCount >= beadCount) {
        setRounds((currentRounds) => currentRounds + 1);
        return 0;
      }
      return nextCount;
    });

    setCurrentIndex((index) => normalizeIndex(index + 1));
  }, []);

  const visibleBeads = useMemo(
    () =>
      Array.from({ length: visibleBeadCount }, (_, position) => {
        const offset = position - centerIndex;
        const beadIndex = normalizeIndex(currentIndex + offset);
        return {
          beadIndex,
          offset,
          active: offset === 0,
        };
      }),
    [currentIndex]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
      <div className="space-y-6 rounded-3xl border border-slate-300/20 bg-[#fff9ef] p-6 shadow-sm text-slate-900">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-[#9c7a58]">Jap Mala</p>
          <h2 className="text-3xl font-semibold leading-tight">Simple mala counting</h2>
          <p className="text-base leading-7 text-slate-600">
            Tap anywhere on the mala area to move through the beads with calm, gentle rhythm.
          </p>
        </div>

        <CounterPanel count={count} rounds={rounds} onReset={handleReset} />
      </div>

      <button
        type="button"
        onClick={handleTap}
        className="group relative flex min-h-105 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-300/20 bg-[#f6efe4] px-4 py-6 text-left shadow-sm transition hover:border-[#b09372] sm:px-6"
        aria-label="Tap to advance the mala count"
      >
        <div className="mb-4 flex w-full items-center justify-between rounded-3xl border border-slate-300/20 bg-white px-4 py-3 text-slate-700 sm:px-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#9c7a58]">Mala chain</p>
            <p className="mt-1 text-base text-slate-700">Tap anywhere here to continue your practice.</p>
          </div>
          <div className="rounded-full bg-[#e6d4b6] px-3 py-1 text-sm text-slate-800">108 beads</div>
        </div>

        <div className="relative flex h-90 w-full max-w-60 flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-x-0 top-1/2 h-px w-full bg-slate-200/50" />
          {visibleBeads.map((bead) => (
            <Bead
              key={`${bead.beadIndex}-${bead.offset}`}
              active={bead.active}
              label={`Bead ${bead.beadIndex + 1}${bead.active ? ", active" : ""}`}
              style={{ transform: `translateY(${bead.offset * 54}px)` }}
            />
          ))}
        </div>
      </button>
    </div>
  );
}
