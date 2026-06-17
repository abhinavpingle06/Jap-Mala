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
            className=" flex flex-col items-center
        pb-2 sm:pb-3
        rounded-2xl
        text-center
        px-3 sm:px-2
      "
        >
            <p
                className="
          text-base sm:text-lg
          w-fit
          font-medium
          text-slate-800
          mb-2 p-2 px-3 rounded-2xl
          border border-orange-400 bg-orange-400/60
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