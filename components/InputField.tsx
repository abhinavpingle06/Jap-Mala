import type { InputHTMLAttributes, ReactNode } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  trailing?: ReactNode;
};

export function InputField({
  label,
  id,
  trailing,
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <label className="block text-left text-sm font-medium text-slate-200" htmlFor={id}>
      <span>{label}</span>
      <div className="relative mt-3">
        <input
          id={id}
          {...props}
          className={`w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-4 text-slate-100 outline-none transition focus:border-orange-300/40 focus:bg-slate-900/90 ${className}`}
        />
        {trailing ? (
          <div className="absolute inset-y-0 right-4 flex items-center text-slate-300">
            {trailing}
          </div>
        ) : null}
      </div>
    </label>
  );
}
