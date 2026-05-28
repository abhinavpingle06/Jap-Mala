"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
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

  /**
   * currentIndex = current active bead
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * animation trigger
   */
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReset = useCallback(() => {
    setCount(0);
    setRounds(0);
    setCurrentIndex(0);
  }, []);

  const handleTap = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    /**
     * AFTER animation completes:
     * move actual bead data
     */
    setTimeout(() => {
      setCurrentIndex((prev) => normalizeIndex(prev + 1));

      setCount((prev) => {
        const next = prev + 1;

        if (next >= beadCount) {
          setRounds((r) => r + 1);
          return 0;
        }

        return next;
      });

      setIsAnimating(false);
    }, 180);
  };

  /**
   * Visible beads
   */
  const visibleBeads = useMemo(() => {
    return Array.from({ length: visibleBeadCount }, (_, position) => {
      const offset = position - centerIndex;

      return {
        beadIndex: normalizeIndex(currentIndex + offset),
        offset,
        active: offset === 0,
        id: `${currentIndex}-${position}`,
      };
    });
  }, [currentIndex]);

  return (
    <div className="h-screen w-screen bg-[#f8f0e5] flex overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-[42%] border-r border-[#d9c7aa]/40 bg-[#fffdf8] flex flex-col">
        <CounterPanel
          count={count}
          rounds={rounds}
          onReset={handleReset}
        />
      </div>

      {/* RIGHT PANEL */}
      <div
        onClick={handleTap}
        aria-label="Tap to advance mala"
        style={{ WebkitTapHighlightColor: "transparent" }}
        className="
          relative
          w-[58%]
          bg-[#f8f0e5]
          overflow-hidden
          flex
          items-center
          justify-center
          cursor-pointer
          touch-manipulation
          active:scale-[0.995]
          transition-transform
        "
      >
        {/* THREAD */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-[8px]
            -translate-x-1/2
            rounded-full
            bg-[#5f4631]/20
            blur-[1px]
            z-0
          "
        />

        {/* MOVING STRAND */}
        <div
          className="
            relative
            h-screen
            w-full
            overflow-hidden
          "
        >
          {visibleBeads.map((bead) => {
            /**
             * Main bead spacing
             * lower value = more overlap
             */
            const baseY = bead.offset * 72;

            /**
             * CLICK ANIMATION:
             * whole strand shifts downward
             */
            const animatedY = isAnimating ? baseY + 72 : baseY;

            return (
              <div
                key={bead.id}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  transition-all
                  duration-200
                  ease-out
                  pointer-events-none
                "
                style={{
                  transform: `translate(-50%, calc(-50% + ${animatedY}px))`,
                  zIndex: 100 - Math.abs(bead.offset),
                }}
              >
                {/* BEAD */}
                <div
                  className={`
                    relative
                    transition-all
                    duration-200
                    ${bead.active
                      ? `
                          w-[210px]
                          h-[210px]
                          scale-[1.05]
                        `
                      : `
                          w-[190px]
                          h-[190px]
                        `
                    }
                    ${isAnimating && bead.active
                      ? "scale-[1.02] translate-y-[4px]"
                      : ""
                    }
                  `}
                >
                  <Image
                    src="/jap-page-icons/bead.png"
                    alt={`Bead ${bead.beadIndex + 1}`}
                    fill
                    priority={bead.active}
                    className={`
                      object-contain
                      select-none
                      pointer-events-none
                      transition-all
                      duration-200
                      ${bead.active
                        ? `
                            brightness-110
                            drop-shadow-[0_10px_24px_rgba(0,0,0,0.20)]
                          `
                        : `
                            opacity-95
                            drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)]
                          `
                      }
                    `}
                  />

                  {/* DEPTH SHADOW */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-6
                      w-24
                      -translate-x-1/2
                      rounded-full
                      bg-black/10
                      blur-md
                    "
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}