export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  aircraft: string;
  status: 'scheduled' | 'boarding' | 'departed' | 'landed' | 'cancelled' | 'delayed';
  gate?: string;
  terminal?: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export interface SearchParams {
  tripType: 'oneWay' | 'roundTrip' | 'multiCity';
  from: string;
  to: string;
  departDate: Date;
  returnDate?: Date;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: 'economy' | 'premiumEconomy' | 'business';
  currency: 'NGN' | 'GHS' | 'USD';
}

export interface Fare {
  id: string;
  type: 'basic' | 'standard' | 'flex';
  price: number;
  currency: string;
  baggage: {
    cabin: string;
    checked: string;
  };
  changeable: boolean;
  refundable: boolean;
  seatSelection: boolean;
  priorityBoarding: boolean;
  loungeAccess: boolean;
}

export interface Booking {
  pnr: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  flights: Flight[];
  passengers: Passenger[];
  status: 'confirmed' | 'pending' | 'cancelled';
  totalAmount: number;
  currency: string;
  createdAt: string;
  checkInAvailable: boolean;
}

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  seatNumber?: string;
  specialRequests?: string[];
}

export interface LoyaltyAccount {
  memberId: string;
  tier: 'green' | 'orange' | 'top';
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  milesFlown: number;
  segmentsFlown: number;
  tierProgress: number;
  expiringPoints: {
    amount: number;
    date: string;
  };
  transactions: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'redeemed' | 'expired';
  balance: number;
}

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  publishedAt: string;
  date: string;
  author: string;
}

export interface TravelAdvisory {
  id: string;
  title: string;
  severity: 'info' | 'warning' | 'critical';
  affectedRoutes: string[];
  startDate: string;
  endDate?: string;
  message: string;
}

export interface Destination {
  code: string;
  name: string;
  country: string;
  image: string;
  description: string;
  attractions: string[];
  weather: {
    temp: number;
    condition: string;
  };
  flightsPerWeek: number;
  price?: number;
}