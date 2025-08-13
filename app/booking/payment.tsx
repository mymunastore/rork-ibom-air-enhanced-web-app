import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, Lock } from 'lucide-react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { useBooking } from '@/hooks/booking-context';

export default function PaymentScreen() {
  const router = useRouter();
  const { selectedFlight, selectedFare, createBooking } = useBooking();
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      const booking = {
        pnr: 'IB' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        lastName: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        phone: '+234 800 000 0000',
        flights: selectedFlight ? [selectedFlight] : [],
        passengers: [{
          id: '1',
          type: 'adult' as const,
          title: 'Mr',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          nationality: 'Nigeria',
        }],
        status: 'confirmed' as const,
        totalAmount: selectedFare?.price || 0,
        currency: 'NGN',
        createdAt: new Date().toISOString(),
        checkInAvailable: false,
      };
      
      await createBooking(booking);
      setLoading(false);
      router.push('/booking/confirmation');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment</Text>
          <View style={styles.secure}>
            <Lock size={16} color={Colors.success} />
            <Text style={styles.secureText}>Secure Payment</Text>
          </View>
        </View>

        {/* Order Summary */}
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Flight</Text>
            <Text style={styles.summaryValue}>
              {selectedFlight?.from.code} → {selectedFlight?.to.code}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Fare Type</Text>
            <Text style={styles.summaryValue}>{selectedFare?.type}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              NGN {selectedFare?.price.toLocaleString()}
            </Text>
          </View>
        </Card>

        {/* Payment Form */}
        <Card style={styles.paymentCard}>
          <View style={styles.cardHeader}>
            <CreditCard size={24} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Card Details</Text>
          </View>
          
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChangeText={(text) => setPaymentData({...paymentData, cardNumber: text})}
            keyboardType="numeric"
            maxLength={19}
            required
          />

          <Input
            label="Card Holder Name"
            placeholder="JOHN DOE"
            value={paymentData.cardHolder}
            onChangeText={(text) => setPaymentData({...paymentData, cardHolder: text})}
            autoCapitalize="characters"
            required
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChangeText={(text) => setPaymentData({...paymentData, expiryDate: text})}
                keyboardType="numeric"
                maxLength={5}
                required
              />
            </View>
            <View style={styles.halfInput}>
              <Input
                label="CVV"
                placeholder="123"
                value={paymentData.cvv}
                onChangeText={(text) => setPaymentData({...paymentData, cvv: text})}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                required
              />
            </View>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button
            title="Complete Payment"
            onPress={handlePayment}
            loading={loading}
            size="large"
          />
          
          <Text style={styles.disclaimer}>
            By completing this payment, you agree to our terms and conditions
          </Text>
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
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.text.primary,
  },
  secure: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  secureText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.success,
  },
  summaryCard: {
    margin: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    fontWeight: '500' as const,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  totalLabel: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  totalValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  paymentCard: {
    margin: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  footer: {
    padding: Spacing.md,
  },
  disclaimer: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: Typography.fontSize.xs * Typography.lineHeight.normal,
  },
});