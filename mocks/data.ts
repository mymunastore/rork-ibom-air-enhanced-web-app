import { Airport, Destination, Flight, NewsPost, TravelAdvisory } from '@/types';

export const airports: Airport[] = [
  { code: 'UYO', name: 'Akwa Ibom International Airport', city: 'Uyo', country: 'Nigeria', timezone: 'WAT' },
  { code: 'ABV', name: 'Nnamdi Azikiwe International Airport', city: 'Abuja', country: 'Nigeria', timezone: 'WAT' },
  { code: 'CBQ', name: 'Margaret Ekpo International Airport', city: 'Calabar', country: 'Nigeria', timezone: 'WAT' },
  { code: 'ENU', name: 'Akanu Ibiam International Airport', city: 'Enugu', country: 'Nigeria', timezone: 'WAT' },
  { code: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria', timezone: 'WAT' },
  { code: 'ACC', name: 'Kotoka International Airport', city: 'Accra', country: 'Ghana', timezone: 'GMT' },
];

export const destinations: Destination[] = [
  {
    code: 'UYO',
    name: 'Uyo',
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1569607933337-e5117c7e4f4a?w=800',
    description: 'The capital of Akwa Ibom State, known for its hospitality and modern infrastructure.',
    attractions: ['Ibom Plaza', 'Unity Park', 'Ibom Tropicana'],
    weather: { temp: 28, condition: 'Partly Cloudy' },
    flightsPerWeek: 42,
  },
  {
    code: 'ABV',
    name: 'Abuja',
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=800',
    description: 'Nigeria\'s capital city, featuring modern architecture and diplomatic quarters.',
    attractions: ['Aso Rock', 'National Mosque', 'Millennium Park'],
    weather: { temp: 30, condition: 'Sunny' },
    flightsPerWeek: 28,
  },
  {
    code: 'LOS',
    name: 'Lagos',
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1618828665347-d870c38c95c7?w=800',
    description: 'Nigeria\'s commercial hub and largest city, vibrant with culture and business.',
    attractions: ['Victoria Island', 'Lekki Beach', 'National Museum'],
    weather: { temp: 29, condition: 'Humid' },
    flightsPerWeek: 35,
  },
  {
    code: 'ACC',
    name: 'Accra',
    country: 'Ghana',
    image: 'https://images.unsplash.com/photo-1569530593440-e48dc137f7d0?w=800',
    description: 'Ghana\'s capital, blending traditional culture with modern African dynamism.',
    attractions: ['Kwame Nkrumah Park', 'Labadi Beach', 'Makola Market'],
    weather: { temp: 27, condition: 'Partly Cloudy' },
    flightsPerWeek: 7,
  },
];

export const mockFlights: Flight[] = [
  {
    id: 'IB101',
    flightNumber: 'IB101',
    airline: 'Ibom Air',
    from: airports[0], // UYO
    to: airports[4], // LOS
    departureTime: '2025-01-15T08:00:00',
    arrivalTime: '2025-01-15T09:15:00',
    duration: '1h 15m',
    aircraft: 'CRJ 900',
    status: 'scheduled',
    gate: 'A2',
    terminal: '1',
  },
  {
    id: 'IB201',
    flightNumber: 'IB201',
    airline: 'Ibom Air',
    from: airports[0], // UYO
    to: airports[1], // ABV
    departureTime: '2025-01-15T10:30:00',
    arrivalTime: '2025-01-15T11:45:00',
    duration: '1h 15m',
    aircraft: 'CRJ 900',
    status: 'scheduled',
    gate: 'B1',
    terminal: '1',
  },
  {
    id: 'IB301',
    flightNumber: 'IB301',
    airline: 'Ibom Air',
    from: airports[4], // LOS
    to: airports[5], // ACC
    departureTime: '2025-01-15T14:00:00',
    arrivalTime: '2025-01-15T15:30:00',
    duration: '1h 30m',
    aircraft: 'A220-300',
    status: 'scheduled',
    gate: 'C3',
    terminal: '2',
  },
];

export const newsItems: NewsPost[] = [
  {
    id: '1',
    title: 'Ibom Air Expands Fleet with New Airbus A220',
    excerpt: 'Strengthening our commitment to passenger comfort and operational efficiency.',
    content: 'Ibom Air is proud to announce the addition of a new Airbus A220-300 to our growing fleet...',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
    category: 'Fleet',
    publishedAt: '2025-01-10T10:00:00',
    author: 'Ibom Air Communications',
  },
  {
    id: '2',
    title: 'New Route: Uyo to Accra Now Available',
    excerpt: 'Connecting Nigeria and Ghana with daily flights starting February 2025.',
    content: 'We are excited to launch our new international route connecting Uyo to Accra...',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    category: 'Routes',
    publishedAt: '2025-01-08T14:00:00',
    author: 'Ibom Air Communications',
  },
  {
    id: '3',
    title: 'Ibom Flyer Loyalty Program Updates',
    excerpt: 'Earn more points and enjoy exclusive benefits with our enhanced loyalty program.',
    content: 'We have updated our Ibom Flyer program with more ways to earn and redeem points...',
    image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800',
    category: 'Loyalty',
    publishedAt: '2025-01-05T09:00:00',
    author: 'Ibom Air Communications',
  },
];

export const travelAdvisories: TravelAdvisory[] = [
  {
    id: '1',
    title: 'Weather Advisory: Lagos Route',
    severity: 'info',
    affectedRoutes: ['UYO-LOS', 'LOS-UYO'],
    startDate: '2025-01-14T00:00:00',
    endDate: '2025-01-15T23:59:59',
    message: 'Minor delays possible due to seasonal harmattan conditions. Please check flight status before departure.',
  },
];

export const fareTypes = [
  {
    id: 'basic',
    name: 'Basic',
    price: 45000,
    features: [
      '20kg checked baggage',
      'Standard seat',
      'No changes allowed',
      'Non-refundable',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 58000,
    features: [
      '20kg checked baggage',
      'Seat selection',
      'Changes with fee',
      '50% refundable',
      'Priority check-in',
    ],
  },
  {
    id: 'flex',
    name: 'Flex',
    price: 75000,
    features: [
      '30kg checked baggage',
      'Premium seat selection',
      'Free changes',
      'Full refund',
      'Priority boarding',
      'Lounge access',
    ],
  },
];