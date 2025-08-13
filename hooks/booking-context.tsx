import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Booking, SearchParams, Flight, Fare } from '@/types';

interface BookingState {
  searchParams: SearchParams | null;
  selectedFlight: Flight | null;
  selectedReturnFlight: Flight | null;
  selectedFare: Fare | null;
  bookings: Booking[];
  currentBooking: Booking | null;
  setSearchParams: (params: SearchParams) => void;
  selectFlight: (flight: Flight, isReturn?: boolean) => void;
  selectFare: (fare: Fare) => void;
  createBooking: (booking: Booking) => Promise<void>;
  loadBooking: (pnr: string, lastName: string) => Promise<Booking | null>;
  clearSelection: () => void;
}

export const [BookingProvider, useBooking] = createContextHook<BookingState>(() => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(null);
  const [selectedFare, setSelectedFare] = useState<Fare | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const stored = await AsyncStorage.getItem('bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  };

  const selectFlight = useCallback((flight: Flight, isReturn = false) => {
    if (isReturn) {
      setSelectedReturnFlight(flight);
    } else {
      setSelectedFlight(flight);
    }
  }, []);

  const selectFare = useCallback((fare: Fare) => {
    setSelectedFare(fare);
  }, []);

  const createBooking = useCallback(async (booking: Booking) => {
    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    setCurrentBooking(booking);
    await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
  }, [bookings]);

  const loadBooking = useCallback(async (pnr: string, lastName: string): Promise<Booking | null> => {
    const booking = bookings.find(
      b => b.pnr === pnr.toUpperCase() && b.lastName.toLowerCase() === lastName.toLowerCase()
    );
    if (booking) {
      setCurrentBooking(booking);
      return booking;
    }
    return null;
  }, [bookings]);

  const clearSelection = useCallback(() => {
    setSelectedFlight(null);
    setSelectedReturnFlight(null);
    setSelectedFare(null);
  }, []);

  return useMemo(() => ({
    searchParams,
    selectedFlight,
    selectedReturnFlight,
    selectedFare,
    bookings,
    currentBooking,
    setSearchParams,
    selectFlight,
    selectFare,
    createBooking,
    loadBooking,
    clearSelection,
  }), [searchParams, selectedFlight, selectedReturnFlight, selectedFare, bookings, currentBooking, selectFlight, selectFare, createBooking, loadBooking, clearSelection]);
});