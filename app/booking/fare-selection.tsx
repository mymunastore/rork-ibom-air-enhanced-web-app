import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useBooking } from '@/hooks/booking-context';
import { fareTypes } from '@/mocks/data';

export default function FareSelectionScreen() {
  const router = useRouter();
  const { selectedFlight, selectFare } = useBooking();
  const [selectedFareId, setSelectedFareId] = useState('basic');

  const handleContinue = () => {
    const fare = {
      id: selectedFareId,
      type: selectedFareId as 'basic' | 'standard' | 'flex',
      price: fareTypes.find(f => f.id === selectedFareId)?.price || 0,
      currency: 'NGN',
      baggage: {
        cabin: '7kg',
        checked: selectedFareId === 'flex' ? '30kg' : '20kg',
      },
      changeable: selectedFareId !== 'basic',
      refundable: selectedFareId === 'flex',
      seatSelection: selectedFareId !== 'basic',
      priorityBoarding: selectedFareId === 'flex',
      loungeAccess: selectedFareId === 'flex',
    };
    
    selectFare(fare);
    router.push('/booking/passenger-details');
  };

  if (!selectedFlight) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No flight selected</Text>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Your Fare</Text>
          <Text style={styles.subtitle}>
            {selectedFlight.from.code} → {selectedFlight.to.code}
          </Text>
        </View>

        <View style={styles.fares}>
          {fareTypes.map((fare) => (
            <TouchableOpacity
              key={fare.id}
              onPress={() => setSelectedFareId(fare.id)}
              activeOpacity={0.7}
            >
              <Card style={[
                styles.fareCard,
                selectedFareId === fare.id && styles.fareCardSelected,
              ]}>
                <View style={styles.fareHeader}>
                  <View>
                    <Text style={styles.fareName}>{fare.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currency}>NGN</Text>
                      <Text style={styles.price}>{fare.price.toLocaleString()}</Text>
                    </View>
                  </View>
                  {selectedFareId === fare.id && (
                    <View style={styles.selectedBadge}>
                      <Check size={20} color={Colors.white} />
                    </View>
                  )}
                </View>

                <View style={styles.features}>
                  {fare.features.map((feature, index) => (
                    <View key={index} style={styles.feature}>
                      <Check size={16} color={Colors.success} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
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
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  fares: {
    padding: Spacing.md,
  },
  fareCard: {
    marginBottom: Spacing.md,
  },
  fareCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  fareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  fareName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
  },
  currency: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  price: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  selectedBadge: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  features: {
    gap: Spacing.sm,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  footer: {
    padding: Spacing.md,
  },
});