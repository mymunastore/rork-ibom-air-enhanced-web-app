import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Award } from 'lucide-react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useAuth } from '@/hooks/auth-context';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;
    
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register({ firstName, lastName, email, phone, password });
      Alert.alert('Success', 'Welcome to Ibom Flyer!');
      router.back();
    } catch {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Join Ibom Flyer</Text>
          <Text style={styles.subtitle}>Start earning points on every flight</Text>
        </View>

        {/* Benefits Card */}
        <Card style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Member Benefits</Text>
          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <Award size={20} color={Colors.tierGreen} />
              <Text style={styles.benefitText}>Earn points on every flight</Text>
            </View>
            <View style={styles.benefit}>
              <Award size={20} color={Colors.tierOrange} />
              <Text style={styles.benefitText}>Exclusive member-only fares</Text>
            </View>
            <View style={styles.benefit}>
              <Award size={20} color={Colors.tierTop} />
              <Text style={styles.benefitText}>Priority services & upgrades</Text>
            </View>
          </View>
        </Card>

        <View style={styles.form}>
          <Input
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChangeText={(text) => setFormData({...formData, firstName: text})}
            autoCapitalize="words"
            required
          />

          <Input
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChangeText={(text) => setFormData({...formData, lastName: text})}
            autoCapitalize="words"
            required
          />

          <Input
            label="Email Address"
            placeholder="your@email.com"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
            required
          />

          <Input
            label="Phone Number"
            placeholder="+234 800 000 0000"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            keyboardType="phone-pad"
            required
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry
            required
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
            secureTextEntry
            required
          />

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            size="large"
            style={styles.registerButton}
          />

          <Text style={styles.terms}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Button
            title="Sign In"
            onPress={() => router.replace('/auth/login' as any)}
            variant="outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  benefitsCard: {
    marginBottom: Spacing.lg,
  },
  benefitsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  benefits: {
    gap: Spacing.sm,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  benefitText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  form: {
    marginBottom: Spacing.lg,
  },
  registerButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  terms: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.xs * Typography.lineHeight.normal,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
});