import { JapMala } from "@/components/JapMala";

export default function JapPage() {
  return (
    <div className="min-h-screen bg-[#f8f0e5] px-4 py-8 text-slate-900 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Jap Mala Practice</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            A calm, minimal mala counter for gentle chanting and mindful rhythm.
          </p>
        </div>

        <JapMala />
      </div>
    </div>
  );
}
