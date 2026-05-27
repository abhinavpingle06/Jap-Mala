import { memo } from "react";

type BeadProps = {
  active: boolean;
  style: React.CSSProperties;
  label: string;
};

export const Bead = memo(function Bead({ active, style, label }: BeadProps) {
  return (
    <div
      aria-hidden="true"
      title={label}
      className={`pointer-events-none rounded-full border ${
        active
          ? "h-14 w-14 border-[#8a5a32] bg-[#8d6748]"
          : "h-10 w-10 border-[#9c7a58] bg-[#b48c65]"
      } transition-transform duration-150 ease-out`}
      style={style}
    />
  );
});
