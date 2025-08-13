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
import { ArrowRightLeft, Calendar, Users, ChevronDown, Plane } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
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
    router.push('/booking/search-results' as any);
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Ibom Air</Text>
          <Text style={styles.tagline}>Your Wings to the World</Text>
        </View>

        {/* Search Card */}
        <Card style={styles.searchCard}>
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

        {/* Popular Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {destinations.map((dest) => (
              <TouchableOpacity key={dest.code} style={styles.destinationCard}>
                <View style={styles.destinationImage} />
                <Text style={styles.destinationName}>{dest.name}</Text>
                <Text style={styles.destinationFlights}>{dest.flightsPerWeek} flights/week</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Latest News */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          {newsItems.slice(0, 2).map((news) => (
            <Card key={news.id} style={styles.newsCard}>
              <Text style={styles.newsCategory}>{news.category}</Text>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsExcerpt}>{news.excerpt}</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.primary,
  },
  logo: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold' as const,
    color: Colors.white,
  },
  tagline: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  searchCard: {
    margin: Spacing.md,
    marginTop: -Spacing.xl,
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
  section: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  destinationCard: {
    marginRight: Spacing.md,
    width: 150,
  },
  destinationImage: {
    height: 100,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  destinationName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500' as const,
    color: Colors.text.primary,
  },
  destinationFlights: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  newsCard: {
    marginBottom: Spacing.md,
  },
  newsCategory: {
    fontSize: Typography.fontSize.xs,
    color: Colors.secondary,
    fontWeight: '600' as const,
    marginBottom: Spacing.xs,
  },
  newsTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  newsExcerpt: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
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