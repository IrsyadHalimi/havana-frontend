import { PropsWithChildren } from "react";

export default function AuthLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Header */}
      <header className="px-6 md:px-12 py-5 border-b border-[#ebdcb9]/20 bg-white/50 backdrop-blur-md">
        <h1 className="text-2xl font-serif font-bold text-brand-green">
          Havana
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-stone-200/40 p-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-[#ebdcb9]/20 bg-white/50">
        <p className="text-xs text-stone-500 text-center">
          Havana © 2026
        </p>
      </footer>
    </div>
  );
}