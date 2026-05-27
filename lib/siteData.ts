import { Activity, Music, CloudOff, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#footer" },
];

export const featureItems: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Digital Mala Counter",
    description: "Track each mantra bead with calm precision and mindful clarity.",
    icon: Activity,
  },
  {
    title: "Ambient Music",
    description: "Layer gentle soundscapes for deeper meditation and focus.",
    icon: Music,
  },
  {
    title: "Offline Access",
    description: "Continue your practice anywhere, even without internet.",
    icon: CloudOff,
  },
  {
    title: "Daily Progress",
    description: "See your rhythm, streaks, and moments of quiet presence.",
    icon: Sparkles,
  },
];
