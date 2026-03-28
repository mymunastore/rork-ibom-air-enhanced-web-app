import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

import { Colors, Typography, Spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { FlightCard } from '@/components/FlightCard';
import { useBooking } from '@/hooks/booking-context';
import { mockFlights } from '@/mocks/data';

export default function SearchResultsScreen() {
  const router = useRouter();
  const { searchParams, selectFlight } = useBooking();

  const handleSelectFlight = (flight: any) => {
    selectFlight(flight);
    router.push('/booking/fare-selection' as any);
  };

  if (!searchParams) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No search parameters found</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.route}>
          <Text style={styles.routeText}>
            {searchParams.from} → {searchParams.to}
          </Text>
          <Text style={styles.dateText}>
            {searchParams.departDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
        </View>
        <Button
          title="Filter"
          onPress={() => {}}
          variant="outline"
          size="small"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.results}>
          <Text style={styles.resultsCount}>
            {mockFlights.length} flights available
          </Text>
          
          {mockFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onPress={() => handleSelectFlight(flight)}
              showPrice
              price={45000}
              currency="NGN"
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  route: {
    flex: 1,
  },
  routeText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  dateText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  results: {
    padding: Spacing.md,
  },
  resultsCount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
});