// src/features/auth/views/AuthView.tsx
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User as UserIcon, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useAuth } from '../../../hooks/useAuth';
import { Input } from '../../../components/ui/Input';

export default function AuthView() {
  const { authScreen, setAuthScreen } = useAuthStore();
  const { login, register, verify, resendToken, loading, error, setError } = useAuth();

  // State Form Terpusat sementara
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  if (!authScreen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError('Harap isi semua kolom');
    login({ email, password });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return setError('Harap lengkapi semua kolom');
    register({ name, email, password });
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpCode.join('');
    if (token.length < 6) return setError('Kode verifikasi harus 6 digit');
    // Meneruskan token dan password asal sesuai kebutuhan signature controller backend kamu
    verify(token, password); 
  };

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otpCode];
    newOtp[index] = val.slice(-1);
    setOtpCode(newOtp);

    if (val && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-cream flex flex-col justify-between">
      {/* Header */}
      <header className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#ebdcb9]/20 bg-white/50 backdrop-blur-md">
        <div onClick={() => setAuthScreen(null)} className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl font-serif font-bold text-brand-green tracking-wide">Havana</span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
        </div>
        <div className="flex items-center gap-4">
          {authScreen === 'login' ? (
            <button onClick={() => { setAuthScreen('register'); setError(null); }} className="text-xs font-semibold text-stone-600">Daftar</button>
          ) : (
            <button onClick={() => { setAuthScreen('login'); setError(null); }} className="text-xs font-semibold text-stone-600">Masuk</button>
          )}
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-grow flex items-center justify-center p-6 md:py-16">
        <div className="w-full max-w-lg bg-white rounded-3xl border border-stone-200/40 p-8 md:p-10 shadow-xl space-y-8 relative">
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-red-600">
              <ShieldAlert className="w-4.5 h-4.5 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* SCREEN 1: LOGIN */}
          {authScreen === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-semibold text-stone-900">Selamat Datang</h2>
              </div>
              <Input
                label="Email"
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                tip='Tip: Gunakan admin@havana.com jika rolenya admin.'
              />
              <div className="relative">
                <Input
                  label="Kata Sandi"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-9 text-stone-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#3a6851] text-white py-4 rounded-xl font-semibold text-xs">
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
          )}

          {/* SCREEN 2: REGISTER */}
          {authScreen === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-semibold text-stone-900">Daftar Akun Baru</h2>
              </div>
              <Input
                label="Nama Lengkap"
                type="text"
                required
                placeholder="Masukkan nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<UserIcon className="w-4 h-4" />}
              />
              <Input
                label="Email"
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Kata Sandi"
                type="password"
                required
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
              />
              <button type="submit" disabled={loading} className="w-full bg-[#3a6851] text-white py-4 rounded-xl font-semibold text-xs">
                {loading ? 'Mendaftar...' : 'Daftar'}
              </button>
            </form>
          )}

          {/* SCREEN 3: VERIFY EMAIL */}
          {authScreen === 'verify' && (
            <form onSubmit={handleVerifySubmit} className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-semibold text-stone-900">Verifikasi Email</h2>
                <p className="text-xs text-stone-500">Kode dikirim ke email aktif Anda.</p>
              </div>
              <div className="flex justify-center gap-2">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 border text-center rounded-xl font-bold text-lg text-brand-green bg-[#f5f1ea]/20"
                  />
                ))}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#3a6851] text-white py-4 rounded-xl font-semibold text-xs">
                {loading ? 'Memverifikasi...' : 'Verifikasi Akun'}
              </button>
              <div className="text-center">
                <button type="button" onClick={() => resendToken(email)} className="text-xs text-brand-gold font-bold underline">
                  Kirim Ulang Kode
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-[#ebdcb9]/20 bg-white/50 backdrop-blur-md text-center md:text-left">
        <div className="text-xs text-stone-500">Havana. © 2026. Trust, Efficiency, and Clarity.</div>
      </footer>
    </div>
  );
}