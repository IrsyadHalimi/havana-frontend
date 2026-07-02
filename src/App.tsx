import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PromoCarousel from './components/PromoCarousel';
import LodgeGrid from './components/LodgeGrid';
import DetailView from './components/DetailView';
import BookingList from './components/BookingList';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { useAppStore } from './store';

export default function App() {
  const { selectedLodgeId } = useAppStore();

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col justify-between">
      <AdminPanel/>
    </div>
  );
}
