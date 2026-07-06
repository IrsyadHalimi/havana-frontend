// src/components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  tip?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, tip, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        <label className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`w-full pl-11 pr-4 py-3.5 bg-[#f5f1ea]/40 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all ${className}`}
            {...props}
          />
          {icon && <div className="absolute left-4 top-4 text-stone-400">{icon}</div>}
        </div>
        {tip && <p className="text-[10px] text-stone-400 font-medium italic">{tip}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';