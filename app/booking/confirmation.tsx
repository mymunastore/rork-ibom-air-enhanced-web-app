import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, Mail } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useBooking } from '@/hooks/booking-context';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { currentBooking } = useBooking();

  if (!currentBooking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No booking found</Text>
          <Button
            title="Go to Home"
            onPress={() => router.replace('/(tabs)')}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.successHeader}>
          <CheckCircle size={64} color={Colors.success} />
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your flight has been successfully booked
          </Text>
        </View>

        <Card style={styles.bookingCard}>
          <View style={styles.pnrContainer}>
            <Text style={styles.pnrLabel}>Booking Reference</Text>
            <Text style={styles.pnrValue}>{currentBooking.pnr}</Text>
          </View>

          <View style={styles.info}>
            <Mail size={20} color={Colors.gray[500]} />
            <Text style={styles.infoText}>
              Confirmation email sent to {currentBooking.email}
            </Text>
          </View>
        </Card>

        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Flight Details</Text>
          
          {currentBooking.flights.map((flight) => (
            <View key={flight.id} style={styles.flightInfo}>
              <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
              <Text style={styles.route}>
                {flight.from.city} ({flight.from.code}) → {flight.to.city} ({flight.to.code})
              </Text>
              <Text style={styles.dateTime}>
                {new Date(flight.departureTime).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text style={styles.time}>
                Departure: {new Date(flight.departureTime).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          ))}
        </Card>

        <Card style={styles.passengersCard}>
          <Text style={styles.sectionTitle}>Passengers</Text>
          
          {currentBooking.passengers.map((passenger, index) => (
            <View key={passenger.id} style={styles.passenger}>
              <Text style={styles.passengerName}>
                {index + 1}. {passenger.title} {passenger.firstName} {passenger.lastName}
              </Text>
            </View>
          ))}
        </Card>

        <View style={styles.actions}>
          <Button
            title="Download Ticket"
            onPress={() => {}}
            variant="outline"
            size="large"
            style={styles.actionButton}
          />
          
          <Button
            title="Manage Booking"
            onPress={() => router.replace('/manage' as any)}
            variant="outline"
            size="large"
            style={styles.actionButton}
          />
          
          <Button
            title="Book Another Flight"
            onPress={() => router.replace('/(tabs)')}
            size="large"
          />
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
  successHeader: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.success + '10',
  },
  successTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold' as const,
    color: Colors.success,
    marginTop: Spacing.md,
  },
  successSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  bookingCard: {
    margin: Spacing.md,
  },
  pnrContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  pnrLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  pnrValue: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  detailsCard: {
    margin: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  flightInfo: {
    paddingVertical: Spacing.sm,
  },
  flightNumber: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  route: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    marginTop: Spacing.xs,
  },
  dateTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  time: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  passengersCard: {
    margin: Spacing.md,
  },
  passenger: {
    paddingVertical: Spacing.xs,
  },
  passengerName: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  actions: {
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
});