// src/features/auth/views/AuthView.tsx
import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User as UserIcon, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useAuth } from '../../../hooks/useAuth';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { User } from '../../../types/auth.type';

export default function AuthView() {
  const { authScreen, setAuthScreen } = useAuthStore();
  const { login, register, verify, resendToken, loading, error, setError } = useAuth();

  // State Form Terpusat sementara
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<User['role']>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Membaca token dari URL browser (?token=897d632...)
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');

    // Jika user berada di layar 'verify' dan ada token di URL-nya, jalankan otomatis
    if (authScreen === 'verify' && tokenFromUrl && !hasTriggered) {
      setHasTriggered(true); // Kunci agar tidak double-hit
      setError(null);

      // Jalankan fungsi verify bawaan hooks milikmu
      verify(tokenFromUrl, password)
        .then(() => {
          setVerifyStatus('success');
        })
        .catch(() => {
          setVerifyStatus('error');
        });
    }
  }, [authScreen, hasTriggered, verify, password, setError]);

  if (!authScreen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError('Harap isi semua kolom');
    login({ email, password });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !role) return setError('Harap lengkapi semua kolom');
    register({ fullName, email, password, role });
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <div className="relative">
                <Select
                  label="Pilih Role"
                  icon={<UserIcon className="w-4 h-4" />} // Ikon di kiri otomatis rapi
                  tip="Pilih 'Tenant' jika Anda ingin membuka toko."
                  value={role}
                  onChange={(e) => setRole(e.target.value as User['role'])}
                >
                  <option value="customer">Customer</option>
                  <option value="tenant">Tenant</option>
                </Select>
              </div>
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
            <div className="space-y-6 py-4 text-center">
              {verifyStatus === 'success' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-semibold text-stone-900">Email Terverifikasi!</h2>
                    <p className="text-xs text-stone-500 max-w-[280px] mx-auto leading-relaxed">
                      Akun Anda telah aktif. Silakan kembali ke menu Masuk untuk mengakses platform Havana.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setAuthScreen('login'); setVerifyStatus('idle'); setHasTriggered(false); }}
                    className="w-full bg-[#3a6851] text-white py-3.5 rounded-xl font-semibold text-xs"
                  >
                    Masuk Sekarang
                  </button>
                </div>
              )}
              {verifyStatus === 'error' && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-200">
                      <ShieldAlert className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-semibold text-stone-900">Verifikasi Gagal</h2>
                    <p className="text-xs text-red-500 max-w-[280px] mx-auto leading-relaxed font-medium">
                      {error || 'Tautan verifikasi tidak valid atau telah kedaluwarsa.'}
                    </p>
                  </div>
                  <hr className="border-stone-200" />
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Butuh tautan baru?</p>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => { setError(null); resendToken(email); }}
                      className="text-xs text-brand-gold font-bold underline hover:text-[#3a6851] disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Mengirim Ulang...' : 'Kirim Ulang Tautan Verifikasi'}
                    </button>
                  </div>
                </div>
              )}
              {verifyStatus === 'idle' && (
                <>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-[#f5f1ea] text-brand-green rounded-full flex items-center justify-center border border-stone-200">
                      <Mail className="w-8 h-8 text-[#3a6851]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-semibold text-stone-900">
                      {loading ? 'Memproses Akun Anda' : 'Mengecek Email Anda'}
                    </h2>
                    <p className="text-xs text-stone-500 max-w-[280px] mx-auto leading-relaxed">
                      {loading 
                        ? 'Sedang menvalidasi token verifikasi Anda, mohon tunggu sebentar...'
                        : 'Kami telah mengirimkan tautan verifikasi ke email aktif Anda. Silakan klik tautan tersebut untuk mengaktifkan akun.'
                      }
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-stone-400 text-xs py-2">
                    <svg className="animate-spin h-4 w-4 text-[#3a6851]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{loading ? 'Memverifikasi...' : 'Menunggu tindakan Anda...'}</span>
                  </div>

                  <hr className="border-stone-200" />

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Tidak menerima email?</p>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => resendToken(email)}
                      className="text-xs text-brand-gold font-bold underline hover:text-[#3a6851] disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Mengirim Ulang...' : 'Kirim Ulang Tautan Verifikasi'}
                    </button>
                  </div>
                </>
              )}
            </div>
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