import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/hooks/auth-context";
import { BookingProvider } from "@/hooks/booking-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="auth/login" 
        options={{ 
          title: "Login",
          presentation: "modal" 
        }} 
      />
      <Stack.Screen 
        name="auth/register" 
        options={{ 
          title: "Join Ibom Flyer",
          presentation: "modal" 
        }} 
      />
      <Stack.Screen 
        name="booking/search-results" 
        options={{ 
          title: "Select Flight",
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="booking/fare-selection" 
        options={{ 
          title: "Select Fare",
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="booking/passenger-details" 
        options={{ 
          title: "Passenger Details",
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="booking/payment" 
        options={{ 
          title: "Payment",
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="booking/confirmation" 
        options={{ 
          title: "Booking Confirmed",
          headerShown: true,
          headerBackVisible: false 
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookingProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </BookingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}