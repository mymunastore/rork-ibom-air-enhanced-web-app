import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Calendar, 
  User, 
  Plane, 
  CreditCard, 
  Edit3, 
  Download, 
  Share, 
  Bell,
  MapPin,
  Luggage,
  Utensils,
  Wifi,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '@/constants/theme';
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
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.title}>Manage Booking</Text>
          <Text style={styles.subtitle}>View and modify your reservations</Text>
        </LinearGradient>

        {!currentBooking ? (
          <>
            <Card style={styles.searchCard}>
              <View style={styles.searchHeader}>
                <View style={styles.searchIcon}>
                  <Plane size={24} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Retrieve Your Booking</Text>
                  <Text style={styles.cardSubtitle}>Enter your booking details to continue</Text>
                </View>
              </View>
              
              <Input
                label="Booking Reference (PNR)"
                placeholder="e.g., IB123ABC"
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
                <AlertCircle size={16} color={Colors.info} />
                <Text style={styles.helpTextContent}>
                  Your booking reference was sent to your email after booking
                </Text>
              </View>
            </Card>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Text style={styles.quickActionsTitle}>Quick Actions</Text>
              <View style={styles.quickActionsGrid}>
                <TouchableOpacity style={styles.quickActionCard}>
                  <Bell size={24} color={Colors.primary} />
                  <Text style={styles.quickActionText}>Flight Alerts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionCard}>
                  <Download size={24} color={Colors.primary} />
                  <Text style={styles.quickActionText}>Download App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionCard}>
                  <MapPin size={24} color={Colors.primary} />
                  <Text style={styles.quickActionText}>Airport Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionCard}>
                  <Luggage size={24} color={Colors.primary} />
                  <Text style={styles.quickActionText}>Baggage Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <Card style={styles.bookingCard}>
              <LinearGradient
                colors={[Colors.success + '10', Colors.primary + '05']}
                style={styles.bookingGradient}
              >
                <View style={styles.bookingHeader}>
                  <View>
                    <Text style={styles.pnrLabel}>Booking Reference</Text>
                    <Text style={styles.pnrValue}>{currentBooking.pnr}</Text>
                  </View>
                  <View style={[styles.statusBadge, styles[`status_${currentBooking.status}`]]}>
                    <CheckCircle size={14} color={Colors.success} />
                    <Text style={styles.statusText}>{currentBooking.status.toUpperCase()}</Text>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.bookingContent}>
                <View style={styles.passengerInfo}>
                  <View style={styles.passengerIcon}>
                    <User size={20} color={Colors.primary} />
                  </View>
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
              </View>
            </Card>

            {/* Booking Actions */}
            <View style={styles.bookingActions}>
              <TouchableOpacity style={styles.actionItem}>
                <Download size={20} color={Colors.primary} />
                <Text style={styles.actionText}>Download Ticket</Text>
                <ChevronRight size={16} color={Colors.gray[400]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Share size={20} color={Colors.primary} />
                <Text style={styles.actionText}>Share Booking</Text>
                <ChevronRight size={16} color={Colors.gray[400]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Bell size={20} color={Colors.primary} />
                <Text style={styles.actionText}>Flight Notifications</Text>
                <ChevronRight size={16} color={Colors.gray[400]} />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Flight Details</Text>
              {currentBooking.flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Passengers & Services</Text>
              {currentBooking.passengers.map((passenger, index) => (
                <Card key={passenger.id} style={styles.passengerCard}>
                  <View style={styles.passengerCardHeader}>
                    <View style={styles.passengerCardInfo}>
                      <Text style={styles.passengerNumber}>Passenger {index + 1}</Text>
                      <Text style={styles.passengerType}>{passenger.type.toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                      <Edit3 size={16} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.passengerFullName}>
                    {passenger.title} {passenger.firstName} {passenger.lastName}
                  </Text>
                  
                  <View style={styles.passengerServices}>
                    {passenger.seatNumber && (
                      <View style={styles.serviceItem}>
                        <Plane size={14} color={Colors.success} />
                        <Text style={styles.serviceText}>Seat {passenger.seatNumber}</Text>
                      </View>
                    )}
                    <View style={styles.serviceItem}>
                      <Luggage size={14} color={Colors.success} />
                      <Text style={styles.serviceText}>20kg Baggage</Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <Utensils size={14} color={Colors.success} />
                      <Text style={styles.serviceText}>Meal Included</Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <Wifi size={14} color={Colors.success} />
                      <Text style={styles.serviceText}>Free Wi-Fi</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>

            <View style={styles.actions}>
              <View style={styles.primaryActions}>
                <Button
                  title="Modify Booking"
                  onPress={handleModifyBooking}
                  size="large"
                  style={styles.primaryActionButton}
                />
                <Button
                  title="Cancel Booking"
                  onPress={handleCancelBooking}
                  variant="outline"
                  size="large"
                  style={[styles.primaryActionButton, styles.cancelButton]}
                />
              </View>
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
    paddingTop: Spacing['2xl'],
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
    marginTop: -Spacing['2xl'],
    ...Shadow.lg,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  searchIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  helpText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.info + '10',
    borderRadius: BorderRadius.md,
  },
  helpTextContent: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  bookingCard: {
    margin: Spacing.md,
    overflow: 'hidden',
    ...Shadow.md,
  },
  bookingGradient: {
    padding: Spacing.lg,
  },
  bookingContent: {
    padding: Spacing.lg,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
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
    alignItems: 'center',
    gap: Spacing.md,
  },
  passengerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  passengerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  editButton: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primary + '10',
  },
  passengerCardInfo: {
    flex: 1,
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
  passengerServices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  serviceText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  actions: {
    padding: Spacing.md,
  },
  primaryActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  primaryActionButton: {
    flex: 1,
  },
  quickActions: {
    padding: Spacing.md,
  },
  quickActionsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickActionCard: {
    flex: 1,
    minWidth: '45%',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadow.sm,
  },
  quickActionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  bookingActions: {
    margin: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadow.sm,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionText: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  cancelButton: {
    borderColor: Colors.error,
  },
});