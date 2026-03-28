import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { LoyaltyAccount } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  user: LoyaltyAccount | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export const [AuthProvider, useAuth] = createContextHook<AuthState>(() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoyaltyAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    const mockUser: LoyaltyAccount = {
      memberId: 'IB' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      tier: 'green',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      points: 2500,
      milesFlown: 15000,
      segmentsFlown: 12,
      tierProgress: 35,
      expiringPoints: {
        amount: 500,
        date: '2025-03-31',
      },
      transactions: [
        {
          id: '1',
          date: '2025-01-10',
          description: 'Flight UYO-LOS',
          points: 250,
          type: 'earned',
          balance: 2500,
        },
        {
          id: '2',
          date: '2025-01-05',
          description: 'Flight ABV-UYO',
          points: 200,
          type: 'earned',
          balance: 2250,
        },
      ],
    };

    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    // Mock registration
    const newUser: LoyaltyAccount = {
      memberId: 'IB' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      tier: 'green',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      points: 0,
      milesFlown: 0,
      segmentsFlown: 0,
      tierProgress: 0,
      expiringPoints: {
        amount: 0,
        date: '',
      },
      transactions: [],
    };

    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
  }, []);

  return useMemo(() => ({
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
  }), [isAuthenticated, user, loading, login, logout, register]);
});