import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PromoCarousel from './components/PromoCarousel';
import LodgeGrid from './components/LodgeGrid';
import DetailView from './components/DetailView';
import BookingList from './components/BookingList';
import Footer from './components/Footer';
import { useAppStore } from './store';

export default function App() {
  const { selectedLodgeId } = useAppStore();

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Screen Area */}
        {selectedLodgeId ? (
          <DetailView />
        ) : (
          <main className="space-y-4">
            {/* Landing Header Hero */}
            <HeroSection />

            {/* Tropical Highlights Promo */}
            <PromoCarousel />

            {/* Lodge Listings and Filters */}
            <LodgeGrid />
          </main>
        )}
      </div>

      {/* Slide Drawer for Active Bookings/Orders */}
      <BookingList />

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
}
