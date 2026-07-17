import type {
  SelectHTMLAttributes,
} from "react";

interface Props
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export default function Select({
  label,
  error,
  children,
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] tracking-wider text-stone-400 font-bold block">
        {label}
      </label>
      <select
        {...props}
        className="w-full pl-5 pr-4 py-3.5 bg-[#f5f1ea]/40 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all"
      >
        {children}
      </select>
      {error && (
        <p className="text-red-500 text-xs">
          {error}
        </p>
      )}
    </div>
  );
}