import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { 
  ArrowRightLeft, 
  Calendar, 
  Users, 
  ChevronDown, 
  Plane,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { airports, destinations, newsItems } from '@/mocks/data';
import { useBooking } from '@/hooks/booking-context';
import { SearchParams } from '@/types';



export default function BookScreen() {
  const router = useRouter();
  const { setSearchParams } = useBooking();
  
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [from, setFrom] = useState(airports[0]);
  const [to, setTo] = useState(airports[4]);
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [showDepartPicker, setShowDepartPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [passengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass] = useState<'economy' | 'premiumEconomy'>('economy');
  const [showAirportPicker, setShowAirportPicker] = useState<'from' | 'to' | null>(null);

  const handleSwapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    const params: SearchParams = {
      tripType,
      from: from.code,
      to: to.code,
      departDate,
      returnDate: tripType === 'roundTrip' ? returnDate : undefined,
      passengers,
      cabinClass,
      currency: 'NGN',
    };
    
    setSearchParams(params);
    router.push('/booking/search-results');
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.logo}>Ibom Air</Text>
              <Text style={styles.tagline}>Your Wings to the World</Text>
              <Text style={styles.heroSubtitle}>
                Connecting Nigeria to the world with comfort and reliability
              </Text>
            </View>
          </View>
        </View>

        {/* Search Card */}
        <Card style={styles.searchCard}>
          <View style={styles.searchHeader}>
            <Text style={styles.searchTitle}>Book Your Flight</Text>
            <Text style={styles.searchSubtitle}>Find the best deals for your journey</Text>
          </View>
          {/* Trip Type Selector */}
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity
              style={[styles.tripTypeButton, tripType === 'oneWay' && styles.tripTypeActive]}
              onPress={() => setTripType('oneWay')}
            >
              <Text style={[styles.tripTypeText, tripType === 'oneWay' && styles.tripTypeTextActive]}>
                One Way
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tripTypeButton, tripType === 'roundTrip' && styles.tripTypeActive]}
              onPress={() => setTripType('roundTrip')}
            >
              <Text style={[styles.tripTypeText, tripType === 'roundTrip' && styles.tripTypeTextActive]}>
                Round Trip
              </Text>
            </TouchableOpacity>
          </View>

          {/* Route Selection */}
          <View style={styles.routeContainer}>
            <TouchableOpacity 
              style={styles.airportSelector}
              onPress={() => setShowAirportPicker('from')}
            >
              <Text style={styles.airportLabel}>From</Text>
              <Text style={styles.airportCode}>{from.code}</Text>
              <Text style={styles.airportCity}>{from.city}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.swapButton} onPress={handleSwapAirports}>
              <ArrowRightLeft size={20} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.airportSelector}
              onPress={() => setShowAirportPicker('to')}
            >
              <Text style={styles.airportLabel}>To</Text>
              <Text style={styles.airportCode}>{to.code}</Text>
              <Text style={styles.airportCity}>{to.city}</Text>
            </TouchableOpacity>
          </View>

          {/* Date Selection */}
          <View style={styles.dateContainer}>
            <TouchableOpacity 
              style={[styles.dateSelector, tripType === 'roundTrip' && styles.dateSelectorHalf]}
              onPress={() => setShowDepartPicker(true)}
            >
              <Calendar size={18} color={Colors.gray[500]} />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Departure</Text>
                <Text style={styles.dateValue}>
                  {departDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </Text>
              </View>
            </TouchableOpacity>

            {tripType === 'roundTrip' && (
              <TouchableOpacity 
                style={[styles.dateSelector, styles.dateSelectorHalf]}
                onPress={() => setShowReturnPicker(true)}
              >
                <Calendar size={18} color={Colors.gray[500]} />
                <View style={styles.dateInfo}>
                  <Text style={styles.dateLabel}>Return</Text>
                  <Text style={styles.dateValue}>
                    {returnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Passengers & Class */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionSelector}>
              <Users size={18} color={Colors.gray[500]} />
              <Text style={styles.optionText}>
                {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
              </Text>
              <ChevronDown size={16} color={Colors.gray[500]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionSelector}>
              <Plane size={18} color={Colors.gray[500]} />
              <Text style={styles.optionText}>
                {cabinClass === 'economy' ? 'Economy' : 'Premium Economy'}
              </Text>
              <ChevronDown size={16} color={Colors.gray[500]} />
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <Button
            title="Search Flights"
            onPress={handleSearch}
            size="large"
            style={styles.searchButton}
          />
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MapPin size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Destinations</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>On-Time</Text>
            </View>
            <View style={styles.statCard}>
              <Star size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Award size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
          </View>
        </View>

        {/* Popular Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Where We Fly</Text>
            <Text style={styles.sectionSubtitle}>Discover our network of destinations</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationsScroll}>
            {destinations.map((dest) => (
              <TouchableOpacity key={dest.code} style={styles.destinationCard}>
                <View style={styles.destinationImageContainer}>
                  <View style={styles.destinationImage}>
                    <Globe size={32} color={Colors.white} />
                  </View>
                  <View style={styles.destinationBadge}>
                    <Text style={styles.destinationBadgeText}>{dest.code}</Text>
                  </View>
                </View>
                <View style={styles.destinationInfo}>
                  <Text style={styles.destinationName}>{dest.name}</Text>
                  <Text style={styles.destinationFlights}>{dest.flightsPerWeek} flights/week</Text>
                  <Text style={styles.destinationPrice}>From ₦{dest.price?.toLocaleString() || '45,000'}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Ibom Flyer Program */}
        <Card style={styles.loyaltyCard}>
          <View style={styles.loyaltyHeader}>
            <Award size={32} color={Colors.tierGreen} />
            <View style={styles.loyaltyContent}>
              <Text style={styles.loyaltyTitle}>Join Ibom Flyer</Text>
              <Text style={styles.loyaltySubtitle}>Earn points and enjoy exclusive benefits</Text>
            </View>
          </View>
          <View style={styles.loyaltyTiers}>
            <View style={styles.tierItem}>
              <View style={[styles.tierBadge, { backgroundColor: Colors.tierGreen }]} />
              <Text style={styles.tierName}>Green</Text>
            </View>
            <View style={styles.tierItem}>
              <View style={[styles.tierBadge, { backgroundColor: Colors.tierOrange }]} />
              <Text style={styles.tierName}>Orange</Text>
            </View>
            <View style={styles.tierItem}>
              <View style={[styles.tierBadge, { backgroundColor: Colors.tierTop }]} />
              <Text style={styles.tierName}>Top</Text>
            </View>
          </View>
          <Button
            title="Learn More"
            onPress={() => {}}
            variant="outline"
            size="small"
            style={styles.loyaltyButton}
          />
        </Card>

        {/* Latest Updates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Updates</Text>
            <Text style={styles.sectionSubtitle}>Stay informed with our latest news</Text>
          </View>
          {newsItems.slice(0, 2).map((news) => (
            <Card key={news.id} style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <View style={styles.newsCategoryBadge}>
                  <Text style={styles.newsCategory}>{news.category}</Text>
                </View>
                <Text style={styles.newsDate}>
                  {new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
              </View>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsExcerpt}>{news.excerpt}</Text>
              <TouchableOpacity style={styles.newsReadMore}>
                <Text style={styles.newsReadMoreText}>Read More</Text>
                <TrendingUp size={14} color={Colors.primary} />
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Date Pickers */}
        {showDepartPicker && (
          <DateTimePicker
            value={departDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event: any, date?: Date) => {
              setShowDepartPicker(false);
              if (date) setDepartDate(date);
            }}
            minimumDate={new Date()}
          />
        )}

        {showReturnPicker && (
          <DateTimePicker
            value={returnDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event: any, date?: Date) => {
              setShowReturnPicker(false);
              if (date) setReturnDate(date);
            }}
            minimumDate={departDate}
          />
        )}

        {/* Airport Picker Modal */}
        {showAirportPicker && (
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Airport</Text>
              {airports.map((airport) => (
                <TouchableOpacity
                  key={airport.code}
                  style={styles.airportOption}
                  onPress={() => {
                    if (showAirportPicker === 'from') {
                      setFrom(airport);
                    } else {
                      setTo(airport);
                    }
                    setShowAirportPicker(null);
                  }}
                >
                  <Text style={styles.airportOptionCode}>{airport.code}</Text>
                  <Text style={styles.airportOptionName}>{airport.city}, {airport.country}</Text>
                </TouchableOpacity>
              ))}
              <Button
                title="Cancel"
                onPress={() => setShowAirportPicker(null)}
                variant="outline"
                style={styles.modalCancel}
              />
            </View>
          </View>
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
  heroSection: {
    height: 280,
    backgroundColor: Colors.primary,
    position: 'relative',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 108, 59, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing['3xl'],
  },
  heroContent: {
    alignItems: 'center',
  },
  logo: {
    fontSize: Typography.fontSize['5xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: Typography.fontSize.lg,
    color: Colors.white,
    marginTop: Spacing.sm,
    opacity: 0.9,
  },
  heroSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Spacing.md,
    opacity: 0.8,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
  searchHeader: {
    marginBottom: Spacing['2xl'],
  },
  searchTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  searchSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
  },
  searchCard: {
    margin: Spacing.lg,
    marginTop: -Spacing['5xl'],
    ...Shadow.lg,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
  },
  tripTypeActive: {
    borderBottomColor: Colors.primary,
  },
  tripTypeText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
  },
  tripTypeTextActive: {
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  airportSelector: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
  },
  airportLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  airportCode: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.text.primary,
  },
  airportCity: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  swapButton: {
    padding: Spacing.sm,
    marginHorizontal: Spacing.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dateSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  dateSelectorHalf: {
    flex: 0.5,
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500' as const,
    color: Colors.text.primary,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  optionSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  optionText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
  },
  searchButton: {
    marginTop: Spacing.sm,
  },
  statsSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing['2xl'],
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: Spacing.lg,
  },
  statNumber: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing['3xl'],
  },
  sectionHeader: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
  },
  destinationsScroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  destinationCard: {
    marginRight: Spacing.lg,
    width: 180,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.xl,
    ...Shadow.sm,
    overflow: 'hidden',
  },
  destinationImageContainer: {
    position: 'relative',
  },
  destinationImage: {
    height: 120,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  destinationBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  destinationInfo: {
    padding: Spacing.lg,
  },
  destinationName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  destinationFlights: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  destinationPrice: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },
  loyaltyCard: {
    margin: Spacing.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  loyaltyContent: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  loyaltyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  loyaltySubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  loyaltyTiers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  tierItem: {
    alignItems: 'center',
  },
  tierBadge: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  tierName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
  },
  loyaltyButton: {
    alignSelf: 'flex-start',
  },
  newsCard: {
    marginBottom: Spacing.lg,
    ...Shadow.xs,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  newsCategoryBadge: {
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  newsCategory: {
    fontSize: Typography.fontSize.xs,
    color: Colors.secondary,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'uppercase',
  },
  newsDate: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
  },
  newsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.snug,
  },
  newsExcerpt: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
    marginBottom: Spacing.lg,
  },
  newsReadMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  newsReadMoreText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    marginBottom: Spacing.lg,
  },
  airportOption: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  airportOptionCode: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  airportOptionName: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  modalCancel: {
    marginTop: Spacing.lg,
  },
});