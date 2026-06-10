"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { CounterPanel } from "@/components/CounterPanel";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import { Home } from "lucide-react";

const beadCount = 108;
const visibleBeadCount = 10;
const topBeadIndx = beadCount - (visibleBeadCount/2); //103
const centerIndex = Math.floor(visibleBeadCount / 2);

const beadSpacing = 95;
const animationDuration = 180;

function normalizeIndex(index: number) {
  return ((index % beadCount) + beadCount) % beadCount;
}

export function JapMala() {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);

  // Main Bead Position
  const [location, setLocation] = useState(5);

  // Logical mala position
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);

  // Visual translate offset
  const [visualOffset, setVisualOffset] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const beadAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(()=>{
    const audio = new Audio("audios/beads_audio1.mp3")
    audio.preload = "auto";
    audio.volume = 1;
    audio.load();
    beadAudioRef.current = audio
  },[])

  const columnOffset = -50;

  // RESET
  const handleReset = useCallback(() => {
    setCount(0);
    setRounds(0);
    setCurrentIndex(0);
    setVisualOffset(0);
    setIsAnimating(false);
    setLocation(5);

    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    //   timeoutRef.current = null;
    // }
  }, []);

  // VIBRATION HANDLER
  const OnclickVibrate = () => {
    if(typeof window == "undefined") return

    const nav = navigator as Navigator & {
      vibrate?: (pattern: number | number[]) => boolean;
    };

    nav.vibrate?.(15);
  }

  // TAP HANDLER
  const handleTap = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
  
    // VIBRATIONS
    OnclickVibrate()

    // BEADS AUDIO
    if (beadAudioRef.current) {
      beadAudioRef.current.currentTime = 0;
      beadAudioRef.current.play().catch(() => { });
    }

    // Move beads DOWN visually
    setVisualOffset(beadSpacing);

    timeoutRef.current = setTimeout(() => {
      // Update logical mala index
      setCurrentIndex((prev) => normalizeIndex(prev + 1));

      // Update Location
      setLocation((prev) => (prev + 1))
      // Update counter
      setCount((prev) => {
        const next = prev + 1;
        if (next > beadCount) {
          return -1;
        }

        return next;
      });
      // Reset visual offset instantly
      if(count == 103){
        setLocation(0);
      }
      // User won't notice because bead positions update
      setVisualOffset(0);

      setIsAnimating(false);

      timeoutRef.current = null;
    }, animationDuration);
  }, [isAnimating]);

  if (count == -1){
    setRounds((rounds) => rounds + 1)
    setCount(0)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ONLY visible beads
  const visibleBeads = useMemo(
    () =>
      Array.from({ length: visibleBeadCount }, (_, position) => {
        const offset = position - centerIndex;

        return {
          beadIndex: normalizeIndex(currentIndex + offset),
          offset,
          active: offset === 0,
          id: `${position}`,
        };
      }),
    [currentIndex]
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8f0e5] flex">
      <div onClick={()=> (window.location.href = "/dashboard")} className="z-50 fixed m-4 top-3 right-4 flex justify-end w-full">
        <div className="rounded-2xl hover:cursor-pointer bg-green-400 p-3"><Home size={20} className="text-white" /></div>
      </div>
      {/* LEFT PANEL */}
      <div className="w-[42%] bg-[#ffead0] border-r border-[#d7c5a8]/40 flex flex-col">
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
          overflow-hidden
          bg-[#f8f0e5]
          flex
          items-center
          justify-center
          touch-manipulation
          cursor-pointer
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
            w-[3px]
            -translate-x-1/2
            bg-[#6f533d]/20
            rounded-full
            z-0
          "
        />

        {/* BEAD COLUMN */}
        <div className="relative h-full w-full overflow-hidden">
          {visibleBeads.map((bead,idx) => {
            // CONTINUOUS FLOW
            const baseY =
              bead.offset * beadSpacing + visualOffset;

            return (
              <div
                key={bead.id}
                className={`
                  absolute
                  left-1/2
                  top-1/2
                  pointer-events-none
                  ${isAnimating
                    ? "transition-transform duration-200 ease-out"
                    : ""
                  }
                `}
                style={{
                  transform: `translate(-50%, calc(-50% + ${baseY + columnOffset}px))`,
                  zIndex: 100 - Math.abs(bead.offset),
                }}
              >
                {/* BEAD */}
                <div
                  className="
                    relative
                    transition-all
                    duration-200
                    ease-out
                  "
                  style={{
                    width: bead.active ? 260 : 230,
                    height: bead.active ? 260 : 230,
                  }}
                >
                  {(count < 5 || count >= topBeadIndx) && idx == location ? (
                    <Image
                      src="/jap-page-icons/108bead.png"
                      alt={`Bead ${bead.beadIndex + 1}`}
                      fill
                      priority={bead.active}
                      draggable={false}
                      className={`
                      object-contain
                      select-none
                      pointer-events-none
                      transition-all
                      duration-200
                    `}
                    />
                  ) : (
                      <Image
                    src = "/jap-page-icons/bead.png"
                    alt = {`Bead ${bead.beadIndex + 1}`}
                  fill
                  priority={bead.active}
                  draggable={false}
                  className={`
                      object-contain
                      select-none
                      pointer-events-none
                      transition-all
                      duration-200
                      ${bead.active
                      ? "brightness-130"
                      : "opacity-95"
                    }
                    `}
                  />
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}