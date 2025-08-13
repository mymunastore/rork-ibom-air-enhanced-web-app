import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Award, 
  TrendingUp, 
  Gift, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  User,
  Mail,
  Phone
} from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/auth-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'green': return Colors.tierGreen;
      case 'orange': return Colors.tierOrange;
      case 'top': return Colors.tierTop;
      default: return Colors.gray[400];
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedIn}>
          <User size={64} color={Colors.gray[300]} />
          <Text style={styles.notLoggedInTitle}>Welcome to Ibom Flyer</Text>
          <Text style={styles.notLoggedInText}>
            Join our loyalty program and start earning points on every flight
          </Text>
          <Button
            title="Login"
            onPress={() => router.push('/auth/login')}
            size="large"
            style={styles.loginButton}
          />
          <Button
            title="Join Ibom Flyer"
            onPress={() => router.push('/auth/register')}
            variant="outline"
            size="large"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.header, { backgroundColor: getTierColor(user.tier) }]}>
          <View style={styles.profileInfo}>
            <Text style={styles.memberName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.memberId}>Member ID: {user.memberId}</Text>
            <View style={styles.tierBadge}>
              <Award size={16} color={Colors.white} />
              <Text style={styles.tierName}>{user.tier.toUpperCase()} TIER</Text>
            </View>
          </View>
        </View>

        {/* Points Summary */}
        <Card style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsTitle}>Available Points</Text>
            <Text style={styles.pointsValue}>{user.points.toLocaleString()}</Text>
          </View>
          
          {user.expiringPoints.amount > 0 && (
            <View style={styles.expiringPoints}>
              <Text style={styles.expiringText}>
                {user.expiringPoints.amount} points expiring on{' '}
                {new Date(user.expiringPoints.date).toLocaleDateString()}
              </Text>
            </View>
          )}

          <View style={styles.pointsStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.milesFlown.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Miles Flown</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.segmentsFlown}</Text>
              <Text style={styles.statLabel}>Segments</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.tierProgress}%</Text>
              <Text style={styles.statLabel}>To Next Tier</Text>
            </View>
          </View>

          <View style={styles.tierProgressBar}>
            <View style={[styles.tierProgressFill, { width: `${user.tierProgress}%` }]} />
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Gift size={24} color={Colors.primary} />
            <Text style={styles.quickActionText}>Redeem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <TrendingUp size={24} color={Colors.primary} />
            <Text style={styles.quickActionText}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Award size={24} color={Colors.primary} />
            <Text style={styles.quickActionText}>Benefits</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <Card style={styles.transactionsCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {user.transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transaction}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[
                styles.transactionPoints,
                transaction.type === 'earned' && styles.pointsEarned,
                transaction.type === 'redeemed' && styles.pointsRedeemed,
              ]}>
                {transaction.type === 'earned' ? '+' : '-'}{transaction.points}
              </Text>
            </View>
          ))}
        </Card>

        {/* Account Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <User size={20} color={Colors.gray[500]} />
            <Text style={styles.settingText}>Personal Information</Text>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Mail size={20} color={Colors.gray[500]} />
            <Text style={styles.settingText}>Email Preferences</Text>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Phone size={20} color={Colors.gray[500]} />
            <Text style={styles.settingText}>Contact Details</Text>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Settings size={20} color={Colors.gray[500]} />
            <Text style={styles.settingText}>Settings</Text>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <HelpCircle size={20} color={Colors.gray[500]} />
            <Text style={styles.settingText}>Help & Support</Text>
            <ChevronRight size={20} color={Colors.gray[400]} />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notLoggedIn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  notLoggedInTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  notLoggedInText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  loginButton: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  header: {
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'],
  },
  profileInfo: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.white,
  },
  memberId: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    opacity: 0.9,
    marginTop: Spacing.xs,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
  },
  tierName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  pointsCard: {
    margin: Spacing.md,
    marginTop: -Spacing.lg,
  },
  pointsHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  pointsTitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  pointsValue: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  expiringPoints: {
    padding: Spacing.sm,
    backgroundColor: Colors.warning + '20',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  expiringText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.warning,
    textAlign: 'center',
  },
  pointsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  tierProgressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  tierProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Spacing.md,
  },
  quickAction: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  quickActionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  transactionsCard: {
    margin: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  transactionDate: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  transactionPoints: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600' as const,
  },
  pointsEarned: {
    color: Colors.success,
  },
  pointsRedeemed: {
    color: Colors.error,
  },
  settingsCard: {
    margin: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingText: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    margin: Spacing.md,
    marginBottom: Spacing.xl,
    padding: Spacing.md,
  },
  logoutText: {
    fontSize: Typography.fontSize.base,
    color: Colors.error,
    fontWeight: '500' as const,
  },
});