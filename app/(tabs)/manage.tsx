import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import { Calendar, User, Plane, CreditCard } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { FlightCard } from '@/components/FlightCard';
import { useBooking } from '@/hooks/booking-context';

export default function ManageScreen() {
  const { loadBooking, currentBooking } = useBooking();
  
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRetrieveBooking = async () => {
    if (!pnr || !lastName) {
      Alert.alert('Error', 'Please enter both PNR and Last Name');
      return;
    }

    setLoading(true);
    const booking = await loadBooking(pnr, lastName);
    setLoading(false);

    if (!booking) {
      Alert.alert('Not Found', 'No booking found with the provided details');
    }
  };

  const handleModifyBooking = () => {
    Alert.alert('Modify Booking', 'This feature will be available soon');
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Manage Booking</Text>
          <Text style={styles.subtitle}>View and modify your reservations</Text>
        </View>

        {!currentBooking ? (
          <Card style={styles.searchCard}>
            <Text style={styles.cardTitle}>Retrieve Your Booking</Text>
            
            <Input
              label="Booking Reference (PNR)"
              placeholder="e.g., ABC123"
              value={pnr}
              onChangeText={setPnr}
              autoCapitalize="characters"
              required
            />

            <Input
              label="Last Name"
              placeholder="As shown on booking"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              required
            />

            <Button
              title="Retrieve Booking"
              onPress={handleRetrieveBooking}
              loading={loading}
              size="large"
            />

            <View style={styles.helpText}>
              <Text style={styles.helpTextContent}>
                Your booking reference was sent to your email after booking
              </Text>
            </View>
          </Card>
        ) : (
          <>
            <Card style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View>
                  <Text style={styles.pnrLabel}>Booking Reference</Text>
                  <Text style={styles.pnrValue}>{currentBooking.pnr}</Text>
                </View>
                <View style={[styles.statusBadge, styles[`status_${currentBooking.status}`]]}>
                  <Text style={styles.statusText}>{currentBooking.status.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.passengerInfo}>
                <User size={20} color={Colors.gray[500]} />
                <View style={styles.passengerDetails}>
                  <Text style={styles.passengerName}>
                    {currentBooking.firstName} {currentBooking.lastName}
                  </Text>
                  <Text style={styles.passengerContact}>{currentBooking.email}</Text>
                  <Text style={styles.passengerContact}>{currentBooking.phone}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.bookingMeta}>
                <View style={styles.metaItem}>
                  <Calendar size={16} color={Colors.gray[500]} />
                  <Text style={styles.metaText}>
                    Booked on {new Date(currentBooking.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <CreditCard size={16} color={Colors.gray[500]} />
                  <Text style={styles.metaText}>
                    {currentBooking.currency} {currentBooking.totalAmount.toLocaleString()}
                  </Text>
                </View>
              </View>
            </Card>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Flight Details</Text>
              {currentBooking.flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Passengers</Text>
              {currentBooking.passengers.map((passenger, index) => (
                <Card key={passenger.id} style={styles.passengerCard}>
                  <View style={styles.passengerHeader}>
                    <Text style={styles.passengerNumber}>Passenger {index + 1}</Text>
                    <Text style={styles.passengerType}>{passenger.type.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.passengerFullName}>
                    {passenger.title} {passenger.firstName} {passenger.lastName}
                  </Text>
                  {passenger.seatNumber && (
                    <View style={styles.seatInfo}>
                      <Plane size={14} color={Colors.gray[500]} />
                      <Text style={styles.seatNumber}>Seat {passenger.seatNumber}</Text>
                    </View>
                  )}
                </Card>
              ))}
            </View>

            <View style={styles.actions}>
              <Button
                title="Modify Booking"
                onPress={handleModifyBooking}
                variant="outline"
                size="large"
                style={styles.actionButton}
              />
              <Button
                title="Cancel Booking"
                onPress={handleCancelBooking}
                variant="outline"
                size="large"
                style={[styles.actionButton, styles.cancelButton]}
              />
              <Button
                title="Check Another Booking"
                onPress={() => {
                  setPnr('');
                  setLastName('');
                }}
                variant="ghost"
                size="large"
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.white,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    marginTop: Spacing.xs,
    opacity: 0.9,
  },
  searchCard: {
    margin: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  helpText: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
  },
  helpTextContent: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  bookingCard: {
    margin: Spacing.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pnrLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  pnrValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  status_confirmed: {
    backgroundColor: Colors.success + '20',
  },
  status_pending: {
    backgroundColor: Colors.warning + '20',
  },
  status_cancelled: {
    backgroundColor: Colors.error + '20',
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  passengerInfo: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  passengerContact: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  bookingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  section: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  passengerCard: {
    marginBottom: Spacing.sm,
  },
  passengerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  passengerNumber: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  passengerType: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  passengerFullName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500' as const,
    color: Colors.text.primary,
  },
  seatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  seatNumber: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  actions: {
    padding: Spacing.md,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
  cancelButton: {
    borderColor: Colors.error,
  },
});