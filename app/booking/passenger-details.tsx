import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';


export default function PassengerDetailsScreen() {
  const router = useRouter();

  
  const [passenger, setPassenger] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: 'Nigeria',
  });

  const handleContinue = () => {
    router.push('/booking/payment' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Passenger Details</Text>
            <Text style={styles.subtitle}>
              Please enter passenger information as it appears on travel documents
            </Text>
          </View>

          <Card style={styles.formCard}>
            <Text style={styles.sectionTitle}>Primary Passenger</Text>
            
            <Input
              label="Title"
              placeholder="Mr/Mrs/Ms"
              value={passenger.title}
              onChangeText={(text) => setPassenger({...passenger, title: text})}
              required
            />

            <Input
              label="First Name"
              placeholder="John"
              value={passenger.firstName}
              onChangeText={(text) => setPassenger({...passenger, firstName: text})}
              autoCapitalize="words"
              required
            />

            <Input
              label="Last Name"
              placeholder="Doe"
              value={passenger.lastName}
              onChangeText={(text) => setPassenger({...passenger, lastName: text})}
              autoCapitalize="words"
              required
            />

            <Input
              label="Email Address"
              placeholder="your@email.com"
              value={passenger.email}
              onChangeText={(text) => setPassenger({...passenger, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
              required
            />

            <Input
              label="Phone Number"
              placeholder="+234 800 000 0000"
              value={passenger.phone}
              onChangeText={(text) => setPassenger({...passenger, phone: text})}
              keyboardType="phone-pad"
              required
            />

            <Input
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={passenger.dateOfBirth}
              onChangeText={(text) => setPassenger({...passenger, dateOfBirth: text})}
              required
            />

            <Input
              label="Nationality"
              placeholder="Nigeria"
              value={passenger.nationality}
              onChangeText={(text) => setPassenger({...passenger, nationality: text})}
              required
            />
          </Card>

          <View style={styles.footer}>
            <Button
              title="Continue to Payment"
              onPress={handleContinue}
              size="large"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  formCard: {
    margin: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  footer: {
    padding: Spacing.md,
  },
});