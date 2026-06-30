import { Lodge } from './types';

export const lodgesData: Lodge[] = [
  {
    id: 'bamboo-canopy',
    name: 'The Bamboo Canopy Forest Resort',
    location: 'Ubud, Bali',
    rating: 4.9,
    basePrice: 320, // matching Room 1 price of 320
    description: 'Melarikan diri ke tempat perlindungan di mana kemewahan berkelanjutan bertemu dengan alam liar. The Bamboo Canopy Forest Resort menawarkan pengalaman unik ke dalam ritme hutan. Tempat peristirahatan kami dibuat dari bambu dan batu lokal, dirancang untuk bernapas bersama lingkungan sambil menyediakan setiap kenyamanan modern bagi pelancong yang sadar lingkungan.',
    mainImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80', // main pool in jungle
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',  // open-air jungle stone bath
      'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',  // treehouse/jungle view room bed
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',  // outdoor terrace balcony
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'   // high-end resort kitchen / villa interior
    ],
    category: 'Vila',
    tag: 'SANCTUARI HAVANA',
    availableRooms: [
      {
        id: 'forest-suite',
        name: 'Forest Suite',
        features: ['Balkon Pribadi', 'Shower Terbuka', 'Kasur King'],
        pricePerNight: 320,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'treetop-sanctuary',
        name: 'Treetop Sanctuary',
        features: ['Pemandangan Panoramik', 'Kolam Rendam', 'Tekstur Organik'],
        pricePerNight: 450,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'eco-bamboo',
    name: 'Eco-Bamboo Lodge',
    location: 'Ubud, Bali',
    rating: 4.8,
    basePrice: 180,
    description: 'Terbuka langsung ke lembah hijau subur Ubud, pondok bambu berkelanjutan ini menyatukan kedamaian spiritual dan keaslian material lokal. Dibuat seluruhnya dari bambu hitam alami dengan desain yang menjunjung tinggi privasi serta angin segar pegunungan.',
    mainImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1596563437135-247304777a41?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Eco-Lodge',
    tag: 'BERKELANJUTAN',
    availableRooms: [
      {
        id: 'bamboo-nest',
        name: 'Bamboo Nest Suite',
        features: ['Hammock Lembah', 'Pancuran Air Alami', 'Queen Bed'],
        pricePerNight: 180,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'eco-deluxe',
        name: 'Eco Deluxe Room',
        features: ['Balkon Jaring', 'Set Seduh Kopi Lokal', 'King Bed'],
        pricePerNight: 240,
        image: 'https://images.unsplash.com/photo-1596563437135-247304777a41?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'treehouse-haven',
    name: 'Treehouse Haven',
    location: 'Ubud, Bali',
    rating: 4.7,
    basePrice: 210,
    description: 'Nikmati sensasi tinggal di atas dahan pohon kelapa yang tinggi dengan pemandangan 360 derajat ke sawah abadi dan kanopi hijau Ubud. Dilengkapi jembatan gantung kayu yang indah dan ruang santai semi-terbuka untuk bermeditasi.',
    mainImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Rumah Pohon',
    tag: 'DEKAT ALAM',
    availableRooms: [
      {
        id: 'canopy-nest',
        name: 'Canopy Nest Room',
        features: ['Tangga Putar Alami', 'Jendela Kaca Penuh', 'Double Bed'],
        pricePerNight: 210,
        image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'sky-suite',
        name: 'Sky high Suite',
        features: ['Bak Berendam di Dahan', 'Lantai Kayu Jati', 'Super King Bed'],
        pricePerNight: 290,
        image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'jungle-spa-villa',
    name: 'Jungle Spa Villa',
    location: 'Ubud, Bali',
    rating: 4.95,
    basePrice: 340,
    description: 'Sebuah perpaduan sempurna antara kenyamanan vila bintang lima dengan spa pribadi bertenaga mata air pegunungan yang jernih. Setiap sudut vila ini dirancang untuk memaksimalkan relaksasi raga, pikiran, dan jiwa Anda di tengah rimbunnya belantara tropis.',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Vila',
    tag: 'SPA UTAMA',
    availableRooms: [
      {
        id: 'spa-suite',
        name: 'Luxury Spa Suite',
        features: ['Bathtub Batu Vulkanik', 'Teras Pijat Pribadi', 'King Bed'],
        pricePerNight: 340,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'jungle-pavilion',
        name: 'Presidential Jungle Pavilion',
        features: ['Kolam Air Hangat', 'Layanan Butler 24 Jam', 'Grand King Bed'],
        pricePerNight: 550,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'hideout-bamboo',
    name: 'Hideout Bamboo Oasis',
    location: 'Karangasem, Bali',
    rating: 4.88,
    basePrice: 220,
    description: 'Menjauh dari hiruk-pikuk perkotaan di sebuah oasis bambu tersembunyi di kaki Gunung Agung yang megah. Pondok pinggir sungai ini menawarkan kedamaian mutlak yang dipadukan dengan kemurnian tradisi pedesaan Bali.',
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Eco-Lodge',
    tag: 'REKOMENDASI',
    availableRooms: [
      {
        id: 'river-suite',
        name: 'Riverside Comfort Suite',
        features: ['Suara Gemercik Air', 'Pancuran Luar Ruangan', 'King Bed'],
        pricePerNight: 220,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'hanging-gardens',
    name: 'Hanging Gardens Retreat',
    location: 'Payangan, Bali',
    rating: 4.96,
    basePrice: 420,
    description: 'Terkenal dengan kolam renang bertingkat ikonik yang menggantung di atas jurang hijau, properti ini menawarkan puncak kemewahan ekologis di pulau dewata. Dirancang dengan sangat cermat agar tidak mengganggu kontur alam sekitarnya.',
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Vila',
    tag: 'KEMEWAHAN',
    availableRooms: [
      {
        id: 'hanging-pool-suite',
        name: 'Hanging Pool Suite',
        features: ['Plunge Pool Pribadi', 'Dek Berjemur Luas', 'Super King Bed'],
        pricePerNight: 420,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];
