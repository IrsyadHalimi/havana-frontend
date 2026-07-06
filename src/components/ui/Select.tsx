import React from 'react';

// Menggunakan SelectHTMLAttributes agar mendukung semua properti bawaan elemen <select>
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: React.ReactNode;
  tip?: string;
  children: React.ReactNode; // Untuk menampung elemen <option>
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, icon, tip, className, children, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {/* Label dengan style uppercase yang persis seperti Input */}
        <label className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
          {label}
        </label>
        
        <div className="relative">
          <select
            ref={ref}
            /* Styling disamakan persis, pr-10 ditambahkan agar teks tidak menabrak panah default select */
            className={`w-full pl-11 pr-10 py-3.5 bg-[#f5f1ea]/40 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all appearance-none ${className}`}
            {...props}
          >
            {children}
          </select>
          
          {icon && (
            <div className="absolute left-4 top-4 text-stone-400 pointer-events-none">
              {icon}
            </div>
          )}

          {/* Ikon Panah Kustom (Chevron) di Sebelah Kanan karena kita menggunakan 'appearance-none' */}
          <div className="absolute right-4 top-4.5 text-stone-400 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';