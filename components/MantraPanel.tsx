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
        pb-2 sm:pb-3
        rounded-2xl
        text-center
        px-3 sm:px-2
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
          text-sm sm:text-2xl
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