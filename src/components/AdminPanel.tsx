import { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Settings, 
  LogOut, 
  Sparkles, 
  Star, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  DollarSign, 
  Leaf, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useAppStore } from '../store';

export default function AdminPanel() {
  const { 
    adminActiveTab, 
    setAdminActiveTab, 
    setAdminMode, 
    bookings, 
    cancelBooking 
  } = useAppStore();

  const [selectedRoomId, setSelectedRoomId] = useState('studio-eksekutif');
  const [markupPercent, setMarkupPercent] = useState('15');
  const [peakPrice, setPeakPrice] = useState('270');
  const [occupancyStatus, setOccupancyStatus] = useState('Tersedia');
  const [successMessage, setSuccessMessage] = useState('');

  const [activeDateRange, setActiveDateRange] = useState('Harian');

  const handleUpdateInventory = () => {
    setSuccessMessage('Inventaris massal berhasil diperbarui!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleApplyGlobalMarkup = () => {
    setSuccessMessage(`Sukses menerapkan kenaikan global +${markupPercent}% untuk semua tipe kamar.`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f5f1ea]/30 flex flex-col md:flex-row text-stone-900" id="admin-panel-viewport">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-[#ebdcb9]/30 flex flex-col justify-between" id="admin-sidebar">
        <div>
          {/* Sidebar Header Brand */}
          <div className="p-6 border-b border-[#ebdcb9]/15 flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-brand-green tracking-wide">
              Havana
            </span>
            <span className="text-[9px] bg-brand-gold/10 text-brand-gold font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Console
            </span>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            {[
              { id: 'Resor', label: 'Resor', icon: Building2 },
              { id: 'Manajemen Kamar', label: 'Manajemen Kamar', icon: Calendar },
              { id: 'Analitik', label: 'Analitik', icon: TrendingUp },
              { id: 'Pesanan', label: 'Pesanan', icon: FileText },
              { id: 'Pengaturan', label: 'Pengaturan', icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = adminActiveTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#3a6851] text-white shadow-md shadow-brand-green/10' 
                      : 'text-stone-600 hover:bg-[#3a6851]/5 hover:text-brand-green'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile footer card */}
        <div className="p-4 border-t border-[#ebdcb9]/15 space-y-3 bg-white">
          <div className="flex items-center justify-between gap-2 bg-[#fbf9f6] p-3 rounded-xl border border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center">
                HA
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">Admin Havana</p>
                <p className="text-[10px] text-stone-500 font-medium">admin@havana.com</p>
              </div>
            </div>
            <button
              onClick={() => setAdminMode(false)}
              className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Keluar dari Panel Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow p-6 md:p-8 space-y-6 overflow-y-auto">

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center gap-3 text-xs animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* TAB 1: ANALITIK (Matches Image 1) */}
        {adminActiveTab === 'Analitik' && (
          <div className="space-y-6" id="analitik-dashboard">
            
            {/* Header Title Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-serif font-bold text-stone-900">Analitik Performa Resor</h1>
                <p className="text-xs text-stone-500">Wawasan holistik tentang pertumbuhan ekologis dan finansial tempat istirahat Anda.</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Switchers */}
                <div className="bg-stone-100 p-1 rounded-xl flex border border-stone-200">
                  {['Harian', 'Mingguan', 'Bulanan'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setActiveDateRange(mode)}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                        activeDateRange === mode 
                          ? 'bg-white text-stone-900 shadow-sm' 
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Simulated Date Picker Button */}
                <button className="flex items-center gap-2 bg-brand-green text-white px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>01 Feb - 28 Feb, 2026</span>
                </button>
              </div>
            </div>

            {/* Top row with 4 dynamic metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Revenue */}
              <div className="bg-white border border-stone-200/50 p-5 rounded-2xl space-y-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <DollarSign className="w-4.5 h-4.5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    +12.4%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">
                    TOTAL PENDAPATAN
                  </span>
                  <span className="text-xl font-bold text-stone-950 font-serif tracking-wide block mt-0.5">
                    Rp.42.850,00
                  </span>
                </div>
              </div>

              {/* Card 2: Occupancy */}
              <div className="bg-white border border-stone-200/50 p-5 rounded-2xl space-y-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <Leaf className="w-4.5 h-4.5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    +3.1%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">
                    RATA-RATA OKUPANSI
                  </span>
                  <span className="text-xl font-bold text-stone-950 font-serif tracking-wide block mt-0.5">
                    94.2%
                  </span>
                </div>
              </div>

              {/* Card 3: Total Bookings */}
              <div className="bg-white border border-stone-200/50 p-5 rounded-2xl space-y-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    -2.4%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">
                    TOTAL PEMESANAN
                  </span>
                  <span className="text-xl font-bold text-stone-950 font-serif tracking-wide block mt-0.5">
                    1.204
                  </span>
                </div>
              </div>

              {/* Card 4: Guest Rating */}
              <div className="bg-white border border-stone-200/50 p-5 rounded-2xl space-y-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Star className="w-4.5 h-4.5 fill-brand-gold" />
                  </div>
                  <span className="bg-stone-100 text-stone-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Stabil
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">
                    RATING TAMU
                  </span>
                  <span className="text-xl font-bold text-stone-950 font-serif tracking-wide block mt-0.5">
                    4.8 / 5.0
                  </span>
                </div>
              </div>

            </div>

            {/* Split row: Double bar chart & Progress bar lists */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Revenue double bar chart column */}
              <div className="lg:col-span-8 bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Tren Pendapatan</h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
                      <span className="text-stone-500">Bulan Ini</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-gold"></span>
                      <span className="text-stone-500">Bulan Lalu</span>
                    </div>
                  </div>
                </div>

                {/* Overlapping double-bars custom chart design */}
                <div className="h-[220px] flex items-end justify-between pt-6 px-4 border-b border-stone-100 relative">
                  
                  {/* Grid background lines */}
                  <div className="absolute inset-x-0 top-1/4 border-t border-stone-100/50 border-dashed"></div>
                  <div className="absolute inset-x-0 top-2/4 border-t border-stone-100/50 border-dashed"></div>
                  <div className="absolute inset-x-0 top-3/4 border-t border-stone-100/50 border-dashed"></div>

                  {[
                    { label: 'SEN', current: 35, previous: 45 },
                    { label: 'SEL', current: 55, previous: 75 },
                    { label: 'RAB', current: 40, previous: 45 },
                    { label: 'KAM', current: 60, previous: 90 },
                    { label: 'JUM', current: 120, previous: 125 },
                    { label: 'SAB', current: 50, previous: 80 },
                    { label: 'MIN', current: 110, previous: 135 }
                  ].map((bar) => (
                    <div key={bar.label} className="flex flex-col items-center gap-3 w-1/8 z-10">
                      
                      {/* Group overlapping height bars */}
                      <div className="relative w-10 h-36 flex items-end justify-center">
                        {/* previous month bar in background (gold/brown) */}
                        <div 
                          style={{ height: `${bar.previous}%` }} 
                          className="absolute w-8 bg-brand-gold rounded-t-md opacity-60 transition-all duration-1000"
                        ></div>
                        {/* current month bar in front (green) */}
                        <div 
                          style={{ height: `${bar.current}%` }} 
                          className="w-8 bg-brand-green rounded-t-md shadow-sm z-10 transition-all duration-1000"
                        ></div>
                      </div>

                      <span className="text-[10px] text-stone-400 font-bold tracking-wider">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segmen progress bars card column */}
              <div className="lg:col-span-4 bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Segmen Akomodasi</h3>
                  
                  <div className="space-y-4 pt-2">
                    {[
                      { name: 'Kabin Hutan', pct: 45, val: '45%' },
                      { name: 'Tenda Tepi Sungai', pct: 32, val: '32%' },
                      { name: 'Pondok Tanah', pct: 23, val: '23%' }
                    ].map((seg) => (
                      <div key={seg.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-stone-700">{seg.name}</span>
                          <span className="text-stone-900">{seg.val}</span>
                        </div>
                        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${seg.pct}%` }} 
                            className="h-full bg-brand-green rounded-full"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="text-xs text-brand-green font-bold hover:underline text-left mt-6">
                  Laporan Inventaris Lengkap
                </button>
              </div>

            </div>

            {/* Occupancy Roadmap (Peta Jalan Okupansi) Table Card */}
            <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Peta Jalan Okupansi</h3>
                  <p className="text-[11px] text-stone-400 font-medium">Status waktu nyata di seluruh resor alam.</p>
                </div>
                
                {/* Legend */}
                <div className="flex items-center gap-4 text-[10px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
                    <span className="text-stone-500">Dipesan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ebdcb9]"></span>
                    <span className="text-stone-500">Pemeliharaan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full border border-dashed border-stone-300"></span>
                    <span className="text-stone-500">Tersedia</span>
                  </div>
                </div>
              </div>

              {/* RoadMap Table View */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead>
                    <tr className="border-b border-stone-100 text-stone-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="py-3 px-3">LOKASI / UNIT</th>
                      {['14 FEB', '15 FEB', '16 FEB', '17 FEB', '18 FEB', '19 FEB', '20 FEB', '21 FEB', '22 FEB', '23 FEB'].map((day) => (
                        <th key={day} className="py-3 px-2 text-center">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700 font-semibold">
                    
                    {/* Row 1 */}
                    <tr>
                      <td className="py-4 px-3 text-stone-900 font-bold">Kabin Cedar Ridge 04</td>
                      <td className="p-2"><span className="block mx-auto h-7 rounded-lg bg-brand-green text-white text-[9px] flex items-center justify-center shadow-sm">RES #23</span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg border border-dashed border-stone-300"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg border border-dashed border-stone-300"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-[#ebdcb9]"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg border border-dashed border-stone-300"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg border border-dashed border-stone-300"></span></td>
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <td className="py-4 px-3 text-stone-900 font-bold">Pondok Mossy Bank A</td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg border border-dashed border-stone-300"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg border border-dashed border-stone-300"></span></td>
                      <td className="p-2"><span className="block mx-auto h-7 rounded-lg bg-brand-green text-white text-[9px] flex items-center justify-center shadow-sm">RES #45</span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-[#ebdcb9]"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-[#ebdcb9]"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg border border-dashed border-stone-300"></span></td>
                    </tr>

                    {/* Row 3 */}
                    <tr>
                      <td className="py-4 px-3 text-stone-900 font-bold">Yurt Summit Peak</td>
                      <td className="p-2"><span className="block mx-auto h-7 rounded-lg bg-brand-green text-white text-[9px] flex items-center justify-center shadow-sm">RES #67</span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                      <td className="p-2"><span className="block mx-auto w-11 h-7 rounded-lg bg-brand-green"></span></td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500">
                <span className="font-medium italic">Menampilkan ketersediaan saat ini untuk Musim Puncak</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: MANAJEMEN KAMAR (Matches Image 2) */}
        {adminActiveTab === 'Manajemen Kamar' && (
          <div className="space-y-6" id="manajemen-kamar-panel">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-serif font-bold text-stone-900">Manajemen Resor</h1>
                <p className="text-xs text-stone-500">Kelola inventaris kamar, TARIF musim puncak, dan ketersediaan di tempat istirahat Anda.</p>
              </div>
              <button 
                onClick={() => alert('Fitur pendaftaran kamar baru segera hadir!')}
                className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-3 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4.5 h-4.5" />
                <span>Tambah Tipe Kamar</span>
              </button>
            </div>

            {/* Split layout: left column forms & right column calendars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column forms */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Rooms selection lists */}
                <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-base font-bold text-stone-900">Inventaris Kamar</h3>
                    <span className="text-[10px] bg-stone-100 text-stone-500 font-bold px-2 py-0.5 rounded-full">
                      3 Tipe
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'samudra-deluxe', name: 'Suite Samudra Deluxe', price: 'Rp.240/malam', units: '8 Unit' },
                      { id: 'studio-eksekutif', name: 'Studio Eksekutif', price: 'Rp.180/malam', units: '12 Unit' },
                      { id: 'vila-taman', name: 'Vila Taman', price: 'Rp.350/malam', units: '2 Unit' }
                    ].map((room) => {
                      const isSelected = selectedRoomId === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          className={`p-4 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-brand-green bg-brand-green/5 shadow-sm' 
                              : 'border-stone-200 hover:border-stone-300 bg-stone-50/20'
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-bold text-stone-900">{room.name}</h4>
                            <p className="text-[10px] text-stone-500 font-medium mt-0.5">Dasar: {room.price}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-[#ebdcb9]/30 text-brand-gold-dark font-bold px-2 py-0.5 rounded-md">
                              {room.units}
                            </span>
                            {isSelected && (
                              <div className="flex items-center gap-1 pl-1 border-l border-stone-200 text-stone-400">
                                <Edit2 className="w-3.5 h-3.5 hover:text-brand-green" />
                                <Trash2 className="w-3.5 h-3.5 hover:text-red-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lonjakan Dinamis */}
                <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-stone-900">Lonjakan Dinamis</h3>
                    <p className="text-[11px] text-stone-400 leading-relaxed font-medium">Terapkan kenaikan persentase global untuk hari libur mendatang.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex-grow">
                      <input
                        type="number"
                        value={markupPercent}
                        onChange={(e) => setMarkupPercent(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 bg-[#f5f1ea]/40 border border-stone-200 rounded-xl text-xs font-bold text-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                      />
                      <span className="absolute right-4 top-3 text-xs font-bold text-stone-400">%</span>
                    </div>

                    <button
                      onClick={handleApplyGlobalMarkup}
                      className="bg-[#ebdcb9]/40 hover:bg-[#ebdcb9]/60 text-brand-gold-dark text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      Terapkan Pilihan
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column Calendar details scheduler */}
              <div className="lg:col-span-8 bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-6">
                
                {/* Calendar monthly selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">Desember 2026</h3>
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50"><ChevronLeft className="w-4 h-4" /></button>
                      <button className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-gold"></span>
                      <span>TARIF PUNCAK</span>
                    </div>

                    <select 
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="bg-stone-50 border border-stone-200 text-stone-700 text-[10px] font-bold py-1.5 px-3 rounded-lg focus:outline-none"
                    >
                      <option value="studio-eksekutif">Studio Eksekutif</option>
                      <option value="samudra-deluxe">Suite Samudra Deluxe</option>
                      <option value="vila-taman">Vila Taman</option>
                    </select>
                  </div>
                </div>

                {/* Calendar Days Names Headers */}
                <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-stone-400 uppercase tracking-wider">
                  <span>Min</span>
                  <span>Sen</span>
                  <span>Sel</span>
                  <span>Rab</span>
                  <span>Kam</span>
                  <span>Jum</span>
                  <span>Sab</span>
                </div>

                {/* Calendar 31-day scheduler grid */}
                <div className="grid grid-cols-7 gap-2.5">
                  {/* offsets space */}
                  {Array.from({ length: 2 }).map((_, idx) => (
                    <div key={`offset-${idx}`} className="h-16 rounded-xl border border-transparent"></div>
                  ))}

                  {/* Month days */}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const dayNum = i + 1;
                    const isPeakPrice = dayNum >= 24 && dayNum <= 26;
                    const isLocked = dayNum === 25;
                    const isPast = dayNum === 31; // block/disabled day
                    
                    return (
                      <div
                        key={dayNum}
                        className={`h-[72px] rounded-xl border p-2 flex flex-col justify-between transition-all select-none ${
                          isLocked 
                            ? 'bg-amber-100/55 border-brand-gold ring-1 ring-brand-gold' 
                            : isPeakPrice
                              ? 'bg-[#c2a370]/10 border-brand-gold'
                              : 'border-stone-100 hover:border-stone-300 hover:shadow-sm bg-stone-50/10'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-stone-500">{dayNum}</span>
                          {isLocked ? (
                            <span className="text-[7px] bg-[#917547] text-white px-1 py-0.5 rounded uppercase">TERKUNCI</span>
                          ) : isPeakPrice ? (
                            <span className="text-[7px] bg-brand-gold text-white px-1 py-0.5 rounded uppercase">PUNCAK</span>
                          ) : null}
                        </div>

                        <div className="space-y-0.5 text-right">
                          <p className="text-[10px] font-bold text-stone-900">
                            {isLocked ? 'Rp.310' : isPeakPrice ? 'Rp.270' : 'Rp.180'}
                          </p>
                          <p className="text-[7px] text-stone-400 font-bold uppercase">
                            {isLocked ? 'TUTUP' : isPeakPrice ? '3 Tersedia' : '6 Tersedia'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Massive mass selection form block (Pilihan Massal) */}
                <div className="bg-[#fcfaf7] border border-stone-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-end shadow-inner">
                  
                  <div className="md:col-span-4 space-y-1.5 text-left">
                    <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">Pilihan Massal</span>
                    <h4 className="font-serif text-sm font-bold text-stone-900">24 Des — 26 Des (3 hari)</h4>
                  </div>

                  <div className="md:col-span-3 space-y-1.5 text-left">
                    <label className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Status</label>
                    <select
                      value={occupancyStatus}
                      onChange={(e) => setOccupancyStatus(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 focus:outline-none"
                    >
                      <option>Tersedia</option>
                      <option>Penuh</option>
                      <option>Ditutup</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 space-y-1.5 text-left">
                    <label className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Ubah Tarif (Rp)</label>
                    <input
                      type="text"
                      value={peakPrice}
                      onChange={(e) => setPeakPrice(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      onClick={handleUpdateInventory}
                      className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center"
                    >
                      Perbarui
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: RESOR */}
        {adminActiveTab === 'Resor' && (
          <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">Pengaturan Properti Havana</h2>
            <p className="text-xs text-stone-500">Kelola informasi publik, rincian kontak, deskripsi, dan galeri resort Anda.</p>
            <div className="border border-stone-100 rounded-xl p-4 bg-stone-50/50 space-y-3">
              <p className="text-xs text-stone-600 font-medium">Layanan ini membantu menyinkronkan profil Havana Resort Anda dengan Tripadvisor, Airbnb, dan Booking.com secara real-time.</p>
              <button 
                onClick={() => alert('Fitur Integrasi Saluran segera hadir!')}
                className="px-4 py-2 bg-brand-green text-white text-xs font-semibold rounded-lg"
              >
                Hubungkan Saluran OTA
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PESANAN */}
        {adminActiveTab === 'Pesanan' && (
          <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-stone-900">Daftar Reservasi Aktif</h2>
              <p className="text-xs text-stone-500">Pantau semua pesanan masuk, check-in tamu, dan riwayat pembayaran.</p>
            </div>

            {bookings.length === 0 ? (
              <div className="py-12 text-center text-stone-400 text-xs">
                Belum ada reservasi masuk untuk periode ini.
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {bookings.map((b) => (
                  <div key={b.id} className="py-4 flex justify-between items-center text-xs gap-4">
                    <div>
                      <h4 className="font-bold text-stone-900">{b.lodgeName} — {b.roomName}</h4>
                      <p className="text-stone-500 text-[10px] mt-0.5">Stay: {b.startDate} s/d {b.endDate} ({b.nights} malam)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-green">Rp.{b.totalPrice}.000</p>
                      <button 
                        onClick={() => cancelBooking(b.id)}
                        className="text-[10px] text-red-500 hover:underline mt-1 cursor-pointer font-semibold block"
                      >
                        Batalkan Reservasi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PENGATURAN */}
        {adminActiveTab === 'Pengaturan' && (
          <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">Konfigurasi Console</h2>
            <p className="text-xs text-stone-500">Ubah hak akses staf, preferensi mata uang, dan kebijakan pembatalan otomatis.</p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between items-center py-2.5 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Mata Uang Default</span>
                <span className="font-bold">Rupiah Indonesia (Rp)</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Batas Check-in Mandiri</span>
                <span className="font-bold">14:00 WITA</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-stone-600 font-medium">Sistem Pajak Ekologi Otomatis</span>
                <span className="text-brand-green font-bold flex items-center gap-1">Aktif</span>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
