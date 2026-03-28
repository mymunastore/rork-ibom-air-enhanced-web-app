import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';

export default function CheckInScreen() {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckIn = () => {
    if (!pnr || !lastName) {
      Alert.alert('Error', 'Please enter both PNR and Last Name');
      return;
    }

    setLoading(true);
    // Simulate check-in process
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Check-in completed! Your boarding pass has been sent to your email.');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Online Check-in</Text>
          <Text style={styles.subtitle}>Check in 24 hours before departure</Text>
        </View>

        {/* Check-in Rules */}
        <Card style={styles.rulesCard}>
          <View style={styles.ruleHeader}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.ruleTitle}>Check-in Time Windows</Text>
          </View>
          
          <View style={styles.rules}>
            <View style={styles.rule}>
              <Text style={styles.ruleLabel}>Online Check-in</Text>
              <Text style={styles.ruleText}>Opens 24h before departure</Text>
              <Text style={styles.ruleText}>Closes 2h (domestic) / 3h (international)</Text>
            </View>
            
            <View style={styles.rule}>
              <Text style={styles.ruleLabel}>Airport Check-in</Text>
              <Text style={styles.ruleText}>Opens 2h before departure</Text>
              <Text style={styles.ruleText}>Closes 45m before departure</Text>
            </View>
          </View>
        </Card>

        {/* Check-in Form */}
        <Card style={styles.formCard}>
          <Text style={styles.cardTitle}>Enter Your Details</Text>
          
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
            title="Check In"
            onPress={handleCheckIn}
            loading={loading}
            size="large"
          />
        </Card>

        {/* Important Information */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <AlertCircle size={20} color={Colors.warning} />
            <Text style={styles.infoTitle}>Important Information</Text>
          </View>
          
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <CheckCircle2 size={16} color={Colors.success} />
              <Text style={styles.infoText}>
                Ensure your travel documents are valid and up to date
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <CheckCircle2 size={16} color={Colors.success} />
              <Text style={styles.infoText}>
                International passengers must provide passport details
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <CheckCircle2 size={16} color={Colors.success} />
              <Text style={styles.infoText}>
                Select or change your seat during check-in
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <CheckCircle2 size={16} color={Colors.success} />
              <Text style={styles.infoText}>
                Boarding pass will be sent via email and SMS
              </Text>
            </View>
          </View>
        </Card>

        {/* Baggage Information */}
        <Card style={styles.baggageCard}>
          <Text style={styles.baggageTitle}>Baggage Allowance</Text>
          
          <View style={styles.baggageTypes}>
            <View style={styles.baggageType}>
              <Text style={styles.baggageClass}>Economy</Text>
              <Text style={styles.baggageAmount}>20kg checked</Text>
              <Text style={styles.baggageCarryOn}>1 carry-on (7kg)</Text>
            </View>
            
            <View style={styles.baggageType}>
              <Text style={styles.baggageClass}>Premium Economy</Text>
              <Text style={styles.baggageAmount}>30kg checked</Text>
              <Text style={styles.baggageCarryOn}>1 carry-on (7kg)</Text>
            </View>
          </View>
        </Card>
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
  rulesCard: {
    margin: Spacing.md,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  ruleTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  rules: {
    gap: Spacing.md,
  },
  rule: {
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
  },
  ruleLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  ruleText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  formCard: {
    margin: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    margin: Spacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  infoTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  infoList: {
    gap: Spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
  },
  baggageCard: {
    margin: Spacing.md,
    marginBottom: Spacing.xl,
  },
  baggageTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  baggageTypes: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  baggageType: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  baggageClass: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600' as const,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  baggageAmount: {
    fontSize: Typography.fontSize.base,
    fontWeight: '500' as const,
    color: Colors.text.primary,
  },
  baggageCarryOn: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
});