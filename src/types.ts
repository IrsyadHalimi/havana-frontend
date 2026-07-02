export interface Room {
  id: string;
  name: string;
  features: string[];
  pricePerNight: number; // in thousands (e.g. 320 for Rp 320.000)
  image: string;
}

export interface Lodge {
  id: string;
  name: string;
  location: string;
  rating: number;
  basePrice: number; // in thousands (e.g. 180 for Rp 180.000)
  description: string;
  mainImage: string;
  images: string[]; // 5 images for gallery
  category: 'Semua' | 'Eco-Lodge' | 'Rumah Pohon' | 'Vila';
  tag: string;
  availableRooms: Room[];
}

export interface Booking {
  id: string;
  lodgeId: string;
  lodgeName: string;
  roomName: string;
  startDate: string;
  endDate: string;
  nights: number;
  totalGuests: number;
  pricePerNight: number;
  subtotal: number;
  ecoTax: number;
  totalPrice: number;
  createdAt: string;
}

export interface SearchQuery {
  location: string;
  startDate: string;
  endDate: string;
  guests: number;
}

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'user';
  isVerified: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  basePrice: number;
  totalUnits: number;
  availableUnits: number;
}
