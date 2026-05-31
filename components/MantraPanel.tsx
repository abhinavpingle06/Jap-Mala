import { MANTRAS, MantraKey } from "./Mantras";

type MantraDisplayProps = {
    mantraKey: MantraKey;
};

export function MantraDisplay({
    mantraKey,
}: MantraDisplayProps) {
    const mantra = MANTRAS[mantraKey];

    return (
        <div
            className="
        pb-4 sm:pb-6
        rounded-2xl
        border
        border-slate-200
        text-center
        px-2 sm:px-0
      "
        >
            <p
                className="
          text-base sm:text-lg
          font-medium
          text-slate-700
          mb-2
        "
            >
                {mantra.title}
            </p>

            <p
                className="
          text-lg sm:text-2xl
          font-semibold
          leading-relaxed
          text-slate-900
          whitespace-pre-line
          break-words
        "
            >
                {mantra.text}
            </p>
        </div>
    );
}